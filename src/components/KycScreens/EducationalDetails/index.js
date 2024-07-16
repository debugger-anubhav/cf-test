import React, {useState} from "react";
import {BackIcon, CheckFillIcon, OutlineArrowRight} from "@/assets/icon";
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
export default function EducationalDetails() {
  const dispatch = useDispatch();
  const kycSliceData = useSelector(state => state.kycPage);

  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  const currentAddOptions = kycSliceData.currentAddOpt;
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const [formData, setFormData] = useState({
    collegeName: "",
    idProof: [],
  });
  const [formErrors, setFormErrors] = useState({
    collegeName: "",
    idProof: "",
  });

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
      error.idProof = "Please upload the college Id";
    } else {
      error.idProof = "";
    }
    setFormErrors({...error});
    if (error.idProof !== "") return;

    // setDisableButton(true);
    const allData = new FormData();
    allData.append(
      "idProof",
      JSON.stringify({
        doc_id: currentAddOptions?.doc_id,
        subDocType: currentAddOptions?.supported_docs,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    for (let i = 0; i < formData.idProof.length; i++) {
      allData.append("doc", formData.idProof[i]);
    }
    allData.append("orderId", orderId);
    allData.append("stageId", 7);
    baseInstance
      .post(endPoints.kycPage.saveEducationalDetails, allData)
      .then(() => {
        // handleKycState(orderId);
        dispatch(setKycScreenName("dashboard"));
      })
      .catch(err => {
        console.log(err?.message || "some error");
      });
  };

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
        <button
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={`${styles.doItLater}`}>
          I’ll do it later
        </button>
      </div>

      <div className={styles.detail_wapper}>
        <label className={styles.label}>School/college name</label>
        <input
          type="text"
          placeholder="Enter your school/college name"
          className={styles.label_input_style}
        />
      </div>

      <div className={`${styles.detail_wapper}`}>
        <div className={styles.label}>School/college ID proof</div>
        <label
          className={`flex items-center gap-2 ${styles.label_input_style}`}
          htmlFor={"idProof"}>
          <Image
            loader={({src}) => src}
            src={uploading}
            alt="Uploading Icon"
            className={`${commonStyles.mdIBHidden}`}
          />
          <span className={`!pl-0 ${styles.chooseFile}`}>
            {formData?.idProof?.length > 0 ? (
              <>
                {formData?.idProof?.map((file, index) => (
                  <span key={index}>{file?.name}</span>
                ))}
              </>
            ) : (
              " Upload document(s)"
            )}
          </span>
        </label>
        <div>
          {formData?.idProof?.length !== 0 && (
            <>
              <div className={`${commonStyles.correctFile}`}></div>
              <div className={commonStyles.animate_check_icon}>
                <CheckFillIcon
                  color={"#2D9469"}
                  className={`${commonStyles.mdHiddemIcons}`}
                />
              </div>
            </>
          )}
        </div>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="idProof"
          id="idProof"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
        />

        {formErrors.idProof === "" && (
          <div className={commonStyles.animate_check_icon}>
            <CheckFillIcon
              color={"#2D9469"}
              className={`${commonStyles.mdHiddemIcons}`}
            />
          </div>
        )}
      </div>

      <button
        className={styles.proceed}
        onClick={() => {
          submitHandler();
        }}>
        proceed
        <OutlineArrowRight color={"#222222"} />
      </button>
    </div>
  );
}
