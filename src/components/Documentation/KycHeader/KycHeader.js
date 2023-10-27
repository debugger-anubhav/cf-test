import React from "react";
import styles from "./KycHeader.module.css";
const KycHeader = ({progress}) => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>KYC & Documentation</h1>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default KycHeader;
