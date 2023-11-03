import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Close, RightIcon, VerifyIcon} from "@/assets/icon";
import DropDown from "@/components/Documentation/DropDown/DropDown";
import CityShieldDrawerForCart from "@/components/Cart/Drawer/CityShieldDrawer";
import {Skeleton} from "@mui/material";
import {
  RazorpayThemeColor,
  razorpayKey,
  razorpayKeyOwn,
} from "../../../../appConfig";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import axios from "axios";
import {loadScript} from "@/constants/constant";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

function Cards({
  data,
  items,
  isChecked,
  setIsChecked,
  setcardIndex,
  index,
  cardIndex,
  orderId,
}) {
  const calculatedPrice =
    data?.orignalPrice -
    ((data?.orignalPrice * items?.percent_off) / 100).toFixed(0);
  const DiscountPoints = [
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    items?.monthOptions[0],
  );
  const [perAddModal, setPerAddModal] = useState(false);

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
    setIsChecked(true);
    setcardIndex(index);
  };
  const toggleDrawerCityShield = () => {
    if (isChecked) setCityShieldDrawerOpen(false);
    else setCityShieldDrawerOpen(true);
  };
  useEffect(() => {
    if (isChecked) setCityShieldDrawerOpen(false);
  }, [isChecked]);

  const cartTypeOneHandler = async (res, customerId) => {
    const data = {
      razorpayPaymentId: res.razorpay_payment_id,
      dealCodeNumber: orderId,
      razorpayOrderId: res.razorpay_order_id,
      razCustomerId: customerId,
      razorpaySignature: res.razorpay_signature,
    };
    const result = await axios.post(
      baseURL + endPoints.addToCart.successPayment,
      data,
    );
    console.log(result);
  };

  async function handleOpenRazorpay(cardType) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res, " res in load script");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.tenureExtensionCreateOrder,
      {
        dealCodeNumber: parseInt(orderId),
        mode: "extension",
        tenure: selectedOptionPer?.value,
        cf_value: data?.isCityShieldApplied ? 1 : 0,
      },
    );
    console.log(result.data.data, "tenure extension data");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;
    console.log(razOrderId, customerId, "huhwiuhij");

    const options = {
      key: razorpayKeyOwn,
      order_id: razOrderId,
      customer_id: customerId,
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: function (res) {
        console.log(res, "res in handler");
        cartTypeOneHandler(res, customerId);
      },
      prefill: {
        name: result?.data?.data?.data?.full_name,
        email: result?.data?.data?.data?.email,
        contact: result?.data?.data?.data?.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    console.log(options, "optionss");

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error.description);
      alert("Payment failed: " + response.error.description);
    });

    paymentObject.open();
  }

  // console.log(items, data, selectedOptionPer, "itemss");

  return (
    <div className={styles.wrapper}>
      <div className={styles.card_type_text}>
        {items?.title}
        <span className={styles.card_type_span}>{items?.lightTitle}</span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            <span className="font-Inter"> ₹</span>
            {isNaN(data?.orignalPrice) ||
            isNaN(parseInt(items?.percent_off)) ? (
              <span className="flex gap-4">
                <Skeleton variant="text" className="flex" width={45} />
                <Skeleton variant="text" className="flex" width={45} />
              </span>
            ) : (
              calculatedPrice
            )}
            <span className={styles.price_span}>{data?.orignalPrice}</span>
          </p>
          <p className={styles.discount}>-{items?.percent_off}% OFF</p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <p className={styles.discount_point}>
          Get {items?.percent_off} discount on extension of your tenure by
          paying upfront.
        </p>
        <div className="mt-4">
          {DiscountPoints?.map((item, index) => {
            return (
              <p className={styles.discount_point} key={index.toString()}>
                <RightIcon color={"#2D9469"} size={20} />
                {item}
              </p>
            );
          })}
        </div>
      </div>

      <div className={styles.divider}></div>
      {!data?.isCityShieldApplied && (
        <div className={styles.cityshield_wrapper} onClick={openDrawer}>
          <div className={`${styles.cityshield_row} `}>
            <div className={styles.flexx}>
              <VerifyIcon size={30} color={"#2D9469"} />
              <p className={styles.city_shield_head}>City shield </p>
            </div>
            <div>
              <input
                type="checkbox"
                className="flex border border-5774AC cursor-pointer"
                checked={!(cardIndex === index && !isChecked)}
              />
            </div>
          </div>
          <p className={styles.cityshield_text}>
            Get a damage waiver at ONLY <span className="font-Inter">₹</span>
            {data?.cityshieldAmount}/mo with City Shield.
            <span className={styles.learn_more}>Learn more</span>
          </p>
        </div>
      )}
      {cityShieldDrawerOpen && (
        <CityShieldDrawerForCart
          cityShieldCurrentPrice={calculatedPrice}
          cityShieldOriginalPrice={data?.orignalPrice}
          cityShieldDiscount={items?.percent_off}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpen}
          toggleCheckbox={bool => setIsChecked(bool)}
        />
      )}
      <div className={styles.select_month_wrapper}>
        <DropDown
          options={items?.monthOptions}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
        />
      </div>

      <div>
        <p className={styles.total}>
          Total: <span className="font-Inter ml-1"> ₹</span>
          {selectedOptionPer?.value * calculatedPrice}
          <span className={styles.total_span}>
            for {selectedOptionPer?.label}
          </span>
        </p>
      </div>
      <div>
        <button onClick={handleOpenRazorpay} className={styles.pay_now_btn}>
          Pay now
        </button>
      </div>
    </div>
  );
}

export default Cards;

export const MonthlyCard = ({
  data,
  monthlyCardIsChecked,
  setmonthlyCardIsChecked,
  orderId,
}) => {
  const DiscountPoints = [
    "No Discount",
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];

  const PaymentModeOpt = ["Credit/Debit card", "Netbanking", "UPI"];
  const [selectedOption, setSelectedOption] = useState(0);
  const [cityShieldDrawerOpenForMonthly, setcityShieldDrawerOpenForMonthly] =
    useState(false);
  const [modeOfPayment, setModeOfPayment] = useState("card");

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
    const body = {
      transactionID: paymentID,
      mode: modeOfPayment,
      signature: razorpaySignature,
      server_orderid: RazorpayOrderIDBeforePayment,
    };
    console.log(body, "bodyyy");
    axios
      .post(baseURL + endPoints.kycPage.updatePaymentStatus, body)
      .then(response => {
        console.log(response, "resss");
        if (response.data.success === true) {
          showToastNotification(response.data.message, 1);
        } else {
          showToastNotification(response.data.message, 3);
        }
      })
      .catch(err => console.log(err, "errr"));
  };

  async function handleOpenRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res, " res in load script");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.kycPage.registerMandate,
      {
        dealCodeNumber: orderId,
        mode: modeOfPayment,
        cf_value: data?.isCityShieldApplied ? 1 : 0,
      },
    );
    console.log(result.data.data, "tenure extension data");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;
    console.log(razOrderId, customerId, "huhwiuhij");

    const options = {
      key: razorpayKey,
      order_id: razOrderId,
      customer_id: customerId,
      recurring: "1",
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: function (res) {
        console.log(res, "res in handler");
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

    console.log(options, "optionss");

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
        Monthly Billing{" "}
        <span className={styles.card_type_span}>via Bank Mandate</span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            <span className="font-Inter">₹</span>
            {data?.orignalPrice}
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
          <div>
            <input
              type="checkbox"
              className="flex border border-5774AC cursor-pointer"
              checked={monthlyCardIsChecked}
            />
          </div>
        </div>
        <p className={styles.cityshield_text}>
          Get a damage waiver at ONLY <span className="font-Inter">₹</span>56/mo
          with City Shield.
          <span className={styles.learn_more}>Learn more</span>
        </p>
      </div>
      {cityShieldDrawerOpenForMonthly && (
        <CityShieldDrawerForCart
          cityShieldCurrentPrice={data?.orignalPrice}
          // cityShieldOriginalPrice={data?.orignalPrice}
          // cityShieldDiscount={items?.percent_off}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpenForMonthly}
          toggleCheckbox={bool => setmonthlyCardIsChecked(bool)}
        />
      )}
      <div className={styles.choose_payment_mode}>
        <p className={styles.payment_mode_heading}>
          Choose your preferred payment mode
        </p>

        <div>
          {PaymentModeOpt?.map((item, index) => {
            return (
              <div className={styles.radio_option} key={index.toString()}>
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
