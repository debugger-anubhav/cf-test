import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
// import KYCSalary from "../KYCSalary/KYCSalary";
// import KYCCard from "../KYCCard/KYCCard";
import KYCCommon from "../KYCCommon/KYCCommon";
// import KYCAddress from "../KYCAddress/KYCAddress";
// import KYC100 from "../KYC100/KYC100";

// import KYCCard from "../KYCCard/KYCCard";

const DocMain = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <DocSidebar />
        <div className={styles.kycFormArea}>
          <KycHeader />
          {/* <KYCAddress /> */}
          {/* <KYCCard /> */}
          {/* <KYCSalary /> */}
          {/* <KYC100 /> */}
          <KYCCommon />
        </div>
      </div>
    </div>
  );
};

export default DocMain;
