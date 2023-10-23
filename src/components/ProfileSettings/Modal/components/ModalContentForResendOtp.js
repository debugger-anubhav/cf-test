import React, {useEffect} from "react";
import styles from "../style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";
import {HiSparkles} from "react-icons/hi2";

const ModalContentForResendOtp = ({
  countdown,
  handleSentOtp,
  handleStartCountdown,
  problemType,
  setCountdown,
  setModalCategory,
  setOtp,
}) => {
  useEffect(() => {
    setCountdown(30);
  }, []);

  return (
    <div>
      <div className={styles.header_wrapper}>
        <div onClick={() => setModalCategory("verifyOtp")}>
          <BackIcon className={styles.back_arrow} />
        </div>
        <h1 className={styles.head}>
          {problemType === 1
            ? "Unable to receive OTP?"
            : "Trouble with OTP verification?"}
        </h1>
      </div>

      <div className={styles.timer_wrappper}>
        <p
          onClick={async () => {
            await handleSentOtp();
            handleStartCountdown();
            setOtp("");
          }}
          className={`text-9A9AA2 cursor-pointer ${styles.desc}`}>
          Resend OTP
        </p>
        <p className={`text-9A9AA2 ${styles.desc}`}>{countdown}</p>
      </div>

      <div className={styles.line}></div>

      <div className={styles.flex_prop}>
        <div className="flex gap-2 items-center">
          <p className={styles.blue_txt}>Get OTP on call</p>
          {problemType === 2 && (
            <div className={styles.recommende_div}>
              <HiSparkles size={20} color="white" />
              <p className={styles.recommend_txt}>Recommended</p>
            </div>
          )}
        </div>
        <ForwardArrow size={24} className={styles.icon} />
      </div>

      {problemType === 1 ? (
        <div className={styles.line}></div>
      ) : (
        <div className={styles.or_div}>
          <div className={styles.dotted_line}></div>
          <p className={styles.or_txt}>OR</p>
          <div className={styles.dotted_line}></div>
        </div>
      )}

      <div
        className={styles.flex_prop}
        onClick={() => setModalCategory("additionalSupport")}>
        <p className={styles.blue_txt}>Want additional support?</p>
        <ForwardArrow size={24} className={styles.icon} />
      </div>
    </div>
  );
};

export default ModalContentForResendOtp;
