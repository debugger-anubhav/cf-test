import React from "react";
import styles from "../style.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ArrowForw} from "@/assets/icon";
import * as Yup from "yup";

const ModalContentForSettingProfile = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("email is required"),
  });
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
          console.log(values);
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
                  console.log(e, "ee");
                  formik.setFieldValue("fullName", e.target.value);
                  // setContact(e.target.value);
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
                  console.log(e, "ee");
                  formik.setFieldValue("email", e.target.value);
                  // setContact(e.target.value);
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
