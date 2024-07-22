import React from "react";
import styles from "./KycHeader.module.css";
import {BackIcon} from "@/assets/icon";
const KycHeader = ({progress, setKycState, showBackIcon}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header_wrapper}>
        {showBackIcon && (
          <div onClick={setKycState}>
            <BackIcon className={styles.backIcon} />
          </div>
        )}
        <h1 className={styles.header}>KYC & Documentation</h1>
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default KycHeader;
