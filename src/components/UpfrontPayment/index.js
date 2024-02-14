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
import {
  setAmountPaid,
  setPGTransactionID,
  setTransactionReferenceNumber,
} from "@/store/Slices";
import {useDispatch} from "react-redux";
import {FaCircleInfo} from "react-icons/fa6";
import LoaderComponent from "../Common/Loader/LoaderComponent";
function UpfrontPayment() {
  const router = useRouter();
  const dispatch = useDispatch();
  const Heading = "Upfront Payment";
  const params = useParams();
  const ID = params.key;
  const [apiData, setApiData] = useState(null);
  const [razorpayData, setRazorpayData] = useState(null);
  const [loading, setLoading] = useState(false);

  const upfrontApiCall = () => {
    axios
      .post(baseURL + endPoints.upfrontPayment, {id: ID})
      .then(res => {
        console.log(res?.data?.data?.data, "ressss in upfront");
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
          setLoading(true);
          const data = {
            razorpayPaymentId: res.razorpay_payment_id,
            dealCodeNumber: ID,
            razorpayOrderId: res.razorpay_order_id,
            razCustomerId: customerId,
            razorpaySignature: res.razorpay_signature,
            id: razorpayData?.data.recID,
            mode: "upfront_payment",
          };
          try {
            const result = await axios.post(
              baseURL + endPoints.addToCart.successPayment,
              data,
            );
            console.log(result, "result");
            dispatch(setTransactionReferenceNumber(res.razorpay_order_id));
            dispatch(setPGTransactionID(res.razorpay_payment_id));
            dispatch(setAmountPaid(apiData?.amount));
            setLoading(false);
            router.push("/success/payment");
          } catch (err) {
            setLoading(false);
            console.log(err);
          }
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
      {loading && <LoaderComponent loading={loading} />}
      <p className={styles.main_heading}>{Heading}</p>
      {apiData?.payment_status === 2 ? (
        <>
          <FaCircleInfo
            color="#FD6"
            className="lg:mt-8 mt-6 lg:h-[64px] lg:w-[64px] w-[48px] h-[48px]"
          />
          <p className="text-45454A  lg:text-24 text-20 font-Poppins font-medium tracking-[-0.48px] lg:my-8 my-6">
            Looks like payment has already been made.
          </p>
        </>
      ) : (
        <div className={styles.upfront_data}>
          <p className={styles.heading}>
            Your Order ID
            {apiData ? (
              <span className={styles.heading_span}>
                : #{apiData?.order_id}
              </span>
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
      )}
      <div>
        {apiData?.payment_status === 2 ? (
          <button className={`${styles.pay_now_btn} "!mt-0"`}>
            <a href="/">Return to home page</a>
          </button>
        ) : (
          <button
            className={`${styles.pay_now_btn} `}
            onClick={handleOpenRazorpay}>
            Pay now
            <ForwardArrowWithLine size={20} color={"#222222"} />
          </button>
        )}
      </div>
    </div>
  );
}

export default UpfrontPayment;
