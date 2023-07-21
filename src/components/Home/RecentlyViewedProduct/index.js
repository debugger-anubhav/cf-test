import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";

const RecentlyViewedProduct = () => {
  const cardData = string.landing_page.Common_card;
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>
      <div className="flex overflow-x-scroll">
        {cardData?.map((item, index) => (
          <div className="mr-4" key={index.toString()}>
            <Card
              discount={item.discount}
              originalPrice={item.originalPrice}
              currentPrice={item.currentPrice}
              desc={item.desc}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProduct;
