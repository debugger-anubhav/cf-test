import {Drawer} from "@mui/material";
import React, {useState} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import Modal from "react-responsive-modal";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {cityUrl} from "../../../../appConfig";
import * as Yup from "yup";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const ChangeNumber = ({isModalOpen, closeModal, contactNumber, userId}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [modalCategory, setModalCategory] = useState("changeNumber");
  const [contact, setContact] = useState(contactNumber);
  const [otpError, setOtpError] = useState("");
  const [problemType, setProblemType] = useState(1);

  React.useEffect(() => {
    setModalCategory("changeNumber");
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
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const handleModalCategory = val => {
    setModalCategory(val);
  };

  const handleSentOtp = async () => {
    setOtpError("");
    setModalCategory("verifyOtp");

    // const header = {
    //   mobile_number: contact,
    // };
    // try {
    //   const response = await axios.post(
    //     baseURL + endPoints.profileSettingPage.sentOtpToNumber,
    //     header,
    //   );
    //   console.log(response, "response in number otpp");
    //   setModalCategory("verifyOtp");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleVerification = otp => {
    let countdown;
    if (countdown === 0) {
      setOtpError(
        "Sorry, your OTP has timed out. Please request a new OTP to continue.",
      );
    } else {
      const body = {
        mobile_number: contact,
        otp,
      };

      axios
        .post(baseURL + endPoints.profileSettingPage.verifyOtp, body, {
          headers: {
            userid: userId,
          },
        })
        .then(response => {
          console.log(response?.data);
        })
        .catch(err => {
          console.log(err, "err in verif");
          setOtpError(
            "The OTP you entered is not valid. Please make sure you entered the OTP correctly and try again.",
          );
          setProblemType(2);
        });
    }
  };

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          {modalCategory === "changeNumber" ? (
            <ModalContentForNumber
              setModalCategory={val => handleModalCategory(val)}
              contactNumber={contactNumber}
            />
          ) : modalCategory === "verifyOtp" ? (
            <ModalContentForVerifyOtp />
          ) : (
            <></>
          )}
        </Drawer>
      ) : (
        <Modal
          styles={{}}
          open={isModalOpen}
          onClose={closeModal}
          classNames={{
            modal: styles.customModal,
            overlay: styles.customOverlay,
            closeButton: styles.customCloseButton,
          }}>
          {modalCategory === "changeNumber" ? (
            <ModalContentForNumber
              setModalCategory={val => handleModalCategory(val)}
              contactNumber={contact}
              setContact={e => setContact(e)}
              handleSentOtp={handleSentOtp}
            />
          ) : modalCategory === "verifyOtp" ? (
            <ModalContentForVerifyOtp
              contact={contact}
              handleVerification={otp => handleVerification(otp)}
              otpError={otpError}
              problemType={problemType}
            />
          ) : (
            <></>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ChangeNumber;

const ModalContentForNumber = ({
  contactNumber,
  handleSentOtp,
  setModalCategory,
  setContact,
}) => {
  const validationSchema = Yup.object({
    contactNumber: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 10 digit phone number without spaces or special characters",
        value => {
          return /^[0-9]*$/.test(value);
        },
      )
      .min(
        10,
        "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
      )
      .max(
        10,
        "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
      )
      .required("Contact number is required"),
  });
  return (
    <>
      <h1 className={styles.head}>Change number</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          contactNumber,
        }}
        onSubmit={values => {
          console.log(values);
          //   setModalCategory("verifyOtp");
        }}>
        {formik => (
          <Form>
            <div className={styles.form_input}>
              <div className="flex justify-center gap-2">
                <img
                  src={`${cityUrl + "india-icon.svg"}`}
                  className={styles.flag}
                  loading="lazy"
                />
                <Field
                  type="number"
                  name="contactNumber"
                  placeholder="Enter 10 digit number "
                  className={styles.contact_input}
                  value={formik.values.contactNumber}
                  onChange={e => {
                    formik.setFieldValue("contactNumber", e.target.value);
                    setContact(e.target.value);
                  }}
                  //   onChange={e => setContact(e.target.value)}
                />
              </div>

              <button
                onClick={() => {
                  if (formik.isValid && formik.touched.contactNumber) {
                    handleSentOtp();
                  }
                }}
                type="submit"
                className={styles.blue_txt}>
                Send OTP
              </button>
            </div>
            <ErrorMessage name="contactNumber">
              {msg =>
                formik.touched.contactNumber && (
                  <p className={styles.error}>{msg} </p>
                )
              }
            </ErrorMessage>
          </Form>
        )}
      </Formik>
    </>
  );
};

const ModalContentForVerifyOtp = ({
  contact,
  handleVerification,
  otpError,
  problemType,
}) => {
  const [otp, setOtp] = useState("");
  return (
    <div>
      <p className={styles.desc}>OTP sent to this number:</p>
      <div className="flex gap-2">
        <p className={`!text-222 ${styles.desc}`}>{contact}</p>
        <p className={styles.blue_txt}>change?</p>
      </div>
      <div className="mt-8">
        <p className={styles.desc}>Provide your OTP</p>
        <div className={`!mt-1 ${styles.form_input}`}>
          <input
            placeholder="Enter the OTP you just received"
            className={styles.contact_input}
            onChange={e => setOtp(e.target.value)}
          />
          <p
            onClick={() => {
              otp !== "" && handleVerification(otp);
            }}
            className={`${otp === "" ? styles.desc : styles.blue_txt}`}>
            Verify
          </p>
        </div>
        {otpError !== "" && <p className={styles.error}>{otpError}</p>}
        {problemType === 1 ? (
          <p className={`${styles.unable_txt} ${styles.desc}`}>
            Unable to receive OTP?
          </p>
        ) : problemType === 2 ? (
          <p className={`${styles.unable_txt} ${styles.desc}`}>
            Having trouble with OTP verification?
          </p>
        ) : (
          <p className={styles.blue_txt}>Resend OTP</p>
        )}
      </div>
    </div>
  );
};
