"use client";

import Card from "@/components/Common/HomePageCards";
import styles from "./style.module.css";
import React, {useEffect, useRef} from "react";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addLimitedPreiodDiscount} from "@/store/Slices";
import {productImageBaseUrl} from "@/constants/constant";

const LimetedPreiodDiscount = () => {
  // const str = string.landing_page.Common_card;

  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const dispatch = useDispatch();
  const {limitedDiscount: getLimitedPreiodData} = useSelector(
    state => state.homePagedata,
  );

  const {refetch: getLimitedPeriodDiscount} = useQuery(
    "limited-discount",
    endPoints.limitedPreiod,
    `?cityId=${cityId}`,
  );

  useEffect(() => {
    getLimitedPeriodDiscount()
      .then(res => {
        dispatch(addLimitedPreiodDiscount(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = function () {
      mouseDown = false;
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
  }, []);
  return getLimitedPreiodData ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Limited period discounts</h2>
      <h3 className={styles.subHeading}>Hurry before it ends</h3>
      <div className={styles.card_box} ref={sliderRef}>
        {getLimitedPreiodData?.map((item, index) => (
          <div key={index.toString()}>
            <Card
              cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
              desc={item.product_name}
              hoverCardImage={
                item?.image?.split(",").filter(item => item).length > 1
                  ? productImageBaseUrl + item?.image?.split(",")[1]
                  : productImageBaseUrl + item?.image?.split(",")[0]
              }
              originalPrice={item?.price}
              currentPrice={item?.sale_price}
              discount={`${Math.round(
                ((item?.price - item?.sale_price) * 100) / item?.price,
              ).toFixed(2)}%`}
              productId={item?.product_id}
              productName={item?.product_name.replace(/ /g, "-")}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default LimetedPreiodDiscount;
