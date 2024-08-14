import React, {useRef, useState} from "react";
import styles from "./styles.module.css";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {PopUpArrow, DownPopUpArrow, ForwardArrow} from "@/assets/icon";
import {cityUrl} from "../../../../appConfig";
import {handleWheel, keyPressForContactField} from "@/constants/constant";
import OrderTypeDrawer from "./OrderTypeDrawer";
import * as Yup from "yup";
import {useSelector} from "react-redux";

export default function NewAddressForm({
  handleOfflineOrder,
  saveAddDrawer,
  checkPostalCode,
  toggleDrawer,
}) {
  const formikRef = useRef(null);

  const cityName = useSelector(state => state.homePagedata.cityName);
  const [openOrderTypeDropdown, setOpenOrderTypeDropdown] = useState(false);
  const isOfflineCustomer = useSelector(
    state => state.cartPageData.isOfflineCustomer,
  );
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

    landmark: Yup.string().required("Landmark is required"),
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
    orderType: Yup.string().when("offlineCustomer", {
      is: true,
      then: () => Yup.string().required("Order type is required"),
      otherwise: () => Yup.string(),
    }),
    orderNumber: Yup.string().when("orderType", {
      is: orderType => orderType === "Swap product",
      then: () => Yup.string().required("Order number is required"),
      otherwise: () => Yup.string(),
    }),
    email: Yup.string()
      .email()
      .when("offlineCustomer", {
        is: true,
        then: () =>
          Yup.string().email().required("Please enter a valid email address."),
        otherwise: () => Yup.string().email(),
      }),
    customerPaidAmount: Yup.string().when("offlineCustomer", {
      is: true,
      then: () => Yup.string().required("Customer paid amount is required"),
      otherwise: () => Yup.string(),
    }),
  });

  const orderTypeOptions = ["New Order", "Swap product"];
  return (
    <div className={styles.new_address_wrapper}>
      {/* {!saveAddDrawer && (
        <h2 className={styles.new_add_head}>Add new address</h2>
      )} */}

      <Formik
        innerRef={f => (formikRef.current = f)}
        initialValues={{
          fullName: "",
          contactNumber: "",
          address: "",
          landmark: "",
          postalCode: "",
          city: cityName,
          orderNumber: "",
          orderType: "",
          email: "",
          alternateContactNumber: "",
          customerPaidAmount: "",
          offlineCustomer: isOfflineCustomer === 1,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
          if (isOfflineCustomer === 1) {
            handleOfflineOrder(values);
          } else {
            try {
              await checkPostalCode("onlineCustomer", values);
              toggleDrawer();
              resetForm();
            } catch (error) {
              console.error("Error submitting form:", error);
            }
          }
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }}>
        {formik => (
          <Form className={styles.form_wrapper}>
            <div className={styles.form_wrapper}>
              {isOfflineCustomer === 1 && (
                <>
                  <div className={styles.form_field}>
                    <p className={styles.form_label}>Order Type</p>
                    <div className={`!h-fit ${styles.form_input}`}>
                      <div
                        className={styles.order_type_field}
                        onClick={() =>
                          setOpenOrderTypeDropdown(!openOrderTypeDropdown)
                        }>
                        <Field
                          className={styles.order_type_field}
                          name="orderType"
                          placeholder="Select your order type"
                          value={formik.values.orderType}
                          readOnly
                        />
                        <div>
                          {openOrderTypeDropdown ? (
                            <PopUpArrow
                              color={"#71717A"}
                              className="w-5 h-5 cursor-pointer"
                            />
                          ) : (
                            <DownPopUpArrow
                              color={"#71717A"}
                              className="w-5 h-5 cursor-pointer"
                            />
                          )}
                        </div>
                      </div>

                      <OrderTypeDrawer
                        closeDropdown={() => setOpenOrderTypeDropdown(false)}
                        handleClick={option => {
                          formik.setFieldValue("orderType", option);
                          setOpenOrderTypeDropdown(!openOrderTypeDropdown);
                        }}
                        selectedValue={formik.values.orderType}
                        isDropdownOpen={openOrderTypeDropdown}
                        orderTypeOptions={orderTypeOptions}
                      />

                      {/* {openOrderTypeDropdown &&
                              orderTypeOptions.map((option, index) => (
                                <div
                                  className={`${
                                    index === 1 ? "!pb-0" : "mt-3"
                                  } ${styles.ordertype_option}`}
                                  key={index}
                                  value={option}
                                  onClick={() => {
                                    formik.setFieldValue("orderType", option);
                                    setOpenOrderTypeDropdown(
                                      !openOrderTypeDropdown,
                                    );
                                  }}>
                                  {option}
                                </div>
                              ))} */}
                    </div>
                    <ErrorMessage name="orderType">
                      {msg =>
                        formik.touched.orderType && (
                          <p className={styles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>
                  <div className={styles.form_field}>
                    <p className={styles.form_label}>Order Number</p>
                    <Field
                      type="text"
                      name="orderNumber"
                      placeholder="Please provide the order number for payment."
                      className={styles.form_input}
                    />
                    <ErrorMessage name="orderNumber">
                      {msg =>
                        formik.touched.orderNumber && (
                          <p className={styles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>
                </>
              )}

              <div
                className={
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }>
                <p className={styles.form_label}>Full name</p>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  className={styles.form_input}
                />
                <ErrorMessage name="fullName">
                  {msg =>
                    formik.touched.fullName && (
                      <p className={styles.error}>{msg} </p>
                    )
                  }
                </ErrorMessage>
              </div>

              <div
                className={
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }>
                <p className={styles.form_label}>Email</p>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.form_input}
                />
                <ErrorMessage name="email">
                  {msg =>
                    formik.touched.email && (
                      <p className={styles.error}>{msg} </p>
                    )
                  }
                </ErrorMessage>
              </div>

              <div
                className={
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }>
                <p className={styles.form_label}>Contact number</p>
                <div className={`flex gap-2 items-center ${styles.form_input}`}>
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
                    name="contactNumber"
                    placeholder="Enter 10 digit number "
                    className={styles.contact_input}
                  />
                </div>
                <ErrorMessage name="contactNumber">
                  {msg =>
                    formik.touched.contactNumber && (
                      <p className={styles.error}>{msg} </p>
                    )
                  }
                </ErrorMessage>
              </div>

              {isOfflineCustomer === 1 && (
                <div
                  className={
                    saveAddDrawer ? styles.form_field_drawer : styles.form_field
                  }>
                  <p className={styles.form_label}>
                    Alternative number (Optional)
                  </p>
                  <div
                    className={`flex gap-2 items-center ${styles.form_input}`}>
                    <img
                      src={`${cityUrl + "india-icon.svg"}`}
                      className={styles.flag}
                      loading="lazy"
                      alt="India-icon"
                    />
                    <Field
                      type="number"
                      onKeyPress={keyPressForContactField}
                      // readOnly
                      onWheel={handleWheel}
                      name="alternateContactNumber"
                      placeholder="Enter 10 digit number "
                      className={styles.contact_input}
                    />
                  </div>
                </div>
              )}

              <div
                className={
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }>
                <p className={styles.form_label}>Address</p>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Enter your address here including flat/building no."
                  className={`${styles.textarea} ${styles.form_input}`}
                />
                <ErrorMessage name="address">
                  {msg =>
                    formik.touched.address && (
                      <p className={styles.error}>{msg}</p>
                    )
                  }
                </ErrorMessage>
              </div>

              <div
                className={
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }>
                <p className={styles.form_label}>Nearest Landmark</p>
                <Field
                  name="landmark"
                  placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                  className={styles.form_input}
                />
                <ErrorMessage name="landmark">
                  {msg =>
                    formik.touched.landmark && (
                      <p className={`${styles.error}`}>{msg}</p>
                    )
                  }
                </ErrorMessage>
              </div>

              <div
                className={`flex flex-col lg:flex-row gap-4 ${
                  saveAddDrawer ? styles.form_field_drawer : styles.form_field
                }`}>
                <div className="lg:w-[48.5%]">
                  <p className={styles.form_label}>Postal code</p>
                  <Field
                    type="number"
                    onKeyPress={keyPressForContactField}
                    onWheel={handleWheel}
                    name="postalCode"
                    placeholder="Enter 6 digit postal code"
                    className={styles.form_input}
                  />
                  <ErrorMessage name="postalCode">
                    {msg =>
                      formik.touched.postalCode && (
                        <p className={styles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>
                <div className="lg:w-[48.5%]">
                  <p className={styles.form_label}>City</p>
                  <Field
                    readOnly
                    type="text"
                    name="city"
                    value={cityName}
                    placeholder="Enter city"
                    className={styles.form_input}
                  />
                  <ErrorMessage name="city">
                    {msg =>
                      formik.touched.city && (
                        <p className={styles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>
              </div>

              {isOfflineCustomer === 1 && (
                <div className={styles.form_field}>
                  <p className={styles.form_label}>Customer Paid Amount</p>

                  <Field
                    type="number"
                    onWheel={handleWheel}
                    onKeyPress={keyPressForContactField}
                    name="customerPaidAmount"
                    placeholder="Enter amount customer paid"
                    className={styles.form_input}
                  />

                  <ErrorMessage name="customerPaidAmount">
                    {msg =>
                      formik.touched.customerPaidAmount && (
                        <p className={styles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>
              )}

              {isOfflineCustomer !== 1 && !saveAddDrawer ? (
                <button type="submit" className={styles.save_btn}>
                  Save & Proceed
                </button>
              ) : (
                <div className={styles.btn_wrapper}>
                  <button type="submit" className={`${styles.btn}`}>
                    Proceed
                    <ForwardArrow color={"#71717A"} />
                  </button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
