import React, {useEffect, useState} from "react";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import formStyles from "@/components/Cart/AddressSection/styles.module.css";

import styles from "./style.module.css";
import {
  ForwardArrowWithLine,
  OpenIcon,
  ToggleOff,
  ToggleOn,
} from "@/assets/icon";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage, loadScript} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {RazorpayThemeColor, razorpayKeyOwn} from "../../../appConfig";
import {useSelector} from "react-redux";
import FormSkeleton from "../Common/FormSkeleton";

function CustomerPayment() {
  const userIdFromStorage = decrypt(getLocalStorage("_ga"));

  const coinsReduxValue = useSelector(state => state.invoicePage);
  // console.log(coinsReduxValue, "ueueui");

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  const emailParam = urlParams.get("email");
  const nameParam = urlParams.get("name");
  const tempAmountParam = urlParams.get("amount");
  let amountParam = parseInt(
    tempAmountParam?.split(".")[1]?.split(",").join(""),
    10,
  );
  const invoiceNumberParam = urlParams.get("invoice_number");
  const [useCityfurnishCoins, setUseCityfurnishCoins] = useState(
    coinsReduxValue.isCoinApplied,
  );
  const [formData, setFormData] = useState(null);
  const [showValidationForAmount, setshowValidationForAmount] = useState(false);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [backToAvailableCoins, setBackToAvailableCoins] = useState(0);
  const [userId, setuserId] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const fetchAvailCoins = () => {
    axios
      .get(baseURL + endPoints.addToCart.fetchCoins(userId))
      .then(res => {
        if (res?.data?.data?.length > 0)
          setAvailableCoins(parseInt(res?.data?.data?.[0]?.topup_amount));
        setBackToAvailableCoins(parseInt(res?.data?.data?.[0]?.topup_amount));
      })
      .catch(err => console.log(err));
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Name should be of atleast 2 characters long"),

    email: Yup.string().email().required("Please enter a valid email address."),
    amount: Yup.number().required("Amount is required."),
  });

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
      baseURL + endPoints.customerPayment.createCustomerPayment,
      {
        full_name: formData.fullName,
        email: formData.email,
        price: formData.amount,
        user_invoice_number: formData.invoice,
        cfCoins: formData.cfCoins,
        notes: formData.notes || "",
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
    const userDetails = result.data.data.data;

    const options = {
      key: razorpayKeyOwn, // Enter the Key ID generated from the Dashboard
      amount: formData.amount,
      name: "Cityfurnish",
      description: "Test Transaction",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      order_id: data.raz_order_id,
      customer_id: data.customer_id,
      handler: async function (response) {
        console.log(response, "responsse in handler");
        const body = {
          transactionID: response.razorpay_payment_id,
          auth_raz_order_id: response.razorpay_order_id,
          fullName: userDetails?.full_name,
          paymentSource: "",
          signature: response.razorpay_signature,
          email: userDetails?.email,
          invoiceNumber: formData?.invoice,
          cfCoins: formData.cfCoins,
          notes: formData.notes || "",
          recId: userDetails.recID,
        };
        const result = await axios.post(
          baseURL + endPoints.customerPayment.savePayment,
          body,
        );
        console.log(result);
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

  const handleSubmit = values => {
    setFormData({...formData, values});
    if (values.amount === "") {
      setshowValidationForAmount(true);
    }
    console.log(formData, "formdatttta");
    handlePayment();
  };

  const handleUseCoins = value => {
    if (value !== "") {
      setUseCityfurnishCoins(true);
      if (availableCoins < parseInt(value)) {
        amountParam = availableCoins - parseInt(value);
        setFormData({...formData, amount: amountParam * -1});
        setAvailableCoins(0);
      } else {
        setAvailableCoins(availableCoins - parseInt(value));
        setFormData({...formData, cfCoins: parseInt(value)});
        setFormData({...formData, amount: 0});
      }
    } else {
      setshowValidationForAmount(true);
    }
  };

  useEffect(() => {
    setuserId(userIdFromStorage);
  }, [userIdFromStorage]);

  useEffect(() => {
    fetchAvailCoins();
  }, [userId]);

  useEffect(() => {
    setFormData({
      fullName: nameParam || "",
      email: emailParam || "",
      amount: amountParam || 0,
      invoice: invoiceNumberParam || "",
      cfCoins: 0,
    });
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, [nameParam, emailParam, amountParam, invoiceNumberParam]);

  return (
    <div className={styles.wrapper}>
      <div>
        <BreadCrumbsCommon currentPage={"Customer Payment"} />
        <div className={styles.main_heading}> Pay Your Dues</div>
        {loadingSkeleton ? (
          <div className="w-2/3">
            <FormSkeleton />
          </div>
        ) : (
          <div>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={values => handleSubmit(values)}>
              {formik => (
                <Form className={styles.form_wrapper}>
                  <div>
                    <div className={formStyles.form_field}>
                      <p className={formStyles.form_label}>Full name</p>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Enter your name"
                        className={formStyles.form_input}
                      />
                      <ErrorMessage name="fullName">
                        {msg =>
                          formik.touched.fullName && (
                            <p className={formStyles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>
                    <div className={formStyles.form_field}>
                      <p className={formStyles.form_label}>Email</p>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={formStyles.form_input}
                      />
                      <ErrorMessage name="email">
                        {msg =>
                          formik.touched.email && (
                            <p className={formStyles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>
                    <div className={styles.form_field}>
                      <p className={styles.form_label}>
                        Invoice Number (Optional)
                      </p>
                      <input
                        type="text"
                        name="invoice"
                        placeholder="Please provide the invoice number for payment."
                        className={styles.form_input}
                        value={formik.values.invoice}
                        onChange={e =>
                          formik.setFieldValue("invoice", e.target.value)
                        }
                      />

                      <a href="https://cityfurnish.com/invoices">
                        <div className={styles.all_invoices}>
                          <p className={styles.all_invoice_text}>
                            See my all invoices
                          </p>
                          <OpenIcon
                            color={"#5774AC"}
                            size={25}
                            className={"cursor-pointer"}
                          />
                        </div>
                      </a>
                    </div>

                    <div className={styles.form_field}>
                      <p className={styles.form_label}>
                        Enter amount (in <span className="font-Inter">₹</span>)
                      </p>
                      <Field
                        type="number"
                        name="amount"
                        placeholder="Enter the amount to be paid"
                        className={styles.form_input}
                        onChange={e => {
                          setFormData({...formData, amount: e.target.value});
                          formik.setFieldValue("amount", e.target.value);
                          setshowValidationForAmount(false);
                          formik.touched.amount = false;
                        }}
                        value={
                          useCityfurnishCoins
                            ? formData.amount
                            : formik.values.amount
                        }
                      />
                      <ErrorMessage name="amount">
                        {msg =>
                          formik.touched.amount && (
                            <p className={formStyles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                      {showValidationForAmount && (
                        <p className={formStyles.error}>
                          Please enter a valid number.
                        </p>
                      )}
                      {userId ? (
                        <div className={styles.toggleRow}>
                          {useCityfurnishCoins ? (
                            <div>
                              <ToggleOn
                                size={30}
                                color={"#5774AC"}
                                onClick={() => {
                                  setUseCityfurnishCoins(false);
                                  setAvailableCoins(backToAvailableCoins);
                                }}
                                className={"cursor-pointer"}
                              />
                            </div>
                          ) : (
                            <div>
                              <ToggleOff
                                color={"#E3E1DC"}
                                size={30}
                                onClick={() =>
                                  handleUseCoins(formik.values.amount)
                                }
                                className={"cursor-pointer"}
                              />
                            </div>
                          )}
                          <p className={styles.toggle_text}>
                            Use Cityfurnish coins (Available balance :{" "}
                            {availableCoins})
                          </p>
                        </div>
                      ) : (
                        <div className={styles.login_row}>
                          <a
                            href="https://test.rentofurniture.com/user_sign_up"
                            className="text-5774AC cursor-pointer">
                            Login{" "}
                          </a>
                          <span className="text-71717A">
                            to use Cityfurnish coins
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={styles.form_field}>
                      <p className={styles.form_label}>Notes (Optional)</p>
                      <input
                        type="text"
                        name="notes"
                        placeholder="Enter if you have any notes"
                        className={styles.form_input}
                      />
                    </div>

                    <button
                      // onClick={() => handlePayment()}
                      className={styles.pay_now_btn}
                      type="submit">
                      Pay now
                      <ForwardArrowWithLine size={20} color={"#222222"} />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerPayment;
