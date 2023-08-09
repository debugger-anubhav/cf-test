import Card from "@/components/Common/HomePageCards";
import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
import React, {useEffect} from "react";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addLimitedPreiodDiscount} from "@/store/Slices";
import {productImageBaseUrl} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";

const LimetedPreiodDiscount = () => {
  // const str = string.landing_page.Common_card;

  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const dispatch = useDispatch();
  const {limitedDiscount: getLimitedPreiodData} = useSelector(
    state => state.homePagedata,
  );

  const {refetch: getLimitedPeriodDiscount} = useQuery(
    "limited-discount",
    endPoints.limitedPreiod,
    `?cityId=${cityId}`,
  );

  useEffect(() => {
    getLimitedPeriodDiscount()
      .then(res => {
        dispatch(addLimitedPreiodDiscount(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);
  const scrollRef = useHorizontalScroll();

  const tabBox = document.querySelector("#limitedslider");

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

  return getLimitedPreiodData ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Limited period discounts</h2>
      <h3 className={styles.subHeading}>Hurry before it ends</h3>
      <div className={styles.card_box} ref={scrollRef} id="limitedslider">
        {getLimitedPreiodData?.map((item, index) => (
          <div key={index.toString()}>
            <Card
              cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
              desc={item.product_name}
              hoverCardImage={
                item?.image?.split(",").filter(item => item).length > 1
                  ? productImageBaseUrl + item?.image?.split(",")[1]
                  : productImageBaseUrl + item?.image?.split(",")[0]
              }
              originalPrice={item?.price}
              currentPrice={item?.product_sale_price}
              discount={`${Math.round(
                ((item?.price - item?.product_sale_price) * 100) / item?.price,
              ).toFixed(2)}%`}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default LimetedPreiodDiscount;
