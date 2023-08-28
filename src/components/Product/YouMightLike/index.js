import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
// import {HomePageImages} from "@/assets/images";
import {useDispatch, useSelector} from "react-redux";
import {addYouMightLike} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {productPageImagesBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";

const YouMightLike = ({heading, isbg, params}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);

  useEffect(() => {
    axios
      .get(baseURL + endPoints.productPage.youMightLike(params.productId))
      .then(res => {
        dispatch(addYouMightLike(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(addYouMightLike([]));
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
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/next/things/${item.id}/${item.seourl}`);
    }
  };
  if (pageData?.youMightLike?.length > 0) {
    return (
      <div
        className={styles.main_container}
        style={{
          background:
            "linear-gradient(136deg, rgba(250, 247, 172, 0.00) 0%, rgba(219, 240, 229, 0.70) 100%)",
        }}>
        <h2 className={styles.heading}>You might also like</h2>

        <div className={styles.card_wrapper} ref={sliderRef}>
          {pageData?.youMightLike?.map((item, index) => (
            <div
              key={index}
              onClick={e => handleCardClick(e, item)}
              className={styles.child}>
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
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default YouMightLike;
