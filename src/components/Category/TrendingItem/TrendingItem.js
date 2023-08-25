import React, {useEffect} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";
import {addCategoryTrendingProduct} from "@/store/Slices/categorySlice";
import {endPoints} from "@/network/endPoints";
import {productImageBaseUrl} from "@/constants/constant";

const TrendingItem = () => {
  const dispatch = useDispatch();
  // const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {refetch: getTrendyProducts} = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    getTrendyProducts()
      .then(res => {
        dispatch(addCategoryTrendingProduct(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  const Data = categoryPageReduxData?.tendingItems;

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Trending products</h2>
      <div className={styles.main_sub_container} id="galleryDragger">
        {Data?.map((item, index) => (
          <div key={index.toString()} className="flex flex-wrap mr-4 mb-4">
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
              ).toFixed(2)}%`}
              productId={item?.id}
              productName={item?.seourl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingItem;
