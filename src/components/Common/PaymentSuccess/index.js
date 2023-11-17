import React from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.success_icon_div}>
        <FaCheck color={"white"} className={styles.checkIcon} />
      </div>

      <p className={styles.head}>
        Congratulations! Your transaction is successful.
      </p>
      <div className="mt-6 xl:mt-8">
        <p className={styles.desc}>
          You can note down the following details for future reference.
        </p>
      </div>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Transaction reference number
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>{"oid"}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Transaction date
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            November 6, 20223, 2:41 pm
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            PG Transaction ID
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>pay_LY7pOUBt3WggBC</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>Amount</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>5 INR</p>
        </div>
      </div>

      <div className={styles.yellowbtn}>Return to home page</div>
    </div>
  );
};

export default PaymentSuccess;
