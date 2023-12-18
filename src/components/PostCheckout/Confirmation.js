import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";
import {useRouter, useSearchParams} from "next/navigation";
import {setOrderIdFromOrderPage} from "@/store/Slices";
import {useDispatch} from "react-redux";

const PaymentConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const oid = searchParams.get("oid");

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer <= 1) {
      clearInterval(countdown); // Stop the countdown
      dispatch(setOrderIdFromOrderPage(oid));
      router.push("/documentation");
    }
    return () => clearInterval(countdown);
  }, [router, timer]);

  return (
    <div className={styles.main_container}>
      <div className={styles.success_icon_div}>
        <FaCheck color={"white"} className={styles.checkIcon} />
      </div>

      <p className={styles.head}>
        Congratulations! We have received your order.
      </p>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Order ID</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>{oid}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Transaction ID</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>pay_LY7pOUBt3WggBC</p>
        </div>
      </div>

      <div className={styles.next_step_wrapper}>
        <p className={styles.next_steps_header}>
          For the next steps, you will be redirected to KYC & Documentation page
          in {timer} {timer === 1 ? "second." : "seconds."}
        </p>
        <ul className={styles.steps}>
          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Please verify your KYC within next 48 hours.
            </li>
          </div>

          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Once your KYC is verified, we will be delivering your order within
              72 hours.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
