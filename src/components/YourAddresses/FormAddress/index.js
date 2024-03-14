import React, {useState} from "react";
import styles from "./style.module.css";
import formStyles from "../../Cart/AddressSection/styles.module.css";
import {ArrowForw, BackIcon} from "@/assets/icon";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {cityUrl} from "../../../../appConfig";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useSelector} from "react-redux";
import {
  getLocalStorage,
  handleWheel,
  keyPressForContactField,
} from "@/constants/constant";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
// import CommonDrawer from "@/components/Common/Drawer";
import {useAppSelector} from "@/store";
import CityDrawer from "../Drawer/CityDrawer";

const FormAddress = ({setTab, tab, id}) => {
  const addressArray = useSelector(state => state.cartPageData.savedAddresses);
  const selectedItem = addressArray.find(item => item.id === id);
  const {cityList: storeCityList} = useAppSelector(state => state.homePagedata);
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
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const defaultCityId = getLocalStorage("cityId");
  const cityName = useSelector(state => state.homePagedata.cityName);

  const [cityDrawerOpen, setCityDrawerOpen] = useState(false);
  const [cityId, setCityId] = useState(defaultCityId);
  const saveUserAddress = async values => {
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

    try {
      await baseInstance.post(endPoints.addToCart.addAddress, headers);
    } catch (error) {
      console.error("Error adding data:", error);
    }
    showToastNotification("Address added successfully", 1);
    setTab();
  };

  const handleUpdateAddress = async values => {
    const headers = {
      id,
      user_id: parseInt(userIdToUse),
      full_name: values.fullName,
      address1: values.address,
      address2: values.landmark,
      city: values.city,
      postal_code: values.postalCode.toString(),
      phone: values.contactNumber.toString(),
    };
    try {
      await baseInstance.patch(
        endPoints.yourAddressPage.updateAddress,
        headers,
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }

    showToastNotification("Address updated successfully", 1);
    setTab();
  };

  const toggleDrawer = () => {
    setCityDrawerOpen(!cityDrawerOpen);
  };

  const handleCityChange = async (val, setFieldValue) => {
    // setCity(val);
    setFieldValue("city", val);

    await baseInstance
      .get(endPoints.cityIdByCityName + val)
      .then(res => setCityId(res?.data?.data?.id))
      .catch(err => console.log(err?.message || "some error"));

    toggleDrawer();
  };

  const checkPostalCode = async values => {
    try {
      const res = await baseInstance.post(
        endPoints.yourAddressPage.postalCode,
        {
          postalCode: parseInt(values.postalCode),
        },
      );
      if (res?.data?.status === false) {
        showToastNotification("Your postal code is not serviceable.", 3);
      } else {
        if (tab === 1) saveUserAddress(values);
        if (tab === 2) handleUpdateAddress(values);
      }
    } catch (err) {
      console.log(err?.message || "some error");
    }
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
          onSubmit={values => {
            checkPostalCode(values);
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
                      alt="India-icon"
                    />
                    <Field
                      type="number"
                      onKeyPress={keyPressForContactField}
                      onWheel={handleWheel}
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
                        <p className={`${formStyles.error}`}>{msg}</p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div className={formStyles.form_field}>
                  <p className={formStyles.form_label}>Nearest Landmark</p>
                  <Field
                    name="landmark"
                    placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                    className={formStyles.form_input}
                  />
                  <ErrorMessage name="landmark">
                    {msg =>
                      formik.touched.landmark && (
                        <p className={`${formStyles.error}`}>{msg}</p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div
                  className={`flex flex-col lg:flex-row gap-4 ${formStyles.form_field}`}>
                  <div className="lg:w-[48.5%]">
                    <p className={formStyles.form_label}>Postal code</p>
                    <Field
                      type="number"
                      onKeyPress={keyPressForContactField}
                      onWheel={handleWheel}
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

                  <CityDrawer
                    toggleDrawer={toggleDrawer}
                    Cities={storeCityList}
                    open={cityDrawerOpen}
                    cityName={formik.values.city}
                    handleCityChange={val =>
                      handleCityChange(val, formik.setFieldValue)
                    }
                  />

                  <div
                    className="lg:w-[48.5%]"
                    onClick={() => {
                      toggleDrawer(true);
                    }}>
                    <p className={formStyles.form_label}>City</p>
                    <Field
                      readOnly
                      type="text"
                      name="city"
                      value={formik.values.city}
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
