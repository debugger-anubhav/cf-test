import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {
  CheckedBox,
  Close,
  RightIcon,
  UncheckedBox,
  VerifyIcon,
} from "@/assets/icon";
import CityShieldDrawerForCart from "@/components/Cart/Drawer/CityShieldDrawer";
import {RazorpayThemeColor, razorpayKey} from "../../../../appConfig";
import {endPoints} from "@/network/endPoints";
import {loadScript} from "@/constants/constant";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {useRouter} from "next/navigation";
import {
  setAmountPaid,
  setPGTransactionID,
  setTransactionReferenceNumber,
} from "@/store/Slices";
import {useDispatch} from "react-redux";
import {baseInstance} from "@/network/axios";

export const MonthlyCard = ({
  monthlyCardIsChecked,
  setmonthlyCardIsChecked,
  orderId,
  setLoading,
  dealCodeNumber,
}) => {
  const DiscountPoints = [
    "No Discount",
    "No Cost EMI Not Available",
    "Inclusive GST",
    "No Security Deposit",
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const PaymentModeOpt = ["Credit/Debit card", "Netbanking", "UPI"];
  const [selectedOption, setSelectedOption] = useState(0);
  const [cityShieldDrawerOpenForMonthly, setcityShieldDrawerOpenForMonthly] =
    useState(false);
  const [modeOfPayment, setModeOfPayment] = useState("card");
  const [apiData, setApiData] = useState(null);
  const getApiData = () => {
    baseInstance
      .get(endPoints.tenureExtension, {
        params: {
          cfCareValue: monthlyCardIsChecked ? 1 : 0,
          dealCodeNumber,
          month: selectedOption,
        },
      })
      .then(res => {
        setApiData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getApiData();
  }, [selectedOption]);
  const handleOptionChange = index => {
    setSelectedOption(index);
  };
  const openDrawerForMonthly = () => {
    if (monthlyCardIsChecked) setcityShieldDrawerOpenForMonthly(true);
    setmonthlyCardIsChecked(true);
  };
  const toggleDrawerCityShield = () => {
    if (monthlyCardIsChecked) setcityShieldDrawerOpenForMonthly(false);
    else setcityShieldDrawerOpenForMonthly(true);
  };

  const successHandlerCardTwo = (
    paymentID,
    modeOfPayment,
    razorpaySignature,
    RazorpayOrderIDBeforePayment,
  ) => {
    setLoading(true);
    const body = {
      transactionID: paymentID,
      mode: modeOfPayment,
      signature: razorpaySignature,
      server_orderid: RazorpayOrderIDBeforePayment,
    };
    baseInstance
      .post(endPoints.kycPage.updatePaymentStatus, body)
      .then(response => {
        if (response.data.success === true) {
          // showToastNotification(response.data.message, 1);
          dispatch(setTransactionReferenceNumber(RazorpayOrderIDBeforePayment));
          dispatch(setPGTransactionID(paymentID));
          dispatch(setAmountPaid(1));
          setLoading(false);
          router.push("/success/payment");
        } else {
          setLoading(false);
          showToastNotification(response.data.message, 3);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err, "errr");
      });
  };

  async function handleOpenRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await baseInstance.post(endPoints.kycPage.registerMandate, {
      dealCodeNumber,
      mode: modeOfPayment,
      cf_value: monthlyCardIsChecked ? 1 : 0,
      source: "extension",
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;

    const options = {
      key: razorpayKey,
      order_id: razOrderId,
      customer_id: customerId,
      recurring: "1",
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: function (res) {
        successHandlerCardTwo(
          res.razorpay_payment_id,
          modeOfPayment,
          res.razorpay_signature,
          razOrderId,
        );
      },
      prefill: {
        name: result?.data?.data.name,
        email: result?.data?.data.email,
        contact: result?.data?.data.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error.description);
      alert("Payment failed: " + response.error.description);
    });

    paymentObject.open();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card_type_text}>
        Monthly Billing
        <span className={`${styles.card_type_span} ml-2`}>
          via Bank Mandate
        </span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            <span className="font-Inter">₹</span>
            {apiData?.orignalPrice}
          </p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <div className="mt-4">
          {DiscountPoints?.map((item, index) => {
            return (
              <p className={styles.discount_point} key={index.toString()}>
                {index > 1 ? (
                  <RightIcon color={"#2D9469"} size={20} />
                ) : (
                  <Close color="#D96060" size={20} />
                )}
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.cityshield_wrapper} onClick={openDrawerForMonthly}>
        <div className={`${styles.cityshield_row} `}>
          <div className={styles.flexx}>
            <VerifyIcon size={30} color={"#2D9469"} />
            <p className={styles.city_shield_head}>City shield </p>
          </div>
          {/* <div>
            <input
              type="checkbox"
              className="flex border border-5774AC cursor-pointer"
              checked={monthlyCardIsChecked}
            />
          </div> */}
          <div>
            {monthlyCardIsChecked ? (
              <div onClick={openDrawerForMonthly}>
                <CheckedBox
                  size={20}
                  color={"#5774AC"}
                  className={"cursor-pointer"}
                />
              </div>
            ) : (
              <div onClick={() => setmonthlyCardIsChecked(true)}>
                <UncheckedBox
                  size={20}
                  color={"#5774AC"}
                  className={"cursor-pointer"}
                />
              </div>
            )}
          </div>
        </div>
        <p className={styles.cityshield_text}>
          Get a damage waiver at ONLY <span className="font-Inter">₹</span>56/mo
          with City Shield.
          <span className={styles.learn_more}>Learn more</span>
        </p>
      </div>

      <CityShieldDrawerForCart
        cityShieldCurrentPrice={apiData?.orignalPrice}
        // cityShieldOriginalPrice={data?.orignalPrice}
        // cityShieldDiscount={items?.percent_off}
        toggleDrawer={toggleDrawerCityShield}
        open={cityShieldDrawerOpenForMonthly}
        toggleCheckbox={bool => setmonthlyCardIsChecked(bool)}
      />

      <div className={styles.choose_payment_mode}>
        <p className={styles.payment_mode_heading}>
          Choose your preferred payment mode
        </p>

        <div>
          {PaymentModeOpt?.map((item, index) => {
            return (
              <div
                className={styles.radio_option}
                key={index.toString()}
                onClick={() => {
                  handleOptionChange(index);
                  setModeOfPayment(
                    item.includes("banking")
                      ? "emandate"
                      : item.includes("card")
                      ? "card"
                      : "upi",
                  );
                }}>
                <input
                  type="radio"
                  className={styles.radio_button}
                  checked={selectedOption === index}
                  onChange={() => {
                    handleOptionChange(index);
                    setModeOfPayment(
                      item.includes("banking")
                        ? "emandate"
                        : item.includes("card")
                        ? "card"
                        : "upi",
                    );
                  }}
                />
                <label className={styles.radio_label}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button onClick={handleOpenRazorpay} className={styles.pay_now_btn}>
          Pay now
        </button>
      </div>
    </div>
  );
};
