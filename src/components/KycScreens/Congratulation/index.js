import React, {useEffect, useState} from "react";
import styles from "../Dashboard/styles.module.css";
import {CheckCircleIcon, ForwardArrowWithLine} from "../../../assets/icon";
import CongoPopup from "@/components/Documentation/CongoPopup/CongoPopup";
import {useDispatch} from "react-redux";
import {setKycScreenName} from "@/store/Slices";
import KycCommonDrawer from "../KycCommonDrawer";
import Image from "next/image";

export default function CongratulationKyc({
  dashboardDetails,
  handleDelivery,
  disableKycStatusBtn,
}) {
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [showFirstContent, setShowFirstContent] = useState(false);

  const handleButtonClick = () => {
    dispatch(setKycScreenName("dashboard"));
  };

  useEffect(() => {
    setTimeout(() => {
      setShowFirstContent(true);
    }, 2000);
  }, []);

  const firstDrawerContant = () => {
    return (
      <div>
        <div className="font-Poppins my-8 md:text-16 text-14 leading-6 tracking-0.3">
          Only 3 steps to claim your bonus now.
          <Image
            src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
            alt="paty_icon"
            className=" inline-block"
            loading="lazy"
            width={16}
            height={16}
          />
        </div>
        <div className="flex md:gap-6 gap-4 md:w-[85%] w-full flex-col">
          <button
            className={styles.blank_btn}
            onClick={() => setOpenDrawer(false)}>
            Not now
          </button>
          <button
            className={`${styles.schedule_delivery_btn} bg-btn-primary cursor-pointer !w-full`}
            onClick={() => setShowFirstContent(false)}>
            Get my 500 Coins
          </button>
        </div>
      </div>
    );
  };

  const secondDrawerContent = () => {
    return (
      <div>
        <div className=" md:w-[85%] w-full flex flex-col">
          <div className="font-Poppins my-8 md:text-16 text-14 leading-6 tracking-0.3">
            Only 3 steps to claim your bonus now.
            <span
              className="text-5774AC underline pl-1 cursor-pointer"
              onClick={() => dispatch(setKycScreenName("dashboard"))}>
              your KYC review page
            </span>
          </div>
          <button
            className={`${styles.schedule_delivery_btn} bg-btn-primary cursor-pointer !w-full`}
            onClick={() => setOpenDrawer(false)}>
            Okay, understood
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={`${styles.firstSection}`}>
        <CongoPopup width={"200px"} height={"200px"} />
      </div>
      <div className="font-Poppins font-medium text-45454A md:text-24 text-20 md:leading-9 leading-6 md:my-12 my-8 text-center md:text-left">
        Congratulations! You have submitted your KYC documents.
      </div>
      <div className={styles.kyc_status_box}>
        <p className={`font-Poppins text-71717A text-16`}>KYC status:</p>
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
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          {/* <button
            className={`${styles.schedule_delivery_btn} ${
              dashboardDetails?.kycStatus === "Under Review"
                ? "bg-FFDF85 cursor-not-allowed"
                : "bg-btn-primary cursor-pointer"
            }`}
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
          </button> */}

          <button
            className={`${styles.schedule_delivery_btn} ${
              disableKycStatusBtn
                ? "bg-FFDF85 cursor-not-allowed"
                : "bg-btn-primary cursor-pointer"
            }`}
            disabled={disableKycStatusBtn}
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
              <div>
                {dashboardDetails?.zoho_status === "Out for Delivery" ? (
                  <div className="flex items-center gap-1">
                    <img
                      src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/exclamatory-icn.svg"
                      alt="lock"
                      width={20}
                      height={20}
                    />
                    Order is out for delivery
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {dashboardDetails.zoho_sub_status !==
                      "Delivery Scheduled" && (
                      <img
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/lock-icn.svg"
                        alt="lock"
                        width={20}
                        height={20}
                      />
                    )}
                    Manage your delivery now
                  </div>
                )}
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

          <button
            className={`${styles.schedule_delivery_btn} bg-btn-primary cursor-pointer`}
            onClick={handleButtonClick}>
            Review your KYC details <ForwardArrowWithLine />
          </button>
        </div>
      </div>

      {openDrawer && (
        <KycCommonDrawer
          changeState={setOpenDrawer}
          content={
            showFirstContent ? firstDrawerContant() : secondDrawerContent()
          }
          heading={
            showFirstContent ? (
              <div className="flex items-start w-full mr-2">
                <img
                  src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/cf_coin.svg"
                  alt="cf-coins"
                />
                "Earn 500 CF coins with optional KYC steps"
              </div>
            ) : (
              "We understand!"
            )
          }
        />
      )}
    </div>
  );
}
