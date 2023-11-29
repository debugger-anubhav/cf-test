import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {cityUrl} from "../../../appConfig";
import {baseURL} from "@/network/axios";
import axios from "axios";
import DropDown from "../Documentation/DropDown/DropDown";
import {endPoints} from "@/network/endPoints";

function Relocation() {
  const [docsData, setDocsData] = useState([]);
  const [perAddModal, setPerAddModal] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    "Select any current address proof",
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
    landmark: Yup.string(),
    address: Yup.string().required("Address is required"),
    postalCode: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 6 digit postal code without spaces or special characters",
        value => {
          return /^[0-9]*$/.test(value);
        },
      )
      .min(
        6,
        "Oops! Looks like you missed some digits. Please 6 digit postal code.",
      )
      .max(
        6,
        "Oops! It looks like you entered too many digits. Please enter valid 6 digit postal code.",
      )
      .required("Postal code is required"),
    city: Yup.string().required("City is required"),
  });
  const getAddProofList = () => {
    axios
      .get(baseURL + endPoints.addressProofList)
      .then(res => {
        setDocsData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  const handleSubmit = values => {};
  useEffect(() => {
    getAddProofList();
  }, []);
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Relocation
      </div>
      <div className={styles.buy_info}>
        <Formik
          initialValues={{
            contactNumber: "",
            city: "",
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {formik => (
            <Form className={styles.form_wrapper}>
              <div>
                <div className={"mt-4"}>
                  <p className={formStyles.form_label}>Alternative number</p>
                  <div className={`${styles.row} ${formStyles.form_input}`}>
                    <div className="flex gap-2 items-center">
                      <img
                        src={`${cityUrl + "india-icon.svg"}`}
                        className={formStyles.flag}
                        loading="lazy"
                        alt="India-icon"
                      />
                      <Field
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

                <div className={"mt-4"}>
                  <p className={formStyles.form_label}>Address</p>
                  <Field
                    as="textarea"
                    name="address"
                    placeholder="Enter your address here including flat/building no."
                    className={formStyles.form_input}
                  />
                  <ErrorMessage name="address">
                    {msg =>
                      formik.touched.address && (
                        <p className={styles.error}>{msg}</p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div className={"mt-4"}>
                  <p className={formStyles.form_label}>
                    Nearest Landmark (optional)
                  </p>
                  <Field
                    name="landmark"
                    placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                    className={formStyles.form_input}
                  />
                </div>

                <div className="mt-4">
                  <p className={formStyles.form_label}>Postal code</p>
                  <Field
                    type="number"
                    name="postalCode"
                    placeholder="Enter 6 digit postal code"
                    className={formStyles.form_input}
                  />
                  <ErrorMessage name="postalCode">
                    {msg =>
                      formik.touched.postalCode && (
                        <p className={styles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div className={"mt-4"}>
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

                <div className={"mt-4"}>
                  <p className={formStyles.form_label}>Current address proof</p>
                  <DropDown
                    options={docsData[1]?.supported_docs
                      .split(",")
                      ?.map(i => ({label: i, value: i}))}
                    setIsDDOpen={setPerAddModal}
                    selectedOption={selectedOptionPer}
                    isOpen={perAddModal}
                    setSelectedOption={setSelectedOptionPer}
                    maxWidth="502px"
                    optionsActive="md:block hidden"
                    placeholder="Select any current address proof"
                  />
                  <Field
                    type="file"
                    name="file"
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Relocation;
