import React, {useEffect, useState} from "react";
import styles from "./KYCSalary.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  CheckFillIcon,
  Close,
  DeleteIcon,
  DeleteIconFilled,
  ExclamationCircleFill,
  InformationIcon,
  OutlineArrowRight,
  // ReloadIcon,
} from "@/assets/icon";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import CommonField from "../CommonField/CommonField";
import {useDispatch, useSelector} from "react-redux";
import DoItLater from "../DoItLaterModal/DoItLater";
import {reduxSetModalState} from "@/store/Slices";
const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const SelectionComp = ({
  headertext,
  duration,
  setIsSelected,
  type,
  showInner,
}) => {
  return (
    <div
      onClick={() => {
        setIsSelected(type);
      }}>
      <div className={`${styles.selHeading}`}>
        <SelectionCircle showInner={showInner} />
        <span className={`${styles.selHeadingTxt}`}>{headertext}</span>
      </div>
      <div className={`${styles.selDivider}`}>
        <hr />
      </div>
      <div className={`${styles.selFooter} w-max-[173px]`}>
        Required for <span className="font-medium">{duration}</span>
      </div>
    </div>
  );
};
const KYCSalary = ({handleKycState, cibilDocsData}) => {
  const dispatch = useDispatch();
  const selectedOrderId = useSelector(state => state.kycPage.orderId);
  const isReupload = cibilDocsData?.userDocs?.length > 0;
  const [docData, setDocsData] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isSelected, setIsSelected] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [showReuploadNote, setShowReuploadNote] = useState(true);
  const [formData, setFormData] = useState({
    financialDocumentProof: "",
  });
  const [formErrors, setFormErrors] = useState({
    // addressProof: "",
    financialDocumentProof: "",
  });
  console.log(docData);
  const getAddProofList = () => {
    baseInstance
      .get(baseURL + endPoints.getFinacialDocList)
      .then(res => {
        setDocsData(res?.data?.data);
        setIsSelected(res?.data?.data?.supported_docs?.split(",")?.[0]);
        console.log(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  const handleFileInputChange = e => {
    console.log("eeee");
    setIsUploading(false);
    const file = e.target.files[0];

    if (file) {
      setFormData(prev => {
        return {...prev, financialDocumentProof: file};
      });

      if (!allowedFileTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          financialDocumentProof: "Please select jpg,png, pdf or jpeg file",
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          financialDocumentProof: "",
        }));
      }

      setIsUploading(true);
    }
  };
  const submitHandler = () => {
    console.log("imnn clickkk");
    const error = formErrors;
    if (!formData?.financialDocumentProof?.name) {
      error.financialDocumentProof = "Please upload the salary slip proof";
    } else {
      error.financialDocumentProof = "";
    }
    setFormErrors(error);
    console.log(error, "errooorr");

    if (error.financialDocumentProof !== "") return;

    for (const key in formErrors) {
      if (Object.hasOwnProperty.call(formErrors, key)) {
        const element = formErrors[key];
        if (element) {
          return;
        }
      }
    }
    const allData = new FormData();
    allData.append(
      "financialStatementProof",
      JSON.stringify({
        doc_id: "cf_financial_statement",
        subDocType: isSelected.value,
        docImageName: formData?.financialDocumentProof?.name,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    allData.append("doc", formData.financialDocumentProof);
    allData.append("orderId", selectedOrderId);
    baseInstance
      .post(baseURL + endPoints.uploadFinancialDoc, allData)
      .then(res => {
        console.log(res);
        handleKycState(selectedOrderId);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getAddProofList();
  }, []);

  useEffect(() => {
    if (isReupload) {
      setFormErrors({
        ...formErrors,
        financialDocumentProof:
          "Please re-upload these documents as these got rejected by our team.",
      });
    } else {
      setFormData({financialDocumentProof: ""});
    }
  }, [selectedOrderId]);

  const handleDeleteFile = e => {
    e.stopPropagation();
    setFormData(prev => ({...prev, financialDocumentProof: ""}));
    setFormErrors(prev => ({...prev, financialDocumentProof: ""}));
  };

  const toggleDoItLaterToggle = bool => {
    setOpenModal(bool);
    dispatch(reduxSetModalState(bool));
  };

  return (
    <div className="">
      <DoItLater
        closeModal={() => toggleDoItLaterToggle(false)}
        isModalOpen={openModal}
      />
      <CommonField handleKycState={handleKycState} />

      {isReupload && showReuploadNote && (
        <div className={commonStyles.reupload_note_wrapper}>
          <InformationIcon className={`mt-0.5 ${commonStyles.reupload_icon}`} />
          <p className={commonStyles.reupload_note_txt}>
            Your document(s) have been rejected by our team for not meeting the
            necessary standards. Please re-upload them to proceed with KYC
            process.
          </p>
          <div
            onClick={() => {
              setShowReuploadNote(false);
            }}>
            <Close className={`cursor-pointer ${commonStyles.reupload_icon}`} />
          </div>
        </div>
      )}

      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 2</span>
      </div>
      <div className={`${styles.formHeadingFirst} `}>
        <div className={`${commonStyles.formHeadings} md:mr-[149px]`}>
          In order to verify your financial information, we kindly request you
          to upload some additional document. Rest assured that all the
          information you provide is treated with the highest level of
          confidentiality and security.
        </div>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Please upload one of the following
        </span>
      </div>
      <div className={`${styles.selectionBox}`}>
        {docData?.supported_docs_array?.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className={`${styles.selContainer} ${
                  isSelected === docData?.supported_docs?.split(",")?.[index]
                    ? "!border-2 !border-[#3E688E]"
                    : ""
                } ${index > 0 ? "md:ml-4" : ""}`}>
                <SelectionComp
                  headertext={item?.label}
                  duration={item?.duration}
                  type={docData?.supported_docs?.split(",")?.[index]}
                  setIsSelected={setIsSelected}
                  showInner={
                    isSelected === docData?.supported_docs?.split(",")?.[index]
                  }
                />
              </div>
              {index < docData?.supported_docs_array?.length - 1 ? (
                <div className={`${styles.orBox}`}>
                  <span>or</span>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>

      <div className={styles.input_wrapper}>
        <div className={`${styles.formInputFirst}`}>
          <div className={`${commonStyles.flexICenter}`}>
            <label
              htmlFor="currrentAdd"
              className={`cursor-pointer ${commonStyles.basicInputStyles} ${styles.lableStyle}`}>
              <div className={`${commonStyles.flexICenter}`}>
                {formData?.financialDocumentProof.name ? (
                  <>
                    {formErrors?.financialDocumentProof ? (
                      <ExclamationCircleFill
                        color={"#D96060"}
                        className={`${commonStyles.mdHiddemIcons}`}
                      />
                    ) : (
                      <div className={commonStyles.animate_check_icon}>
                        <CheckFillIcon
                          color={"#2D9469"}
                          className={`${commonStyles.mdHiddemIcons}`}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Image
                    src={uploading}
                    alt="Uploading Icon"
                    className={`${commonStyles.mdHiddenIB}`}
                  />
                )}
                <Image
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdIBHidden}`}
                />
                <span className={`${styles.chooseFile}`}>
                  {formData?.financialDocumentProof?.name ?? "Choose file"}
                </span>
              </div>
              {!formErrors.financialDocumentProof &&
              formData.financialDocumentProof.name &&
              isUploading ? (
                <div className={`${commonStyles.correctFile} `}></div>
              ) : (
                <></>
              )}{" "}
            </label>
            {formData.financialDocumentProof.name && (
              <div className="flex cursor-pointer">
                {/* <ReloadIcon className={`${commonStyles.mdHiddemIconsML}`} /> */}
                <span
                  onClick={e => {
                    handleDeleteFile(e);
                  }}>
                  <DeleteIcon className=" md:hidden ml-4 w-5 h-5" />
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="currrentAdd"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            style={{display: "none"}}
            onChange={e => {
              handleFileInputChange(e);
            }}
            //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
          />
        </div>

        {/* {formErrors.financialDocumentProof && (
          <div className={`${commonStyles.basicErrorStyles} `}>
            {formErrors.financialDocumentProof}
          </div>
        )} */}

        {formData?.financialDocumentProof?.name && (
          <div className={`!hidden md:!flex ${styles.check_wrapper}`}>
            <div className={styles.showCheckCircle}>
              <CheckFillIcon color={"#2D9469"} className="w-full h-full" />
            </div>
            <div
              className={styles.showDeleteIcon}
              onClick={e => handleDeleteFile(e)}>
              <DeleteIconFilled color={"#ffffff"} className="w-full h-full" />
            </div>
          </div>
        )}
      </div>

      {console.log(formErrors, formErrors.financialDocumentProof, "formerrors")}
      {formErrors.financialDocumentProof && (
        <div
          className={` ${commonStyles.basicErrorStyles} ${commonStyles.errorTxt}`}>
          {formErrors.financialDocumentProof}
        </div>
      )}
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            onClick={() => toggleDoItLaterToggle(true)}
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            // disabled
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCSalary;
