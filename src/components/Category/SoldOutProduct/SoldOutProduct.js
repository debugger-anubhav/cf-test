import React, {useEffect, useState} from "react";
import style from "./style.module.css";
// import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {
  addOutStockProduct,
  addOutStockProductAll,
  addSubCategoryMetaOutStockProduct,
} from "@/store/Slices/categorySlice";
import {useMutation} from "@/hooks/useMutation";
import loadable from "@loadable/component";
import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
import SavedItem from "../SavedItem/SavedItem";
import TrendingItem from "../TrendingItem/TrendingItem";
import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
import FaqsSkeleton from "@/components/Common/FrequentlyAskedQuestions";
import Footer from "@/components/Common/Footer";
import {useParams, useRouter} from "next/navigation";
// import CareInstruction from "@/components/Product/CareInstruction";
import HappySubscribers from "@/components/Home/HappySubscribers";
import CategoryContent from "../categoryContent/categoryContent";
import CategoryCard from "../SingleProduct/CommonCard";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);
const CustomerRating = loadable(() => import("@/components/Home/Rating"), {
  fallback: <ProductRowSkeleton />,
});
export const SoldOutProduct = () => {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [skeletonOpen, setSkeletonOpen] = useState(true);

  const dispatch = useDispatch();
  const {productname} = useParams();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  // const homePageReduxData = useSelector(state => state.homePagedata);

  const outStockItemLength =
    categoryPageReduxData?.categoryMetaOutStock?.totalProduct;

  let categoryId;
  let subCategoryId;
  let cityIdStr;
  if (typeof window !== "undefined") {
    categoryId = getLocalStorage("categoryId");
    subCategoryId = getLocalStorage("subCategoryId");
    cityIdStr = getLocalStorage("cityId");
  }
  // const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";
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
            if (pageNo === 1)
              dispatch(addOutStockProductAll([...res?.data?.products]));
            else
              dispatch(
                addOutStockProductAll([
                  ...categoryPageReduxData?.outStockProductAll,
                  ...res?.data?.products,
                ]),
              );
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
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(style.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
  const data = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.outStockProductAll
    : categoryPageReduxData?.outStockProduct;
  useEffect(() => {
    setSkeletonOpen(false);
  }, [data]);

  return (
    <>
      {skeletonOpen ? (
        <ProductRowSkeleton />
      ) : (
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
                      {data?.map(
                        (item, index) => {
                          const imageArray = item?.image?.split(",");
                          const newImageArray = imageArray.slice(
                            0,
                            imageArray.length - 1,
                          );
                          return (
                            <div
                              key={index}
                              onClick={e => handleCardClick(e, item)}>
                              <CategoryCard
                                cardImage={`${productImageBaseUrl}${
                                  item?.image?.split(",")[0]
                                }`}
                                soldOut={true}
                                desc={item?.product_name}
                                originalPrice={item?.price}
                                currentPrice={item?.sale_price}
                                hoverCardImage={
                                  newImageArray?.length > 1
                                    ? productImageBaseUrl + newImageArray[1]
                                    : productImageBaseUrl + newImageArray[0]
                                }
                                discount={`${Math.round(
                                  ((item?.price - item?.sale_price) * 100) /
                                    1000,
                                ).toFixed(0)}%`}
                                productID={item?.id}
                                seourl={item?.seourl}
                              />
                            </div>
                          );
                        },
                        // {
                        //   return (
                        //     <div
                        //       className={`${style.card_box} ${style.child}`}
                        //       key={index.toString()}
                        //       onClick={e => handleCardClick(e, item)}>
                        //       <Card
                        //         productWidth={productCardWidth}
                        //         cardImage={`${productImageBaseUrl}${
                        //           item?.image?.split(",")[0]
                        //         }`}
                        //         productImageBaseUrl
                        //         desc={item?.product_name}
                        //         originalPrice={item?.price}
                        //         currentPrice={item?.sale_price}
                        //         hoverCardImage={
                        //           item?.image?.split(",").filter(item => item)
                        //             .length > 1
                        //             ? productImageBaseUrl + item?.image?.split(",")[1]
                        //             : productImageBaseUrl + item?.image?.split(",")[0]
                        //         }
                        //         discount={`${Math.round(
                        //           ((item?.price - item?.sale_price) * 100) / 1000,
                        //         ).toFixed(0)}%`}
                        //         productID={item?.id}
                        //       />
                        //     </div>
                        //   );
                        // }
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}

      {data?.length === outStockItemLength ? (
        <>
          <RecentlyViewedProduct />
          <SavedItem />
          <TrendingItem />
          {/* <CareInstruction params={{ productId: "4096", productName: "4096" }} /> */}
          <HappySubscribers page={"category"} params={categoryId} />
          <CustomerRating />
          <HasselFreeServicesCards />
          <FrequentlyAskedQuestions />
          <CategoryContent />
          <Footer />
        </>
      ) : null}
    </>
  );
};
