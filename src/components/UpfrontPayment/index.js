import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {ForwardArrowWithLine} from "@/assets/icon";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";
import {razorpayKeyOwn, RazorpayThemeColor} from "../../../appConfig";
import {loadScript} from "@/constants/constant";

function UpfrontPayment() {
  const router = useRouter();
  const Heading = "Upfront Payment";
  const params = useParams();
  const ID = params.key;
  const [apiData, setApiData] = useState(null);
  const [razorpayData, setRazorpayData] = useState(null);

  const upfrontApiCall = () => {
    axios
      .post(baseURL + endPoints.upfrontPayment, {id: ID})
      .then(res => {
        // console.log(res?.data?.data?.data, "ressss");
        setApiData(res?.data?.data?.data);
        setRazorpayData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    upfrontApiCall();
  }, []);

  async function handleOpenRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res, " res in load script");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const razOrderId = razorpayData?.raz_order_id;
    const customerId = razorpayData?.customer_id;
    console.log(razOrderId, customerId, "huhwiuhij");
    // const {dealCodeNumber} = result.data.data.orderData.notes;`

    const options = {
      key: razorpayKeyOwn,
      order_id: razOrderId,
      // customer_id: customerId,/
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: async function (res) {
        if (res.error) {
          alert("Payment failed. Please try again.");
        } else {
          const data = {
            razorpayPaymentId: res.razorpay_payment_id,
            dealCodeNumber: ID,
            razorpayOrderId: res.razorpay_order_id,
            razCustomerId: customerId,
            razorpaySignature: res.razorpay_signature,
            id: razorpayData?.data.recID,
          };
          const result = await axios.post(
            baseURL + endPoints.addToCart.successPayment,
            data,
          );
          console.log(result, "result");
          router.push("/offline/response/Success");
        }
      },
      prefill: {
        name: razorpayData?.data.name,
        email: razorpayData?.data.email,
        contact: razorpayData?.data.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    console.log(options, "optionss");

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed:", response);
      alert("Payment failed: " + response.error.description);
    });

    paymentObject.open();
  }
  return (
    <div className={styles.wrapper}>
      <p className={styles.main_heading}>{Heading}</p>
      <div className={styles.upfront_data}>
        <p className={styles.heading}>
          Your Order ID
          {apiData ? (
            <span className={styles.heading_span}>: #{apiData?.order_id}</span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
        <p className={styles.heading}>
          Tenure
          {apiData ? (
            <span className={styles.heading_span}>: {apiData?.tenure}</span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
        <p className={styles.heading}>
          Upfront amount
          {apiData ? (
            <span className={styles.heading_span}>
              {" "}
              : <span className="font-Inter">₹</span>
              {apiData?.amount}
            </span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
      </div>
      <div>
        <button className={styles.pay_now_btn} onClick={handleOpenRazorpay}>
          Pay now
          <ForwardArrowWithLine size={20} color={"#222222"} />
        </button>
      </div>
    </div>
  );
}

export default UpfrontPayment;
