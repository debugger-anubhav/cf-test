import React, {useState} from "react";
import styles from "./KYCSalary.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";

const SelectionComp = ({headertext, monthsCount, setIsSelected, type}) => {
  return (
    <div
      onClick={() => {
        setIsSelected(type);
      }}>
      <div className={`${styles.selHeading}`}>{headertext}</div>
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
          />
        </div>
        <div className={`${styles.orBox}`}>
          <span>or</span>
        </div>
        <div
          className={`${styles.selContainer} md:ml-4  ${
            isSelected === "salary" ? " !border-[#3E688E]" : ""
          }`}>
          <SelectionComp
            headertext={"Salary Slip"}
            monthsCount={"2"}
            type={"salary"}
            setIsSelected={setIsSelected}
          />
        </div>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <label
          htmlFor="currrentAdd"
          className={`${commonStyles.basicInputStyles} md:w-[232px] block`}>
          <Image
            src={uploading}
            alt="Uploading Icon"
            className="inline-block"
          />
          <span className="inline-block pl-2">Choose file</span>
        </label>
        <input
          type="file"
          id="currrentAdd"
          style={{display: "none"}}
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
