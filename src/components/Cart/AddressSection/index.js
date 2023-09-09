import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import otherStyles from "../ShoppingCartSection/style.module.css";
import {
  ArrowForw,
  BackIcon,
  CalendarIcon,
  PersonIcon,
  VerifiedIcon,
  WhatsappIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {cityUrl} from "../../../../appConfig";

const AddressSection = ({setTab}) => {
  const [whatsappNotification, setWhatsappNotification] = useState(true);
  const [gstNumber, setGstNumber] = useState(false);
  const [breakupDrawer, setBreakupDrawer] = useState(false);

  const cartItems = useSelector(state => state.cartPageData.cartItems);
  console.log(cartItems, "cart itemsss");
  const [arr, setArr] = useState(cartItems);
  useEffect(() => {
    setArr(cartItems);
  }, [cartItems]);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    contactNumber: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 10 digit phone number without spaces or special characters",
        value => {
          // Check if the value contains any spaces or special characters
          return /^[0-9]*$/.test(value);
        },
      )
      .min(
        10,
        "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
      )
      .max(
        10,
        "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
      )
      .required("Contact number is required"),
    landmark: Yup.string(),
    postalCode: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 6 digit postal code without spaces or special characters",
        value => {
          // Check if the value contains any spaces or special characters
          return /^[0-9]*$/.test(value);
        },
      )
      .min(
        6,
        "Oops! Looks like you missed some digits. Please 6 digit postal code.",
      )
      .max(
        6,
        "Oops! It looks like you entered too many digits. Please enter valid 6 digit postal code.",
      )
      .required("Postal code is required"),
    city: Yup.string().required("City is required"),
  });

  const toggleDrawerBreakup = () => {
    setBreakupDrawer(!breakupDrawer);
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <div className={styles.head_div} onClick={() => setTab()}>
          <BackIcon size={19} />
          <h1 className={styles.head}>Go back to checkout</h1>
        </div>

        <div className={styles.saved_address_div}>
          <div className={styles.saved_add_upper_div}>
            <h1 className={styles.saved_add_head}>Delivering to</h1>
            <button className={styles.change_btn}>Change</button>
          </div>
          <div className={styles.name_div}>
            <PersonIcon color={"#2D9469"} className={"w-4 xl:w-5"} />
            <p className={styles.saved_name}>Pratyush, 9717314756</p>
          </div>

          <p className={styles.saved_address}>
            117, Block B, Sector 12, Vasundhara, Ghaziabad Uttar Pradesh Uttar
            Pradesh
          </p>
        </div>

        <div className={styles.new_address_wrapper}>
          <h1 className={styles.new_add_head}>Add new address</h1>

          <Formik
            initialValues={{
              fullName: "",
              contactNumber: "9929839983",
              address: "",
              landmark: "",
              postalCode: "",
              city: "Noida", // You can set initial values here
            }}
            validationSchema={validationSchema} // Define your validation schema
            onSubmit={(values, {setSubmitting}) => {
              console.log(values);
              // Handle form submission here
              // You can access the form values as `values`
              // setSubmitting(true) should be called when the form submission is in progress
            }}>
            {formik => (
              <Form className={styles.form_wrapper}>
                <div className={styles.form_wrapper}>
                  <div className={styles.form_field}>
                    <p className={styles.form_label}>Full name</p>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      className={styles.form_input}
                    />
                    <ErrorMessage name="fullName">
                      {msg =>
                        formik.touched.fullName && (
                          <p className={styles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={styles.form_field}>
                    <p className={styles.form_label}>Contact number</p>
                    <div
                      className={`flex gap-2 items-center ${styles.form_input}`}>
                      <img
                        src={`${cityUrl + "india-icon.svg"}`}
                        className={styles.flag}
                      />
                      <Field
                        type="text"
                        readOnly
                        name="contactNumber"
                        placeholder="Enter 10 digit number "
                        className={styles.contact_input}
                      />
                    </div>
                    {/* <ErrorMessage name="contactNumber">
                      {msg =>
                        formik.touched.contactNumber && (
                          <p className={styles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage> */}
                  </div>

                  <div className={styles.form_field}>
                    <p className={styles.form_label}>Address</p>
                    <Field
                      as="textarea"
                      name="address"
                      placeholder="Enter your address here including flat/building no."
                      className={`${styles.textarea} ${styles.form_input}`}
                    />
                    <ErrorMessage name="address">
                      {msg =>
                        formik.touched.address && (
                          <p className={styles.error}>{msg} </p>
                        )
                      }
                    </ErrorMessage>
                  </div>

                  <div className={styles.form_field}>
                    <p className={styles.form_label}>
                      Nearest Landmark (optional)
                    </p>
                    <Field
                      name="landmark"
                      placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                      className={styles.form_input}
                    />
                  </div>

                  <div
                    className={`flex flex-col lg:flex-row gap-4 ${styles.form_field}`}>
                    <div>
                      <p className={styles.form_label}>Postal code</p>
                      <Field
                        type="text"
                        name="postalCode"
                        placeholder="Enter 6 digit postal code"
                        className={styles.form_input}
                      />
                      <ErrorMessage name="postalCode">
                        {msg =>
                          formik.touched.postalCode && (
                            <p className={styles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>
                    <div>
                      <p className={styles.form_label}>City</p>
                      <Field
                        readOnly
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        className={styles.form_input}
                      />
                      <ErrorMessage name="city">
                        {msg =>
                          formik.touched.city && (
                            <p className={styles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>
                  </div>

                  <button type="submit" className={styles.save_btn}>
                    Save & Proceed
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles.right_div}>
        <div className={styles.box_wrapper}>
          <div className={styles.box_wrapper_left_div}>
            <WhatsappIcon size={24} color={"#48A06C"} />
            <p className={styles.box_desc}>Opt for Whatsapp notification</p>
          </div>
          <div className="cursor-pointer">
            {whatsappNotification ? (
              <FaToggleOn
                size={29}
                color={"#5774AC"}
                onClick={() => setWhatsappNotification(false)}
              />
            ) : (
              <FaToggleOff
                color={"#E3E1DC"}
                size={29}
                onClick={() => setWhatsappNotification(true)}
              />
            )}
          </div>
        </div>

        <div className={styles.box_wrapper}>
          <div className="w-full">
            <div className="flex gap-4 justify-between items-center">
              <div className={styles.box_wrapper_left_div}>
                <span className={styles.hash}>#</span>
                <p className={styles.box_desc}>I have a GST number</p>
              </div>
              <div className="cursor-pointer">
                {gstNumber ? (
                  <FaToggleOn
                    size={29}
                    color={"#5774AC"}
                    onClick={() => setGstNumber(false)}
                  />
                ) : (
                  <FaToggleOff
                    color={"#E3E1DC"}
                    size={29}
                    onClick={() => setGstNumber(true)}
                  />
                )}
              </div>
            </div>
            {gstNumber && (
              <>
                <div className="mt-4">
                  <input
                    className={styles.form_input}
                    placeholder="GST number"
                  />
                </div>
                <div className="mt-4">
                  <input
                    className={styles.form_input}
                    placeholder="Company name"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.tenure_info}>
          <CalendarIcon className={styles.calendar} />
          <p className={styles.desc}>
            Your rental payment and tenure will begin from the date of delivery
          </p>
        </div>

        <div className={styles.kyc_info}>
          <VerifiedIcon className={styles.verified_icon} />
          <p className={styles.desc}>
            Once the order has been placed, you might be required to share a few
            documents for KYC
          </p>
        </div>

        <div
          className={otherStyles.cart_breakup}
          onClick={() => setBreakupDrawer(true)}>
          <div>
            <p className={otherStyles.total_text}>Total:</p>
            <div className={otherStyles.breakup_wrapper}>
              <p className={otherStyles.view_cart_text}>View cart breakup</p>
              <ArrowForw color={"#5774AC"} className={otherStyles.for_arrow} />
            </div>
          </div>
          <p className={otherStyles.total_amount}>
            <span className={otherStyles.rupeeIcon}>₹</span>
            11,709
          </p>
        </div>
        {breakupDrawer && (
          <TotalBreakup
            toggleDrawer={toggleDrawerBreakup}
            open={breakupDrawer}
            arr={arr}
          />
        )}
      </div>
    </div>
  );
};

export default AddressSection;
