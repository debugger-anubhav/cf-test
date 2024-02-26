import React, {useState, useEffect, useRef} from "react";
import styles from "./styles.module.css";
import otherStyles from "../ShoppingCartSection/style.module.css";
import {
  ArrowForw,
  BackIcon,
  CalendarIcon,
  InformationIcon,
  PersonIcon,
  WhatsappIcon,
  ToggleOff,
  ToggleOn,
  PopUpArrow,
  DownPopUpArrow,
} from "@/assets/icon";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
  cityUrl,
  razorpayKeyOwn,
  RazorpayThemeColor,
} from "../../../../appConfig";
import AddressDrawer from "../Drawer/SaveAddressesDrawer";
import axios from "axios";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  CityToStateMapping,
  getLocalStorage,
  handleWheel,
  keyPressForContactField,
  loadScript,
} from "@/constants/constant";
import {
  getBillDetails,
  getCartItems,
  getCouponCodeUsed,
  getSavedAddress,
  setCityShield,
  setCoinsApplied,
  setShoppingCartTab,
  setShowCartItem,
} from "@/store/Slices";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";
import {MdOutlineVerified} from "react-icons/md";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";
import OrderTypeDrawer from "./OrderTypeDrawer";

const AddressSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [whatsappNotification, setWhatsappNotification] = useState(true);
  const [haveGstNumber, sethaveGstNumber] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [addressDrawer, setAddressDrawer] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState();
  const [openOrderTypeDropdown, setOpenOrderTypeDropdown] = useState(false);
  const [isDeletedProduct, setIsDeletedProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  const formikRef = useRef(null);

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const cityId = getLocalStorage("cityId");

  const data = useSelector(state => state.cartPageData);
  const billBreakup = data.billBreakout;
  const cityName = useSelector(state => state.homePagedata.cityName);
  const isOfflineCustomer = useSelector(
    state => state.cartPageData.isOfflineCustomer,
  );

  const addressArray = data.savedAddresses;

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

  const toggleDrawerBreakup = () => {
    setBreakupDrawer(!breakupDrawer);
  };

  const toggleAddressDrawer = () => {
    setAddressDrawer(!addressDrawer);
  };

  const getAllSavedAddresses = () => {
    baseInstance
      .get(endPoints.addToCart.fetchSavedAddress(userIdToUse))
      .then(res => {
        dispatch(getSavedAddress(res?.data?.data));
        const newPrimaryAddress = res?.data?.data.find(item =>
          cityName.includes(item.city),
        );
        setPrimaryAddress(newPrimaryAddress);
      })
      .catch(err => console.log(err));
  };

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

      baseInstance
        .post(endPoints.addToCart.addAddress, headers)
        .then(response => {
          resolve("hii");
        })
        .catch(error => {
          console.error("API error:", error);
        });
    });
  };

  const makeDefaultAddress = id => {
    const newPrimaryAddress = addressArray.find(item => item.id === id);
    setPrimaryAddress(newPrimaryAddress);
  };

  const goToPostCheckout = (e, id) => {
    e === 0
      ? window?.location?.replace("/order/failure")
      : router.push(`/order/confirmation/cart?oid=${id}`);
  };

  const fetchBill = async () => {
    try {
      const headers = {
        userId: parseInt(userIdToUse),
        cityshield: data.isCityShield,
        cityId,
        coins: billBreakup?.coinsUsed,
        couponsCode: data.couponCodeUsed,
        paymentMode: getLocalStorage("isMonthly") ? 0 : 1,
      };

      const res = await axios.post(
        baseURL + endPoints.addToCart.fetchBill,
        headers,
      );
      dispatch(getBillDetails(res?.data?.data));
      dispatch(getCouponCodeUsed(res?.data?.data?.couponsCode));
      dispatch(setCoinsApplied(res?.data?.data?.coinApplied));
      dispatch(setCityShield(res?.data?.data?.cityshield));
    } catch (err) {
      console.log(err);
    }
  };

  async function checkCartQunatity(val) {
    try {
      const res = await axios.post(
        baseURL + endPoints.addToCart.checkProductQuantity,
        {
          userId: userId && userId,
          cityId,
        },
      );
      setIsDeletedProduct(res?.data?.data?.isDeleted);
      if (val === "offlineCustomer") {
        if (res?.data?.data?.isDeleted) dispatch(setShoppingCartTab(0));
        else formikRef?.current?.submitForm();
      } else {
        fetchCartItems(userId, val);
        fetchBill();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkPostalCode = async (type, values) => {
    const postalCode =
      type === "offlineCustomer"
        ? formikRef?.current?.values?.postalCode
        : type === "onlineCustomer"
        ? values?.postalCode
        : primaryAddress?.postal_code;
    try {
      const res = await axios.post(
        baseURL + endPoints.yourAddressPage.postalCode,
        {
          postalCode: parseInt(postalCode),
        },
      );
      if (res?.data?.status === false) {
        showToastNotification("Your postal code is not serviceable.", 3);
      } else {
        if (type === "onlineCustomer") saveUserAddress(values);
        else checkCartQunatity(type);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handlePayment() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await baseInstance.post(endPoints.addToCart.makePayment, {
      userId,
      cityshield: data.isCityShield,
      cityId,
      coins: billBreakup?.coinsUsed,
      couponsCode: data.couponCodeUsed,
      paymentMode: getLocalStorage("isMonthly") === true ? 0 : 1,
      addrId: primaryAddress?.id,
      isOptWhatsapp: whatsappNotification,
      gstNumber,
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const {
      id: orderId,
      currency,
      amount_due: amount,
    } = result.data.data.orderData;

    const {dealCodeNumber} = result.data.data.orderData.notes;
    const {userDetails} = result.data.data;

    const options = {
      key: razorpayKeyOwn, // Enter the Key ID generated from the Dashboard
      amount,
      currency,
      name: "Cityfurnish",
      description: "Test Transaction",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      order_id: orderId,
      handler: async function (response) {
        setLoading(true);
        if (response.error) {
          alert("Payment failed. Please try again.");
          goToPostCheckout(0);
        } else {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            dealCodeNumber,
            razorpayOrderId: response.razorpay_order_id,
            razCustomerId: userDetails.customerId,
            razorpaySignature: response.razorpay_signature,
            cfCoins: billBreakup?.coinsUsed,
          };

          const result = await axios.post(
            baseURL + endPoints.addToCart.successPayment,
            data,
          );
          setLoading(false);
          console.log(result, "result");
          goToPostCheckout(1, dealCodeNumber);
        }
      },
      prefill: {
        name: userDetails?.fullName,
        email: userDetails?.email,
        contact: userDetails?.phoneNo,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    function closeRazorPay() {
      return new Promise((resolve, reject) => {
        paymentObject.close();
        resolve(1);
      });
    }

    paymentObject.on("payment.failed", e => {
      console.log(e, "erroerss");
      closeRazorPay().then(() => {
        goToPostCheckout(0);
      });
    });
  }

  const handleOfflineOrder = values => {
    setLoading(true);
    const body = {
      user_name: values.fullName,
      email: values.email,
      mobile_no: values.contactNumber,
      alert_mobile_no: values.alternateContactNumber || "",
      address1: values.address,
      address2: values.landmark,
      state: CityToStateMapping[cityName] || "",
      postal_code: values.postalCode,
      city: cityName,
      // rental_amount: billBreakup?.finalTotalPrice?.toFixed(2),
      rental_amount: values.customerPaidAmount,
      cf_care_option: data.isCityShield ? 1 : 0,
      order_type: values.orderType,
      order_number: values.orderNumber || "",
      payment_type: getLocalStorage("isMonthly") === true ? 0 : 1,
      userId: parseInt(userIdToUse),
    };
    baseInstance
      .post(endPoints.addToCart.offlinePayment, body)
      .then(res => {
        setLoading(false);
        if (res?.data?.data?.success === "1") {
          showToastNotification("Advanced payment is done successfully.", 1);
          setTimeout(() => {
            router.push("/purchases");
          }, 4000);
        } else showToastNotification(res?.data?.data?.msg, 3);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchCartItems = (userIdToUse, val) => {
    axios
      .get(baseURL + endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
      .then(res => {
        dispatch(getCartItems(res?.data?.data));
        dispatch(setShowCartItem(true));
        if (res?.data?.data?.length === 0) {
          dispatch(setShoppingCartTab(0));
        } else {
          val === 0 && handlePayment();
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(setShowCartItem(true));
      });
  };
  useEffect(() => {
    checkCartQunatity(1);
  }, []);

  useEffect(() => {
    if (isDeletedProduct) {
      showToastNotification(
        "Cart quantities updated based on items in stock. Some items may now have zero quantity and therefore, out of stock.",
        3,
      );
    }
  }, [isDeletedProduct]);

  useEffect(() => {
    getAllSavedAddresses();
  }, []);

  return (
    <>
      <TotalBreakup toggleDrawer={toggleDrawerBreakup} open={breakupDrawer} />
      <AddressDrawer
        toggleDrawer={toggleAddressDrawer}
        open={addressDrawer}
        makeDefaultAddress={id => makeDefaultAddress(id)}
        primaryAddress={primaryAddress}
      />
      <div className={styles.main_container}>
        {loading && <LoaderComponent loading={loading} />}
        <div className={styles.left_div}>
          <div
            className={styles.head_div}
            onClick={() => {
              dispatch(setShoppingCartTab(0));
            }}>
            <BackIcon size={19} />
            <p className={styles.head}>Go back to checkout</p>
          </div>

          {addressArray.length > 0 &&
            primaryAddress !== undefined &&
            isOfflineCustomer !== 1 && (
              <div
                className={styles.saved_address_div}
                onClick={toggleAddressDrawer}>
                {!cityName.includes(primaryAddress?.city) && (
                  <div className={styles.not_belong_wrapper}>
                    <p className={styles.not_belong_text}>
                      Address does not belong to selected city
                    </p>
                  </div>
                )}
                <div className={styles.saved_add_upper_div}>
                  <h1 className={styles.saved_add_head}>Delivering to</h1>
                  <button className={styles.change_btn}>Change</button>
                </div>
                <div className={styles.name_div}>
                  <PersonIcon color={"#2D9469"} className={"w-4 xl:w-5"} />
                  <p className={styles.saved_name}>
                    {primaryAddress?.full_name}, {primaryAddress?.phone}
                  </p>
                </div>

                <p className={styles.saved_address}>
                  {primaryAddress?.address1}
                </p>
                <p className={styles.saved_address}>
                  {primaryAddress?.city}, {primaryAddress?.state}
                </p>

                {!cityName.includes(primaryAddress?.city) && (
                  <div className={styles.add_new_info}>
                    <InformationIcon size={20} color={"#71717A"} />
                    <p className={styles.add_new_info_text}>Add new address </p>
                  </div>
                )}
              </div>
            )}

          <div className={styles.new_address_wrapper}>
            <h2 className={styles.new_add_head}>Add new address</h2>

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
                  await checkPostalCode("onlineCustomer", values);
                  // saveUserAddress(values);
                  getAllSavedAddresses();
                  resetForm();
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
                              closeDropdown={() =>
                                setOpenOrderTypeDropdown(false)
                              }
                              handleClick={option => {
                                formik.setFieldValue("orderType", option);
                                setOpenOrderTypeDropdown(
                                  !openOrderTypeDropdown,
                                );
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

                    <div className={styles.form_field}>
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

                    <div className={styles.form_field}>
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

                    <div className={styles.form_field}>
                      <p className={styles.form_label}>Contact number</p>
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
                      <div className={styles.form_field}>
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

                    <div className={styles.form_field}>
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

                    <div className={styles.form_field}>
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
                      className={`flex flex-col lg:flex-row gap-4 ${styles.form_field}`}>
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
                        <p className={styles.form_label}>
                          Customer Paid Amount
                        </p>

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

                    {isOfflineCustomer !== 1 && (
                      <button type="submit" className={styles.save_btn}>
                        Save & Proceed
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={styles.right_div}>
          {isOfflineCustomer !== 1 && (
            <div className="gap-6 flex flex-col">
              <div className={styles.box_wrapper}>
                <div className={styles.box_wrapper_left_div}>
                  <WhatsappIcon size={24} color={"#48A06C"} />
                  <p className={styles.box_desc}>
                    Opt for Whatsapp notification
                  </p>
                </div>
                <div className="cursor-pointer">
                  {whatsappNotification ? (
                    <ToggleOn
                      size={29}
                      color={"#5774AC"}
                      onClick={() => setWhatsappNotification(false)}
                    />
                  ) : (
                    <ToggleOff
                      color={"#E3E1DC"}
                      size={29}
                      onClick={() => setWhatsappNotification(true)}
                    />
                  )}
                </div>
              </div>

              <div className={styles.box_wrapper}>
                <div className="w-full">
                  <div className="flex gap-4 justify-between items-center">
                    <div className={styles.box_wrapper_left_div}>
                      <span className={styles.hash}>#</span>
                      <p className={styles.box_desc}>I have a GST number</p>
                    </div>
                    <div className="cursor-pointer">
                      {haveGstNumber ? (
                        <ToggleOn
                          size={29}
                          color={"#5774AC"}
                          onClick={() => sethaveGstNumber(false)}
                        />
                      ) : (
                        <ToggleOff
                          color={"#E3E1DC"}
                          size={29}
                          onClick={() => sethaveGstNumber(true)}
                        />
                      )}
                    </div>
                  </div>
                  {haveGstNumber && (
                    <>
                      <div className="mt-4">
                        <input
                          onWheel={handleWheel}
                          className={styles.form_input}
                          type="number"
                          placeholder="GST number"
                          onChange={e => setGstNumber(e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <input
                          className={styles.form_input}
                          placeholder="Company name"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.tenure_info}>
                <CalendarIcon className={styles.calendar} />
                <p className={styles.desc}>
                  Your rental payment and tenure will begin from the date of
                  delivery
                </p>
              </div>

              <div className={styles.kyc_info}>
                <MdOutlineVerified className={styles.verified_icon} />
                <p className={styles.desc}>
                  Once the order has been placed, you might be required to share
                  a few documents for KYC
                </p>
              </div>
            </div>
          )}

          <div>
            <div
              className={`!mt-0 ${otherStyles.cart_breakup}`}
              onClick={() => setBreakupDrawer(true)}>
              <div>
                <p className={otherStyles.total_text}>Total:</p>
                <div className={otherStyles.breakup_wrapper}>
                  <p className={otherStyles.view_cart_text}>
                    View cart breakup
                  </p>
                  <ArrowForw
                    color={"#5774AC"}
                    className={otherStyles.for_arrow}
                  />
                </div>
              </div>
              <p className={otherStyles.total_amount}>
                <span className={otherStyles.rupeeIcon}>₹</span>
                {billBreakup?.finalTotalPrice?.toFixed(2)}
                {billBreakup?.isMonthly && "/mo"}
              </p>
            </div>
            <div className="fixed lg:static bottom-0 left-0 w-full p-4 lg:p-0 shadow-sticky_btn lg:shadow-none bg-white ">
              <button
                disabled={
                  (isOfflineCustomer !== 1 && !primaryAddress) ||
                  (haveGstNumber && gstNumber === "")
                }
                onClick={() => {
                  if (isOfflineCustomer === 1) {
                    checkPostalCode("offlineCustomer");
                    // checkCartQunatity("offlineCustomer");
                  } else checkPostalCode(0);
                }}
                className={`${
                  haveGstNumber && gstNumber === "" && "!cursor-not-allowed"
                } ${!primaryAddress && "!cursor-not-allowed"} ${
                  otherStyles.proceed_button
                }`}>
                Proceed to Payment
                <ArrowForw size={19} color={"#222"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressSection;
