"use client";

import Card from "@/components/Common/HomePageCards";
import styles from "./style.module.css";
import React, {memo, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLimitedPreiodDiscount} from "@/store/Slices";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import Worker from "worker-loader!../RentNowBanner/rentNowBannerWorker.js";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

const LimitedPreiodDiscount = () => {
  const cityId = getLocalStorage("cityId");

  const dispatch = useDispatch();
  const {limitedDiscount: getLimitedPeriodData} = useSelector(
    state => state.homePagedata,
  );
  const [isDumy, setIsDumy] = React.useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = function ({data: {data}}) {
      dispatch(addLimitedPreiodDiscount(data));
    };

    worker.postMessage({type: "limitedPeriodDiscount", cityId});

    return () => {
      worker?.terminate();
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
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
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, [getLimitedPeriodData]);

  return getLimitedPeriodData && getLimitedPeriodData.length > 0 ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Limited period discounts</h2>
      <h3 className={styles.subHeading}>Hurry before it ends</h3>
      <div className={styles.card_box} ref={sliderRef}>
        {getLimitedPeriodData.map((item, index) => (
          <div
            key={index.toString()}
            className={`${styles.child ?? ""}  ${
              index === getLimitedPeriodData?.length - 1 ? "mr-[16px]" : ""
            } ${isDumy ? "pointer-events-none" : ""}`.trim()}>
            <Card
              desc={item.product_name}
              cardImage={
                item?.image?.split(",").filter(item => item).length > 1
                  ? productImageBaseUrl + "thumb/" + item?.image?.split(",")[1]
                  : productImageBaseUrl + "thumb/" + item?.image?.split(",")[0]
              }
              hoverCardImage={
                productImageBaseUrl + "thumb/" + item?.image?.split(",")[0]
              }
              originalPrice={item?.price}
              currentPrice={item?.sale_price}
              discount={`${Math.round(
                ((item?.price - item?.sale_price) * 100) / item?.price,
              ).toFixed(0)}%`}
              productID={item?.id}
              seourl={item?.seourl}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <ProductRowSkeleton />
  );
};

export default memo(LimitedPreiodDiscount);
