import {BackIcon, OutlineArrowRight} from "@/assets/icon";
import React, {useState} from "react";
import styles from "./styles.module.css";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {useDispatch, useSelector} from "react-redux";
import {setKycScreenName} from "@/store/Slices";
import {loadScript} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {RazorpayThemeColor, razorpayKey} from "../../../../appConfig";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";

export default function AutoPay() {
  const dispatch = useDispatch();
  const PaymentModeOpt = ["UPI", "Credit/Debit card", "Netbanking"];

  const [modeOfPayment, setModeOfPayment] = useState("upi");
  const [selectedOption, setSelectedOption] = useState(0);
  const [loading, setLoading] = useState(false);
  const kycSliceData = useSelector(state => state.kycPage);
  const orderId = kycSliceData.selectedDataForKyc.dealCodeNumber;

  const handleOptionChange = index => {
    setSelectedOption(index);
  };

  const updatePaymentStatus = (
    paymentID,
    razOrderID,
    customerId,
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
      source: "new",
      dealCodeNumber: orderId,
    };
    baseInstance
      .post(endPoints.kycPage.updatePaymentStatus, body)
      .then(response => {
        if (response.data.success === true) {
          showToastNotification(response.data.message, 1);
          // handleKycState(selectedOrderId);
          // redirection
          setLoading(false);
        } else {
          setLoading(false);
          showToastNotification(response.data.message, 3);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err?.message, "errr");
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
      dealCodeNumber: orderId,
      mode: modeOfPayment,
      source: "new",
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
      image:
        "https://d3juy0zp6vqec8.cloudfront.net/images/icons/final-logo.png",
      handler: function (res) {
        updatePaymentStatus(
          res.razorpay_payment_id,
          res.razorpay_order_id,
          customerId,
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
      {loading && <LoaderComponent loading={loading} />}

      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={"cursor-pointer"}
        />
        AutoPay
      </div>
      <div className="flex flex-col w-[50%] gap-2 my-8">
        <p className={styles.label}>Choose your preferred payment mode</p>
        {PaymentModeOpt?.map((item, index) => {
          return (
            <div
              className={"flex gap-3 items-center cursor-pointer"}
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
              <label
                className={
                  "border w-full border-DDDDDF p-4 rounded-xl text-16 font-Poppins tracking-0.3 leading-6"
                }>
                {item}
              </label>
            </div>
          );
        })}
      </div>
      <button className={styles.proceed} onClick={handleOpenRazorpay}>
        proceed
        <OutlineArrowRight color={"#222222"} />
      </button>
    </div>
  );
}
