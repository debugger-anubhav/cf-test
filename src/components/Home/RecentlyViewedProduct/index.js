import React, {useEffect} from "react";
import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addRecentlyViewedProduct} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import {productImageBaseUrl} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";

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

  const scrollRef = useHorizontalScroll();

  return homePageReduxData?.recentProduct?.length ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Recently Viewed products</h2>
      <div
        className="flex overflow-x-scroll gap-4 xl:gap-6 3xl:gap-8"
        ref={scrollRef}>
        {homePageReduxData?.recentProduct?.map((item, index) => (
          <div key={index.toString()}>
            <Card
              cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
              hoverCardImage={
                item?.image?.split(",").filter(item => item).length > 1
                  ? productImageBaseUrl + item?.image?.split(",")[1]
                  : productImageBaseUrl + item?.image?.split(",")[0]
              }
              discount={`${Math.round(
                ((item?.price - item?.product_sale_price) * 100) /
                  item?.product_sale_price,
              ).toFixed(2)}%`}
              originalPrice={item?.price}
              currentPrice={item?.product_sale_price}
              desc={item?.product_name}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default RecentlyViewedProduct;
