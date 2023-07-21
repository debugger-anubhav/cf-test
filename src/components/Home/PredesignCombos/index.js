import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";

const PreDesignCombos = () => {
  const str = string.landing_page.Common_card;
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Predesigned combos for you</h2>
      <div className={styles.card_box}>
        {str.map((item, index) => (
          <div key={index}>
            <Card
              desc={item.desc}
              originalPrice={item.originalPrice}
              currentPrice={item.currentPrice}
              discount={item.discount}
              showincludedItem={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreDesignCombos;
