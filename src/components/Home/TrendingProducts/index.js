import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";

const TrendingProducts = () => {
  const str = string.landing_page.Common_card;
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={styles.card_box}>
        {str.map((item, index) => (
          <div key={index.toString()} className="mr-4">
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
export default TrendingProducts;
