import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";
import {addCategoryTrendingProduct} from "@/store/Slices/categorySlice";
import {endPoints} from "@/network/endPoints";
import {productImageBaseUrl} from "@/constants/constant";

const TrendingItem = () => {
  const dispatch = useDispatch();
  const [isDumy, setIsDumy] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const sliderRef = useRef(null);

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);
  const {refetch: getTrendyProducts} = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}`,
  );

  useEffect(() => {
    getTrendyProducts()
      .then(res => {
        dispatch(addCategoryTrendingProduct(res?.data?.data));
      })
      .catch(err => console.log(err?.message || "some error"));
  }, []);
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      const url = `/things/${item.id}/${item.seourl}`;
      window.open(url, "_blank");
    }
  };

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

  const Data = categoryPageReduxData?.tendingItems;

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Trending products</h2>
      <div className={styles.main_sub_container} ref={sliderRef}>
        {Data?.map((item, index) => (
          <div
            key={index.toString()}
            className={`${styles.child}flex flex-wrap mr-4 mb-4
            `}
            onClick={e => {
              !reduxStateOfLoginPopup && handleCardClick(e, item);
            }}>
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
              ).toFixed(0)}%`}
              productID={item?.id}
              seourl={item?.seourl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingItem;
