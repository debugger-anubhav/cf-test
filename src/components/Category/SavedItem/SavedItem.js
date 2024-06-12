import React, {useEffect, useRef} from "react";
// import {useQuery} from "@/hooks/useQuery";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";

import Card from "@/components/Common/HomePageCards";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import styles from "./style.module.css";
import {useAuthentication} from "@/hooks/checkAuthentication";

const SavedItem = () => {
  const {checkAuthentication} = useAuthentication();
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const loginStateFromRedux = useSelector(state => state.homePagedata.isLogin);
  const [isDumy, setIsDumy] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(loginStateFromRedux);
  const sliderRef = useRef(null);

  // const cityIdStr = localStorage
  //   .getItem("cityId")
  //   ?.toString()
  //   ?.replace(/"/g, "");
  // const cityId = parseFloat(cityIdStr);

  // const {refetch: getSavedItems} = useQuery(
  //   "saved-items",
  //   endPoints.savedItems,
  //   `?cityId=${cityId}&userId=${
  //     // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
  //     isLogin
  //       ? decrypt(getLocalStorage("_ga"))
  //       : decryptBase64(getLocalStorage("tempUserID"))
  //   }`,
  // );

  const getSavedItems = isAuthenticated => {
    baseInstance
      .get(
        endPoints.savedItems +
          `?cityId={cityId}&userId=${
            isAuthenticated
              ? decrypt(getLocalStorage("_ga"))
              : decryptBase64(getLocalStorage("tempUserID"))
          }`,
      )
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const isAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    setIsLogin(isAuthenticated);
    isAuthenticated && getSavedItems(isAuthenticated);
  };

  useEffect(() => {
    isAuth();
  }, [isLogin]);

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

  const data = categoryPageReduxData?.savedProducts;

  return data.length > 0 ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Your saved items</h2>
      <div className={styles.main_sub_container} ref={sliderRef}>
        {data?.map((item, index) => {
          return (
            <div
              className={`flex flex-wrap mr-4 mb-4 ${styles.child}`}
              key={index.toString()}>
              <Card
                cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
                desc={item?.product_name}
                originalPrice={item?.price}
                currentPrice={item?.fc_product_sale_price}
                hoverCardImage={
                  item?.image?.split(",").filter(item => item).length > 1
                    ? productImageBaseUrl + item?.image?.split(",")[1]
                    : productImageBaseUrl + item?.image?.split(",")[0]
                }
                discount={`${Math.round(
                  ((item?.price - item?.fc_product_sale_price) * 100) /
                    item?.price,
                ).toFixed(0)}%`}
                productID={item?.id}
                seourl={item?.seourl}
                isSavedComp={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default SavedItem;
