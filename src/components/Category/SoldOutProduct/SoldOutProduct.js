import React from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";

const SoldOutProduct = () => {
  return (
    <div className={style.main_wrapper}>
      <h2 className={style.heading}>Sold out</h2>
      <div className={style.main_container}>
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

export default SoldOutProduct;
