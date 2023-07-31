import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {useAppSelector} from "@/store";
import {productImageBaseUrl} from "@/constants/constant";

const RecentlyViewedProduct = () => {
  // const cardData = string.landing_page.Common_card;
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;
  const {recentProduct} = useAppSelector(state => state.homePagedata);
  const dispatch = useDispatch();

  const {refetch: recentlyViewed} = useQuery(
    "recently-view",
    endPoints.recentlyViewedProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  const [recentlyViewedproduct, setRecentlyViewedproduct] = useState([]);

  useEffect(() => {
    recentlyViewed()
      .then(res => {
        setRecentlyViewedproduct(res?.data?.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    recentlyViewedProducts();
  }, [recentlyViewedproduct]);

  const recentlyViewedProducts = () => {
    dispatch(addRecentlyViewedProduct(recentlyViewedproduct));
  };

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>
      <div className="flex overflow-x-scroll">
        {/* {cardData?.map((item, index) => ( */}
        {recentProduct?.map((item, index) => (
          <div className="mr-4" key={index.toString()}>
            <Card
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              discount={`${Math.round(
                ((item.price - item.product_sale_price) * 100) /
                  item.product_sale_price,
              ).toFixed(2)}%`}
              originalPrice={item.price}
              currentPrice={item.product_sale_price}
              desc={item.product_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProduct;
