import React, { useEffect } from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import { productImageBaseUrl } from "@/constants/constant";
import { useQuery } from "@/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { addtrendingproduct } from "@/store/Slices";
import { endPoints } from "@/network/endPoints";

const TrendingProducts = () => {
  const str = string.landing_page.Common_card;
  // trendingProduct

  const cityId = localStorage.getItem("city-Seleted");

  const { trendindProduct: getTrendingProducts } = useSelector(state => state.homePagedata);
  const dispatch = useDispatch();

  const { refetch: getTrendyProducts } = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );


  useEffect(() => {
    getTrendyProducts()
      .then(res => {
        dispatch(addtrendingproduct(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);




  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={styles.card_box}>
        {getTrendingProducts?.map((item, index) => (
          <div key={index.toString()} className="mr-4">
            <Card
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              desc={item.product_name}
              originalPrice={item.originalPrice}
              currentPrice={item.currentPrice}
              discount={item.discount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrendingProducts;
