import Card from "@/components/Common/HomePageCards";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import React, { useEffect, useState } from "react";
import { endPoints } from "@/network/endPoints";
import { useQuery } from "@/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { addLimitedPreiodDiscount } from "@/store/Slices";
import { productImageBaseUrl } from "@/constants/constant";

const LimetedPreiodDiscount = () => {
  const str = string.landing_page.Common_card;

  const cityId = localStorage.getItem("city-Seleted");


  const dispatch = useDispatch();
  const { limitedDiscount: getLimitedPreiodData } = useSelector(
    state => state.homePagedata,
  );

  const { refetch: getLimitedPeriodDiscount } = useQuery(
    "limited-discount",
    endPoints.limitedPreiod,
    `?cityId=${cityId}`,
  );

  useEffect(() => {
    getLimitedPeriodDiscount()
      .then(res => {
        dispatch(addLimitedPreiodDiscount(res?.data?.data))
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Limited period discounts</h2>
      <h3 className={styles.subHeading}>Hurry before it ends</h3>
      <div className={styles.card_box}>
        {getLimitedPreiodData?.map((item, index) => (
          <div key={index}>
            <Card
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              desc={item.product_name}
              originalPrice={item.price}
              currentPrice={item.product_sale_price}
              discount={`${Math.round((item.price - item.product_sale_price) * 100 / item.price).toFixed(2)}%`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimetedPreiodDiscount;
