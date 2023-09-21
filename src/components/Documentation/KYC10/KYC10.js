import React from "react";
import styles from "./KYC10.module.css";
import commonStyles from "../common.module.css";
import DropDown from "../DropDown/DropDown";
const KYC10 = () => {
  return (
    <div>
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          We will fetch your credit score to verify your KYC.
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
      <div className={`${styles.formStepSecond}`}>
        <DropDown options={[]} />
      </div>
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Date of Birth (DD-MM-YYYY)
        </span>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default KYC10;
