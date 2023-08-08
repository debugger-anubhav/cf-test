import React, {useEffect} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useQuery} from "@/hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {addtrendingproduct} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {productImageBaseUrl} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
import Skeleton from "@mui/material/Skeleton";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;
  const [loading, setLoading] = React.useState(true);
  const {refetch: getTrendyProducts} = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    getTrendyProducts()
      .then(res => {
        dispatch(addtrendingproduct(res?.data?.data));
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const scrollRef = useHorizontalScroll();

  const tabBox = document.querySelector("#galleryDragger");

  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }
  document.addEventListener("mouseup", dragStop);
  return homePageReduxData?.trendindProduct ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={styles.card_box} ref={scrollRef} id="galleryDragger">
        {/* <ScrollMenu> */}
        {homePageReduxData?.trendindProduct?.map((item, index) => (
          <div key={index.toString()}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                className="skeleton_product_card"
              />
            ) : (
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
              />
            )}
          </div>
        ))}
        {/* </ScrollMenu> */}
      </div>
    </div>
  ) : null;
};
export default TrendingProducts;
