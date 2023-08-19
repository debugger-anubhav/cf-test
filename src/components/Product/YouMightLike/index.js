import React, {useEffect} from "react";
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

const YouMightLike = ({heading, isbg}) => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);

  useEffect(() => {
    axios
      .get(baseURL + endPoints.productPage.youMightLike)
      .then(res => {
        dispatch(addYouMightLike(res?.data?.data));
        console.log(res, "res on product");
      })
      .catch(err => {
        console.log(err);
        dispatch(addYouMightLike([]));
      });
  }, []);
  return (
    <div
      className={styles.main_container}
      style={{
        background:
          "linear-gradient(136deg, rgba(250, 247, 172, 0.00) 0%, rgba(219, 240, 229, 0.70) 100%)",
      }}>
      <h2 className={styles.heading}>You might also like</h2>

      <div className={styles.card_wrapper}>
        {pageData?.youMightLike?.map((item, index) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMightLike;
