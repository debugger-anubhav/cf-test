import React from "react";
import styles from "./KYC10.module.css";
import commonStyles from "../common.module.css";
import DropDown from "../DropDown/DropDown";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";
import Image from "next/image";

const KYC10 = () => {
  return (
    <div>
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          We will fetch your credit score for free to verify your KYC
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Please provide one ID to fetch your credit score
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown options={[]} />
      </div>
      <div className={`${styles.formInputSecond}`}>
        <input
          type="text"
          className={`${commonStyles.basicInputStyles}`}
          placeholder="Enter PAN number"
        />
      </div>
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Date of Birth (DD-MM-YYYY)
        </span>
      </div>
      <div className={`${styles.formInputThird}`}>
        <input
          type="text"
          className={`${commonStyles.basicInputStyles}`}
          placeholder="DD-MM-YYYY"
        />
      </div>
      <div>
        <div className={`${styles.formTermsSection}`}>
          <input type="checkbox" className={`${commonStyles.basicCheckBox}`} />
          <span className={`${commonStyles.termsTxt}`}>
            &nbsp;I accept &nbsp;
          </span>
          <span className={`${commonStyles.termsTxt} text-[#5774AC] underline`}>
            &nbsp;Terms and Conditions
          </span>
        </div>
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
            <span> Save & proceed</span>
            <Image src={forwardArrow} alt="Forward Arrow Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYC10;
