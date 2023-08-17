import React from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {productImageBaseUrl} from "@/constants/constant";

const SoldOutProduct = ({setOutPageNo}) => {
  const getAllProductWithFilterData = useSelector(
    state => state.categoryPageData,
  );
  const data = getAllProductWithFilterData?.outStockProduct;
  return (
    <div className={style.main_wrapper}>
      <h2 className={style.heading}>Sold out</h2>
      <div className={style.main_container}>
        <div>
          <InfiniteScroll
            dataLength={data.length}
            next={() => setOutPageNo(prev => prev + 1)}
            hasMore={true} // Replace with a condition based on your data source}
            className="!w-full !h-full">
            <div className={style.card_box}>
              {data?.map((item, index) => {
                return item?.subProduct.length ? (
                  <div className={style.card_box}>
                    <Card
                      cardImage={`${productImageBaseUrl}${
                        item?.image?.split(",")[0]
                      }`}
                      productImageBaseUrl
                      desc={item?.product_name}
                      originalPrice={item?.price}
                      currentPrice={item?.sale_price}
                      hoverCardImage={`${productImageBaseUrl}${
                        item?.image?.split(",")[1]
                      }`}
                      discount={`${Math.round(
                        ((item?.price - item?.sale_price) * 100) / 1000,
                      ).toFixed(2)}%`}
                    />
                  </div>
                ) : null;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default SoldOutProduct;
