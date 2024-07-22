"use client";

import React, {useEffect, useRef, useState, memo} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {addtrendingproduct, setSeoApplianceCrowd} from "@/store/Slices";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import Worker from "worker-loader!./trendingproductsWorker.js";

const TrendingProducts = ({params}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);

  const [paramsCityId, setParamsCityId] = useState(46);
  const [data, setData] = useState(null);
  const [isDumy, setIsDumy] = useState(false);

  const sliderRef = useRef(null);

  const cityId = getLocalStorage("cityId");

  useEffect(() => {
    const worker = new Worker();
    worker.postMessage({params, paramsCityId, cityId});

    worker.onmessage = function ({data}) {
      const {type} = data;
      switch (type) {
        case "cityId": {
          const {id} = data;
          setParamsCityId(id);
          break;
        }

        case "applianceTrendingProducts": {
          const {applianceTrendingProducts} = data;
          dispatch(setSeoApplianceCrowd(applianceTrendingProducts));
          setData(applianceTrendingProducts);
          break;
        }

        case "furnitureTrendingProducts": {
          const {furnitureTrendingProducts} = data;
          setData(furnitureTrendingProducts);
          break;
        }

        case "trendingProducts": {
          const {trendingProducts} = data;
          setData(trendingProducts);
          dispatch(addtrendingproduct(trendingProducts));
        }
      }
    };

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
      {homePageReduxData?.trendindProduct ? (
        <div className={styles.main_container}>
          <h2 className={styles.heading}>Crowd Favourite</h2>
          <h3 className={styles.subHeading}>Best Selling Products</h3>
          <div className={`${styles.card_box} `} ref={sliderRef}>
            {data?.map((item, index) => (
              <div
                key={index.toString()}
                className={`${styles.child ?? ""} ${
                  index === data?.length - 1 ? "mr-[16px]" : ""
                } ${isDumy ? "pointer-events-none" : ""}`.trim()}>
                <Card
                  hoverCardImage={
                    productImageBaseUrl + "thumb/" + item?.image?.split(",")[0]
                  }
                  cardImage={
                    item?.image?.split(",").filter(item => item).length > 1
                      ? productImageBaseUrl +
                        "thumb/" +
                        item?.image?.split(",")[1]
                      : productImageBaseUrl +
                        "thumb/" +
                        item?.image?.split(",")[0]
                  }
                  desc={item?.product_name}
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
        <div className="mt-8">
          <ProductRowSkeleton />
        </div>
      )}
    </>
  );
};

export default memo(TrendingProducts);
