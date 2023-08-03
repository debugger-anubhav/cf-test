import React, {useEffect} from "react";
import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {productImageBaseUrl} from "@/constants/constant";

const RecentlyViewedProduct = () => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const {refetch: recentlyViewed} = useQuery(
    "recently-view",
    endPoints.recentlyViewedProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    recentlyViewed()
      .then(res => {
        dispatch(addRecentlyViewedProduct(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>
      <div className="flex overflow-x-scroll">
        {homePageReduxData?.recentProduct?.map((item, index) => (
          <div className="3xl:mr-8 mr-4" key={index.toString()}>
            <Card
              // hoverCard="false"
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              hoverCardImage={productImageBaseUrl + item.image.split(",")[1]}
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
