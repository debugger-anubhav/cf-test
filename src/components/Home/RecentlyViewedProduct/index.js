"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";

const RecentlyViewedProduct = ({page}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [isDumy, setIsDumy] = React.useState(false);
  // const cityIdStr = localStorage
  //   .getItem("cityId")
  //   ?.toString()
  //   ?.replace(/"/g, "");

  let cityIdStr;

  if (typeof window !== "undefined") {
    cityIdStr = getLocalStorage("cityId");
  }

  const cityId = parseFloat(cityIdStr);

  const {refetch: recentlyViewed} = useQuery(
    "recently-view",
    endPoints.recentlyViewedProduct,
    `?cityId=${cityId}&userId=${
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      // JSON.parse(localStorage.getItem("user_id")) ??
      // JSON.parse(localStorage.getItem("tempUserID"))
    }`,
  );

  useEffect(() => {
    recentlyViewed()
      .then(res => {
        // console.log("reccent", res?.data?.data)
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

  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.product_id}/${item.seourl}`);
    }
  };

  return (
    <>
      {homePageReduxData?.recentProduct?.length ? (
        <div className={styles.main_container}>
          <h2
            className={`${
              page === "product" && "xl:!text-24 xl:!tracking-0.48"
            } ${styles.heading}`}>
            Recently Viewed products
          </h2>

          {/* {homePageReduxData?.recentProduct?.length ? ( */}
          <div className={`${styles.recentlyViewed_main}`} ref={sliderRef}>
            {homePageReduxData?.recentProduct?.map((item, index) => {
              // console.log(item?.image, "jjjjjjjjj")
              return (
                <>
                  {(item?.image || item?.price) && (
                    <div
                      key={index.toString()}
                      onClick={e => handleCardClick(e, item)}
                      className={`${styles.child} ${
                        isDumy && "pointer-events-none"
                      }`}>
                      <Card
                        cardImage={
                          productImageBaseUrl + item?.image?.split(",")[0]
                        }
                        hoverCardImage={
                          item?.image?.split(",").filter(item => item).length >
                          1
                            ? productImageBaseUrl + item?.image?.split(",")[1]
                            : productImageBaseUrl + item?.image?.split(",")[0]
                        }
                        discount={`${Math.round(
                          ((item?.price - item?.product_sale_price) * 100) /
                            item?.product_sale_price,
                        ).toFixed(0)}%`}
                        originalPrice={item?.price}
                        currentPrice={item?.product_sale_price}
                        desc={item?.product_name}
                        productID={item?.product_id}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
          {/* // ) : null} */}
        </div>
      ) : null}
    </>
  );
};

export default RecentlyViewedProduct;
