import React, {useEffect, useState} from "react";
import "react-responsive-modal/styles.css";
import {Modal} from "react-responsive-modal";
import styles from "../../LoginPopups/style.module.css";
import {handleWheel, getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
// import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {reduxSetModalState} from "@/store/Slices";

export default function VerfiEmail({
  openModal,
  setOpenModal,
  email,
  setVerifiedEmail,
  handleSubmit,
}) {
  const userId = decrypt(getLocalStorage("_ga"));
  const kycSliceData = useSelector(state => state.kycPage);
  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [startCountdown, setStartCountdown] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0 && startCountdown) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      console.log("timeout");
    }
    return () => {
      clearTimeout(timer);
    };
  }, [startCountdown, countdown]);

  const handleStartCountdown = () => {
    setStartCountdown(true);
    setCountdown(60);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    dispatch(reduxSetModalState(false));
  };
  useEffect(() => {
    if (openModal) handleStartCountdown();
  }, [openModal]);

  const handleVerification = () => {
    setDisableVerify(true);

    baseInstance
      .post(endPoints.kycPage.verifyCompanyEmail, {
        email,
        otp,
        userId,
        orderId,
      })
      .then(response => {
        if (!response?.data?.data?.status) {
          setOtpError(response?.data?.data?.message, 3);
        }

        if (response?.data?.data?.verified) {
          onCloseModal();
          setVerifiedEmail(true);
          handleSubmit();
        }
        handleSubmit();
      })
      .catch(err => {
        if (err?.response?.data?.message === "Invalid OTP")
          setOtpError(
            "The OTP you entered is not valid. Please make sure you entered the OTP correctly and try again.",
          );
      });
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        classNames={{
          modal: styles.verifyEmailCustomModal,
          overlay: styles.customOverlay,
          closeButton: styles.customCloseButton,
        }}>
        <div className={styles.desc}>OTP sent to this email id:</div>

        <div className="flex gap-2">
          <p className={`!text-222 ${styles.desc}`}>{email}</p>
          <p
            onClick={() => {
              setStartCountdown(false);
              onCloseModal();
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
              className={`${otp === "" ? styles.desc : styles.blue_txt}
               ${disableVerify ? "cursor-not-allowed" : "cursor-pointer"}`}
              //   disabled={disableVerify}
            >
              Verify
            </button>
          </div>
          {otpError !== "" && <p className={styles.error}>{otpError}</p>}
          <p
            onClick={async () => {
              if (countdown === 0) {
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
      </Modal>
    </div>
  );
}
