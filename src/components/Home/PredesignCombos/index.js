"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {endPoints} from "@/network/endPoints";
import {addComboProducts} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {productImageBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";

const PreDesignCombos = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const {refetch: getPreDesignCombos} = useQuery(
    "design-combos",
    endPoints.productCombos,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    getPreDesignCombos()
      .then(res => {
        dispatch(addComboProducts(res?.data?.data));
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

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
    };
  }, []);
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
  return (
    <>
      {homePageReduxData?.designComboProduct?.length ? (
        <div className={styles.main_container}>
          <h2 className={styles.heading}>Predesigned combos for you</h2>
          <div className={styles.card_box} ref={sliderRef}>
            {homePageReduxData?.designComboProduct?.map((item, index) => (
              <div
                key={index.toString()}
                className={styles.child}
                onClick={e => handleCardClick(e, item)}>
                <Card
                  cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
                  // hoverCard="false"
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
                  showincludedItem={true}
                  itemIncluded={item?.subProduct.length}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PreDesignCombos;
