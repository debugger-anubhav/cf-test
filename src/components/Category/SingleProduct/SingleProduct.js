import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import style from "./style.module.css";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSingleAllProduct,
  addSingleProduct,
  addSubCategoryMetaData,
} from "@/store/Slices/categorySlice";
import loadable from "@loadable/component";
import CategoryCard from "./CommonCard";
import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
import SavedItem from "../SavedItem/SavedItem";
import TrendingItem from "../TrendingItem/TrendingItem";
import HassleFreeServicesCards from "@/components/Home/HassleFreeServicesCards";
import FaqsSkeleton from "@/components/Common/FrequentlyAskedQuestions";
import HappySubscribers from "@/components/Home/HappySubscribers";
import CustomerRating from "@/components/Home/Rating";
import CategoryContent from "../categoryContent/categoryContent";
import {FooterSkeleton} from "@/components/Common/Footer";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);
const SingleProduct = ({pageNo, setPageNo}) => {
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  let categoryId;
  let subCategoryId;
  let cityIdStr;

  if (typeof window !== "undefined") {
    categoryId = getLocalStorage("categoryId");
    subCategoryId = getLocalStorage("subCategoryId");
    cityIdStr = getLocalStorage("cityId");
  }

  const cityId = parseFloat(cityIdStr);

  const bodyData = {
    parentCategoryId: categoryId,
    subCategoryId,
    cityId,
    pageNo,
    filterList: categoryPageReduxData?.filteredItems,
    // filterList: categoryPageReduxData?.isfilter
    //   ? categoryPageReduxData?.filteredItems
    //   : [],
    sortKey: categoryPageReduxData?.sortKey,
  };

  const bodyDataAll = {
    parentCategoryId: categoryId,
    cityId,
    pageNo,
    filterList: categoryPageReduxData?.filteredItems,
    // filterList: categoryPageReduxData?.isfilter
    //   ? categoryPageReduxData?.filteredItems
    //   : [],
    sortKey: categoryPageReduxData?.sortKey,
  };

  const data =
    getLocalStorage("subCategory")?.replace(/"/g, "") === "All" ||
    categoryPageReduxData?.isAllProduct
      ? // productname === "all" || categoryPageReduxData?.isAllProduct
        bodyDataAll
      : bodyData;

  const singleItemLength =
    categoryPageReduxData?.categoryMetaData?.totalProduct;

  const {mutateAsync: getSingleProducts} = useMutation(
    "category-single-product",
    "POST",
    endPoints.categorySingleProduct,
    data,
  );

  useEffect(
    () => {
      getSingleProducts()
        .then(res => {
          setTotalPage(res?.data?.meta?.totalPage);

          dispatch(addSubCategoryMetaData(res?.data?.meta));
          if (categoryPageReduxData?.isfilter) {
            if (pageNo === 1) {
              dispatch(addSingleProduct([...res?.data?.products]));
            } else {
              if (pageNo === 1) {
                dispatch(addSingleProduct([...res?.data?.products]));
              } else {
                dispatch(
                  addSingleProduct([
                    ...categoryPageReduxData?.singleProduct,
                    ...res?.data?.products,
                  ]),
                );
              }
            }
          } else {
            if (categoryPageReduxData?.isAllProduct) {
              if (pageNo === 1) {
                dispatch(addSingleAllProduct([...res?.data?.products]));
              } else {
                dispatch(
                  addSingleAllProduct([
                    ...categoryPageReduxData?.singleProductAll,
                    ...res?.data?.products,
                  ]),
                );
              }
            } else {
              if (pageNo === 1) {
                dispatch(addSingleProduct([...res?.data?.products]));
              } else {
                dispatch(
                  addSingleProduct([
                    ...categoryPageReduxData?.singleProduct,
                    ...res?.data?.products,
                  ]),
                );
              }
            }
          }
        })
        .catch(err => console.log(err?.message || "some error"));
    },
    [
      pageNo,
      categoryPageReduxData?.isfilter,
      categoryPageReduxData?.sortKey,
      categoryPageReduxData?.filteredItems,
    ],
    subCategoryId,
  );

  const singleItemData = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.singleProductAll
    : categoryPageReduxData?.singleProduct;

  return (
    <>
      {singleItemData?.length ? (
        <div>
          <InfiniteScroll
            dataLength={singleItemData?.length}
            next={() => {
              if (pageNo < totalPage) {
                setPageNo(prev => prev + 1);
              }
            }}
            hasMore={true} // Replace with a condition based on your data source
            className="!w-full !h-full">
            <div className={style.main_container}>
              {singleItemData?.map((item, index) => {
                return (
                  <div key={index}>
                    <CategoryCard
                      cardImage={`${productImageBaseUrl}${
                        item?.image?.split(",")[0]
                      }`}
                      desc={item?.product_name}
                      originalPrice={item?.price}
                      currentPrice={item?.sale_price}
                      hoverCardImage={
                        item?.image?.split(",")[1] !== ""
                          ? productImageBaseUrl + item?.image?.split(",")[1]
                          : productImageBaseUrl + item?.image?.split(",")[0]
                      }
                      discount={`${Math.round(
                        ((item?.price - item?.sale_price) * 100) / item?.price,
                      ).toFixed(0)}%`}
                      productID={item?.id}
                      seourl={item?.seourl}
                      subProduct={item?.subProduct}
                      label={item?.product_label}
                      soldOut={item?.pq_quantity <= 0}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      ) : null}
      {/* {singleItemData?.length === singleItemLength ? <ProductSet /> : null} */}
      {singleItemData?.length === singleItemLength ? (
        <>
          <RecentlyViewedProduct />
          <SavedItem />
          <TrendingItem />
          <HappySubscribers page={"category"} params={categoryId} />
          <CustomerRating />
          <HassleFreeServicesCards />
          <FrequentlyAskedQuestions />
          <CategoryContent subCategoryId={subCategoryId} />
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default SingleProduct;
