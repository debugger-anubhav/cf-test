import {Drawer} from "@mui/material";
import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import Modal from "react-responsive-modal";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import ModalContentForNumber from "@/components/ProfileSettings/Modal/components/ModalContentForNumber";
import ModalContentForVerifyOtp from "@/components/ProfileSettings/Modal/components/ModalContentForVerifyOtp";
import ModalContentForResendOtp from "@/components/ProfileSettings/Modal/components/ModalContentForResendOtp";
import ModalContentForAdditionalSupport from "@/components/ProfileSettings/Modal/components/ModalContentForAdditionalSupport";
import ModalContentForMultipleEmails from "./components/ModalContentForMultipleEmails";
import ModalContentForSettingProfile from "./components/ModalContentForSettingProfile";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

const LoginModal = ({isModalOpen, closeModal, setIsLogin, isCheckoutPage}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [modalCategory, setModalCategory] = useState("changeNumber");
  const [contact, setContact] = useState();
  const [otpError, setOtpError] = useState("");
  const [problemType, setProblemType] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [startCountdown, setStartCountdown] = useState(false);
  const [otp, setOtp] = useState("");

  React.useEffect(() => {
    setModalCategory("multipleEmails");
  }, [isModalOpen]);

  useEffect(() => {
    let timer;

    if (countdown > 0 && startCountdown && problemType === 3) {
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

  React.useEffect(() => {
    setProblemType(1);
    setCountdown(30);
  }, [isModalOpen]);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };
  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    // setStartCountdown(false);
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const handleModalCategory = val => {
    setModalCategory(val);
  };

  const handleSentOtp = async number => {
    setCountdown(30);
    setOtpError("");
    setModalCategory("verifyOtp");

    const header = {
      mobile_number: number,
    };
    try {
      const response = await axios.post(
        baseURL + endPoints.profileSettingPage.sentOtpToNumber,
        header,
      );
      console.log(response, "response in number otpp");
      setModalCategory("verifyOtp");
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerification = (otp, email) => {
    if (countdown === 0) {
      setOtpError(
        "Sorry, your OTP has timed out. Please request a new OTP to continue.",
      );
    } else {
      const body = {
        mobile_number: contact,
        otp,
        email,
      };

      axios
        .post(baseURL + endPoints.login.verifyOtp, body)
        .then(response => {
          setProblemType("");
          console.log(response);
          if (response?.data?.status_code === 200) {
            setIsLogin(true);
            !isCheckoutPage && closeModal();
            showToastNotification("Login successfully", 1);
          }
          // handleNumberChange(contact);
          // closeModal();
          // showToastNotification("Login successfully", 1);
        })
        .catch(err => {
          console.log(err, "err in verif");
          if (err?.response?.data?.message === "Invalid OTP")
            setOtpError(
              "The OTP you entered is not valid. Please make sure you entered the OTP correctly and try again.",
            );
          setProblemType(2);
        });
    }
  };

  const handleMultipleEmails = email => {
    handleVerification(otp, email);
    isCheckoutPage && setModalCategory("setUpAccount");
  };

  const handleStartCountdown = () => {
    setModalCategory("verifyOtp");
    setProblemType(3);
    setStartCountdown(true);
  };

  const ModalContent = () => (
    <>
      {modalCategory === "changeNumber" ? (
        <ModalContentForNumber
          setModalCategory={val => handleModalCategory(val)}
          // contactNumber={contact}
          setContact={e => setContact(e)}
          handleSentOtp={handleSentOtp}
          setProblemType={val => setProblemType(val)}
          setOtp={e => setOtp(e)}
          isLoginModal
        />
      ) : modalCategory === "verifyOtp" ? (
        <ModalContentForVerifyOtp
          contact={contact}
          handleVerification={() => handleVerification(otp)}
          otpError={otpError}
          problemType={problemType}
          setModalCategory={val => setModalCategory(val)}
          countdown={countdown}
          handleSentOtp={handleSentOtp}
          handleStartCountdown={handleStartCountdown}
          setStartCountdown={val => setStartCountdown(val)}
          otp={otp}
          setOtp={e => setOtp(e)}
        />
      ) : modalCategory === "resendOtp" ? (
        <ModalContentForResendOtp
          countdown={countdown}
          handleSentOtp={handleSentOtp}
          handleStartCountdown={handleStartCountdown}
          problemType={problemType}
          setCountdown={val => setCountdown(val)}
          setModalCategory={val => setModalCategory(val)}
          setOtp={e => setOtp(e)}
        />
      ) : modalCategory === "additionalSupport" ? (
        <ModalContentForAdditionalSupport
          problemType={problemType}
          setModalCategory={val => setModalCategory(val)}
        />
      ) : modalCategory === "multipleEmails" ? (
        <ModalContentForMultipleEmails
          contact={contact}
          setModalCategory={val => setModalCategory(val)}
          handleMultipleEmails={handleMultipleEmails}
        />
      ) : modalCategory === "setUpAccount" ? (
        <ModalContentForSettingProfile />
      ) : null}
    </>
  );

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={() => {
            closeModal();
            setStartCountdown(false);
          }}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <ModalContent />
        </Drawer>
      ) : (
        <Modal
          styles={{}}
          open={isModalOpen}
          onClose={() => {
            closeModal();
            setStartCountdown(false);
          }}
          classNames={{
            modal: styles.customModal,
            overlay: styles.customOverlay,
            closeButton: styles.customCloseButton,
          }}>
          <ModalContent />
        </Modal>
      )}
    </div>
  );
};

export default LoginModal;
