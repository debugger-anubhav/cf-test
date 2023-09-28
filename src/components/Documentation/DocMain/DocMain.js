import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
import KYCSalary from "../KYCSalary/KYCSalary";
// import KYCCard from "../KYCCard/KYCCard";
// import KYCCommon from "../KYCCommon/KYCCommon";
// import KYCAddress from "../KYCAddress/KYCAddress";
// import KYCCard from "../KYCCard/KYCCard";

const DocMain = () => {
  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div className={styles.kycFormArea}>
        <KycHeader />
        {/* <KYCAddress /> */}
        {/* <KYCCard /> */}
        <KYCSalary />
      </div>
    </div>
  );
};

export default DocMain;
