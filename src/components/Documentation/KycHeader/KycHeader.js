import React, {useState} from "react";
import styles from "./KycHeader.module.css";
import {BackIcon, InfoCircleIcon} from "@/assets/icon";
import KycCommonDrawer from "@/components/KycScreens/KycCommonDrawer";
import howItWorkStyles from "@/components/ReferAFriend/HowItWorksDrawer/style.module.css";

const sidebarDetail = [
  {
    heading: "Why KYC Matters:",
    subheading:
      "By verifying your identity, we ensure a safe and trustworthy environment for all users. Your security is our top priority, and completing KYC helps us maintain the integrity of our platform.",
  },
  {
    heading: "Finish the remaining steps whenever you're ready:",
    subheading: "Your KYC progress will be saved.",
  },
  {
    heading: "Privacy and Security Assurance:",
    subheading:
      "We take your privacy seriously. Your personal information is handled with the utmost care and protected by robust security measures, ensuring confidentiality and peace of mind throughout the KYC process.",
  },
  {
    heading: "Document Approval and Order Fulfillment Policy",
    subheading:
      "Order fulfillment is subject to approval of documents submitted. Cityfurnish reserves right to cancel order in case of documents rejection.",
  },
];

const KycHeader = ({progress, setKycState, showBackIcon}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header_wrapper}>
        {showBackIcon && (
          <div onClick={setKycState}>
            <BackIcon className={styles.backIcon} />
          </div>
        )}
        <h1 className={styles.header}>KYC & Documentation</h1>
        <div onClick={() => setOpenDrawer(true)} className="cursor-pointer">
          <InfoCircleIcon color={"#45454A"} size={25} />
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        {/* <div
          className={styles.progressBar}
          style={{width: `${progress}%`}}></div> */}
      </div>

      {openDrawer && (
        <KycCommonDrawer
          content={drawerContent()}
          changeState={setOpenDrawer}
          heading={"KYC & Documentation info"}
        />
      )}
    </div>
  );
};

export default KycHeader;

const drawerContent = () => {
  return (
    <div className="mt-8 md:w-[92%]">
      {sidebarDetail?.map((item, index) => (
        <div
          className={howItWorkStyles.drawer_map_wrapper}
          key={index.toString()}>
          <div className={howItWorkStyles.sidebar_benefit_wrapper}>
            <div className={howItWorkStyles.sidebar_number}>
              <p>{index + 1}</p>
            </div>
            <div className={howItWorkStyles.sidebar_detailing}>
              <p className={howItWorkStyles.sidebar_detail_heading}>
                {item.heading}
              </p>
              <p className={howItWorkStyles.sidebar_detail_subheading}>
                {item.subheading}
              </p>
              {index !== sidebarDetail?.length - 1 && (
                <div className={howItWorkStyles.divider}></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
