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

export default function EducationalDetails() {
  const dispatch = useDispatch();
  const orderId = useSelector(
    state => state.kycPage.selectedDataForKyc.dealCodeNumber,
  );
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const [formData, setFormData] = useState({
    collegeName: "",
    collegeId: [],
  });
  const [formErrors, setFormErrors] = useState({
    collegeName: "",
    collegeId: "",
  });

  const handleFileInputChange = e => {
    const file = e.target.files;
    const temp = [...formData.collegeId];
    const fileArray = Object.keys(file).map(key => {
      return file[key];
    });
    const newArr = temp.concat(fileArray);

    if (file) {
      setFormData(prev => {
        return {...prev, collegeId: newArr};
      });

      if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
        setFormErrors(prev => ({
          ...prev,
          collegeId: "Please select jpg,png, pdf or jpeg file",
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          collegeId: "",
        }));
      }
    }
  };

  const submitHandler = () => {
    const error = formErrors;
    if (!formData?.collegeId?.length > 0) {
      error.collegeId = "Please upload the college Id";
    } else {
      error.collegeId = "";
    }
    setFormErrors({...error});
    if (error.collegeId !== "") return;

    // setDisableButton(true);
    const allData = new FormData();
    allData.append(
      "collegeId",
      JSON.stringify({
        doc_id: "cf_financial_statement",
        // subDocType: isSelected,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    for (let i = 0; i < formData.collegeId.length; i++) {
      allData.append("doc", formData.collegeId[i]);
    }
    allData.append("orderId", orderId);
    allData.append("stageId", 3);
    // baseInstance
    //   .post(endPoints.kycPage.uploadFinancialDocs, allData)
    //   .then(() => {
    //     handleKycState(orderId);
    //     dispatch(setKycScreenName("professionalDetails"));
    //     setDisableButton(false);
    //   })
    //   .catch(err => {
    //     console.log(err?.message || "some error");
    //     setDisableButton(false);
    //   });
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
          htmlFor={"collegeId"}>
          <Image
            loader={({src}) => src}
            src={uploading}
            alt="Uploading Icon"
            className={`${commonStyles.mdIBHidden}`}
          />
          <span className={`!pl-0 ${styles.chooseFile}`}>
            {/* {item?.name || item?.doc_name} */}
            Upload document(s)
          </span>
        </label>

        <input
          //   disabled={
          //     isReupload
          //       ? cibilDocsData?.cf_permanent_address_proof?.length > 0
          //       : false
          //   }
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="collegeId"
          id="collegeId"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
        />
        <>
          <div className={commonStyles.animate_check_icon}>
            <CheckFillIcon
              color={"#2D9469"}
              className={`${commonStyles.mdHiddemIcons}`}
            />
          </div>
        </>
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
