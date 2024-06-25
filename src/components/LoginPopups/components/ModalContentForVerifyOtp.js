import React, {memo, useEffect} from "react";
import styles from "../style.module.css";
import {handleWheel} from "@/constants/constant";

const ModalContentForVerifyOtp = ({
  contact,
  handleVerification,
  otpError,
  problemType,
  setModalCategory,
  countdown,
  handleSentOtp,
  handleStartCountdown,
  setStartCountdown,
  otp,
  setOtp,
  disableVerify,
}) => {
  useEffect(() => {
    handleStartCountdown();
  }, []);

  return (
    <div>
      <p className={styles.desc}>OTP sent to this number:</p>
      <div className="flex gap-2">
        <p className={`!text-222 ${styles.desc}`}>{contact}</p>
        <p
          onClick={() => {
            setModalCategory("changeNumber");
            setStartCountdown(false);
          }}
          className={styles.blue_txt}>
          change?
        </p>
      </div>
      <div className="mt-8">
        <p className={styles.desc}>Provide your OTP</p>
        <div className={`!mt-1 ${styles.form_input}`}>
          <input
            placeholder="ENTER OTP"
            type="number"
            onWheel={handleWheel}
            value={otp}
            className={styles.contact_input}
            autoFocus
            onChange={e => setOtp(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                otp !== "" && handleVerification();
              }
            }}
          />
          <button
            onClick={() => {
              otp !== "" && handleVerification();
            }}
            className={`${otp === "" ? styles.desc : styles.blue_txt} ${
              disableVerify ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={disableVerify}>
            Verify
          </button>
        </div>
        {otpError !== "" && <p className={styles.error}>{otpError}</p>}
        <p
          onClick={async () => {
            if (countdown === 0) {
              await handleSentOtp(contact);
              handleStartCountdown();
            }
          }}
          className={`mt-4 ${
            countdown > 0 ? styles.resend_txt : styles.blue_txt
          }`}>
          Resend OTP
          {countdown > 0 && (
            <span className="font-normal ml-2">{countdown} secs</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default memo(ModalContentForVerifyOtp);
