"use client";

import React, {memo, useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addtrendingproduct, setSeoApplianceCrowd} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {baseInstance} from "@/network/axios";

const TrendingProducts = ({params}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  // const reduxStateOfLoginPopup = useSelector(
  //   state => state.homePagedata.loginPopupState,
  // );

  const [paramsCityId, setParamsCityId] = React.useState(46);
  const [data, setData] = React.useState(null);
  const [isDumy, setIsDumy] = React.useState(false);

  const cityId = getLocalStorage("cityId");

  const {refetch: getSeoApplianceTrendProduct} = useQuery(
    "seo-appliance-trend-product",
    endPoints.seoApplianceTtrendingProduct,
    paramsCityId,
  );
  const {refetch: getSeoFurnitureTrendProduct} = useQuery(
    "seo-furniture-trend-product",
    endPoints.seoFurnitureTtrendingProduct,
    paramsCityId,
  );

  const getTrendyProducts = () => {
    baseInstance
      .get(endPoints.trendingProduct + `?cityId=${cityId}`)
      .then(res => {
        setData(res?.data?.data);
        dispatch(addtrendingproduct(res?.data?.data));
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      baseInstance
        .get(endPoints.cityIdByCityName + params?.city)
        .then(res => setParamsCityId(res?.data?.data?.id))
        .catch(err => console.log(err?.message || "some error"));
    }
  }, []);

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      getSeoApplianceTrendProduct()
        .then(res => {
          // console.log("seoApplianceeeeeeeeeeeeeeeeee")
          dispatch(setSeoApplianceCrowd(res?.data?.data));
          setData(res?.data?.data);
        })
        .catch(err => console.log(err?.message || "some error"));
    } else if (params?.category === "furniture-rental") {
      getSeoFurnitureTrendProduct()
        .then(res => {
          setData(res?.data?.data);
          // console.log("seooFurniture-rentaleeeeeeeeeee")
        })
        .catch(err => console.log(err?.message || "some error"));
    } else {
      getTrendyProducts();
    }
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

  // const handleCardClick = (e, item) => {
  //   if (!e.target.classList.contains(styles.child)) {
  //     const url = `/things/${item.id}/${item.seourl}`;
  //     window.open(url, "_blank");
  //   }
  // };
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
      ) : null}
    </>
  );
};
export default memo(TrendingProducts);
