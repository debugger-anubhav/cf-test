import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import CityShieldContent from "@/components/Cart/Drawer/CityShieldDrawer/cityShieldContent";
import {ArrowForw, InformationIcon, OpenIcon} from "@/assets/icon";
import formStyles from "@/components/Cart/AddressSection/styles.module.css";
import BreakdownDrawer from "./breakdownDrawer";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import {endPoints} from "@/network/endPoints";
import {useRouter} from "next/navigation";

import {RazorpayThemeColor, razorpayKeyOwn} from "../../../appConfig";
import {loadScript} from "@/constants/constant";
import PostCityshield from "./postCityshieldPayment";
import {format, parseISO} from "date-fns";
import {baseInstance} from "@/network/axios";
import {useDispatch} from "react-redux";

import {
  setAmountPaid,
  setPGTransactionID,
  setTransactionReferenceNumber,
} from "@/store/Slices";

const CityShieldPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [details, setDetails] = useState();
  const [orderDate, setOrderDate] = useState();
  const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const parts = currentURL.split("/");
  const orderId = parts[parts.length - 1];

  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getUserDetails = () => {
    baseInstance
      .get(endPoints.cityshieldPage.getUserDetails(orderId))
      .then(res => {
        setDetails(res?.data?.data);
        const parsedDate = parseISO(res?.data?.data?.created);
        const formattedDate = format(parsedDate, "MMM dd, yyyy");
        setOrderDate(formattedDate);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handlePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await baseInstance.post(endPoints.cityshieldPage.payment, {
      dealCodeNumber: orderId,
      cfCoins: "",
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const data = result.data.data;
    // const {dealCodeNumber} = result.data.data.orderData.notes;
    const userDetails = result.data.data.completeOrder;

    const options = {
      key: razorpayKeyOwn, // Enter the Key ID generated from the Dashboard
      amount: data.dataObj.total,
      name: "Cityfurnish",
      description: "Test Transaction",
      image:
        "https://d3juy0zp6vqec8.cloudfront.net/images/icons/final-logo.png",
      order_id: data.raz_order_id,
      customer_id: data.customer_id,
      handler: async function (response) {
        if (response.error) {
          alert("Payment failed. Please try again.");
        } else {
          const body = {
            razorpayPaymentId: response.razorpay_payment_id,
            dealCodeNumber: orderId,
            razorpayOrderId: response.razorpay_order_id,
            razCustomerId: data.customer_id,
            razorpaySignature: response.razorpay_signature,
            mode: "cfCareUpgrade",
            id: data.dataObj.recID,
          };
          await baseInstance.post(endPoints.addToCart.successPayment, body);
          // router.push(`/city_shield/${orderId}`);
          // window?.open(`/city_shield/${orderId}`, "_self");

          dispatch(setTransactionReferenceNumber(orderId));
          dispatch(setPGTransactionID(response.razorpay_payment_id));
          dispatch(setAmountPaid(data.dataObj.total));
          router.push("/success/payment");
        }
      },
      prefill: {
        name: userDetails?.full_name,
        email: userDetails?.email,
        contact: userDetails?.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", e => {
      console.log(e);
    });
  };

  return (
    details &&
    (details.is_cf_care === 0 ? (
      <div className={styles.main_container}>
        <BreadCrumbsCommon currentPage={"City Sheild"} />

        <h1 className={styles.head}>Secure Your Coverage with City Shield</h1>

        <div className={styles.wrapper}>
          <div>
            <div>
              <div className={formStyles.form_field}>
                <p className={formStyles.form_label}>Full name</p>
                <input
                  value={details?.fullName}
                  type="text"
                  name="fullName"
                  className={styles.form_input}
                  readOnly
                />
              </div>

              <div className={formStyles.form_field}>
                <p className={formStyles.form_label}>Email</p>
                <input
                  name="email"
                  className={styles.form_input}
                  value={details?.email}
                  readOnly
                />
              </div>

              <div className={formStyles.form_field}>
                <p className={formStyles.form_label}>Order ID</p>
                <input
                  value={details?.orderId}
                  name="orderId"
                  className={styles.form_input}
                  readOnly
                />
              </div>

              <a href={"/purchases"} target="_blank" rel="noreferrer">
                <div className={styles.orderid_info_div}>
                  <p className={styles.orderid_txt}>Order Date : {orderDate}</p>
                  <OpenIcon color={"#5774AC"} className={styles.open_icon} />
                </div>
              </a>

              <div className={formStyles.form_field}>
                <p className={formStyles.form_label}>Amount (in Rs.)</p>
                <input
                  value={details?.amount}
                  name="amount"
                  className={styles.form_input}
                  readOnly
                />
              </div>

              <div className={styles.info_wrapper} onClick={toggleDrawer}>
                <InformationIcon className={styles.info_icon} />
                <p className={styles.see_how_text}>
                  See how this amount is calculated.
                </p>
              </div>
            </div>
            <div className={styles.btn_wrapper}>
              <button onClick={() => handlePayment()} className={styles.btn}>
                Pay now
                <ArrowForw className={styles.forw_arrow} />
              </button>
            </div>
          </div>

          <div className={styles.right_div}>
            <CityShieldContent />
          </div>

          <BreakdownDrawer
            toggleDrawer={toggleDrawer}
            open={drawerOpen}
            billBreakup={details?.billReciept}
          />
        </div>
      </div>
    ) : (
      <PostCityshield />
    ))
  );
};

export default CityShieldPage;
