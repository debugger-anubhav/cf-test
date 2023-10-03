import React from "react";
import styles from "./KYC100.module.css";
import commonStyles from "../common.module.css";
import CongoPopup from "../CongoPopup/CongoPopup";
const KYC100 = () => {
  return (
    <div>
      <div className={`${styles.firstSection}`}>
        <CongoPopup width={"200px"} height={"200px"} />
      </div>
      <div className={`${styles.secondSection}`}>
        <div className={`${styles.secondSectionHeaderTxt}`}>
          Congratulations! You have submitted your KYC documents
        </div>
        <div className={`${styles.secondSectionPara}`}>
          We will take 24 hours to verify your KYC and start processing your
          order.
        </div>
      </div>
      <div className={`${styles.btnContainer} `}>
        <button
          className={`${commonStyles.saveBtn} ${styles.singleBtn} w-full md:w-[168px]`}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default KYC100;
