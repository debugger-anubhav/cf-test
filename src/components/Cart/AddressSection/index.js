import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import otherStyles from "../ShoppingCartSection/style.module.css";
import {
  ArrowForw,
  BackIcon,
  CalendarIcon,
  InformationIcon,
  PersonIcon,
  VerifiedIcon,
  WhatsappIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {cityUrl, razorpayKey} from "../../../../appConfig";
import AddressDrawer from "../Drawer/SaveAddressesDrawer";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage} from "@/constants/constant";
import {getSavedAddress, setShoppingCartTab} from "@/store/Slices";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";

const AddressSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [whatsappNotification, setWhatsappNotification] = useState(true);
  const [haveGstNumber, sethaveGstNumber] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [addressDrawer, setAddressDrawer] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState();

  // const userId = getLocalStorage("user_id");
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;

  const cityId = getLocalStorage("cityId");

  const data = useSelector(state => state.cartPageData);
  const billBreakup = data.billBreakout;
  const cityName = useSelector(state => state.homePagedata.cityName);

  const addressArray = data.savedAddresses;
  // console.log(data, "data in address pafe");

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

  const toggleDrawerBreakup = () => {
    setBreakupDrawer(!breakupDrawer);
  };

  const toggleAddressDrawer = () => {
    setAddressDrawer(!addressDrawer);
  };

  const getAllSavedAddresses = () => {
    axios
      .get(baseURL + endPoints.addToCart.fetchSavedAddress(userIdToUse))
      .then(res => {
        dispatch(getSavedAddress(res?.data?.data));

        const newPrimaryAddress = res?.data?.data.find(
          item => item.city === cityName,
        );
        console.log(newPrimaryAddress, "primaryy addresss");
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

  // const makeAddressPrimary = async id => {
  //   try {
  //     const headers = {
  //       userId: parseInt(userIdToUse),
  //       addressId: id,
  //     };
  //     await axios.patch(
  //       baseURL + endPoints.addToCart.makePrimaryAddress,
  //       headers,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const makeDefaultAddress = id => {
    const newPrimaryAddress = addressArray.find(item => item.id === id);
    // console.log(newPrimaryAddress);
    setPrimaryAddress(newPrimaryAddress);
  };

  const goToPostCheckout = e => {
    console.log("in pist checkoutt");
    e === 0
      ? router.push("/order/failure")
      : router.push("/order/confirmation");
  };

  function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(baseURL + endPoints.addToCart.makePayment, {
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
    console.log(result.data, "make payment api data");
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
    const {razCustomerId} = result.data.data.userDetails.customerId;

    const options = {
      key: razorpayKey, // Enter the Key ID generated from the Dashboard
      amount,
      currency,
      name: "Cityfurnish",
      description: "Test Transaction",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      order_id: orderId,
      handler: async function (response) {
        console.log("response:", response);
        if (response.error) {
          alert("Payment failed. Please try again.");
          console.log("gduweuheuiw");
          goToPostCheckout(0);
          // Redirect to the failure page
        } else {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            dealCodeNumber,
            razorpayOrderId: response.razorpay_order_id,
            razCustomerId,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await axios.post(
            baseURL + endPoints.addToCart.successPayment,
            data,
          );
          console.log(result, "result");
          goToPostCheckout(1);
        }
      },
      prefill: {
        name: "Rupali Thakur",
        email: "rupalithegreat@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#EF534E",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", e => {
      console.log(e);
      paymentObject.close();
      goToPostCheckout(0);
    });
  }

  useEffect(() => {
    getAllSavedAddresses();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <div
          className={styles.head_div}
          onClick={() => dispatch(setShoppingCartTab(1))}>
          <BackIcon size={19} />
          <p className={styles.head}>Go back to checkout</p>
        </div>

        {addressArray.length > 0 && primaryAddress !== undefined && (
          <div
            className={styles.saved_address_div}
            onClick={toggleAddressDrawer}>
            {cityName !== primaryAddress?.city && (
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

            <p className={styles.saved_address}>{primaryAddress?.address1}</p>
            <p className={styles.saved_address}>
              {primaryAddress?.city}, {primaryAddress?.state}
            </p>

            {cityName !== primaryAddress?.city && (
              <div className={styles.add_new_info}>
                <InformationIcon size={20} color={"#71717A"} />
                <p className={styles.add_new_info_text}>Add new address </p>
              </div>
            )}
          </div>
        )}

        {addressDrawer && (
          <AddressDrawer
            toggleDrawer={toggleAddressDrawer}
            open={addressDrawer}
            makeDefaultAddress={id => makeDefaultAddress(id)}
            primaryAddress={primaryAddress}
          />
        )}

        <div className={styles.new_address_wrapper}>
          <h2 className={styles.new_add_head}>Add new address</h2>

          <Formik
            initialValues={{
              fullName: "",
              contactNumber: "",
              address: "",
              landmark: "",
              postalCode: "",
              city: cityName,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
              await saveUserAddress(values);
              getAllSavedAddresses();
              resetForm();
              window.scrollTo({top: 0, left: 0, behavior: "smooth"});
            }}>
            {formik => (
              <Form className={styles.form_wrapper}>
                <div className={styles.form_wrapper}>
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
                    <p className={styles.form_label}>Contact number</p>
                    <div
                      className={`flex gap-2 items-center ${styles.form_input}`}>
                      <img
                        src={`${cityUrl + "india-icon.svg"}`}
                        className={styles.flag}
                        loading="lazy"
                      />
                      <Field
                        type="number"
                        // readOnly
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
                    <p className={styles.form_label}>
                      Nearest Landmark (optional)
                    </p>
                    <Field
                      name="landmark"
                      placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                      className={styles.form_input}
                    />
                  </div>

                  <div
                    className={`flex flex-col lg:flex-row gap-4 ${styles.form_field}`}>
                    <div className="lg:w-[48.5%]">
                      <p className={styles.form_label}>Postal code</p>
                      <Field
                        type="number"
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
                  <button type="submit" className={styles.save_btn}>
                    Save & Proceed
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles.right_div}>
        <div className="gap-6 flex flex-col">
          <div className={styles.box_wrapper}>
            <div className={styles.box_wrapper_left_div}>
              <WhatsappIcon size={24} color={"#48A06C"} />
              <p className={styles.box_desc}>Opt for Whatsapp notification</p>
            </div>
            <div className="cursor-pointer">
              {whatsappNotification ? (
                <FaToggleOn
                  size={29}
                  color={"#5774AC"}
                  onClick={() => setWhatsappNotification(false)}
                />
              ) : (
                <FaToggleOff
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
                    <FaToggleOn
                      size={29}
                      color={"#5774AC"}
                      onClick={() => sethaveGstNumber(false)}
                    />
                  ) : (
                    <FaToggleOff
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
                      className={styles.form_input}
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
            <VerifiedIcon className={styles.verified_icon} />
            <p className={styles.desc}>
              Once the order has been placed, you might be required to share a
              few documents for KYC
            </p>
          </div>
        </div>

        {/* <div>
          <div
            className={`!mt-0 ${otherStyles.cart_breakup}`}
            onClick={() => setBreakupDrawer(true)}>
            <div>
              <p className={otherStyles.total_text}>Total:</p>
              <div className={otherStyles.breakup_wrapper}>
                <p className={otherStyles.view_cart_text}>View cart breakup</p>
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
          {breakupDrawer && (
            <TotalBreakup
              toggleDrawer={toggleDrawerBreakup}
              open={breakupDrawer}
            />
          )}

          <button
            disabled={!primaryAddress}
            onClick={() => handlePayment()}
            className={`!mt-6 ${!primaryAddress && "!cursor-not-allowed"} ${
              otherStyles.proceed_button
            }`}>
            Proceed to Payment
            <ArrowForw size={19} color={"#222"} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AddressSection;
