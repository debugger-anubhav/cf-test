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
import {
  getLocalStorage,
  handleWheel,
  keyPressForContactField,
  loadScript,
} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {RazorpayThemeColor, razorpayKeyOwn} from "../../../appConfig";
import {useDispatch, useSelector} from "react-redux";
import FormSkeleton from "../Common/FormSkeleton";
import {useRouter} from "next/navigation";
import {
  reduxSetModalState,
  setAmountPaid,
  setPGTransactionID,
  setTransactionReferenceNumber,
} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {showToastNotification} from "../Common/Notifications/toastUtils";
import LoaderComponent from "../Common/Loader/LoaderComponent";

function CustomerPayment() {
  const {checkAuthentication} = useAuthentication();
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const coinsReduxValue = useSelector(state => state.invoicePage);
  const reduxLoginState = useSelector(state => state.homePagedata.isLogin);

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  const emailParam = urlParams.get("email");
  const nameParam = urlParams.get("name");
  const tempAmountParam = urlParams.get("amount");
  const amountParam = parseInt(
    tempAmountParam?.split(".")[1]?.split(",").join(""),
  );
  const invoiceNumberParam = urlParams.get("invoice_number");
  const [useCityfurnishCoins, setUseCityfurnishCoins] = useState(
    coinsReduxValue.isCoinApplied,
  );
  const [availableCoins, setAvailableCoins] = useState(0);
  const [formData, setFormData] = useState({
    fullName: nameParam || "",
    email: emailParam || "",
    amount: amountParam || "",
    invoice: invoiceNumberParam || "",
    cfCoins: availableCoins,
    notes: "",
  });
  const [showValidationForAmount, setshowValidationForAmount] = useState(false);
  // const [backToAvailableCoins, setBackToAvailableCoins] = useState(0);
  // const [userId, setuserId] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [isLogin, setIsLogin] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [redirctInvoice, setRedirctInvoice] = useState(false);
  const [topupAmount, setTopupAmount] = useState();
  const [primaryAmount, setPrimaryAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setFormData({
  //     fullName: nameParam || "",
  //     email: emailParam || "",
  //     amount: amountParam || 1,
  //     invoice: invoiceNumberParam || "",
  //     cfCoins: coinsReduxValue?.usedCoins,
  //     notes: "",
  //   });
  // }, [currentURL]);

  const fetchAvailCoins = async () => {
    try {
      const res = await axios.get(
        baseURL + endPoints.addToCart.fetchCoins(userId),
      );

      if (res?.data?.data?.length > 0) {
        const availAmount = parseInt(res?.data?.data?.[0]?.topup_amount);
        setTopupAmount(availAmount);
        if (coinsReduxValue.isCoinApplied) {
          setAvailableCoins(
            amountParam - availAmount > 0
              ? 0
              : Math.abs(amountParam - availAmount) + 1,
          );
        } else setAvailableCoins(parseInt(res?.data?.data?.[0]?.topup_amount));
        // setBackToAvailableCoins(parseInt(res?.data?.data?.[0]?.topup_amount));

        if (urlParams.size > 0) {
          setPrimaryAmount(amountParam);
          let amount = amountParam;
          if (coinsReduxValue?.isCoinApplied === true) {
            amount = parseInt(amountParam) - coinsReduxValue?.usedCoins;
          }

          const temp = {};
          temp.fullName = nameParam;
          temp.email = emailParam;
          temp.amount = amount <= 0 ? 1 : amount;
          temp.invoice = invoiceNumberParam;
          temp.cfCoins = coinsReduxValue?.usedCoins;
          temp.notes = "";
          setFormData(temp);
          handleSubmit(temp, true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAvailCoins();
  }, [currentURL, userId]);

  useEffect(() => {
    setIsLogin(reduxLoginState);
  }, [reduxLoginState]);

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const validateAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated === true) {
      setIsLogin(true);
    } else setIsLogin(false);
  };

  useEffect(() => {
    validateAuth();
  }, [isLogin]);

  // useEffect(() => {
  //   fetchAvailCoins();
  // }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Name should be of atleast 2 characters long"),

    email: Yup.string().email().required("Please enter a valid email address."),
    amount: Yup.number().required("Amount is required."),
  });

  const handlePayment = async (values, isAutoRazor) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const result = await axios.post(
        baseURL + endPoints.customerPayment.createCustomerPayment,
        {
          full_name: values?.fullName,
          email: values?.email,
          price: values?.amount,
          user_invoice_number: values?.invoice,
          cfCoins: isAutoRazor ? values?.cfCoins : topupAmount - availableCoins,
          notes: values?.notes || "",
        },
      );
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const data = result?.data?.data;

      // const {dealCodeNumber} = result.data.data.orderData.notes;
      const userDetails = result?.data?.data?.data;

      const options = {
        key: razorpayKeyOwn, // Enter the Key ID generated from the Dashboard
        amount: values?.amount,
        name: "Cityfurnish",
        description: "Test Transaction",
        image: "https://rentofurniture.com/images/logo/FaviconNew.png",
        order_id: data?.raz_order_id,
        customer_id: data?.customer_id,
        handler: async function (response) {
          setLoading(true);
          const body = {
            transactionID: response?.razorpay_payment_id,
            auth_raz_order_id: response?.razorpay_order_id,
            fullName: userDetails?.full_name,
            paymentSource: "",
            signature: response?.razorpay_signature,
            email: userDetails?.email,
            invoiceNumber: values?.invoice,
            cfCoins: isAutoRazor
              ? values?.cfCoins
              : topupAmount - availableCoins,
            notes: values?.notes || "",
            recId: userDetails?.recID,
            amount: values?.amount,
          };
          try {
            const result = await axios.post(
              baseURL + endPoints.customerPayment.savePayment,
              body,
            );
            console.log(result);
            dispatch(setTransactionReferenceNumber(response.razorpay_order_id));
            dispatch(setPGTransactionID(response.razorpay_payment_id));
            dispatch(setAmountPaid(values.amount));
            setLoading(true);
            router.push("/success/payment");
          } catch (error) {
            setLoading(false);
            console.log(error);
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
        console.log(e, "eeeee");
      });
    } catch (error) {
      showToastNotification(error?.response?.data?.message, 2);
    }
  };

  const handleSubmit = (values, isAutoRazor) => {
    // setFormData({
    //   ...formData,
    //   fullName: values.fullName,
    //   email: values.email,
    //   amount: values.amount,
    //   invoice: values.invoice,
    //   cfCoins: availableCoins,
    // });
    if (values.amount === "") {
      setshowValidationForAmount(true);
    }
    handlePayment(values, isAutoRazor);
  };

  // const handleUseCoins = value => {
  //   if (value !== "") {
  //     setUseCityfurnishCoins(true);
  //     if (availableCoins < parseInt(value)) {
  //       amountParam = availableCoins - parseInt(value);
  //       setFormData({...formData, amount: amountParam * -1});
  //       setAvailableCoins(0);
  //     } else {
  //       setAvailableCoins(availableCoins - parseInt(value));
  //       setFormData({...formData, cfCoins: parseInt(value)});
  //       setFormData({...formData, amount: 0});
  //     }
  //   } else {
  //     setshowValidationForAmount(true);
  //   }
  // };

  // useEffect(() => {
  //   setuserId(userIdFromStorage);
  // }, [userIdFromStorage]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        setIsLogin={bool => setIsLogin(bool)}
        handleChangeRoute={() => {
          if (redirctInvoice) {
            router.push("/invoices");
          }
        }}
      />
      {loading && <LoaderComponent loading={loading} />}
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
                        onChange={e => {
                          formik.setFieldValue("fullName", e.target.value);
                          // setFormData({...formData, fullName: e.target.value});
                        }}
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
                        onChange={e => {
                          formik.setFieldValue("email", e.target.value);
                          // setFormData({...formData, email: e.target.value});
                        }}
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
                        onChange={e => {
                          formik.setFieldValue("invoice", e.target.value);
                          // setFormData({...formData, invoice: e.target.value});
                        }}
                      />

                      <a
                        href={isLogin && `/invoices`}
                        onClick={() => {
                          isLogin && router.push("/invoices");
                        }}
                        target="_blank"
                        rel="noreferrer">
                        <div
                          className={styles.all_invoices}
                          onClick={() => {
                            if (!isLogin) {
                              toggleLoginModal(true);
                              setRedirctInvoice(true);
                            }
                          }}>
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
                        onKeyPress={keyPressForContactField}
                        onWheel={handleWheel}
                        name="amount"
                        placeholder="Enter the amount to be paid"
                        className={styles.form_input}
                        onChange={e => {
                          // setFormData({...formData, amount: e.target.value});
                          formik.setFieldValue("amount", e.target.value);
                          setshowValidationForAmount(false);
                          formik.touched.amount = false;
                          setPrimaryAmount(e.target.value);
                        }}
                        value={
                          !useCityfurnishCoins
                            ? primaryAmount
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
                      {isLogin ? (
                        <div className={styles.toggleRow}>
                          {/* {useCityfurnishCoins ? (
                            <div>
                              <ToggleOn
                                size={30}
                                color={"#5774AC"}
                                onClick={() => {
                                  setUseCityfurnishCoins(false);
                                  // setAvailableCoins(backToAvailableCoins);
                                  fetchAvailCoins();

                                  setFormData({
                                    ...formData,
                                    amount: amountParam || "",
                                  });
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
                          )} */}

                          {useCityfurnishCoins ? (
                            <ToggleOn
                              size={29}
                              color={"#5774AC"}
                              onClick={() => {
                                // setAmount(amountDue);
                                setUseCityfurnishCoins(false);
                                setAvailableCoins(topupAmount);
                                // setFormData({
                                //   ...formData,
                                //   amount: amountParam || "",
                                // });
                                formik.setFieldValue("amount", primaryAmount);
                              }}
                            />
                          ) : (
                            <ToggleOff
                              color={"#E3E1DC"}
                              size={29}
                              onClick={() => {
                                if (formik.values.amount !== "") {
                                  setUseCityfurnishCoins(true);

                                  setAvailableCoins(
                                    formik.values.amount - topupAmount > 0
                                      ? 0
                                      : Math.abs(
                                          formik.values.amount - topupAmount,
                                        ) + 1,
                                  );
                                  // setFormData({
                                  //   ...formData,
                                  //   amount:
                                  //     topupAmount > amountParam
                                  //       ? 1
                                  //       : Math.abs(topupAmount - amountParam),
                                  // });

                                  formik.setFieldValue(
                                    "amount",
                                    formik.values.amount - topupAmount > 0
                                      ? formik.values.amount - topupAmount
                                      : 1,
                                  );
                                  // setAmount(
                                  //   availbal > amountDue
                                  //     ? 1
                                  //     : Math.abs(availbal - amountDue),
                                  // );
                                  // isCoinApplied &&
                                }
                              }}
                            />
                          )}
                          <p className={styles.toggle_text}>
                            Use Cityfurnish coins (Available balance :{" "}
                            {availableCoins})
                          </p>
                        </div>
                      ) : (
                        <div className={styles.login_row}>
                          <a
                            onClick={() => {
                              toggleLoginModal(true);
                            }}
                            // href="https://test.rentofurniture.com/user_sign_up"
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
                        onChange={e => {
                          formik.setFieldValue("notes", e.target.value);
                          // setFormData({...formData, notes: e.target.value});
                        }}
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
