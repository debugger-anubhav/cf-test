import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
import KYCCommon from "../KYCCommon/KYCCommon";
// import KYCCard from "../KYCCard/KYCCard";

const DocMain = () => {
  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div className={styles.kycFormArea}>
        <KycHeader />
        {/* <KYCCard /> */}
        <KYCCommon />
      </div>
    </div>
  );
};

export default DocMain;
