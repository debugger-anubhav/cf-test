import React, {useEffect, useState} from "react";
import styles from "./KYCSalary.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  CheckCircleIcon,
  DeleteIcon,
  ExclamationCircleFill,
  ReloadIcon,
} from "@/assets/icon";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const SelectionComp = ({
  headertext,
  monthsCount,
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
        Required for Last {monthsCount} months
      </div>
    </div>
  );
};
const KYCSalary = () => {
  const [isSelected, setIsSelected] = useState("");
  const [formData, setFormData] = useState({
    contactNumber: "",
    addressProof: "", // You can add more fields as needed
    currentAddressProof: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    contactNumber: "",
    addressProof: "",
    currentAddressProof: "",
    termsAccepted: "",
  });
  const [docData, setDocsData] = useState();
  console.log(docData);
  const getAddProofList = () => {
    baseInstance
      .get(baseURL + endPoints.getFinacialDocList)
      .then(res => {
        setDocsData(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  const handleFileInputChange = e => {
    const file = e.target.files[0];

    if (file) {
      setFormData(prev => {
        return {...prev, currentAddressProof: file};
      });
      if (!allowedFileTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          currentAddressProof: "Please select jpg,png, pdf or jpeg file",
        }));
      } else {
        setFormErrors(prev => ({
          ...prev,
          currentAddressProof: "",
        }));
      }
    }
  };
  useEffect(() => {
    getAddProofList();
  }, []);
  return (
    <div className="cursor-pointer">
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
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
        <div
          className={`${styles.selContainer} ${
            isSelected === "bank" ? " !border-[#3E688E]" : ""
          }`}>
          <SelectionComp
            headertext={"Bank Statement"}
            monthsCount={"3"}
            type={"bank"}
            setIsSelected={setIsSelected}
            showInner={isSelected === "bank"}
          />
        </div>
        <div className={`${styles.orBox}`}>
          <span>or</span>
        </div>
        <div
          className={`${styles.selContainer}  ${
            isSelected === "salary" ? " !border-[#3E688E]" : ""
          }`}>
          <SelectionComp
            headertext={"Salary Slip"}
            monthsCount={"2"}
            type={"salary"}
            setIsSelected={setIsSelected}
            showInner={isSelected === "salary"}
          />
        </div>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <div className={`${commonStyles.flexICenter}`}>
          <label
            htmlFor="currrentAdd"
            className={`${commonStyles.basicInputStyles} ${styles.lableStyle} ${
              formErrors.currentAddressProof && "  !bg-[#FFF1F1] md:!bg-white"
            } ${
              !formErrors.currentAddressProof &&
              formData.currentAddressProof.name
                ? "  !bg-[#F1FFF9] md:!bg-white"
                : ""
            }`}>
            <div className={`${commonStyles.flexICenter}`}>
              {formData?.currentAddressProof.name ? (
                <>
                  {formErrors?.currentAddressProof ? (
                    <ExclamationCircleFill
                      color={"#D96060"}
                      className={`${commonStyles.mdHiddemIcons}`}
                    />
                  ) : (
                    <CheckCircleIcon
                      color={"#2D9469"}
                      className={`${commonStyles.mdHiddemIcons}`}
                    />
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
                {formData?.currentAddressProof?.name ?? "Choose file"}
              </span>
            </div>
            {!formErrors.currentAddressProof &&
            formData.currentAddressProof.name ? (
              <div className={`${commonStyles.correctFile} `}></div>
            ) : (
              <></>
            )}{" "}
          </label>
          {formErrors.currentAddressProof && (
            <div className="flex">
              <ReloadIcon className={`${commonStyles.mdHiddemIconsML}`} />
              <span
                onClick={e => {
                  e.stopPropagation();
                  setFormData(prev => ({...prev, currentAddressProof: ""}));
                  setFormErrors(prev => ({...prev, currentAddressProof: ""}));
                }}>
                <DeleteIcon className="md:hidden ml-4 w-5 h-5" />
              </span>
            </div>
          )}
        </div>
        <input
          type="file"
          id="currrentAdd"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            disabled
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Proceed</span>
            <Image src={forwardArrow} alt="Forward Arrow Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCSalary;
