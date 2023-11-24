import React from "react";
import styles from "./styles.module.css";
import {BackIcon, IconLink} from "@/assets/icon";
import {statusToImageMap} from "../partOne/CommonContainer";
import {ImCheckmark} from "react-icons/im";
import OrderSummary from "../../Common/OrderSummary";

const OrderDetails = ({setPart}) => {
  const stepsCompleted = 2;
  const progressArr = [
    {
      status: "Amount Paid",
    },
    {
      status: "KYC Verified",
    },
    {
      status: "Delivery Scheduled",
    },
    {
      status: "Out for Delivery",
    },
    {
      status: "Delivered",
    },
  ];

  const drawerPerStepsCompleted = {
    0: "Retry Payment",
    1: "Complete KYC now",
    2: progressArr[1] === "Cancellation Processed" && "Reorder",
    3:
      progressArr[2].status === "Refund Processed"
        ? "Reorder"
        : "Manage delivery slot",
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_wrapper}>
        <div className={styles.headers_left_div}>
          <div onClick={() => setPart(1)} className="cursor-pointer">
            <BackIcon className={styles.backArrow} />
          </div>
          <h1 className={styles.header}>Order no: #1756884567</h1>
        </div>
        <div className={styles.headers_right_div}>
          <img
            src={
              IconLink + (statusToImageMap.Delivered || "payment-failed.svg")
            }
            className={styles.status_icon}
          />
          <p className={styles.status}>Delivery Scheduled</p>
        </div>
      </div>

      <div className={styles.sub_container}>
        <div className={styles.progress_wrapper}>
          <div className={styles.upper_map}>
            {progressArr.map((item, index) => (
              <div key={index} className={styles.progress_icon_wrapper}>
                <div
                  className={`${
                    index < stepsCompleted
                      ? styles.active_status
                      : `${index === stepsCompleted && "!text-[#2D9469]"} ${
                          styles.inactive_status
                        }`
                  } ${styles.progress_circle}`}>
                  {index < stepsCompleted ? (
                    <ImCheckmark className={styles.check_icon} />
                  ) : (
                    index + 1
                  )}
                </div>
                {index !== 4 && (
                  <div
                    className={`${
                      index < stepsCompleted
                        ? styles.active_status
                        : `!bg-EDEDEE ${styles.inactive_status}`
                    } ${styles.line}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.lower_map}>
            {progressArr.map((item, index) => (
              <div key={index} className={styles.progress_icon_wrapper}>
                <p className={styles.progress_status}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sub_container_right_div}>
          {stepsCompleted < 4 && drawerPerStepsCompleted[stepsCompleted] && (
            <div className={styles.drawer_button}>
              {drawerPerStepsCompleted[stepsCompleted]}
            </div>
          )}
          <p className={styles.need_help_txt}>Need Help with your order?</p>
        </div>
      </div>

      <div className="mt-8">
        <OrderSummary orderNumber={"2435674"} />
        {/* <div className={styles.products_wrapper}>
        <div className={styles.order_date_wrapper}>
          <p>
            Order placed on{" "}
            <span className={styles.bold_txt}>3rd Jun, 2023</span> at{" "}
            <span className={styles.bold_txt}>6:04 pm</span>
          </p>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default OrderDetails;
