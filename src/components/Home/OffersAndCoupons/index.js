import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {CopyIcon} from "@/assets/icon";

const OffersAndCoupons = () => {
  const str = string.landing_page.OffersAndDiscount;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{str.heading}</h2>
      <div className={styles.cards_wrapper}>
        {str.card_data.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={`${styles.ellipse} ${styles.left}`}></div>
            <div className={`${styles.ellipse} ${styles.right}`}></div>
            <div className="xl:w-full">
              <p className={styles.desc}>{item.desc}</p>
              <p className={styles.code}>{item.code}</p>
            </div>
            <div className={styles.line}></div>
            <div className={styles.copy_div}>
              <CopyIcon size={20} color={"black"} />
              <p className="text-[#222]">{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OffersAndCoupons;
