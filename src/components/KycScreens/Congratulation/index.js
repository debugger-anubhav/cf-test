import React from "react";
import styles from "../Dashboard/styles.module.css";
import {CheckCircleIcon, ForwardArrowWithLine} from "../../../assets/icon";
import CongoPopup from "@/components/Documentation/CongoPopup/CongoPopup";

export default function CongratulationKyc({dashboardDetails, handleDelivery}) {
  return (
    <div>
      <div className={`${styles.firstSection}`}>
        <CongoPopup width={"200px"} height={"200px"} />
      </div>
      <div>Congratulations! You have submitted your KYC documents.</div>
      <div className={styles.kyc_status_box}>
        <p className={styles.sub_heading}>KYC status:</p>
        <p className={`${styles.heading}  md:!text-20 `}>
          {dashboardDetails?.kycStatus}
          {dashboardDetails?.kycStatus === "Under Review" && (
            <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/exclamatory-icn.svg" />
          )}
          {dashboardDetails?.kycStatus === "Verified" && (
            <CheckCircleIcon color={"#2D9469"} size={18} />
          )}
          {dashboardDetails?.kycStatus === "Pending"}
          {dashboardDetails?.kycStatus === "Rejected" && (
            <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/red-exclamatory-icn.svg" />
          )}
        </p>
        <p className={styles.sub_heading}>{dashboardDetails?.kycMessage}</p>

        <button
          className={`${styles.schedule_delivery_btn}
    ${
      dashboardDetails?.kycStatus === "Under Review"
        ? "bg-FFDF85 cursor-not-allowed"
        : "bg-btn-primary cursor-pointer"
    }
    `}
          disabled={dashboardDetails?.kycStatus === "Under Review"}
          onClick={() => handleDelivery()}>
          {dashboardDetails?.kycStatus === "Under Review" && (
            <div className="flex items-center gap-1">
              <img
                src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/lock-icn.svg"
                alt="lock"
                width={20}
                height={20}
              />
              <p>Manage your delivery now</p>
            </div>
          )}

          {dashboardDetails?.kycStatus === "Verified" && (
            <div className="flex items-center gap-1">
              <img
                src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/exclamatory-icn.svg"
                alt="lock"
                width={20}
                height={20}
              />
              <p>Manage your delivery now</p>
            </div>
          )}

          {dashboardDetails?.kycStatus === "Pending" &&
            "Complete KYC to Schedule Delivery"}

          {dashboardDetails?.kycStatus === "Rejected" &&
            "Re-upload your documents now"}

          {dashboardDetails?.kycStatus !== "Under Review" && (
            <ForwardArrowWithLine />
          )}
        </button>
      </div>
    </div>
  );
}
