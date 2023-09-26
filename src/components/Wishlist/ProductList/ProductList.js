import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import ProductCard from "../ProductCard/ProductCard";
import style from "./style.module.css";
import {endPoints} from "@/network/endPoints";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useQuery} from "@/hooks/useQuery";
import {decrypt} from "@/hooks/cryptoUtils";
const ProductList = ({params}) => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage] = useState(1);
  const [refreshState, setRefreshState] = useState(1);
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);
  const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      decrypt(getLocalStorage("_ga")) ?? getLocalStorage("tempUserID")
      // JSON.parse(localStorage.getItem("user_id")) ??
      // JSON.parse(localStorage.getItem("tempUserID"))
    }`,
  );

  useEffect(() => {
    getSavedItems()
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        // addSaveditemID
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err));
  }, [refreshState]);

  const data = categoryPageReduxData?.savedProducts;

  return (
    <>
      <div className={style.conatiner_wrapper}>
        <h1 className={style.heading}>
          {`Wishlist${data?.length > 0 ? ` (${data?.length})` : "(0)"}`}
        </h1>
      </div>
      {data?.length ? (
        <div>
          <InfiniteScroll
            dataLength={data?.length}
            next={() => {
              if (pageNo < totalPage) {
                setPageNo(prev => prev + 1);
              }
            }}
            hasMore={true} // Replace with a condition based on your data source
            className="!w-full !h-full">
            <div className={style.main_container}>
              {data
                ?.filter(i => i.pq_quantity > 0)
                ?.map((item, index) => {
                  return (
                    <div
                      className={`${style.card_box_product} ${style.child}`}
                      key={index.toString()}
                      // onClick={e => handleCardClick(e, item)}
                    >
                      <ProductCard
                        productWidth={productCardWidth}
                        cardImage={`${productImageBaseUrl}${
                          item?.image?.split(",")[0]
                        }`}
                        productImageBaseUrl
                        desc={item?.product_name}
                        originalPrice={item?.price}
                        soldOut={item?.pq_quantity > 0}
                        currentPrice={item?.fc_product_sale_price}
                        isImageHeight={true}
                        boxShadowHover={true}
                        hoverCardImage={
                          item?.image?.split(",")[1] !== ""
                            ? productImageBaseUrl + item?.image?.split(",")[1]
                            : productImageBaseUrl + item?.image?.split(",")[0]
                        }
                        discount={`${Math.round(
                          ((item?.price - item?.fc_product_sale_price) * 100) /
                            item?.fc_product_sale_price,
                        ).toFixed(0)}%`}
                        productID={item?.id}
                        refreshFunction={setRefreshState}
                        seourl={item?.seourl}
                      />
                    </div>
                  );
                })}
              {data
                ?.filter(i => i.pq_quantity <= 0)
                ?.map((item, index) => {
                  return (
                    <div
                      className={`${style.card_box_product} ${style.child}`}
                      key={index + 100}
                      // onClick={e => handleCardClick(e, item)}
                    >
                      <ProductCard
                        productWidth={productCardWidth}
                        cardImage={`${productImageBaseUrl}${
                          item?.image?.split(",")[0]
                        }`}
                        productImageBaseUrl
                        desc={item?.product_name}
                        originalPrice={item?.price}
                        soldOut={item?.pq_quantity > 0}
                        currentPrice={item?.fc_product_sale_price}
                        isImageHeight={true}
                        boxShadowHover={true}
                        hoverCardImage={
                          item?.image?.split(",").length > 1
                            ? productImageBaseUrl + item?.image?.split(",")[1]
                            : productImageBaseUrl + item?.image?.split(",")[0]
                        }
                        // hoverCardImage={
                        //   imagesArr?.length > 1
                        //     ? productImageBaseUrl + item?.image[1]
                        //     : productImageBaseUrl + item?.image[0]
                        // }
                        discount={`${Math.round(
                          ((item?.price - item?.fc_product_sale_price) * 100) /
                            item?.price,
                        ).toFixed(2)}%`}
                        productID={item?.id}
                        refreshFunction={setRefreshState}
                        seourl={item?.seourl}
                      />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductList;
