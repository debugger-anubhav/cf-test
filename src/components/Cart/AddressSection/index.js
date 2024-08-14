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
} from "@/assets/icon";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import {useDispatch, useSelector} from "react-redux";
import {razorpayKeyOwn, RazorpayThemeColor} from "../../../../appConfig";
import AddressDrawer from "../Drawer/SaveAddressesDrawer";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  CityToStateMapping,
  getLocalStorage,
  handleWheel,
  loadScript,
} from "@/constants/constant";
import {
  getBillDetails,
  getCartItems,
  getCouponCodeUsed,
  getSavedAddress,
  setCityShield,
  setCoinsApplied,
  setMonthlyUpfrontLoader,
  setShoppingCartTab,
  setShowCartItem,
  setISFirstUser,
} from "@/store/Slices";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";
import {MdOutlineVerified} from "react-icons/md";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";
import NewAddressForm from "./NewAddressForm";

const AddressSection = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.cartPageData);
  const router = useRouter();
  const [whatsappNotification, setWhatsappNotification] = useState(true);
  const [haveGstNumber, sethaveGstNumber] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [addressDrawer, setAddressDrawer] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState();
  const [isDeletedProduct, setIsDeletedProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billBreakup, setBillBreakup] = useState(data.billBreakout);

  const formikRef = useRef(null);
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const cityId = getLocalStorage("cityId");

  const cityName = useSelector(state => state.homePagedata.cityName);
  const isOfflineCustomer = useSelector(
    state => state.cartPageData.isOfflineCustomer,
  );
  const [addressArray, setAddressArray] = useState(data?.savedAddresses);

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
      .catch(err => console.log(err?.message || "some error"));
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
          getAllSavedAddresses();
        })
        .catch(error => {
          console.error("API error:", error);
        });
    });
  };

  const makeDefaultAddress = id => {
    if (id) {
      const newPrimaryAddress = addressArray?.find(item => item.id === id);
      setPrimaryAddress(newPrimaryAddress);
    }
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

      const res = await baseInstance.post(
        endPoints.addToCart.fetchBill,
        headers,
      );
      dispatch(getBillDetails(res?.data?.data));
      dispatch(setMonthlyUpfrontLoader(false));
      dispatch(getCouponCodeUsed(res?.data?.data?.couponsCode));
      dispatch(setCoinsApplied(res?.data?.data?.coinApplied));
      dispatch(setCityShield(res?.data?.data?.cityshield));
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  async function checkCartQunatity(val) {
    try {
      const res = await baseInstance.post(
        endPoints.addToCart.checkProductQuantity,
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
      console.log(err?.message || "some error");
    }
  }

  const checkPostalCode = async (type, values) => {
    const eventItems = [];
    data?.cartItems?.forEach((product, index) => {
      const item = {
        id: product.id,
        name: product.fc_product?.product_name,
        brand: "Cityfurnish",
        list_position: index + 1,
        quantity: product.quantity,
        price: product.price,
      };
      eventItems.push(item);
    });
    if (process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION") {
      window?.gtag("event", "begin_payment", {
        items: eventItems,
      });
    }

    const postalCode =
      type === "offlineCustomer"
        ? formikRef?.current?.values?.postalCode
        : type === "onlineCustomer"
          ? values?.postalCode
          : primaryAddress?.postal_code;
    try {
      const res = await baseInstance.post(
        endPoints.yourAddressPage.postalCode,
        {
          postalCode: parseInt(postalCode),
        },
      );
      if (res?.data?.status === false) {
        showToastNotification("Your postal code is not serviceable.", 3);
      } else {
        if (type === "onlineCustomer") await saveUserAddress(values);
        else checkCartQunatity(type);
      }
    } catch (err) {
      console.log(err?.message || "some error");
      setLoading(false);
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
    setLoading(false);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    dispatch(setISFirstUser(result?.data?.data?.is_first_user));
    if (result?.data?.data?.status === false) {
      showToastNotification(result?.data?.data?.message, 3);
      setLoading(false);
      return null;
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
      image:
        "https://d3juy0zp6vqec8.cloudfront.net/images/icons/final-logo.png",
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

          await baseInstance.post(endPoints.addToCart.successPayment, data);
          setLoading(false);
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
        console.log(err?.message || "some error");
      });
  };

  const fetchCartItems = (userIdToUse, val) => {
    baseInstance
      .get(endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
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
        console.log(err?.message || "some error");
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

  useEffect(() => {
    setBillBreakup(data.billBreakout);
  }, [data.billBreakout]);

  useEffect(() => {
    setAddressArray(data.savedAddresses);
  }, [data.savedAddresses]);

  return (
    <>
      <TotalBreakup toggleDrawer={toggleDrawerBreakup} open={breakupDrawer} />
      <AddressDrawer
        toggleDrawer={toggleAddressDrawer}
        open={addressDrawer}
        makeDefaultAddress={id => makeDefaultAddress(id)}
        primaryAddress={primaryAddress}
        cartPage={true}
        checkPostalCode={checkPostalCode}
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
            {addressArray?.length > 0 &&
            primaryAddress !== undefined &&
            isOfflineCustomer !== 1 ? (
              <p className={styles.head}>Confirm address</p>
            ) : (
              <h2 className={styles.new_add_head}>Add new address</h2>
            )}
          </div>

          {addressArray?.length > 0 &&
          primaryAddress !== undefined &&
          isOfflineCustomer !== 1 ? (
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

              <p className={styles.saved_address}>{primaryAddress?.address1}</p>
              <p className={styles.saved_address}>
                {primaryAddress?.city}, {primaryAddress?.state} -{" "}
                {primaryAddress?.postal_code}
              </p>

              {!cityName.includes(primaryAddress?.city) && (
                <div className={styles.add_new_info}>
                  <InformationIcon size={20} color={"#71717A"} />
                  <p className={styles.add_new_info_text}>Add new address </p>
                </div>
              )}
            </div>
          ) : (
            <NewAddressForm
              handleOfflineOrder={values => handleOfflineOrder(values)}
              saveAddDrawer={false}
              checkPostalCode={checkPostalCode}
            />
          )}
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
                          type="text"
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
              className={`!mt-0 ${otherStyles.cart_breakup} !flex-row`}
              onClick={() => setBreakupDrawer(true)}>
              <div className="flex flex-col w-fit">
                <p className={otherStyles.total_text}>
                  {getLocalStorage("isMonthly") ? (
                    <p>
                      {" "}
                      Now payable
                      <span className="!text-14 !font-normal ml-1">
                        (Excl GST) :{" "}
                      </span>{" "}
                    </p>
                  ) : (
                    <p>
                      {" "}
                      Total rent
                      <span className="!text-14 !font-normal ml-1">
                        (Excl GST) :{" "}
                      </span>{" "}
                    </p>
                  )}
                </p>

                <div className={`${otherStyles.breakup_wrapper} !mt-3`}>
                  <p className={otherStyles.view_cart_text}>
                    View cart breakup
                  </p>
                  <ArrowForw
                    color={"#5774AC"}
                    className={otherStyles.for_arrow}
                  />
                </div>
              </div>
              <div className="flex w-fit">
                <p className={otherStyles.total_amount}>
                  <span className={otherStyles.rupeeIcon}>₹</span>
                  {billBreakup?.finalTotalPrice?.toFixed(2)}

                  {/* {billBreakup?.isMonthly && "/mo"} */}
                </p>
              </div>
            </div>

            {addressArray?.length > 0 &&
            primaryAddress !== undefined &&
            isOfflineCustomer !== 1 ? (
              <div className="fixed lg:static bottom-0 left-0 w-full p-4 lg:p-0 shadow-sticky_btn lg:shadow-none bg-white ">
                <button
                  // disabled={
                  //   (isOfflineCustomer !== 1 && !primaryAddress) ||
                  //   (isOfflineCustomer !== 1 && haveGstNumber && gstNumber === "")
                  // }
                  onClick={() => {
                    if (
                      (isOfflineCustomer !== 1 && !primaryAddress) ||
                      (isOfflineCustomer !== 1 &&
                        haveGstNumber &&
                        gstNumber === "")
                    ) {
                      showToastNotification(
                        "Please save your address before proceeding.",
                        3,
                      );
                    } else if (isOfflineCustomer === 1) {
                      setLoading(true);
                      checkPostalCode("offlineCustomer");
                      // checkCartQunatity("offlineCustomer");
                    } else {
                      setLoading(true);
                      checkPostalCode(0);
                    }
                  }}
                  className={`${
                    isOfflineCustomer !== 1 &&
                    haveGstNumber &&
                    gstNumber === "" &&
                    "!cursor-not-allowed"
                  } ${!primaryAddress && "!cursor-not-allowed"} ${
                    otherStyles.proceed_button
                  }`}>
                  Proceed to Payment
                  <ArrowForw size={19} color={"#222"} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressSection;
