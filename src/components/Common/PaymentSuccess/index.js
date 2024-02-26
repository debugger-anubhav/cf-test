import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";
import {format} from "date-fns";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const PaymentSuccess = () => {
  const currentDateTime = new Date();
  const formattedDateTime = format(currentDateTime, "MMMM d, yyyy, h:mm a");
  const router = useRouter();
  const details = useSelector(state => state.successPayment);

  useEffect(() => {
    if (details.TransactionReferenceNumber === "") router.push("/");
  }, []);

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
          <p className={`font-medium ${styles.desc}`}>
            {details?.TransactionReferenceNumber}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Transaction date
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>{formattedDateTime}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            PG Transaction ID
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details?.PGTransactionID}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>Amount</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details.amountPaid} INR
          </p>
        </div>
      </div>

      <div onClick={() => router.push("/")} className={styles.yellowbtn}>
        Return to home page
      </div>
    </div>
  );
};

export default PaymentSuccess;
