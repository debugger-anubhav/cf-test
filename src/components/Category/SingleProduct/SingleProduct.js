import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {productImageBaseUrl} from "@/constants/constant";
import InfiniteScroll from "react-infinite-scroll-component";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSingleAllProduct,
  addSingleProduct,
  addSubCategoryMetaData,
} from "@/store/Slices/categorySlice";
import ProductSet from "../ProductSet/ProductSet";

const SingleProduct = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  // const homePageReduxData = useSelector(state => state.homePagedata);

  const categoryId = localStorage.getItem("categoryId").replace(/"/g, "");
  const subCategoryId = localStorage.getItem("subCategoryId").replace(/"/g, "");
  const subCategory = localStorage.getItem("subCategory").replace(/"/g, "");

  const bodyData = {
    // subCategoryId: homePageReduxData?.productName?.id,
    subCategoryId,
    // parentCategoryId: homePageReduxData?.productName?.rootID,
    parentCategoryId: categoryId,
    cityId: 50,
    pageNo,
  };
  const bodyDataAll = {
    // parentCategoryId: categoryPageReduxData?.parentCategoryId,
    parentCategoryId: categoryId,
    cityId: 50,
    pageNo,
  };

  const data = categoryPageReduxData?.isAllProduct ? bodyDataAll : bodyData;

  const singleItemLength =
    categoryPageReduxData?.categoryMetaData?.totalProduct;
  const {mutateAsync: getSingleProducts} = useMutation(
    "category-single-product",
    "POST",
    endPoints.categorySingleProduct,
    data,
  );

  // console.log(categoryPageReduxData?.categoryMetaData, "meta")
  useEffect(() => {
    dispatch(addSingleProduct([])); // Clear the previous data
    dispatch(addSubCategoryMetaData(null));

    if (subCategory !== "All") {
      // Clear singleProductAll when switching from "All" to any other option
      dispatch(addSingleAllProduct([]));
      dispatch(addSubCategoryMetaData(null));
    }
  }, [subCategory]);

  useEffect(() => {
    getSingleProducts()
      .then(res => {
        setTotalPage(res?.data?.meta?.totalPage);
        dispatch(addSubCategoryMetaData(res?.data?.meta));
        if (categoryPageReduxData?.isAllProduct) {
          dispatch(
            addSingleAllProduct([
              ...categoryPageReduxData?.singleProductAll,
              ...res?.data?.products,
            ]),
          );
        } else {
          dispatch(
            addSingleProduct([
              ...categoryPageReduxData?.singleProduct,
              ...res?.data?.products,
            ]),
          );
        }
        // dispatch(
        //   addSingleProduct([
        //     ...categoryPageReduxData?.singleProduct,
        //     ...res?.data?.products,
        //   ]),
        // );
      })
      .catch(err => console.log(err));
  }, [pageNo, subCategory]);

  const singleItemData = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.singleProductAll
    : categoryPageReduxData?.singleProduct;
  console.log(categoryPageReduxData?.singleProductAll, "singleItemData");

  return singleItemData?.length ? (
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
                    item?.image?.split(",").filter(item => item).length > 1
                      ? productImageBaseUrl + item?.image?.split(",")[1]
                      : productImageBaseUrl + item?.image?.split(",")[0]
                  }
                  discount={`${Math.round(
                    ((item?.price - item?.sale_price) * 100) / 1000,
                  ).toFixed(2)}%`}
                  productId={item?.product_id}
                  productName={item?.product_name.replace(/ /g, "-")}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {categoryPageReduxData?.singleProduct?.length === singleItemLength ? (
        <ProductSet />
      ) : null}
    </div>
  ) : null;
};

export default SingleProduct;
