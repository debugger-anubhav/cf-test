import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
// import {HomePageImages} from "@/assets/images";
import {useDispatch, useSelector} from "react-redux";
import {addCompleteTheLook} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {productPageImagesBaseUrl} from "@/constants/constant";

const CompleteTheLook = ({params}) => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);

  useEffect(() => {
    axios
      .get(baseURL + endPoints.productPage.completeTheLook(params.productId))
      .then(res => {
        dispatch(addCompleteTheLook(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(addCompleteTheLook([]));
      });
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

  if (pageData?.completeTheLook.length > 0) {
    return (
      <div className={styles.main_container}>
        <h2 className={styles.heading}>Complete The Look</h2>

        <div className={styles.card_wrapper} ref={sliderRef}>
          {pageData?.completeTheLook?.map((item, index) => (
            <div key={index}>
              <Card
                cardImage={`${
                  productPageImagesBaseUrl + item?.image?.split(",")[0]
                }`}
                discount={`${Math.round(
                  ((item?.price - item?.sale_price) * 100) / item?.sale_price,
                ).toFixed(2)}%`}
                originalPrice={item?.price}
                currentPrice={item?.sale_price}
                desc={item?.product_name}
                isHover={false}
                productId={item?.id}
                productName={item?.seourl}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default CompleteTheLook;
