import React, {useState} from "react";
import styles from "./styles.module.css";
import otherStyles from "../ShoppingCartSection/style.module.css";
import {
  ArrowForw,
  BackIcon,
  CalendarIcon,
  PersonIcon,
  Rupee,
  VerifiedIcon,
  WhatsappIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";

const AddressSection = ({setTab}) => {
  const [whatsappNotification, setWhatsappNotification] = useState(true);
  const [gstNumber, setGstNumber] = useState(false);
  const [breakupDrawer, setBreakupDrawer] = useState(false);

  const arr = [
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
  ];

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
          <div className={styles.form_wrapper}>
            <div className={styles.form_field}>
              <p className={styles.form_label}>Full name</p>
              <input
                placeholder="Enter your names"
                className={styles.form_input}
              />
            </div>

            <div className={styles.form_field}>
              <p className={styles.form_label}>Contact number</p>
              <input placeholder="9717314756" className={styles.form_input} />
            </div>

            <div className={styles.form_field}>
              <p className={styles.form_label}>Address</p>
              <textarea
                placeholder="Enter your address here including flat/building no. "
                className={`${styles.textarea} ${styles.form_input}`}
              />
            </div>

            <div className={styles.form_field}>
              <p className={styles.form_label}>Nearest Landmark (optional)</p>
              <input
                placeholder="Enter your nearest landmark (eg. school, office, park, etc) "
                className={styles.form_input}
              />
            </div>

            <div
              className={`flex flex-col lg:flex-row gap-4 ${styles.form_field}`}>
              <div>
                <p className={styles.form_label}>Postal code</p>
                <input
                  placeholder="Enter 6 digit postal code "
                  className={styles.form_input}
                />
              </div>
              <div>
                <p className={styles.form_label}>City</p>
                <input value={"Noida"} className={styles.form_input} />
              </div>
            </div>

            {/* <button className={styles.save_btn}>Save & Proceed</button> */}
          </div>
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
            <Rupee className={otherStyles.rupeeIcon} />
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
