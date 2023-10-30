import React, {useState} from "react";
import styles from "./KYCCard.module.css";
import commonStyles from "../common.module.css";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import {OutlineArrowRight} from "@/assets/icon";
import CommonField from "../CommonField/CommonField";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {razorpayKey} from "../../../../appConfig";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {useSelector} from "react-redux";
// import {useSelector} from "react-redux";

const KYCCard = ({handleKycState, setKycState}) => {
  const selectedOrderId = useSelector(state => state.kycPage.orderId);
  const [selected, setSelected] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState();

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

  const updatePaymentStatus = (
    paymentID,
    razOrderID,
    customerId,
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
    axios
      .post(baseURL + endPoints.kycPage.updatePaymentStatus, body)
      .then(response => {
        console.log(response, "resss");
        if (response.status_code === 200) {
          // toast(response.message, "toast bg-success", 4000);
          showToastNotification(response.message, 1);
          setTimeout(function () {
            window.location.reload();
          }, 500);
        } else if (response.status_code === 301) {
          // toast(response.message, "toast bg-danger", 4000);
          showToastNotification(response.message, 3);
        } else {
          // toast(response.message, "toast bg-danger", 4000);
          showToastNotification(response.message, 3);
        }
      });
  };

  async function handleOpenRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.kycPage.registerMandate,
      {
        dealCodeNumber: selectedOrderId,
        mode: modeOfPayment,
      },
    );
    console.log(result.data, "reguster mandate apii");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // const {
    //   id: orderId,
    //   currency,
    //   amount_due: amount,
    // } = result.data.data.orderData;

    // const {dealCodeNumber} = result.data.data.orderData.notes;

    const options = {
      key: razorpayKey,
      order_id: result.data.data.raz_order_id,
      customer_id: result.data.data.customer_id,
      recurring: "1",
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: function (res) {
        updatePaymentStatus(
          res.razorpay_payment_id,
          res.razorpay_order_id,
          result.customer_id,
          modeOfPayment,
          res.razorpay_signature,
          result.raz_order_id,
        );
      },
      prefill: {
        name: result?.data?.data?.name,
        email: result?.data?.data?.email,
        contact: result?.data?.data?.phone_no,
      },
      theme: {
        color: "#EF534E",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // paymentObject.on("payment.failed", e => {
    //   paymentObject.close();
    // });
  }
  return (
    <div>
      <CommonField handleKycState={handleKycState} />
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 3</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Have no hassle of reminders and payment delays
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Choose your preferred payment mode
        </span>
      </div>
      <div
        className={`${styles.formInputFirst}`}
        onClick={() => {
          setSelected("cc");
          setModeOfPayment("card");
        }}>
        <div className={` hidden md:block`}>
          <SelectionCircle showInner={selected === "cc"} />
        </div>
        <div
          type="text"
          className={`${commonStyles.basicInputStyles} ${styles.inputStyles} ${
            selected === "cc" ? "!border-[#71717A]" : ""
          }`}>
          <div className={`md:hidden inline-block mr-2`}>
            <SelectionCircle showInner={selected === "cc"} />
          </div>
          <span> Credit/Debit card</span>
        </div>
      </div>
      <div
        className={`${styles.formInputFirst} `}
        onClick={() => {
          setSelected("net");
          setModeOfPayment("emandate");
        }}>
        <div className={`hidden md:block`}>
          <SelectionCircle showInner={selected === "net"} />
        </div>
        <div
          type="text"
          className={`${commonStyles.basicInputStyles} ${styles.inputStyles} ${
            selected === "net" ? "!border-[#71717A]" : ""
          }`}>
          <div className={`md:hidden inline-block mr-2`}>
            <SelectionCircle showInner={selected === "net"} />
          </div>
          <span> Netbanking</span>
        </div>
      </div>
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            // disabled
            onClick={() => {
              handleOpenRazorpay();
              // setKycState(4);
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Save & proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCCard;
