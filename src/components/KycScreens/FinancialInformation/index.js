import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import addressFormStyles from "@/components/Documentation/KYCAddress/KYCAddress.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  BackIcon,
  CheckFillIcon,
  DeleteIcon,
  DeleteIconFilled,
  InformationIcon,
  OutlineArrowRight,
} from "@/assets/icon";
import SelectionCircle from "@/components/Documentation/SelectionCircle/SelectionCircle";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useSelector} from "react-redux";
import RejectedDocsComponent from "@/components/Documentation/KYCAddress/RejectedDocsComponent";
import commonStyles from "@/components/Documentation/common.module.css";

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

const FinancialInfo = ({handleKycState, cibilDocsData}) => {
  const selectedOrderId = useSelector(state => state.kycPage.orderId);
  const isReupload = cibilDocsData?.userDocs?.length > 0;
  const [docData, setDocsData] = useState();
  const [isSelected, setIsSelected] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [formData, setFormData] = useState({
    financialDocumentProof: [],
  });
  const [formErrors, setFormErrors] = useState({
    financialDocumentProof: "",
  });
  const getAddProofList = () => {
    baseInstance
      .get(endPoints.getFinacialDocList)
      .then(res => {
        setDocsData(res?.data?.data);
        setIsSelected(res?.data?.data?.supported_docs?.split(",")?.[0]);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const handleFileInputChange = e => {
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
    }
  };
  const submitHandler = () => {
    const error = formErrors;
    if (!formData?.financialDocumentProof?.length > 0) {
      error.financialDocumentProof = "Please upload the salary slip proof";
    } else {
      error.financialDocumentProof = "";
    }
    setFormErrors({...error});
    if (error.financialDocumentProof !== "") return;

    setDisableButton(true);
    const allData = new FormData();
    allData.append(
      "financialStatementProof",
      JSON.stringify({
        doc_id: "cf_financial_statement",
        subDocType: isSelected,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    for (let i = 0; i < formData.financialDocumentProof.length; i++) {
      allData.append("doc", formData.financialDocumentProof[i]);
    }
    allData.append("orderId", selectedOrderId);
    baseInstance
      .post(endPoints.uploadFinancialDoc, allData)
      .then(() => {
        handleKycState(selectedOrderId);
        setDisableButton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setDisableButton(false);
      });
  };
  useEffect(() => {
    getAddProofList();
  }, []);

  useEffect(() => {
    setFormData({financialDocumentProof: ""});
  }, [selectedOrderId]);

  const handleDeleteFile = (e, index) => {
    e.stopPropagation();
    const temp = [...formData.financialDocumentProof];
    temp.splice(index, 1);
    setFormData({...formData, financialDocumentProof: temp});
    setFormErrors(prev => ({...prev, financialDocumentProof: ""}));
  };

  return (
    <div className="mt-8 w-full md:w-auto">
      {isReupload && (
        <div className={commonStyles.reupload_note_wrapper}>
          <InformationIcon className={`mt-0.5 ${commonStyles.reupload_icon}`} />
          <p className={commonStyles.reupload_note_txt}>
            Your document(s) have been rejected by our team for not meeting the
            necessary standards. Please re-upload them to proceed with KYC
            process.
          </p>
        </div>
      )}
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          //   onClick={() => backState(false)}
          className={"cursor-pointer"}
        />
        Financial Information
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
                      loader={({src}) => src}
                      src={uploading}
                      alt="Uploading Icon"
                      className={`${commonStyles.mdIBHidden}`}
                      loading="lazy"
                    />
                    <span className={`!pl-0 ${styles.chooseFile}`}>
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
                <span
                  onClick={e => {
                    handleDeleteFile(e, index);
                  }}>
                  <DeleteIcon
                    color={"#71717A"}
                    className={`${commonStyles.mdHiddemIcons} ml-3`}
                  />
                </span>
              </div>
            </div>

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
          </div>
        ))}

      {isReupload && (
        <RejectedDocsComponent
          array={cibilDocsData?.userDocs}
          docType={"cf_financial_statement"}
        />
      )}

      <div className={`${styles.input_wrapper} `}>
        <div className={`${styles.formInputFirst} lg:min-w-[530px]`}>
          <div className={`${commonStyles.flexICenter}`}>
            <label
              htmlFor="financialDoc"
              className={`cursor-pointer ${commonStyles.basicInputStyles} ${styles.lableStyle} text-[#71717a]`}>
              <div className={`${commonStyles.flexICenter} `}>
                <Image
                  loader={({src}) => src}
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdHiddenIB}`}
                  loading="lazy"
                />
                <Image
                  loader={({src}) => src}
                  src={uploading}
                  alt="Uploading Icon"
                  className={`${commonStyles.mdIBHidden}`}
                  loading="lazy"
                />
                <span className={`${styles.chooseFile}`}>
                  Upload Bank Statement
                </span>
              </div>
            </label>
            {formData.financialDocumentProof.name && (
              <div className="flex cursor-pointer">
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
          />
        </div>
      </div>

      {formErrors.financialDocumentProof && (
        <div
          className={` ${commonStyles.basicErrorStyles} ${commonStyles.errorTxt}`}>
          {formErrors.financialDocumentProof}
        </div>
      )}
      <div className={`${styles.btnGroup} w-[90%] md:w-fit mx-auto md:mx-0`}>
        <button
          disabled={disableButton}
          onClick={() => {
            submitHandler();
          }}
          className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px]  ${
            disableButton && "!bg-[#FFDF85]"
          } !m-0`}>
          <span> Proceed</span>
          <OutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FinancialInfo;
