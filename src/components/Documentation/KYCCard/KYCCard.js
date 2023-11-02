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

const KYCCard = ({handleKycState}) => {
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
    console.log(body, "bodyyy");
    axios
      .post(baseURL + endPoints.kycPage.updatePaymentStatus, body)
      .then(response => {
        console.log(response, "resss");
        if (response.data.success === true) {
          showToastNotification(response.data.message, 1);
          handleKycState(selectedOrderId);
          // setKycState(4);
          // setTimeout(function () {
          //   window.location.reload();
          // }, 500);
          // } else if (response.data.status_code === 301) {
          //   showToastNotification(response.data.message, 3);
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
        dealCodeNumber: selectedOrderId,
        mode: modeOfPayment,
      },
    );
    console.log(result.data.data, "reguster mandate apii");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;
    console.log(razOrderId, customerId, "huhwiuhij");
    // const {dealCodeNumber} = result.data.data.orderData.notes;`

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
        color: "#EF534E",
      },
    };

    console.log(options, "optionss");

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      // Handle payment failure here
      console.log("Payment failed:", response.error.description);
      alert("Payment failed: " + response.error.description);
    });

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
