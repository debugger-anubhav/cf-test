"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {productImageBaseUrl} from "@/constants/constant";

const RecentlyViewedProduct = () => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const {refetch: recentlyViewed} = useQuery(
    "recently-view",
    endPoints.recentlyViewedProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    recentlyViewed()
      .then(res => {
        dispatch(addRecentlyViewedProduct(res?.data?.data));
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

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>

      {homePageReduxData?.recentProduct?.length ? (
        <div className={`${styles.recentlyViewed_main}`} ref={sliderRef}>
          {homePageReduxData?.recentProduct?.map((item, index) => (
            <div key={index.toString()}>
              <Card
                cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
                hoverCardImage={
                  item?.image?.split(",").filter(item => item).length > 1
                    ? productImageBaseUrl + item?.image?.split(",")[1]
                    : productImageBaseUrl + item?.image?.split(",")[0]
                }
                discount={`${Math.round(
                  ((item?.price - item?.product_sale_price) * 100) /
                    item?.product_sale_price,
                ).toFixed(2)}%`}
                originalPrice={item?.price}
                currentPrice={item?.product_sale_price}
                desc={item?.product_name}
                productId={item?.product_id}
                productName={item?.product_name.replace(/ /g, "-")}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RecentlyViewedProduct;
