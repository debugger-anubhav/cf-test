import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow, ForwardArrowWithLine} from "@/assets/icon";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {cityUrl} from "../../../appConfig";
import {AddressDrawerContent} from "../Cart/Drawer/SaveAddressesDrawer";
import {getSavedAddress} from "@/store/Slices";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import CityDrawer from "../YourAddresses/Drawer/CityDrawer";
import {useAppSelector} from "@/store";

function TransferOwnership({prevScreen}) {
  console.log(prevScreen, "prevScreen");
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const data = useSelector(state => state.cartPageData);
  const addressArray = data.savedAddresses;
  const cityName = useSelector(state => state.homePagedata.cityName);
  const {cityList: storeCityList} = useAppSelector(state => state.homePagedata);
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

  const [addressDrawer, setAddressDrawer] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState();
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [id, setId] = useState(primaryAddress?.id);
  const [cityDrawerOpen, setCityDrawerOpen] = useState(false);

  const makeDefaultAddress = id => {
    const newPrimaryAddress = addressArray.find(item => item.id === id);
    setPrimaryAddress(newPrimaryAddress);
    toggleDrawer();
  };

  const getAllSavedAddresses = () => {
    axios
      .get(baseURL + endPoints.addToCart.fetchSavedAddress(userIdToUse))
      .then(res => {
        dispatch(getSavedAddress(res?.data?.data));
        const newPrimaryAddress = res?.data?.data.find(
          item => item.city === cityName,
        );
        setPrimaryAddress(newPrimaryAddress);
        setAddressDrawer(!addressDrawer);
      })
      .catch(err => console.log(err));
  };

  const toggleDrawer = () => {
    setAddressDrawer(!addressDrawer);
  };

  const handleSubmit = async values => {};

  useEffect(() => {
    console.log(primaryAddress, "primaryAddress");
  }, [primaryAddress]);

  return (
    <div className={`${styles.content_wrapper} flex-row`}>
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
          <div className={styles.bottom_row}>
            <button
              className={styles.plain_btn}
              onClick={async () => {
                try {
                  makeDefaultAddress(id);
                  //   toggleDrawer();
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
                      <input
                        type="text"
                        placeholder="Please share any specific instructions or provide feedback."
                        className={styles.form_input_textarea}
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

                        <div className="mt-4">
                          <p className={formStyles.form_label}>City</p>
                          <Field
                            readOnly
                            type="text"
                            name="city"
                            value={cityName}
                            placeholder="Enter city"
                            className={formStyles.form_input}
                            onClick={() => setCityDrawerOpen(!cityDrawerOpen)}
                          />
                          <ErrorMessage name="city">
                            {msg =>
                              formik.touched.city && (
                                <p className={styles.error}>{msg} </p>
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
                      </div>
                    )}

                    <div className={styles.bottom_row}>
                      <button className={styles.proceed_btn} type="submit">
                        Create request <ForwardArrowWithLine />
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {!showAddressFields && (
              <div>
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
                    <p className={styles.request_type}>
                      Select Add new saved address
                    </p>
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
  );
}

export default TransferOwnership;
