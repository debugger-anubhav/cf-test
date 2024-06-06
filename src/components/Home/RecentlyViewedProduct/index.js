"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useAuthentication} from "@/hooks/checkAuthentication";

const RecentlyViewedProduct = ({page}) => {
  const {checkAuthentication} = useAuthentication();
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  // const reduxStateOfLoginPopup = useSelector(
  //   state => state.homePagedata.loginPopupState,
  // );
  const userId = decrypt(getLocalStorage("_ga"));
  const [isDumy, setIsDumy] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(!!userId);
  let cityIdStr;

  if (typeof window !== "undefined") {
    cityIdStr = getLocalStorage("cityId");
  }

  const cityId = parseFloat(cityIdStr);
  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    isAuth();
  }, []);

  const {refetch: recentlyViewed} = useQuery(
    "recently-view",
    endPoints.recentlyViewedProduct,
    `?cityId=${cityId}&userId=${
      isLogin
        ? decrypt(getLocalStorage("_ga"))
        : decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );

  const isAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    setIsLogin(isAuthenticated);
  };

  useEffect(() => {
    recentlyViewed()
      .then(res => {
        dispatch(addRecentlyViewedProduct(res?.data?.data));
      })
      .catch(err => console.log(err?.message || "some error"));
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

  // const handleCardClick = (e, item) => {
  //   if (!e.target.classList.contains(styles.child)) {
  //     const url = `/things/${item.id}/${item.seourl}`;
  //     window.open(url, "_blank");
  //   }
  // };

  return (
    <>
      {homePageReduxData?.recentProduct ? (
        <div className={styles.main_container}>
          {homePageReduxData?.recentProduct?.length ? (
            <h2
              className={`${
                page === "product" ? "xl:!text-24 xl:!tracking-0.48" : ""
              } ${styles.heading}`.trim()}>
              Recently Viewed Products
            </h2>
          ) : null}
          <div className={`${styles.recentlyViewed_main}`} ref={sliderRef}>
            {homePageReduxData?.recentProduct?.map((item, index) => {
              return (
                <>
                  {(item?.image || item?.price) && (
                    <div
                      key={index.toString()}
                      // onClick={e => {
                      //   !reduxStateOfLoginPopup && handleCardClick(e, item);
                      // }}
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
                </>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecentlyViewedProduct;
