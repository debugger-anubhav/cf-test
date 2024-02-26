import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, DeleteIconFilled, ForwardArrowWithLine} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {cityUrl} from "../../../appConfig";
import uploading from "@/assets/common_icons/uploading.jpg";
import Image from "next/image";
import {FaCheckCircle} from "react-icons/fa";
// import {IoIosCloseCircle} from "react-icons/io";
import Select from "react-select";
import {
  CreateRequestPayload,
  handleWheel,
  keyPressForContactField,
} from "@/constants/constant";
import {useSelector} from "react-redux";
import CityDrawer from "../YourAddresses/Drawer/CityDrawer";
import {useAppSelector} from "@/store";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";
import commonStyles from "@/components/Documentation/common.module.css";

function Relocation({prevScreen, data}) {
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const {cityList: storeCityList} = useAppSelector(state => state.homePagedata);

  const [cityDrawerOpen, setCityDrawerOpen] = useState(false);
  const {trailCreateSR} = CommonCreateRequestApi();

  const doctsData = [
    {label: "PAN Number", value: "1"},
    {label: "Driving license", value: "2"},
    {label: "Voter ID", value: "3"},
  ];

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
    address: Yup.string().required("Address is required"),
    addressProof: Yup.string().required("Address Proof is required"),
    currentAddressProof: Yup.string().required(
      "Please upload the address proof",
    ),
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
    landmark: Yup.string().required("Landmark is required"),
  });

  const handleSubmit = values => {
    const allData = new FormData();
    for (const key in CreateRequestPayload) {
      if (Object.hasOwnProperty.call(CreateRequestPayload, key)) {
        allData.append(key, CreateRequestPayload[key]);
      }
    }
    allData.append("file", values?.currentAddressProof);
    allData.append("documentType", values?.addressProof);
    allData.set("deal_id", data[0]?.dealCodeNumber);
    allData.set("type", selectedType);
    allData.set("mobile_number", values.contactNumber);
    allData.set("postal_code", values.postalCode);
    allData.set("city", values.city);
    allData.set("address1", values.address);
    allData.set("address2", values.landmark);
    allData.set("postal_code", values.postalCode);

    // const payload = {
    //   ...CreateRequestPayload,
    //   deal_id: data[0]?.dealCodeNumber,
    //   type: selectedType,
    //   mobile_number: values.contactNumber,
    //   postal_code: values.postalCode,
    //   city: values.city,
    //   address1: values.address,
    //   address2: values.landmark,
    // };

    trailCreateSR(allData);
  };

  const customStylesForSelect = {
    control: baseStyles => ({
      ...baseStyles,
      padding: "4px 8px",
      borderRadius: "12px",
      outline: "none",
      cursor: "pointer",
      ".css-1u9des2-indicatorSeparator": {
        display: "none",
      },
      boxShadow: 0,

      fontSize: "14px",
      color: "#71717A",
      border: "none",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#EFF5FF" : "#fff",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#EFF5FF",
        color: "#5774AC",
      },
      fonetSize: "14px",
      color: "#71717A",
    }),
    container: provided => ({
      ...provided,
      border: "1px solid #DDDDDF",
      borderRadius: "12px",
      "&:hover": {
        border: "1px solid #71717A",
      },
    }),
  };

  // const handleDeleteFile = (val, index) => {};

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
            addressProof: "",
            currentAddressProof: "",
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
                  <div
                    className={`${styles.row} ${formStyles.form_input} flex items-center`}>
                    <div className="flex gap-2 items-center">
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

                <div className="mt-4">
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

                <div
                  className={"mt-4"}
                  onClick={() => setCityDrawerOpen(!cityDrawerOpen)}>
                  <p className={formStyles.form_label}>City</p>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    className={formStyles.form_input}
                    value={formik.values.city}
                  />
                  <ErrorMessage name="city">
                    {msg =>
                      formik.touched.city && (
                        <p className={formStyles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>
                {cityDrawerOpen && (
                  <CityDrawer
                    toggleDrawer={() => setCityDrawerOpen(!cityDrawerOpen)}
                    Cities={storeCityList}
                    open={cityDrawerOpen}
                    cityName={formik.values.city}
                    handleCityChange={val => {
                      formik.setFieldValue("city", val);
                      setCityDrawerOpen(!cityDrawerOpen);
                    }}
                  />
                )}
                <div className="mt-4 flex flex-col">
                  <p className={formStyles.form_label}>Current address proof</p>
                  <Select
                    name="addressProof"
                    options={doctsData}
                    styles={customStylesForSelect}
                    onChange={selectedOption => {
                      formik.setFieldValue(
                        "addressProof",
                        selectedOption.label,
                      );
                    }}
                    placeholder="Select any current address proof"
                  />
                  <ErrorMessage name="addressProof">
                    {msg =>
                      formik.touched.addressProof && (
                        <p className={formStyles.error}>{msg}</p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div
                  className={`mt-4 flex mb-16 ${styles.demo} ${
                    !formik.values.currentAddressProof ? "flex-col" : "flex-row"
                  }`}>
                  <input
                    disabled={formik?.values?.currentAddressProof !== ""}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                    id="currentAddProof"
                    name="currentAddressProof"
                    placeholder="choose file"
                    className={`hidden`}
                    onChange={e =>
                      formik.setFieldValue(
                        "currentAddressProof",
                        e.target.files[0],
                      )
                    }
                  />
                  <label
                    htmlFor="currentAddProof"
                    className={`${
                      formStyles.form_input
                    } flex items-center !h-full cursor-pointer ${
                      formik.values.currentAddressProof &&
                      "!max-w-[95%] w-fit !cursor-default"
                    } `}>
                    <div className={`flex w-full flex-col `}>
                      <div className="flex items-center">
                        <Image
                          src={uploading}
                          alt="Uploading Icon"
                          className={`h-full`}
                          loading="lazy"
                        />
                        <span className="text-14 font-Poppins text-71717A pl-2">
                          {formik.values.currentAddressProof
                            ? formik.values.currentAddressProof.name
                            : "Choose file"}
                        </span>
                      </div>
                      {formik.values.currentAddressProof && (
                        <div
                          className={`${commonStyles.correctFile} bottom-[3px]`}></div>
                      )}
                    </div>
                  </label>

                  <div className={styles.check_wrapper}>
                    {formik.values.currentAddressProof && (
                      <div className={styles.check_wrapper}>
                        <FaCheckCircle
                          color="#2D9469"
                          className={styles.showCheckCircle}
                        />
                        <div
                          className={styles.showDeleteIcon}
                          onClick={() =>
                            formik.setFieldValue("currentAddressProof", "")
                          }>
                          <DeleteIconFilled
                            color="#ffffff"
                            className={styles.delete_icon_filled}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="currentAddressProof">
                    {msg =>
                      formik.touched.currentAddressProof && (
                        <p className={formStyles.error}>{msg} </p>
                      )
                    }
                  </ErrorMessage>
                </div>

                <div className={styles.bottom_row}>
                  <div className={styles.bottom_line}></div>
                  <button
                    type="submit"
                    className={`${styles.proceed_btn} bg-none ${
                      !formik.isValid
                        ? "!bg-[#FFDF85] !cursor-not-allowed"
                        : `!bg-F6B704`
                    }`}
                    onClick={() => {
                      if (!formik.isValid) {
                        console.log("errors", formik.errors);
                      }
                    }}>
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
