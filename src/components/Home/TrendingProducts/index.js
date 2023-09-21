"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addtrendingproduct, setSeoApplianceCrowd} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {useRouter} from "next/navigation";

const TrendingProducts = ({params}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);

  const [paramsCityId, setParamsCityId] = React.useState(46);
  const [data, setData] = React.useState(null);
  const [isDumy, setIsDumy] = React.useState(false);

  const cityId = getLocalStorage("cityId");
  const {refetch: getTrendyProducts} = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );
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

  useEffect(() => {
    if (
      params?.category === "appliances-rental" ||
      params?.category === "furniture-rental"
    ) {
      axios
        .get(baseURL + endPoints.cityIdByCityName + params?.city)
        .then(res => setParamsCityId(res?.data?.data?.id))
        .catch(err => console.log(err));
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
        .catch(err => console.log(err));
    } else if (params?.category === "furniture-rental") {
      getSeoFurnitureTrendProduct()
        .then(res => {
          setData(res?.data?.data);
          // console.log("seooFurniture-rentaleeeeeeeeeee")
        })
        .catch(err => console.log(err));
    } else {
      getTrendyProducts()
        .then(res => {
          // console.log("hommmmmmeeeeeeeeeeeeeeeeee")
          setData(res?.data?.data);
          dispatch(addtrendingproduct(res?.data?.data));
        })
        .catch(err => console.log(err));
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

  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
  return homePageReduxData?.trendindProduct ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={`${styles.card_box} `} ref={sliderRef}>
        {data?.map((item, index) => (
          <div
            key={index.toString()}
            className={`${styles.child ?? ""} ${
              index === data?.length - 1 && "mr-[16px]"
            } ${isDumy && "pointer-events-none"}`}
            onClick={e => handleCardClick(e, item)}>
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
  ) : null;
};
export default TrendingProducts;
