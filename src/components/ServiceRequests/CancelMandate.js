import React, {useRef, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";

import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {useSelector} from "react-redux";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";
import {
  CreateRequestPayload,
  handleWheel,
  keyPressForContactField,
} from "@/constants/constant";
import {cityUrl} from "../../../appConfig";

function CancelMandate({prevScreen, data, heading}) {
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );

  const [description, setDescription] = useState("");
  const {trailCreateSR} = CommonCreateRequestApi();
  const formikRef = useRef(null);

  const handleSubmit = values => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      mobile_number: values.contactNumber,
      description,
    };
    trailCreateSR(payload);
  };
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
      <div className={`${styles.content_wrapper} md:!pb-0 md:!h-auto`}>
        <div className={styles.main_heading}>
          <BackIcon
            onClick={() => prevScreen(true)}
            className={"cursor-pointer"}
          />
          {heading}
        </div>

        <Formik
          innerRef={f => (formikRef.current = f)}
          initialValues={{
            contactNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {formik => (
            <Form className={styles.form_wrapper}>
              <div className={styles.cancellation_info}>
                <div className={"mt-4"}>
                  <p className={formStyles.form_label}>Alternative number</p>
                  <div
                    className={`${styles.row} ${formStyles.form_input} flex`}>
                    <div className={styles.CancelMandate_indian_icon_wrapper}>
                      <img
                        src={`${cityUrl + "india-icon.svg"}`}
                        className={formStyles.flag}
                        loading="lazy"
                        alt="India-icon"
                      />
                      <Field
                        type="number"
                        onWheel={handleWheel}
                        onKeyPress={keyPressForContactField}
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

                <p className={styles.form_label}>Your comment (optional)</p>
                <textarea
                  placeholder="Please share any specific instructions or provide feedback."
                  className={styles.form_input_textarea}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <button
                type="submit"
                className={`${styles.proceed_btn}  !w-fit ${
                  !formikRef?.current?.isValid
                    ? "!bg-[#FFDF85] !cursor-not-allowed "
                    : ``
                } !hidden md:!flex`}>
                Create request <ForwardArrowWithLine />
              </button>
              <div className={`${styles.bottom_row_formik} !flex md:!hidden`}>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className={`${styles.form_submit_btn}  !w-full ${
                      !formikRef?.current?.isValid
                        ? "!bg-[#FFDF85] !cursor-not-allowed"
                        : ``
                    }`}
                    // onClick={() => formikRef?.current?.submitForm()}
                  >
                    Create request <ForwardArrowWithLine />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CancelMandate;
