import React, {useEffect, useRef, useState} from "react";
import formStyles from "../Cart/AddressSection/styles.module.css";
import styles from "./style.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {cityUrl} from "../../../appConfig";
import DropDown from "../Documentation/DropDown/DropDown";
import ReCAPTCHA from "react-google-recaptcha";
import {ForwardArrowWithLine} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import {handleWheel, keyPressForContactField} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import LoaderComponent from "../Common/Loader/LoaderComponent";

const quantityOptions = [
  {label: "10-50", value: "10-50"},
  {label: "50-100", value: "50-100"},
  {label: "100+", value: "100+"},
];

const EnquirySection = () => {
  const recaptchaRef = useRef();
  const [perAddModal, setPerAddModal] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    quantityOptions[0],
  );

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Name should be of atleast 2 characters long"),
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
    email: Yup.string().email().required("Please enter a valid email address."),
    city: Yup.string().required(
      "Oops! Looks like you missed this field. Please enter your city.",
    ),
    message: Yup.string()
      .required(
        "Oops! Looks like you missed this field. Please enter your message.",
      )
      .min(5, "Message should be of atleast 5 characters long."),
  });
  const [captchaKey, setCaptchaKey] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRecaptchaVerify = value => {
    // const token = recaptchaRef.current.executeAsync();
    setCaptchaKey(value);
  };

  const handleSubmit = async values => {
    setDisableSubmit(true);
    setLoading(true);
    const payload = {
      name: values.fullName,
      email: values.email,
      phone: values.contactNumber,
      city: values.city,
      message: values.message,
      quantity: selectedOptionPer.value,
    };
    if (captchaKey) {
      baseInstance
        .post(endPoints.enquiry, payload)
        .then(response => {
          setLoading(false);
          showToastNotification(
            "Your Enquiry is sent to our team. They will get back to you shortly",
            1,
          );
          setTimeout(() => {
            typeof window !== "undefined" && window?.location.reload();
            setDisableSubmit(false);
          }, 2000);
        })
        .catch(error => {
          console.error("API error:", error);
          setLoading(false);
          setDisableSubmit(false);
        });
    } else {
      setLoading(false);
      showToastNotification(
        "Please complete the CAPTCHA to verify you are not a robot",
        3,
      );
      setDisableSubmit(false);
    }
  };
  const divRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setPerAddModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef, perAddModal]);

  return (
    <>
      <div className={styles.right_div}>
        {loading && <LoaderComponent loading={loading} />}
        <div>
          <h2 className={styles.enquiry_heading}>Enquiry</h2>
          <div className={styles.enquiry_description}>
            Mention your requirements in brief & we will get back to you
            promptly
          </div>
        </div>

        <div className={styles.form_wrapper}>
          <Formik
            initialValues={{
              fullName: "",
              contactNumber: "",
              email: "",
              city: "",
              message: "",
              quantity: selectedOptionPer.value,
            }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              await handleSubmit(values);
            }}>
            {formik => (
              <Form className={styles.form_wrapper}>
                <div>
                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>Full name</p>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      className={`${formStyles.form_input}`}
                    />
                    <ErrorMessage name="fullName">
                      {msg =>
                        formik.touched.fullName && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>Email</p>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={formStyles.form_input}
                    />
                    <ErrorMessage name="email">
                      {msg =>
                        formik.touched.email && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>Number</p>
                    <div className={`${styles.row} ${formStyles.form_input}`}>
                      <div className="flex gap-2 items-center">
                        <img
                          src={`${cityUrl + "india-icon.svg"}`}
                          className={formStyles.flag}
                          loading="lazy"
                          alt="India-icon"
                        />
                        <Field
                          onKeyPress={keyPressForContactField}
                          onWheel={handleWheel}
                          type="number"
                          // readOnly
                          name="contactNumber"
                          placeholder="Enter 10 digit number "
                          className={formStyles.contact_input}
                        />
                      </div>
                    </div>
                    <ErrorMessage name="contactNumber">
                      {msg =>
                        formik.touched.contactNumber && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>City</p>
                    <Field
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      className={formStyles.form_input}
                    />
                    <ErrorMessage name="city">
                      {msg =>
                        formik.touched.city && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>
                      Total Quantity (Units)
                    </p>
                    <div>
                      <div className="flex gap-2 items-center">
                        <div
                          className={`${styles.formInputFirst} cursor-pointer`}
                          ref={divRef}>
                          <DropDown
                            options={quantityOptions}
                            setIsDDOpen={setPerAddModal}
                            selectedOption={selectedOptionPer}
                            isOpen={perAddModal}
                            setSelectedOption={setSelectedOptionPer}
                          />
                        </div>
                      </div>
                    </div>
                    <ErrorMessage name="quantity">
                      {msg =>
                        formik.touched.quantity && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={formStyles.form_field}>
                    <p className={formStyles.form_label}>Message</p>
                    <Field
                      name="message"
                      as="textarea"
                      rows="6"
                      placeholder="Enter your message"
                      className={styles.textarea}></Field>
                    <ErrorMessage name="message">
                      {msg =>
                        formik.touched.message && (
                          <p className={formStyles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={styles.recaptcha}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaVerify}
                    />
                  </div>

                  <div className={styles.btn_wrapper}>
                    <button
                      type="submit"
                      className={`${styles.submit_btn_web} ${
                        disableSubmit ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      disabled={disableSubmit}>
                      Submit
                    </button>
                    <button
                      type="submit"
                      className={`${styles.submit_btn_mobile} ${
                        disableSubmit ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      disabled={disableSubmit}>
                      Save & Proceed
                      <ForwardArrowWithLine
                        className={styles.submit_btn_icon}
                      />
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EnquirySection;
