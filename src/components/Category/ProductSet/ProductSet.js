import React from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useSelector} from "react-redux";
import {productImageBaseUrl} from "@/constants/constant";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductSet = ({setInPageNo}) => {
  // const [inPageNo, setInPageNo] = useState(1);

  const getAllProductWithFilterData = useSelector(
    state => state.categoryPageData,
  );

  const data = getAllProductWithFilterData?.setProduct;
  return (
    <div className={style.main_wrapper}>
      <h2 className={style.heading}>Product sets</h2>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={() => setInPageNo(prev => prev + 1)}
          hasMore={true} // Replace with a condition based on your data source}
          className="!w-full !h-full">
          <div className={style.main_container}>
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
  );
};

export default ProductSet;
