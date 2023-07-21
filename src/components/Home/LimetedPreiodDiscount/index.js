import Card from "@/components/Common/HomePageCards/Card";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import React from "react";

const LimetedPreiodDiscount = () => {
  const str = string.landing_page.Common_card;
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Limited period discounts</h2>
      <h3 className={styles.subHeading}>Hurry before it ends</h3>
      <div className={styles.card_box}>
        {str.map((item, index) => (
          <div key={index}>
            <Card
              desc={item.desc}
              originalPrice={item.originalPrice}
              currentPrice={item.currentPrice}
              discount={item.discount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimetedPreiodDiscount;
