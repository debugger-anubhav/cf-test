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
  const homePageReduxData = useSelector(state => state.homePagedata);

  const outStockItemLength =
    categoryPageReduxData?.categoryMetaOutStock?.totalProduct;

  const bodyData = {
    subCategoryId: homePageReduxData?.productName?.id,
    parentCategoryId: homePageReduxData?.productName?.rootID,
    cityId: 50,
    pageNo,
    // filterList: categoryPageReduxData?.isfilter ? (categoryPageReduxData?.filteredItems) : null,
  };

  const bodyDataAll = {
    parentCategoryId: categoryPageReduxData?.parentCategoryId,
    cityId: 50,
    pageNo,
    // filterList: categoryPageReduxData?.isfilter ? (categoryPageReduxData?.filteredItems) : null,
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
        dispatch(
          addOutStockProduct([
            ...categoryPageReduxData?.outStockProduct,
            ...res?.data?.products,
          ]),
        );
        if (categoryPageReduxData?.isAllProduct) {
          console.log("in all true");
          dispatch(
            addOutStockProductAll([
              ...categoryPageReduxData?.outStockProductAll,
              ...res?.data?.products,
            ]),
          );
        } else {
          dispatch(
            addOutStockProduct([
              ...categoryPageReduxData?.outStockProduct,
              ...res?.data?.products,
            ]),
          );
          //   // }
        }
      })
      .catch(err => console.log(err));
  }, [pageNo]);

  // const data = categoryPageReduxData?.outStockProduct;

  const data = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.outStockProductAll
    : categoryPageReduxData?.outStockProduct;

  return (
    <>
      {data.length ? (
        <>
          <div className={style.main_wrapper}>
            <h2 className={style.heading}>Sold out</h2>
            {/* <div className={style.main_container}> */}
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
                          // hoverCardImage={`${productImageBaseUrl}${item?.image?.split(",")[1]
                          //   }`}
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
            {/* </div> */}
          </div>
          {/* {categoryPageReduxData?.outStockProduct?.length === outStockItemLength ? (
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
      ) : null
      }` */}
        </>
      ) : null}
      {categoryPageReduxData?.outStockProduct?.length === outStockItemLength ? (
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
