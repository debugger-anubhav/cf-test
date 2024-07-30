import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import addressFormStyles from "@/components/Documentation/KYCAddress/KYCAddress.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {setKycScreenName, setStageId} from "@/store/Slices";
import {
  BackIcon,
  CheckFillIcon,
  DeleteIcon,
  DeleteIconFilled,
  OutlineArrowRight,
} from "@/assets/icon";
// import SelectionCircle from "@/components/Documentation/SelectionCircle/SelectionCircle";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import commonStyles from "@/components/Documentation/common.module.css";
import LoaderComponent from "../../Common/Loader/LoaderComponent";

const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
// const SelectionComp = ({
//   headertext,
//   duration,
//   setIsSelected,
//   type,
//   showInner,
// }) => {
//   return (
//     <div
//       onClick={() => {
//         setIsSelected(type);
//       }}>
//       <div className={`${styles.selHeading}`}>
//         <SelectionCircle showInner={showInner} />
//         <span className={`${styles.selHeadingTxt}`}>{headertext}</span>
//       </div>
//       <div className={`${styles.selDivider}`}>
//         <hr />
//       </div>
//       <div className={`${styles.selFooter} w-max-[173px]`}>
//         Required for <span className="font-medium">{duration}</span>
//       </div>
//     </div>
//   );
// };

const FinancialInfo = ({dashboardDetails}) => {
  const dispatch = useDispatch();
  const [docData, setDocsData] = useState();
  const [isSelected, setIsSelected] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const kycSliceData = useSelector(state => state.kycPage);
  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  // const stageId = kycSliceData.stageId;

  const userId = decrypt(getLocalStorage("_ga"));
  // const professionId = kycSliceData.selectedProfessionId;
  const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;

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
      error.financialDocumentProof = "Please upload the bank statement";
    } else {
      error.financialDocumentProof = "";
    }
    setFormErrors({...error});
    if (error.financialDocumentProof !== "") return;

    setDisableButton(true);
    setLoader(true);
    const allData = new FormData();
    allData.append(
      "financialStatementProof",
      JSON.stringify({
        doc_id: "cf_financial_statement",
        subDocType: isSelected,
      }),
    );
    allData.append("userId", userId);
    for (let i = 0; i < formData.financialDocumentProof.length; i++) {
      allData.append("doc", formData.financialDocumentProof[i]);
    }
    allData.append("orderId", orderId);
    allData.append("stageId", 2);
    baseInstance
      .post(endPoints.kycPage.uploadFinancialDocs, allData)
      .then(() => {
        dashboardDetails().then(() => {
          const pendingStage = pendingDashboardDetail?.filter(
            i => i.stage_status === 0 || i.stage_status === 1,
          );
          console.log(pendingStage, "pendingStage");
          if (pendingStage.length > 0) {
            const ID = pendingStage?.[0]?.id;
            if (ID === 3) {
              dispatch(setKycScreenName("professionalDetails"));
            }
            if (ID === 6) {
              dispatch(setKycScreenName("autoPay"));
            }
            if (ID === 7) {
              dispatch(setKycScreenName("educationalDetails"));
            }
          } else {
            dispatch(setKycScreenName("congratulation"));
          }
        });
        setLoader(false);
        dispatch(setStageId(3));
        setDisableButton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setDisableButton(false);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAddProofList();
  }, []);

  useEffect(() => {
    setFormData({financialDocumentProof: ""});
  }, [orderId]);

  const handleDeleteFile = (e, index) => {
    e.stopPropagation();
    const temp = [...formData.financialDocumentProof];
    temp.splice(index, 1);
    setFormData({...formData, financialDocumentProof: temp});
    setFormErrors(prev => ({...prev, financialDocumentProof: ""}));
  };

  return (
    <div className="mt-8 w-full md:w-auto">
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
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
              {/* <div
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
              </div> */}
              <div className={styles.heading_box}>
                Bank Statement (Required for last 3 months)
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
      <div className={styles.note}>
        <span className="font-medium"> Note:</span> Please upload the document
        in PNG or JPG or PDF format only.
      </div>

      <button
        onClick={() => {
          submitHandler();
        }}
        className={`${styles.proceed} ${disableButton && "!bg-[#FFDF85]"} !hidden md:!flex `}>
        Proceed
        <OutlineArrowRight color={"#222222"} />
      </button>

      <div className={styles.sticky_btn_wrapper}>
        <button
          onClick={() => {
            submitHandler();
          }}
          className={`${styles.proceed} ${disableButton && "!bg-[#FFDF85]"}`}>
          Proceed
          <OutlineArrowRight color={"#222222"} />
        </button>
      </div>
      {loader && <LoaderComponent loading={loader} />}
    </div>
  );
};

export default FinancialInfo;
