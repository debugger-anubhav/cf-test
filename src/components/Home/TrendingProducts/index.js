"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addtrendingproduct, setSeoApplianceCrowd} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {productImageBaseUrl} from "@/constants/constant";

const TrendingProducts = ({params}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const seoAppliancePageReduxData = useSelector(
    state => state.seoApplianceData,
  );
  const cityId = homePageReduxData.cityId;
  const {refetch: getTrendyProducts} = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );
  const {refetch: getSeoApplianceTrendProduct} = useQuery(
    "seo-appliance-trend-product",
    endPoints.seoApplianceTtrendingProduct,
    cityId,
  );

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      getSeoApplianceTrendProduct()
        .then(res => {
          dispatch(setSeoApplianceCrowd(res?.data?.data));
          // console.log("appliance-page-trending",res.data.data)
        })
        .catch(err => console.log(err));
    } else {
      getTrendyProducts()
        .then(res => {
          dispatch(addtrendingproduct(res?.data?.data));
          // console.log("landing-page",res?.data?.data)
        })
        .catch(err => console.log(err));
    }
  }, []);

  const Data =
    params?.category === "appliances-rental"
      ? seoAppliancePageReduxData?.seoApplianceCrowd
      : homePageReduxData?.trendindProduct;

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

  return homePageReduxData?.trendindProduct ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={`${styles.card_box} `} ref={sliderRef}>
        {Data?.map((item, index) => (
          <div key={index.toString()} className={styles.child}>
            <Card
              cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
              hoverCardImage={
                item?.image?.split(",").filter(item => item).length > 1
                  ? productImageBaseUrl + item?.image?.split(",")[1]
                  : productImageBaseUrl + item?.image?.split(",")[0]
              }
              desc={item?.product_name}
              originalPrice={item?.price}
              currentPrice={item?.sale_price}
              discount={`${Math.round(
                ((item?.price - item?.sale_price) * 100) / item?.price,
              ).toFixed(2)}%`}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
export default TrendingProducts;
