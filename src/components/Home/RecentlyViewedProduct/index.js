"use client";

import React, {useEffect} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {productImageBaseUrl} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";

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

  const tabBox = document.querySelector("#gallery");

  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }
  document.addEventListener("mouseup", dragStop);
  const scrollRef = useHorizontalScroll();

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>

      {homePageReduxData?.recentProduct?.length ? (
        <div
          className={styles.recentlyViewed_main}
          ref={scrollRef}
          id="gallery">
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
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RecentlyViewedProduct;
