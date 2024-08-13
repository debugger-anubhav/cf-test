import React, {useEffect, useState} from "react";
import {
  BackIcon,
  CheckFillIcon,
  DeleteIcon,
  OutlineArrowRight,
  DeleteIconFilled,
} from "@/assets/icon";
import addressFormStyles from "@/components/Documentation/KYCAddress/KYCAddress.module.css";

import styles from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import commonStyles from "@/components/Documentation/common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {setKycScreenName} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import LoaderComponent from "../../Common/Loader/LoaderComponent";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

export default function EducationalDetails({getDashboardDetailsApi}) {
  const dispatch = useDispatch();
  const kycSliceData = useSelector(state => state.kycPage);
  // const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;

  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;

  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    collegeName: "",
    idProof: [],
  });
  const [formErrors, setFormErrors] = useState({
    collegeName: "",
    idProof: "",
  });
  const [currentAddOptions, setCurrentAddOptions] = useState(
    kycSliceData.currentAddOpt,
  );

  const handleFileInputChange = e => {
    const file = e.target.files;
    const temp = [...formData.idProof];

    const fileArray = Object.keys(file).map(key => {
      return file[key];
    });
    const newArr = temp.concat(fileArray);

    if (file) {
      setFormData(prev => {
        return {...prev, idProof: newArr};
      });

      if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
        setFormErrors(prev => ({
          ...prev,
          idProof: "Please select jpg,png, pdf or jpeg file",
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          idProof: "",
        }));
      }
    }
  };

  const submitHandler = () => {
    const error = formErrors;
    if (!formData?.idProof?.length > 0) {
      error.idProof = "Please upload the school/college Id";
    } else {
      error.idProof = "";
    }
    if (!formData?.collegeName > 0) {
      error.collegeName = "Please upload the school/college name";
    } else {
      error.collegeName = "";
    }
    setFormErrors({...error});
    if (error.idProof !== "") return;

    const allData = new FormData();
    allData.append(
      "idProof",
      JSON.stringify({
        doc_id: currentAddOptions
          ? currentAddOptions.doc_id
          : "college_id_proof",
        subDocType: currentAddOptions
          ? currentAddOptions.supported_docs
          : "Id Card",
      }),
    );

    for (let i = 0; i < formData.idProof.length; i++) {
      allData.append("doc", formData.idProof[i]);
    }

    allData.append("userId", decrypt(getLocalStorage("_ga")));
    allData.append("orderId", orderId);
    allData.append("instituteName", formData.collegeName);
    allData.append("stageId", 7);

    if (Object.values(formErrors).filter(Boolean).length === 0) {
      setLoader(true);

      baseInstance
        .post(endPoints.kycPage.saveEducationalDetails, allData)
        .then(() => {
          getDashboardDetailsApi().then(res => {
            const pendingStage = res?.allKycStages?.filter(
              i => i.stage_status === 0 || i.stage_status === 3,
            );

            // console.log(pendingStage, "pendingStage");
            showToastNotification("Educational docs uploaded successfully.", 1);
            if (pendingStage.length > 0) {
              const ID = pendingStage?.[0]?.id;
              if (ID === 2) {
                dispatch(setKycScreenName("financialInfo"));
              }
              if (ID === 3) {
                dispatch(setKycScreenName("professionalDetails"));
              }
              if (ID === 6) {
                dispatch(setKycScreenName("autoPay"));
              }
            } else {
              dispatch(setKycScreenName("congratulation"));
            }
          });

          setLoader(false);
        })
        .catch(err => {
          console.log(err?.message || "some error");
          setLoader(false);
        });
    }
  };

  const handleDeleteFile = (val, index) => {
    if (val === "idProof") {
      const temp = [...formData.idProof];
      temp.splice(index, 1);
      setFormData({...formData, idProof: temp});
    }
  };

  useEffect(() => {
    setCurrentAddOptions(kycSliceData.currentAddOpt);
  }, [kycSliceData.currentAddOpt]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header_wrapper}>
        <div className={styles.heading}>
          <BackIcon
            color={"#222222"}
            size={20}
            onClick={() => dispatch(setKycScreenName("dashboard"))}
            className={"cursor-pointer"}
          />
          Educational details
        </div>
      </div>

      <div className={styles.detail_wapper}>
        <label className={styles.label}>School/College name</label>
        <input
          type="text"
          placeholder="Enter your school/college name"
          className={styles.label_input_style}
          onChange={e => {
            setFormData({...formData, collegeName: e.target.value});
          }}
        />
        {formErrors.collegeName && (
          <div
            className={` ${commonStyles.basicErrorStyles} ${commonStyles.errorTxt}`}>
            {formErrors.collegeName}
          </div>
        )}
      </div>

      <div className={styles.label}>School/College ID proof</div>
      {formData?.idProof?.map((item, index) => (
        <div key={index} className={`${addressFormStyles.map_row_wrapper}`}>
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
                {!formErrors.idProof ? (
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

          <div className={`hidden md:flex ${addressFormStyles.check_wrapper}`}>
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

      <div className={`${styles.input_wrapper}`}>
        <div className={`${styles.formInputFirst} lg:min-w-[530px]`}>
          <div className={`${commonStyles.flexICenter}`}>
            <label
              htmlFor="idProof"
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
                  Upload school/college ID proof
                </span>
              </div>
            </label>
            {/* {formData.idProof && (
              <div className="flex cursor-pointer">
                <span
                  onClick={e => {
                    handleDeleteFile(e);
                  }}>
                  <DeleteIcon className=" md:hidden ml-4 w-5 h-5" />
                </span>
              </div>
            )} */}
          </div>
          <input
            multiple
            type="file"
            id="idProof"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            style={{display: "none", cursor: "pointer"}}
            onChange={e => {
              handleFileInputChange(e);
            }}
          />
        </div>
      </div>

      {formErrors.idProof && (
        <div
          className={` ${commonStyles.basicErrorStyles} ${commonStyles.errorTxt}`}>
          {formErrors.idProof}
        </div>
      )}

      <button
        className={`${styles.proceed} !mt-8 !hidden md:!flex`}
        onClick={() => {
          submitHandler();
        }}>
        Proceed
        <OutlineArrowRight color={"#222222"} />
      </button>

      <div className={styles.sticky_btn_wrapper}>
        <button
          onClick={() => {
            submitHandler();
          }}
          className={`${styles.proceed} mb-2`}>
          Proceed
          <OutlineArrowRight color={"#222222"} />
        </button>
      </div>
      {loader && <LoaderComponent loading={loader} />}
    </div>
  );
}
