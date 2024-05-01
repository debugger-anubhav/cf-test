import React from "react";
import styles from "../style.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {handleWheel, keyPressForContactField} from "@/constants/constant";
import {cityUrl} from "../../../../appConfig";

const ModalContentForNumber = ({
  contactNumber,
  handleSentOtp,
  setContact,
  setProblemType,
  setOtp,
  isLoginModal,
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
      .required(""),
  });

  return (
    <>
      <h1 className={styles.head}>
        {isLoginModal ? "Let’s get started" : "Change number"}
      </h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          contactNumber: contactNumber || "",
        }}
        onSubmit={values => {
          console.log(values);
        }}>
        {formik => (
          <Form>
            <div className={styles.form_input}>
              <div className="flex justify-center gap-2 w-full">
                <img
                  src={`${cityUrl + "india-icon.svg"}`}
                  className={styles.flag}
                  loading="lazy"
                  alt="India-icon"
                />
                <Field
                  type="number"
                  onKeyPress={keyPressForContactField}
                  onWheel={handleWheel}
                  // autofocus={true}
                  name="contactNumber"
                  placeholder="Enter your 10 digit phone number "
                  className={styles.contact_input}
                  value={formik.values.contactNumber}
                  onChange={e => {
                    formik.setFieldValue("contactNumber", e.target.value);
                    // setContact(e.target.value);
                  }}
                />
              </div>
              {formik.values.contactNumber.length > 0 && (
                <button
                  onClick={() => {
                    if (formik.isValid) {
                      setContact(formik.values.contactNumber);
                      handleSentOtp(formik.values.contactNumber);
                      setProblemType(1);
                      setOtp("");
                    }
                  }}
                  type="submit"
                  className={`${!formik.isValid && "!text-9A9AA2"} ${
                    styles.blue_txt
                  } whitespace-nowrap`}>
                  Send OTP
                </button>
              )}
            </div>
            <div className="h-6 mt-1">
              <ErrorMessage name="contactNumber">
                {msg =>
                  formik.touched.contactNumber && (
                    <p className={styles.error}>{msg} </p>
                  )
                }
              </ErrorMessage>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ModalContentForNumber;
