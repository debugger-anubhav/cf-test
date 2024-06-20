import {Drawer} from "@mui/material";
import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import Modal from "react-responsive-modal";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import ModalContentForNumber from "./components/ModalContentForNumber";
import ModalContentForVerifyOtp from "./components/ModalContentForVerifyOtp";
import ModalContentForResendOtp from "./components/ModalContentForResendOtp";
import ModalContentForAdditionalSupport from "./components/ModalContentForAdditionalSupport";
import ModalContentForMultipleEmails from "./components/ModalContentForMultipleEmails";
import ModalContentForSettingProfile from "./components/ModalContentForSettingProfile";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {decryptBase64, encrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage, setLocalStorage} from "@/constants/constant";
import Cookies from "universal-cookie";
import {setISFirstUser, setLoginState} from "@/store/Slices";
import {useDispatch} from "react-redux";

const LoginModal = ({
  isModalOpen,
  closeModal,
  setIsLogin,
  isCheckoutPage,
  handleChangeRoute,
  isSetupProfile,
}) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [modalCategory, setModalCategory] = useState("changeNumber");
  const [contact, setContact] = useState();
  const [otpError, setOtpError] = useState("");
  const [problemType, setProblemType] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [startCountdown, setStartCountdown] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState();
  const [emailArr, setEmailArr] = useState();
  const [disableVerify, setDisableVerify] = useState(false);
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const [proceedDisable, setProceedDisable] = useState(false);
  React.useEffect(() => {
    if (isSetupProfile) setModalCategory("setUpAccount");
    else setModalCategory("changeNumber");
  }, [isModalOpen]);

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
    window.addEventListener("resize", handleresize);
    // setStartCountdown(false);
    return () => {
      window.removeEventListener("resize", handleresize);
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
      await baseInstance.post(
        endPoints.profileSettingPage.sentOtpToNumber,
        header,
      );
      setModalCategory("verifyOtp");
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  const handleVerification = (otp, email) => {
    // if (countdown === 0) {
    //   setOtpError(
    //     "Sorry, your OTP has timed out. Please request a new OTP to continue.",
    //   );
    setDisableVerify(true);
    const body = {
      mobile_number: contact,
      otp,
      email,
      tempUserId,
    };

    baseInstance
      .post(endPoints.login.verifyOtp, body)
      .then(response => {
        setProblemType("");
        window?.gtag("event", "otp_verified");
        window?.fbq("track", "otp_verified");
        if (response?.data?.status_code === 200) {
          dispatch(setISFirstUser(response?.data?.data?.is_first_user));
          if (response?.data?.message === "Login Successfully.!") {
            const event = new Event("login");
            window?.dispatchEvent(event);
            setDisableVerify(false);
            if (response?.data?.data?.access_token) {
              cookies.set("authToken", response?.data?.data?.access_token, {
                path: "/",
              });
              baseInstance.defaults.headers.common.Authorization =
                response?.data?.data?.access_token;
            }
            const encryptedData = encrypt(response?.data?.data?.id.toString());
            setLocalStorage("_ga", encryptedData);
            setLocalStorage("user_name", response?.data?.data?.full_name);
            setLocalStorage("user_email", response?.data?.data?.email);

            if (setIsLogin) {
              setIsLogin(true);
            }
            cookies.set("userId", encryptedData, {
              path: "/",
            });
            dispatch(setLoginState(true));
            setUserId(response?.data?.data?.id);

            if (isCheckoutPage) {
              if (
                response?.data?.data?.full_name &&
                response?.data?.data?.email
              ) {
                closeModal();
                handleChangeRoute();
              } else setModalCategory("setUpAccount");
            } else {
              closeModal();
              handleChangeRoute && handleChangeRoute();
              // dispatch(setShoppingCartTab(1));
            }
            showToastNotification("Login successfully", 1);
            setTimeout(() => {
              window?.location?.reload();
            }, 1500);
          } else if (
            response?.data?.message ===
            "Multiple registered user found. Please enter registered email."
          ) {
            setEmailArr(response?.data?.data?.data);
            setModalCategory("multipleEmails");
          }
        }
      })
      .catch(err => {
        if (err?.response?.data?.message === "Invalid OTP")
          setOtpError(
            "The OTP you entered is not valid. Please make sure you entered the OTP correctly and try again.",
          );
        // setProblemType(2);
      });
  };

  const handleMultipleEmails = email => {
    handleVerification(otp, email);
    setProceedDisable(true);
    // isCheckoutPage && setModalCategory("setUpAccount");
  };

  const handleStartCountdown = () => {
    setModalCategory("verifyOtp");
    setStartCountdown(true);
  };

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
          <ModalContent
            modalCategory={modalCategory}
            setModalCategory={setModalCategory}
            contact={contact}
            handleSentOtp={handleSentOtp}
            setProblemType={setProblemType}
            setOtp={setOtp}
            isLoginModal={true}
            handleVerification={handleVerification}
            otpError={otpError}
            problemType={problemType}
            countdown={countdown}
            handleStartCountdown={handleStartCountdown}
            setStartCountdown={setStartCountdown}
            otp={otp}
            userId={userId}
            closeModal={closeModal}
            handleChangeRoute={handleChangeRoute}
            emailArr={emailArr}
            handleMultipleEmails={handleMultipleEmails}
            setCountdown={setCountdown}
            handleModalCategory={handleModalCategory}
            setContact={setContact}
            disableVerify={disableVerify}
            proceedDisable={proceedDisable}
          />
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
          <ModalContent
            modalCategory={modalCategory}
            setModalCategory={setModalCategory}
            contact={contact}
            handleSentOtp={handleSentOtp}
            setProblemType={setProblemType}
            setOtp={setOtp}
            isLoginModal={true}
            handleVerification={handleVerification}
            otpError={otpError}
            problemType={problemType}
            countdown={countdown}
            handleStartCountdown={handleStartCountdown}
            setStartCountdown={setStartCountdown}
            otp={otp}
            userId={userId}
            closeModal={closeModal}
            handleChangeRoute={handleChangeRoute}
            emailArr={emailArr}
            handleMultipleEmails={handleMultipleEmails}
            setCountdown={setCountdown}
            handleModalCategory={handleModalCategory}
            setContact={setContact}
            disableVerify={disableVerify}
            proceedDisable={proceedDisable}
          />
        </Modal>
      )}
    </div>
  );
};

export default LoginModal;

const ModalContent = ({
  modalCategory,
  setModalCategory,
  contact,
  handleSentOtp,
  setProblemType,
  setOtp,
  isLoginModal,
  handleVerification,
  otpError,
  problemType,
  countdown,
  handleStartCountdown,
  setStartCountdown,
  otp,
  userId,
  closeModal,
  handleChangeRoute,
  emailArr,
  handleMultipleEmails,
  setCountdown,
  setContact,
  disableVerify,
  proceedDisable,
}) => (
  <>
    {modalCategory === "changeNumber" ? (
      <ModalContentForNumber
        setModalCategory={val => setModalCategory(val)}
        setContact={e => setContact(e)}
        handleSentOtp={handleSentOtp}
        setProblemType={val => setProblemType(val)}
        setOtp={e => setOtp(e)}
        isLoginModal={isLoginModal}
      />
    ) : modalCategory === "verifyOtp" ? (
      <ModalContentForVerifyOtp
        contact={contact}
        handleVerification={() => handleVerification(otp)}
        otpError={otpError}
        problemType={problemType}
        setModalCategory={val => setModalCategory(val)}
        countdown={countdown}
        handleSentOtp={() => handleSentOtp(contact)}
        handleStartCountdown={handleStartCountdown}
        setStartCountdown={val => setStartCountdown(val)}
        otp={otp}
        setOtp={e => setOtp(e)}
        setCountdown={val => setCountdown(val)}
        disableVerify={disableVerify}
      />
    ) : modalCategory === "resendOtp" ? (
      <ModalContentForResendOtp
        countdown={countdown}
        handleSentOtp={() => handleSentOtp(contact)}
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
        data={emailArr}
        proceedDisable={proceedDisable}
      />
    ) : modalCategory === "setUpAccount" ? (
      <ModalContentForSettingProfile
        userId={userId}
        closeModal={closeModal}
        handleChangeRoute={handleChangeRoute}
      />
    ) : null}
  </>
);
