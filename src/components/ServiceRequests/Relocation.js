import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {cityUrl} from "../../../appConfig";
import {baseURL} from "@/network/axios";
import axios from "axios";
import DropDown from "../Documentation/DropDown/DropDown";
import {endPoints} from "@/network/endPoints";
import uploading from "@/assets/common_icons/uploading.jpg";
import Image from "next/image";
import {FaCheckCircle} from "react-icons/fa";
import {IoIosCloseCircle} from "react-icons/io";

function Relocation({prevScreen}) {
  const [docsData, setDocsData] = useState([]);
  const [perAddModal, setPerAddModal] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    "Select any current address proof",
  );

  const [formData, setFormData] = useState({
    addressProof: "",
    currentAddressProof: "",
  });
  const [formErrors, setFormErrors] = useState({
    addressProof: "",
    currentAddressProof: "",
  });
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    if (e.target.name === "addressProof") {
      if (file) {
        setFormData(prev => {
          return {...prev, addressProof: file};
        });
        if (!allowedFileTypes.includes(file.type)) {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "",
          }));
        }
      }
    }
    if (e.target.name === "currrentAdd") {
      if (file) {
        setFormData(prev => {
          return {...prev, currentAddressProof: file};
        });
        if (!allowedFileTypes.includes(file.type)) {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "",
          }));
        }
      }
    }
  };

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

  const handleSubmit = values => {
    console.log(values, "formikValues");
  };

  useEffect(() => {
    getAddProofList();
  }, []);

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Relocation
      </div>
      <div className={`${styles.buy_info} !h-full`}>
        <Formik
          initialValues={{
            contactNumber: "",
            city: "",
            address: "",
            landmark: "",
            postalCode: "",
            addressProof: formData.addressProof,
            currentAddressProof: formData.currentAddressProof,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {formik => (
            <Form className={styles.form_wrapper}>
              <div className="relative">
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
                        <p className={formStyles.error}>{msg}</p>
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
                        <p className={formStyles.error}>{msg} </p>
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

                  <input
                    type="file"
                    name="addressProof"
                    id="addressProof"
                    style={{display: "none"}}
                    onChange={e => {
                      handleFileInputChange(e);
                    }}
                  />
                </div>

                <div className={`mt-4  `}>
                  <div
                    className={`${
                      !formErrors.currentAddressProof &&
                      formData.currentAddressProof.name
                        ? " w-[90%] "
                        : "w-full"
                    }flex `}>
                    <div
                      className={`flex items-center w-full relative ${styles.demo}`}>
                      <label
                        htmlFor="currrentAdd"
                        className={`${formStyles.form_input} !h-fit w-full pr-2 mb-12`}>
                        <div className={`flex w-full items-center`}>
                          <Image
                            src={uploading}
                            alt="Uploading Icon"
                            className={`h-full`}
                          />
                          <>
                            <span
                              className={`${styles.chooseFile} px-2 break-normal `}>
                              {formData?.currentAddressProof?.name ??
                                "Choose file"}
                            </span>
                          </>
                        </div>

                        {!formErrors.currentAddressProof &&
                          formData.currentAddressProof.name && (
                            <div className={`${styles.running_line}`}></div>
                          )}
                      </label>
                      {!formErrors.currentAddressProof &&
                        formData.currentAddressProof.name && (
                          <div
                            className="flex items-center absolute right-[-24px]"
                            onClick={e => {
                              e.stopPropagation();
                              setFormData(prev => ({
                                ...prev,
                                currentAddressProof: "",
                              }));
                              setFormErrors(prev => ({
                                ...prev,
                                currentAddressProof: "",
                              }));
                            }}>
                            <FaCheckCircle
                              color="#2D9469"
                              className={styles.showCheckCircle}
                            />
                            <IoIosCloseCircle
                              color="#D96060"
                              size={20}
                              className={styles.showDeleteIcon}
                            />
                          </div>
                        )}
                    </div>
                  </div>

                  <input
                    type="file"
                    name="currrentAdd"
                    id="currrentAdd"
                    style={{display: "none"}}
                    onChange={e => {
                      handleFileInputChange(e);
                    }}
                    //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
                  />
                </div>

                <div className={styles.bottom_row}>
                  <div className={styles.bottom_line}></div>
                  <button
                    className={`${styles.proceed_btn} ${
                      formik.isValid ? "!bg-[#FFDF85] !cursor-not-allowed" : ``
                    }`}>
                    Create request <ForwardArrowWithLine />
                  </button>
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
