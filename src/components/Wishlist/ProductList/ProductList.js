import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import {useMutation} from "@/hooks/useMutation";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";

import {
  addSingleAllProduct,
  addSingleProduct,
  addSubCategoryMetaData,
} from "@/store/Slices/categorySlice";

import ProductCard from "../ProductCard/ProductCard";
import style from "./style.module.css";

const ProductList = ({params}) => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const {productname} = useParams();
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

  const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";

  const cityId = parseFloat(cityIdStr);

  const bodyData = {
    parentCategoryId: categoryId,
    subCategoryId,
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

  const data =
    productname === "all" || categoryPageReduxData?.isAllProduct
      ? bodyDataAll
      : bodyData;

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
        .catch(err => console.log(err));
    },
    [pageNo, categoryPageReduxData?.isfilter, categoryPageReduxData?.sortKey],
    subCategoryId,
  );

  const singleItemData = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.singleProductAll
    : categoryPageReduxData?.singleProduct;

  return (
    <>
      <div className={style.conatiner_wrapper}>
        <h1 className={style.heading}>Wishlist({singleItemData?.length})</h1>
      </div>

      {/* {singleItemData?.length ? ( */}
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
            {/* {singleItemData?.map((item, index) => { */}
            {/* return ( */}
            <div
              className={`${style.card_box_product} ${style.child}`}
              // key={index.toString()}
              // onClick={e => handleCardClick(e, item)}
            >
              <ProductCard
                productWidth={productCardWidth}
                // cardImage={`${productImageBaseUrl}${
                //   item?.image?.split(",")[0]
                // }`}
                productImageBaseUrl
                // desc={item?.product_name}
                // originalPrice={item?.price}
                // currentPrice={item?.sale_price}
                isImageHeight={true}
                // boxShadowHover={true}
                // hoverCardImage={
                //   item?.image?.split(",").length > 1
                //     ? productImageBaseUrl + item?.image?.split(",")[1]
                //     : productImageBaseUrl + item?.image?.split(",")[0]
                // }
                // hoverCardImage={
                //   imagesArr?.length > 1 ? productImageBaseUrl + item?.image[1] : productImageBaseUrl + item?.image[0]
                // }
                // discount={`${Math.round(
                //   ((item?.price - item?.sale_price) * 100) / 1000,
                // ).toFixed(2)}%`}
                // productID={item?.id}
              />
            </div>
            {/*  );
               })} */}
          </div>
        </InfiniteScroll>
      </div>
      {/* ) : "No Data"}  */}
      {/* <p className="bg-red-400">gfhhmn</p> */}
    </>
  );
};

export default ProductList;
