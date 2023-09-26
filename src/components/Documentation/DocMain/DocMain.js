import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
import KycHeader from "../KycHeader/KycHeader";
import KYCSalary from "../KYCSalary/KYCSalary";

const DocMain = () => {
  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div className={styles.kycFormArea}>
        <KycHeader />
        <KYCSalary />
      </div>
    </div>
  );
};

export default DocMain;
