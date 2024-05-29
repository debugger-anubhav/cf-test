import React from "react";
import styles from "../style.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ArrowForw} from "@/assets/icon";
import * as Yup from "yup";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

const ModalContentForSettingProfile = ({
  userId,
  closeModal,
  handleChangeRoute,
}) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("email is required"),
  });

  const userIdFromStorage = decrypt(getLocalStorage("_ga"));
  const handleUpdateUserDetails = async values => {
    try {
      const body = {
        id: userIdFromStorage,
        full_name: values.fullName,
        email: values.email,
      };
      await baseInstance.patch(
        endPoints.profileSettingPage.updateUserDetails,
        body,
      );
      closeModal();
      showToastNotification("Your details are saved successfully", 1);
      handleChangeRoute();
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };
  return (
    <>
      <h1 className={styles.head}>Setting up your account</h1>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          fullName: "",
          email: "",
        }}
        onSubmit={values => {
          handleUpdateUserDetails(values);
        }}>
        {formik => (
          <Form className="mt-8">
            <p className={styles.desc}>Full name</p>
            <div className={`!mt-1 ${styles.form_input}`}>
              <Field
                type="text"
                autofocus={true}
                name="fullName"
                placeholder="Enter your full name"
                className={styles.contact_input}
                value={formik.values.fullName}
                onChange={e => {
                  formik.setFieldValue("fullName", e.target.value);
                }}
              />
            </div>
            <ErrorMessage name="fullName">
              {msg =>
                formik.touched.fullName && (
                  <p className={styles.error}>{msg} </p>
                )
              }
            </ErrorMessage>
            <p className={`!mt-4 ${styles.desc}`}>Email</p>
            <div className={`!mt-1 ${styles.form_input}`}>
              <Field
                type="text"
                autofocus={true}
                name="email"
                placeholder="Enter your email"
                className={styles.contact_input}
                value={formik.values.email}
                onChange={e => {
                  formik.setFieldValue("email", e.target.value);
                }}
              />
            </div>
            <ErrorMessage name="email">
              {msg =>
                formik.touched.email && <p className={styles.error}>{msg} </p>
              }
            </ErrorMessage>

            <button
              className={styles.yellow_proceed_button}
              onClick={() => {
                if (formik.isValid) {
                  console.log(formik.values);
                }
              }}
              type="submit">
              Proceed <ArrowForw size={19} color={"#222"} />
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ModalContentForSettingProfile;
