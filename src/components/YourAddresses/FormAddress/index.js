import React from "react";
import styles from "./style.module.css";
import formStyles from "../../Cart/AddressSection/styles.module.css";
import {ArrowForw, BackIcon} from "@/assets/icon";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {cityUrl} from "../../../../appConfig";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

const FormAddress = ({setTab, tab, id}) => {
  const addressArray = useSelector(state => state.cartPageData.savedAddresses);
  const selectedItem = addressArray.find(item => item.id === id);
  // console.log(selectedItem, "selcetdeitemmmm");
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
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

    landmark: Yup.string(),
    address: Yup.string().required("Address is required"),
    postalCode: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 6 digit postal code without spaces or special characters",
        value => {
          // Check if the value contains any spaces or special characters
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
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = getLocalStorage("tempUserID");
  const userIdToUse = userId || tempUserId;

  const cityId = getLocalStorage("cityId");
  const cityName = useSelector(state => state.homePagedata.cityName);

  const saveUserAddress = async values => {
    return new Promise((resolve, reject) => {
      const headers = {
        userId: parseInt(userIdToUse),
        fullName: values.fullName,
        address: values.address,
        landMark: values.landmark,
        postalCode: parseInt(values.postalCode),
        city: values.city,
        cityId,
        phoneNo: parseInt(values.contactNumber),
      };

      axios
        .post(baseURL + endPoints.addToCart.addAddress, headers)
        .then(response => {
          resolve("hii");
        })
        .catch(error => {
          console.error("API error:", error);
        });
    });
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.header_wrapper}>
        <div onClick={setTab} className="cursor-pointer">
          <BackIcon className={styles.backArrow} />
        </div>
        <h1 className={styles.header}>
          {tab === 1 ? "Add New Address" : "Edit Address"}
        </h1>
      </div>
      <div className={styles.line}></div>

      <div className={styles.form_wrapper}>
        <Formik
          initialValues={{
            fullName: tab === 2 ? selectedItem.full_name : "",
            contactNumber: tab === 2 ? selectedItem.phone : "",
            address: tab === 2 ? selectedItem.address1 : "",
            landmark: tab === 2 ? selectedItem.address2 : "",
            postalCode: tab === 2 ? selectedItem.postal_code : "",
            city: tab === 2 ? selectedItem.city : cityName,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting, resetForm}) => {
            if (tab === 1) await saveUserAddress(values);
            // getAllSavedAddresses();
            // resetForm();
            showToastNotification(
              `${
                tab === 1
                  ? "Address added successfully"
                  : "Address updated successfully"
              }`,
              1,
            );
            setTab();
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
                    className={formStyles.form_input}
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
                  <p className={formStyles.form_label}>Contact number</p>
                  <div
                    className={`flex gap-2 items-center ${formStyles.form_input}`}>
                    <img
                      src={`${cityUrl + "india-icon.svg"}`}
                      className={formStyles.flag}
                      loading="lazy"
                    />
                    <Field
                      type="number"
                      // readOnly
                      name="contactNumber"
                      placeholder="Enter 10 digit number "
                      className={formStyles.contact_input}
                    />
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
                  <p className={formStyles.form_label}>Address</p>
                  <Field
                    as="textarea"
                    name="address"
                    placeholder="Enter your address here including flat/building no."
                    className={`${formStyles.textarea} ${formStyles.form_input}`}
                  />
                  <ErrorMessage name="address">
                    {msg =>
                      formik.touched.address && (
                        <p className={formStyles.error}>{msg}</p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div className={formStyles.form_field}>
                  <p className={formStyles.form_label}>
                    Nearest Landmark (optional)
                  </p>
                  <Field
                    name="landmark"
                    placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                    className={formStyles.form_input}
                  />
                </div>

                <div
                  className={`flex flex-col lg:flex-row gap-4 ${formStyles.form_field}`}>
                  <div className="lg:w-[48.5%]">
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
                  <div className="lg:w-[48.5%]">
                    <p className={formStyles.form_label}>City</p>
                    <Field
                      readOnly
                      type="text"
                      name="city"
                      value={cityName}
                      placeholder="Enter city"
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
                <div className={styles.btn_wrapper}>
                  <button type="submit" className={styles.btn}>
                    Proceed
                    <ArrowForw className={styles.forw_arrow} />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormAddress;
