import React from "react";
import styles from "./style.module.css";
import {ForwardArrowWithLine} from "@/assets/icon";

function UpfrontPayment() {
  const Heading = "Upfront Payment";
  return (
    <div className={styles.wrapper}>
      <p className={styles.main_heading}>{Heading}</p>
      <div className={styles.upfront_data}>
        <p className={styles.heading}>
          Your Order ID{" "}
          <span className={styles.heading_span}>: #438706031</span>{" "}
        </p>
        <p className={styles.heading}>
          Tenure <span className={styles.heading_span}>: 9 months</span>
        </p>
        <p className={styles.heading}>
          Upfront amount{" "}
          <span className={styles.heading_span}>
            {" "}
            : <span className="font-Inter">₹</span>1234
          </span>
        </p>
      </div>
      <div>
        <button className={styles.pay_now_btn}>
          Pay now
          <ForwardArrowWithLine size={20} color={"#222222"} />
        </button>
      </div>
    </div>
  );
}

export default UpfrontPayment;
