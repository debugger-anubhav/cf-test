"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {addComboProducts} from "@/store/Slices";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import Worker from "worker-loader!../RentNowBanner/rentNowBannerWorker";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

const PreDesignCombos = () => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = getLocalStorage("cityId");

  const [isDumy, setIsDumy] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = function ({data: {data}}) {
      dispatch(addComboProducts(data));
    };

    worker.postMessage({type: "predesignCombos", cityId});

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
  }, []);

  return (
    <>
      {homePageReduxData?.designComboProduct &&
      homePageReduxData.designComboProduct.length > 0 ? (
        <div className={styles.main_container}>
          <h2 className={styles.heading}>Predesigned combos for you</h2>
          <div className={styles.card_box} ref={sliderRef}>
            {homePageReduxData.designComboProduct.map((item, index) => (
              <div
                key={index.toString()}
                className={`${styles.child ?? ""}  ${
                  index === homePageReduxData?.designComboProduct?.length - 1
                    ? "mr-[16px]"
                    : ""
                } ${isDumy ? "pointer-events-none" : ""}`.trim()}>
                <Card
                  cardImage={
                    item?.image?.split(",").filter(item => item).length > 1
                      ? productImageBaseUrl +
                        "thumb/" +
                        item?.image?.split(",")[1]
                      : productImageBaseUrl +
                        "thumb/" +
                        item?.image?.split(",")[0]
                  }
                  hoverCardImage={
                    productImageBaseUrl + "thumb/" + item?.image?.split(",")[0]
                  }
                  desc={item?.product_name}
                  originalPrice={item?.price}
                  currentPrice={item?.sale_price}
                  discount={`${Math.round(
                    ((item?.price - item?.sale_price) * 100) / item?.price,
                  ).toFixed(0)}%`}
                  showincludedItem={true}
                  itemIncluded={item?.subProduct.length}
                  productID={item?.id}
                  seourl={item?.seourl}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ProductRowSkeleton />
      )}
    </>
  );
};

export default memo(PreDesignCombos);
