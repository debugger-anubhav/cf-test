import React, {useState} from "react";
import styles from "./styles.module.css";
import {
  BackIcon,
  ForwardArrowWithLine,
  IconLink,
  Lock,
  Rupee,
  Sparkles,
} from "../../../assets/icon";

const CitymaxPlanDetail = () => {
  const [isHalfYearly, setHalfYearly] = useState(true);
  const dummy = [
    {
      type: "Bedroom 1",
      ameneties: [
        {
          icon: "",
          name: "Bed",
        },
        {
          icon: "",
          name: "Bedside Table",
        },
        {
          icon: "",
          name: "Matress",
        },
      ],
    },
    {
      type: "Bedroom 2",
      ameneties: [
        {
          icon: "",
          name: "Bed",
        },
        {
          icon: "",
          name: "Bedside Table",
        },
        {
          icon: "",
          name: "Matress",
        },
      ],
    },
    {
      type: "Living Room",
      ameneties: [
        {
          icon: "",
          name: "Sofa set",
        },
        {
          icon: "",
          name: "Coffee Table",
        },
        {
          icon: "",
          name: "Storage and organizers",
        },
      ],
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.left_div}>
        <div className={styles.header_wrapper}>
          <BackIcon className={styles.back_icon} />
          <h1 className={styles.head}>CityMax Pro</h1>
        </div>
        <p className={styles.tag_line}>Best suited for a 2BHK apartment</p>
        <p className={`!text-71717A !mt-8 ${styles.tag_line}`}>
          Click on the placeholders below and choose your desired products.
        </p>

        <div className={styles.plans_wrapper}>
          {dummy.map((item, index) => (
            <div key={index}>
              <div className={styles.type_wrapper}>
                <p className={styles.type_txt}>{item.type}</p>
                <p className={styles.selected_text}>
                  0 out of 3 products selected
                </p>
              </div>
              <div className={styles.amen_wrapper}>
                {item.ameneties.map((t, i) => (
                  <div key={i} className={styles.amenity_box}>
                    <img
                      src={IconLink + t.icon}
                      className={styles.product_icon}
                    />
                    <p className={styles.product_name}>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right_div}>
        <div className={styles.monthly_toggler}>
          <p
            onClick={() => {
              setHalfYearly(true);
            }}
            className={`${
              isHalfYearly
                ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                : "bg-transparent"
            } ${styles.pref_mode_text}`}>
            6 months
          </p>
          <p
            onClick={() => {
              setHalfYearly(false);
            }}
            className={`${
              isHalfYearly
                ? "bg-transparent"
                : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
            } ${styles.pref_mode_text}`}>
            12 months
          </p>
        </div>
        <div
          className={`${styles.plan_div} ${styles.right_div_content_wrapper}`}>
          <p className={styles.bold_text}>Current plan: CityMax Pro</p>
          <p className={styles.change_txt}>change</p>
        </div>
        <div
          className={`!flex-col ${styles.price_div} ${styles.right_div_content_wrapper}`}>
          <div className={styles.price_div}>
            <Rupee className={styles.icon} />
            <div>
              <p className={styles.price_type}>Monthly Rent</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>4599 /mo
              </p>
            </div>
          </div>
          <div className={styles.price_div}>
            <Sparkles className={styles.icon} />
            <div>
              <p className={styles.price_type}>Upgrades Rental Amount</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>4599 /mo
              </p>
            </div>
          </div>
          <div className={styles.price_div}>
            <Lock className={styles.icon} />
            <div>
              <p className={styles.price_type}>Refundable Security Deposit</p>
              <p className={styles.bold_text}>
                <span className={styles.rupee}>₹</span>0
              </p>
            </div>
          </div>
        </div>
        <button className={styles.proceed_btn}>
          Proceed
          <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
};

export default CitymaxPlanDetail;
