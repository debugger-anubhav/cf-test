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
import {getLocalStorage} from "@/constants/constant";
import {useRouter} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

function CustomerPayment() {
  const router = useRouter();
  const userId = decrypt(getLocalStorage("_ga"))
    ? decrypt(getLocalStorage("_ga"))
    : getLocalStorage("user_id");
  let currentURL = "";
  if (typeof window !== "undefined") {
    currentURL = window?.location?.href;
  }
  const url = new URL(currentURL);
  const searchParams = url.searchParams;
  const emailParam = searchParams.get("email");
  const nameParam = searchParams.get("name");
  const tempAmountParam = searchParams.get("amount");
  let amountParam = parseInt(tempAmountParam.split(".")[1].split(",").join(""));
  const invoiceNumberParam = searchParams.get("invoice_number");

  const [useCityfurnishCoins, setUseCityfurnishCoins] = useState(false);
  const [formData, setFormData] = useState({
    fullName: nameParam || "",
    email: emailParam || "",
    amount: amountParam || "",
    invoice: invoiceNumberParam || "",
    cfCoins: 0,
  });
  const [showValidationForAmount, setshowValidationForAmount] = useState(false);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [backToAvailableCoins, setBackToAvailableCoins] = useState(0);

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

  const handleSubmit = values => {
    setFormData({...formData, values});
    if (values.amount === "") {
      setshowValidationForAmount(true);
    }
    console.log(formData, "formdatttta");
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

  const handleLogin = () => {
    router.push("https://test.rentofurniture.com/user_sign_up");
  };

  useEffect(() => {
    fetchAvailCoins();
  }, []);

  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"Customer Payment"} />
      <div className={styles.main_heading}> Pay Your Dues</div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}>
        {formik => (
          <Form className={styles.form_wrapper}>
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
              <p className={styles.form_label}>Invoice Number (Optional)</p>
              <input
                type="text"
                name="invoice"
                placeholder="Please provide the invoice number for payment."
                className={styles.form_input}
                value={formik.values.invoice}
                onChange={e => formik.setFieldValue("invoice", e.target.value)}
              />

              <a href="https://cityfurnish.com/invoices">
                <div className={styles.all_invoices}>
                  <p className={styles.all_invoice_text}>See my all invoices</p>
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
                  useCityfurnishCoins ? formData.amount : formik.values.amount
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
                <p className={formStyles.error}>Please enter a valid number.</p>
              )}
              {userId ? (
                <div className={styles.toggleRow}>
                  {useCityfurnishCoins ? (
                    <ToggleOn
                      size={30}
                      color={"#5774AC"}
                      onClick={() => {
                        setUseCityfurnishCoins(false);
                        setAvailableCoins(backToAvailableCoins);
                      }}
                      className={"cursor-pointer"}
                    />
                  ) : (
                    <ToggleOff
                      color={"#E3E1DC"}
                      size={30}
                      onClick={() => handleUseCoins(formik.values.amount)}
                      className={"cursor-pointer"}
                    />
                  )}
                  <span className={styles.toggle_text}>
                    {` Use Cityfurnish coins (Available balance: ${availableCoins})`}
                  </span>
                </div>
              ) : (
                <div className={styles.login_row}>
                  <span
                    className="text-5774AC cursor-pointer"
                    onClick={() => handleLogin()}>
                    Login{" "}
                  </span>
                  to use Cityfurnish coins
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

            <button className={styles.pay_now_btn} type="submit">
              Pay now
              <ForwardArrowWithLine size={20} color={"#222222"} />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CustomerPayment;
