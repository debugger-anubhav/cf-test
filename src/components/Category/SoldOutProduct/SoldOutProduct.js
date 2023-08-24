import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {productImageBaseUrl} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {
  addOutStockProduct,
  addOutStockProductAll,
  addSubCategoryMetaOutStockProduct,
} from "@/store/Slices/categorySlice";
import {useMutation} from "@/hooks/useMutation";
import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
import SavedItem from "../SavedItem/SavedItem";
import TrendingItem from "../TrendingItem/TrendingItem";
import Instruction from "../Instructions/Instruction";
import HappySubscribers from "../HappySubscribers";
import CustomerRating from "@/components/Home/Rating";
import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Footer from "@/components/Common/Footer";
import {useParams} from "next/navigation";

const SoldOutProduct = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const {productname} = useParams();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  // const homePageReduxData = useSelector(state => state.homePagedata);

  const outStockItemLength =
    categoryPageReduxData?.categoryMetaOutStock?.totalProduct;

  const categoryId = localStorage.getItem("categoryId")?.replace(/"/g, "");

  // setSession({ "categoryId": categoryId, "subCategoryId": subCategoryId, });

  const subCategoryId = localStorage
    .getItem("subCategoryId")
    ?.replace(/"/g, "");
  const cityIdStr = localStorage
    .getItem("cityId")
    .toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const bodyData = {
    subCategoryId,
    parentCategoryId: categoryId,
    cityId,
    pageNo,
    filterList: categoryPageReduxData?.isfilter
      ? categoryPageReduxData?.filteredItems
      : [],
    sortKey: categoryPageReduxData?.sortKey,
  };

  const bodyDataAll = {
    parentCategoryId: categoryId,
    cityId,
    pageNo,
    filterList: categoryPageReduxData?.isfilter
      ? categoryPageReduxData?.filteredItems
      : [],
    sortKey: categoryPageReduxData?.sortKey,
  };

  const payload =
    productname === "all" || categoryPageReduxData?.isAllProduct
      ? bodyDataAll
      : bodyData;

  const {mutateAsync: getStockOutProducts} = useMutation(
    "category-stock-product",
    "POST",
    endPoints.categoryStockOutProduct,
    payload,
  );

  useEffect(() => {
    getStockOutProducts()
      .then(res => {
        setTotalPage(res?.data?.meta?.totalPage);
        dispatch(addSubCategoryMetaOutStockProduct(res?.data?.meta));
        if (categoryPageReduxData?.isfilter) {
          if (pageNo === 1) {
            dispatch(addOutStockProduct([...res?.data?.products]));
          } else {
            dispatch(
              addOutStockProduct([
                ...categoryPageReduxData?.outStockProduct,
                ...res?.data?.products,
              ]),
            );
          }
        } else {
          if (categoryPageReduxData?.isAllProduct) {
            dispatch(addOutStockProductAll([...res?.data?.products]));
          } else {
            if (pageNo === 1) {
              dispatch(addOutStockProduct([...res?.data?.products]));
            } else {
              dispatch(
                addOutStockProduct([
                  ...categoryPageReduxData?.outStockProduct,
                  ...res?.data?.products,
                ]),
              );
            }
          }
        }
      })
      .catch(err => console.log(err));
  }, [pageNo, categoryPageReduxData?.isfilter, categoryPageReduxData?.sortKey]);

  const data = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.outStockProductAll
    : categoryPageReduxData?.outStockProduct;

  return (
    <>
      {data.length ? (
        <>
          <div className={style.main_wrapper}>
            <h2 className={style.heading}>Sold out</h2>
            <div>
              <InfiniteScroll
                dataLength={data.length}
                next={() => {
                  if (pageNo <= totalPage) {
                    setPageNo(prev => prev + 1);
                  }
                }}
                hasMore={true} // Replace with a condition based on your data source}
                className="!w-full !h-full">
                <div className={style.main_container}>
                  {data?.map((item, index) => {
                    return (
                      <div className={style.card_box} key={index.toString()}>
                        <Card
                          cardImage={`${productImageBaseUrl}${
                            item?.image?.split(",")[0]
                          }`}
                          productImageBaseUrl
                          desc={item?.product_name}
                          originalPrice={item?.price}
                          currentPrice={item?.sale_price}
                          hoverCardImage={
                            item?.image?.split(",").filter(item => item)
                              .length > 1
                              ? productImageBaseUrl + item?.image?.split(",")[1]
                              : productImageBaseUrl + item?.image?.split(",")[0]
                          }
                          discount={`${Math.round(
                            ((item?.price - item?.sale_price) * 100) / 1000,
                          ).toFixed(2)}%`}
                          productId={item?.id}
                          productName={item?.product_name.replace(/ /g, "-")}
                        />
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </>
      ) : null}
      {data?.length === outStockItemLength ? (
        <>
          <RecentlyViewedProduct />
          <SavedItem />
          <TrendingItem />
          <Instruction />
          <HappySubscribers />
          <CustomerRating />
          <HasselFreeServicesCards />
          <FrequentlyAskedQuestions />
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default SoldOutProduct;
