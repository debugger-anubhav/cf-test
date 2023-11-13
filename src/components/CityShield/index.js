import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import CityShieldContent from "@/components/Cart/Drawer/CityShieldDrawer/cityShieldContent";
import {ArrowForw, InformationIcon, OpenIcon} from "@/assets/icon";
import formStyles from "@/components/Cart/AddressSection/styles.module.css";
import BreakdownDrawer from "./breakdownDrawer";
import Breadcrump from "./breadcrump";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {RazorpayThemeColor, razorpayKeyOwn} from "../../../appConfig";
import {loadScript} from "@/constants/constant";
import {useRouter} from "next/navigation";
import PostCityshield from "./postCityshieldPayment";

// import { useSearchParams } from "next/navigation";
// import {useRouter} from "next/navigation";

const CityShieldPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [details, setDetails] = useState();
  // const router = useRouter();
  const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const parts = currentURL.split("/");
  const orderId = parts[parts.length - 1];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const router = useRouter();

  const getUserDetails = () => {
    axios
      .get(baseURL + endPoints.cityshieldPage.getUserDetails(orderId))
      .then(res => {
        console.log(res);
        setDetails(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const handlePayment = async () => {
    console.log("innnn");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.cityshieldPage.payment,
      {
        dealCodeNumber: orderId,
        cfCoins: "",
      },
    );
    console.log(result.data, "make payment api data");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const data = result.data.data;
    console.log(data);

    // const {dealCodeNumber} = result.data.data.orderData.notes;
    const userDetails = result.data.data.completeOrder;

    const options = {
      key: razorpayKeyOwn, // Enter the Key ID generated from the Dashboard
      amount: data.dataObj.total,
      name: "Cityfurnish",
      description: "Test Transaction",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
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
          const result = await axios.post(
            baseURL + endPoints.addToCart.successPayment,
            body,
          );
          console.log(result, "result");
          router.push(`/city_shield/${orderId}`);
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

    console.log(options, "optionss");

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
        <Breadcrump />

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

              <a
                href={"https://test.rentofurniture.com/purchases"}
                target="_blank"
                rel="noreferrer"
                onClick={e => {
                  e.preventDefault();
                }}>
                <div className={styles.orderid_info_div}>
                  <p className={styles.orderid_txt}>
                    Order Date : May 19, 2023
                  </p>
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

          {drawerOpen && (
            <BreakdownDrawer
              toggleDrawer={toggleDrawer}
              open={drawerOpen}
              billBreakup={details?.billReciept}
            />
          )}
        </div>
      </div>
    ) : (
      <PostCityshield />
    ))
  );
};

export default CityShieldPage;
