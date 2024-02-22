import React, {useEffect, useState} from "react";
import styles from "./KYCSalary.module.css";
import commonStyles from "../common.module.css";
import addressFormStyles from "../KYCAddress/KYCAddress.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  CheckFillIcon,
  Close,
  DeleteIcon,
  DeleteIconFilled,
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
import RejectedDocsComponent from "../KYCAddress/RejectedDocsComponent";
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
  // const [isUploading, setIsUploading] = useState(false);
  const [isSelected, setIsSelected] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [showReuploadNote, setShowReuploadNote] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [formData, setFormData] = useState({
    financialDocumentProof: [],
  });
  const [formErrors, setFormErrors] = useState({
    // addressProof: "",
    financialDocumentProof: "",
  });
  console.log(docData, isSelected, "selecege");
  const getAddProofList = () => {
    baseInstance
      .get(endPoints.getFinacialDocList)
      .then(res => {
        setDocsData(res?.data?.data);
        setIsSelected(res?.data?.data?.supported_docs?.split(",")?.[0]);
        console.log(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  const handleFileInputChange = e => {
    console.log("eeee");
    // setIsUploading(false);
    const file = e.target.files;
    const temp = [...formData.financialDocumentProof];
    const fileArray = Object.keys(file).map(key => {
      return file[key];
    });
    const newArr = temp.concat(fileArray);

    if (file) {
      setFormData(prev => {
        return {...prev, financialDocumentProof: newArr};
      });

      if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
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

      // setIsUploading(true);
    }
  };
  const submitHandler = () => {
    const error = formErrors;
    if (!formData?.financialDocumentProof?.length > 0) {
      error.financialDocumentProof = "Please upload the salary slip proof";
    } else {
      error.financialDocumentProof = "";
    }
    setFormErrors(error);
    console.log(error, "errooorr");

    if (error.financialDocumentProof !== "") return;

    // for (const key in formErrors) {
    //   if (Object.hasOwnProperty.call(formErrors, key)) {
    //     const element = formErrors[key];
    //     if (element) {
    //       return;
    //     }
    //   }
    // }
    setDisableButton(true);
    const allData = new FormData();
    allData.append(
      "financialStatementProof",
      JSON.stringify({
        doc_id: "cf_financial_statement",
        subDocType: isSelected,
        // docImageName: formData?.financialDocumentProof?.name,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    for (let i = 0; i < formData.financialDocumentProof.length; i++) {
      allData.append("doc", formData.financialDocumentProof[i]);
    }
    // allData.append("doc", formData.financialDocumentProof);
    allData.append("orderId", selectedOrderId);
    baseInstance
      .post(endPoints.uploadFinancialDoc, allData)
      .then(res => {
        console.log(res);
        handleKycState(selectedOrderId);
        setDisableButton(false);
      })
      .catch(err => {
        console.log(err);
        setDisableButton(false);
      });
  };
  useEffect(() => {
    getAddProofList();
  }, []);

  useEffect(() => {
    // if (isReupload) {
    //   setFormErrors({
    //     ...formErrors,
    //     financialDocumentProof:
    //       "Please re-upload these documents as these got rejected by our team.",
    //   });
    // } else {
    setFormData({financialDocumentProof: ""});
    // }
  }, [selectedOrderId]);

  const handleDeleteFile = (e, index) => {
    e.stopPropagation();
    const temp = [...formData.financialDocumentProof];
    temp.splice(index, 1);
    setFormData({...formData, financialDocumentProof: temp});
    // setFormData(prev => ({...prev, financialDocumentProof: ""}));
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

      {formData?.financialDocumentProof?.length > 0 &&
        formData?.financialDocumentProof?.map((item, index) => (
          <div key={index} className={addressFormStyles.map_row_wrapper}>
            <div className={`${styles.formInputFirst}`}>
              <div className="flex items-center">
                <label
                  className={`${commonStyles.basicInputStyles} md:w-[232px] block  
                       text-black                
                  }`}>
                  <div
                    className={`${commonStyles.flexICenter} gap-2 justify-between md:justify-normal`}>
                    <Image
                      src={uploading}
                      alt="Uploading Icon"
                      className={`${commonStyles.mdIBHidden}`}
                    />
                    <span className={`${styles.chooseFile}`}>
                      {item?.name || item?.doc_name}
                    </span>
                    <>
                      <div className={commonStyles.animate_check_icon}>
                        <CheckFillIcon
                          color={"#2D9469"}
                          className={`${commonStyles.mdHiddemIcons}`}
                        />
                      </div>
                    </>
                  </div>
                  {!formErrors.financialDocumentProof ? (
                    <div className={`${commonStyles.correctFile}`}></div>
                  ) : (
                    <></>
                  )}
                </label>
                {/* {cibilDocsData?.cf_financial_statement?.length === 0 && ( */}
                <span
                  onClick={e => {
                    handleDeleteFile(e, index);
                  }}>
                  <DeleteIcon
                    color={"#71717A"}
                    className={`${commonStyles.mdHiddemIcons} ml-3`}
                  />
                </span>
                {/* )} */}
              </div>
            </div>
            {/* {
            isReupload &&
            cibilDocsData?.cf_permanent_address_proof?.length > 0 ? (
              <div className="hidden md:flex ml-2">
                <CheckFillIcon
                  color={"#2D9469"}
                  className="w-[18px] h-[18px]"
                />
              </div>
            ) : ( */}
            <div
              className={`hidden md:flex ${addressFormStyles.check_wrapper}`}>
              <div
                className={addressFormStyles.showCheckCircle}
                id="showCheckCircle">
                <CheckFillIcon color="#2D9469" className="w-full h-full" />
              </div>
              <div
                id="showDeleteIcon"
                className={addressFormStyles.showDeleteIcon}
                onClick={e => handleDeleteFile(e, index)}>
                <DeleteIconFilled
                  color={"#ffffff"}
                  className={addressFormStyles.delete_icon_filled}
                />
              </div>
            </div>
            {/* )} */}
          </div>
        ))}

      {isReupload && (
        <RejectedDocsComponent
          array={cibilDocsData?.userDocs}
          docType={"cf_financial_statement"}
        />
      )}

      <div className={styles.input_wrapper}>
        <div className={`${styles.formInputFirst}`}>
          <div className={`${commonStyles.flexICenter}`}>
            <label
              htmlFor="financialDoc"
              className={`cursor-pointer ${commonStyles.basicInputStyles} ${styles.lableStyle} text-[#71717a]`}>
              <div className={`${commonStyles.flexICenter}`}>
                {/* {formData?.financialDocumentProof?.length > 0 ? ( */}
                <>
                  {/* {formErrors?.financialDocumentProof ? (
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
                    )} */}
                </>
                {/* ) : ( */}
                <Image
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdHiddenIB}`}
                />
                {/* )} */}
                <Image
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdIBHidden}`}
                />
                <span className={`${styles.chooseFile}`}>Choose file(s)</span>
              </div>
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
            multiple
            type="file"
            id="financialDoc"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            style={{display: "none", cursor: "pointer"}}
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

        {/* {formData?.financialDocumentProof?.name && (
          <div className={`!hidden md:!flex ${styles.check_wrapper}`}>
            <div className={styles.showCheckCircle}>
              <CheckFillIcon color={"#2D9469"} className="w-full h-full" />
            </div>
            <div
              className={styles.showDeleteIcon}
              onClick={e => handleDeleteFile(encodeURI)}>
              <DeleteIconFilled color={"#ffffff"} className="w-full h-full" />
            </div>
          </div>
        )} */}
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
            disabled={disableButton}
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${
              styles.saveBtn
            } md:w-[232px] ${disableButton && "!bg-[#FFDF85]"} `}>
            <span> Proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCSalary;
