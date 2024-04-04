import React, {useRef, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow, ForwardArrowWithLine} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {cityUrl} from "../../../appConfig";
import {AddressDrawerContent} from "../Cart/Drawer/SaveAddressesDrawer";
import {getSavedAddress} from "@/store/Slices";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {
  getLocalStorage,
  CreateRequestPayload,
  keyPressForContactField,
  handleWheel,
} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import CityDrawer from "../YourAddresses/Drawer/CityDrawer";
import {useAppSelector} from "@/store";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";

function TransferOwnership({prevScreen, data, isHelpDrawer}) {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const cartPageData = useSelector(state => state.cartPageData);
  const addressArray = cartPageData.savedAddresses;
  const cityName = useSelector(state => state.homePagedata.cityName);
  const {cityList: storeCityList} = useAppSelector(state => state.homePagedata);
  const {CreateSRApiCall} = CommonCreateRequestApi();
  const formikRef = useRef(null);

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
  });

  const [addressDrawer, setAddressDrawer] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState();
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [id, setId] = useState(primaryAddress?.id);
  const [cityDrawerOpen, setCityDrawerOpen] = useState(false);
  const [description, setDescription] = useState("");

  const makeDefaultAddress = id => {
    const newPrimaryAddress = addressArray.find(item => item.id === id);
    setPrimaryAddress(newPrimaryAddress);
    toggleDrawer();
  };

  const getAllSavedAddresses = () => {
    baseInstance
      .get(endPoints.addToCart.fetchSavedAddress(userIdToUse))
      .then(res => {
        dispatch(getSavedAddress(res?.data?.data));
        const newPrimaryAddress = res?.data?.data.find(
          item => item.city === cityName,
        );
        setPrimaryAddress(newPrimaryAddress);
        setAddressDrawer(!addressDrawer);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const toggleDrawer = () => {
    setAddressDrawer(!addressDrawer);
  };

  const handleSubmit = values => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      description,
      full_name: values.fullName,
      mobile_number: values.contactNumber,
      email: values.email,
      postal_code: values.postalCode,
      city: values.city,
      address1: values.address,
      address2: values.landmark,
      state: primaryAddress ? primaryAddress.state : "",
    };
    CreateSRApiCall(payload);
  };

  return (
    <>
      <div
        className={`${styles.content_wrapper} flex-row ${
          isHelpDrawer && "!p-0"
        }`}>
        {addressDrawer ? (
          <div className="">
            <div className={styles.main_heading}>
              <BackIcon
                className={"cursor-pointer"}
                onClick={() => {
                  setAddressDrawer(!addressDrawer);
                }}
              />
              Saved addresses
            </div>
            <AddressDrawerContent
              makeDefaultAddress={id => makeDefaultAddress(id)}
              primaryAddress={primaryAddress}
              setId={setId}
            />
            <div className={styles.bottom_row_formik}>
              <button
                className={`!my-0 !w-full ${styles.plain_btn}`}
                onClick={async () => {
                  try {
                    makeDefaultAddress(id);

                    setShowAddressFields(true);
                  } catch (error) {
                    console.error(error);
                  }
                }}>
                Proceed <ForwardArrow />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.main_heading}>
              <BackIcon
                className={"cursor-pointer"}
                onClick={() => prevScreen(true)}
              />
              Transfer ownership
            </div>
            <div className={styles.transferownership_wrapper}>
              <p className={styles.desc}>New owner contact details</p>
              <Formik
                innerRef={f => (formikRef.current = f)}
                initialValues={{
                  fullName: primaryAddress && primaryAddress.full_name,
                  contactNumber: primaryAddress && primaryAddress.phone,
                  email: "",
                  message: "",
                  address: primaryAddress
                    ? primaryAddress.address1
                    : addressArray[0]?.address1,
                  landmark: primaryAddress
                    ? primaryAddress.address2
                    : addressArray[0]?.address2,
                  postalCode: primaryAddress
                    ? primaryAddress.postal_code
                    : addressArray[0]?.postal_code,
                  city: primaryAddress
                    ? primaryAddress.city
                    : addressArray[0]?.city,
                }}
                validationSchema={validationSchema}
                onSubmit={async values => {
                  await handleSubmit(values);
                }}>
                {formik => (
                  <Form className={styles.form_wrapper}>
                    <div>
                      <div className={"mt-4"}>
                        <p className={formStyles.form_label}>Full name</p>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Enter your name"
                          className={styles.form_input_textarea}
                        />
                        <ErrorMessage name="fullName">
                          {msg =>
                            formik.touched.fullName && (
                              <p className={formStyles.error}>{msg} </p>
                            )
                          }
                        </ErrorMessage>
                      </div>

                      <div className={"mt-4"}>
                        <p className={formStyles.form_label}>Contact number</p>
                        <div
                          className={`${styles.row} ${formStyles.form_input} flex`}>
                          <div className="flex gap-2 items-center">
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
                        <p className={formStyles.form_label}>Email</p>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          className={formStyles.form_input}
                        />
                        <ErrorMessage name="email">
                          {msg =>
                            formik.touched.email && (
                              <p className={formStyles.error}>{msg} </p>
                            )
                          }
                        </ErrorMessage>
                      </div>

                      <div className={"mt-4"}>
                        <p className={formStyles.form_label}>
                          Your comment (optional)
                        </p>
                        <textarea
                          placeholder="Please share any specific instructions or provide feedback."
                          className={styles.form_input_textarea}
                          onChange={e => setDescription(e.target.value)}
                          rows={2}
                        />
                      </div>
                      {showAddressFields && (
                        <div>
                          <div className={"mt-4"}>
                            <p className={formStyles.form_label}>Address</p>
                            <Field
                              as="textarea"
                              name="address"
                              placeholder="Enter your address here including flat/building no."
                              // className={formStyles.form_input}
                              className={styles.form_input_textarea}
                              row={2}
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
                              Nearest Landmark
                            </p>
                            <Field
                              as="textarea"
                              name="landmark"
                              placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                              // className={formStyles.form_input}
                              className={styles.form_input_textarea}
                              row={2}
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
                            className="mt-4"
                            onClick={() => setCityDrawerOpen(!cityDrawerOpen)}>
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

                          {cityDrawerOpen && (
                            <CityDrawer
                              toggleDrawer={() =>
                                setCityDrawerOpen(!cityDrawerOpen)
                              }
                              Cities={storeCityList}
                              open={cityDrawerOpen}
                              cityName={formik.values.city}
                              handleCityChange={val => {
                                formik.setFieldValue("city", val);
                                setCityDrawerOpen(!cityDrawerOpen);
                              }}
                            />
                          )}

                          <div
                            className="mt-4 mb-8 text-5774AC text-16 font-medium font-Poppins cursor-pointer"
                            onClick={() => {
                              getAllSavedAddresses();
                              // setAddressDrawer(!addressDrawer);
                            }}>
                            Want to select a different address?
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {addressDrawer ? (
                        <div className={styles.bottom_row_formik}>
                          <button
                            className={styles.plain_btn}
                            onClick={async () => {
                              try {
                                makeDefaultAddress(id);

                                setShowAddressFields(true);
                              } catch (error) {
                                console.error(error);
                              }
                            }}>
                            Proceed <ForwardArrow />
                          </button>
                        </div>
                      ) : (
                        <div className={styles.bottom_row_formik}>
                          <button
                            className={`${styles.form_submit_btn}
                        ${
                          !formikRef?.current?.isValid
                            ? "!bg-[#FFDF85] !cursor-not-allowed"
                            : `!bg-F6B704`
                        }
                        `}
                            // onClick={() => {
                            //   formikRef?.current?.submitForm();
                            // }}
                          >
                            Create request <ForwardArrowWithLine />
                          </button>
                        </div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
              {!showAddressFields && (
                <div className="md:mb-6">
                  <p className={styles.main_sub_heading}>Address</p>
                  <div
                    className={` ${styles.request_info_div} border-b `}
                    onClick={() => {
                      getAllSavedAddresses();
                    }}>
                    <div className="flex gap-2 items-center">
                      <p className={styles.request_type}>
                        Select from saved address
                      </p>
                    </div>
                    <div className="flex">
                      <ForwardArrow />
                    </div>
                  </div>
                  <div
                    className={` ${styles.request_info_div}`}
                    onClick={() => setShowAddressFields(true)}>
                    <div className="flex gap-2 items-center">
                      <p className={styles.request_type}>Add new address</p>
                    </div>
                    <div className="flex">
                      <ForwardArrow />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <div>
        {addressDrawer ? (
          <div className={styles.bottom_row}>
            <button
              className={styles.plain_btn}
              onClick={async () => {
                try {
                  makeDefaultAddress(id);

                  setShowAddressFields(true);
                } catch (error) {
                  console.error(error);
                }
              }}>
              Proceed <ForwardArrow />
            </button>
          </div>
        ) : (
          <div className={styles.bottom_row}>
            <button
              className={`${styles.transfer_create_btn}
                        ${
                          !formikRef?.current?.isValid
                            ? "!bg-[#FFDF85] !cursor-not-allowed"
                            : `!bg-F6B704`
                        }
                        `}
              onClick={() => {
                formikRef?.current?.submitForm();
              }}>
              Create request <ForwardArrowWithLine />
            </button>
          </div>
        )}
      </div> */}
    </>
  );
}

export default TransferOwnership;
