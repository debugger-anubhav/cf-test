import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";

const OffersAndCoupons = () => {
  const str = string.landing_page.OffersAndDiscount;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{str.heading}</h2>
      <div className={styles.cards_wrapper}>
        {str.card_data.map((item, index) => (
          <div key={index} className={styles.card}>
            <div>
              <p className={styles.desc}>{item.desc}</p>
              <p className={styles.code}>{item.code}</p>
            </div>
            <div className={styles.line}></div>
            <button className={styles.copy_btn}>{item.copy}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OffersAndCoupons;
