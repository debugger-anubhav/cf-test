import React from "react";
import styles from "./style.module.css";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
// import {useSelector} from "react-redux";
import Card from "@/components/Common/HomePageCards";
// import { productImageBaseUrl } from '@/constants/constant';

const SavedItem = () => {
  // const homePageReduxData = useSelector(state => state.homePagedata);
  // const scrollRef = useHorizontalScroll();

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Your saved items</h2>
      {/* <div className={styles.card_box} ref={scrollRef} id="galleryDragger"> */}
      {/* {homePageReduxData?.trendindProduct?.map((item, index) => (
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
                ))} */}
      {/* </div> */}
      <div className={styles.main_sub_container}>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
        <div className="flex flex-wrap mr-4 mb-4">
          <Card
            // cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
            cardImage={
              "https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp"
            }
            desc={"xyzAbc"}
            originalPrice={"1000"}
            currentPrice={"750"}
            // hoverCardImage={
            //     item?.image?.split(",").filter(item => item).length > 1
            //         ? productImageBaseUrl + item?.image?.split(",")[1]
            //         : productImageBaseUrl + item?.image?.split(",")[0]
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default SavedItem;
