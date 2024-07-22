"use client";

import React, {Fragment, memo, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useAuthentication} from "@/hooks/checkAuthentication";
import Worker from "worker-loader!./recentlyViewedWorker.js";

const worker = new Worker();

const RecentlyViewedProduct = ({page}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);

  const {checkAuthentication} = useAuthentication();

  const userId = decrypt(getLocalStorage("_ga"));

  const [isDumy, setIsDumy] = useState(false);
  const [isLogin, setIsLogin] = useState(!!userId);
  const [noProductsFound, setNoProductsFound] = useState(false);

  let cityIdStr;

  if (typeof window !== "undefined") {
    cityIdStr = getLocalStorage("cityId");
  }

  const cityId = parseFloat(cityIdStr);

  useEffect(() => {
    isAuth();
  }, []);

  const isAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    setIsLogin(isAuthenticated);
  };

  useEffect(() => {
    worker.postMessage({
      cityId,
      userId: isLogin
        ? decrypt(getLocalStorage("_ga"))
        : decryptBase64(getLocalStorage("tempUserID")),
    });
    worker.onmessage = function (e) {
      dispatch(addRecentlyViewedProduct(e.data.recentlyViewedProducts));
      if (e.data.recentlyViewedProducts.length === 0) {
        setNoProductsFound(true);
      }
    };

    return () => {
      worker?.terminate();
    };
  }, [isLogin]);

  const sliderRef = useRef(null);

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
      {homePageReduxData?.recentProduct &&
      homePageReduxData?.recentProduct.length > 0 ? (
        <div className={styles.main_container}>
          <h2
            className={`${
              page === "product" ? "xl:!text-24 xl:!tracking-0.48" : ""
            } ${styles.heading}`.trim()}>
            Recently Viewed Products
          </h2>
          <div className={`${styles.recentlyViewed_main}`} ref={sliderRef}>
            {homePageReduxData.recentProduct.map((item, index) => {
              return (
                <Fragment key={index.toString()}>
                  {(item?.image || item?.price) && (
                    <div
                      className={`${styles.child ?? ""}  ${
                        index === homePageReduxData?.recentProduct?.length - 1
                          ? "mr-[16px]"
                          : ""
                      } ${isDumy ? "pointer-events-none" : ""}`.trim()}>
                      <Card
                        cardImage={
                          item?.image?.split(",").filter(item => item).length >
                          1
                            ? productImageBaseUrl +
                              "thumb/" +
                              item?.image?.split(",")[1]
                            : productImageBaseUrl +
                              "thumb/" +
                              item?.image?.split(",")[0]
                        }
                        hoverCardImage={
                          productImageBaseUrl +
                          "thumb/" +
                          item?.image?.split(",")[0]
                        }
                        discount={`${Math.round(
                          ((item?.price - item?.product_sale_price) * 100) /
                            item?.price,
                        ).toFixed(0)}%`}
                        originalPrice={item?.price}
                        currentPrice={item?.product_sale_price}
                        desc={item?.product_name}
                        productID={item?.product_id}
                        seourl={item?.seourl}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      ) : noProductsFound ? null : (
        <div className="mt-8">
          <ProductRowSkeleton />
        </div>
      )}
    </>
  );
};

export default memo(RecentlyViewedProduct);
