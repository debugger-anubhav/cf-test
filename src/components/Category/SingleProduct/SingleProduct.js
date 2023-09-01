import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {useParams, useRouter} from "next/navigation";
import style from "./style.module.css";
import ProductSet from "../ProductSet/ProductSet";

import Card from "@/components/Common/HomePageCards";

import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSingleAllProduct,
  addSingleProduct,
  addSubCategoryMetaData,
} from "@/store/Slices/categorySlice";

const SingleProduct = ({pageNo, setPageNo}) => {
  const [totalPage, setTotalPage] = useState(1);
  const router = useRouter();
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

  // const categoryId = localStorage.getItem("categoryId")?.replace(/"/g, "");
  // const subCategoryId = localStorage
  //   .getItem("subCategoryId")
  //   ?.replace(/"/g, "");
  // const cityIdStr = localStorage
  //   .getItem("cityId")
  //   ?.toString()
  //   ?.replace(/"/g, "");
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

  const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";

  const data =
    productname === "all" || categoryPageReduxData?.isAllProduct
      ? bodyDataAll
      : bodyData;

  const singleItemLength =
    categoryPageReduxData?.categoryMetaData?.totalProduct;

  const {mutateAsync: getSingleProducts} = useMutation(
    "category-single-product",
    "POST",
    endPoints.categorySingleProduct,
    data,
  );

  useEffect(() => {
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
  }, [pageNo, categoryPageReduxData?.isfilter, categoryPageReduxData?.sortKey]);
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(style.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
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
                console.log(item, "itemsss");
                return (
                  <div
                    className={`${style.card_box_product} ${style.child}`}
                    key={index.toString()}
                    onClick={e => handleCardClick(e, item)}>
                    <Card
                      productWidth={productCardWidth}
                      cardImage={`${productImageBaseUrl}${
                        item?.image?.split(",")[0]
                      }`}
                      productImageBaseUrl
                      desc={item?.product_name}
                      originalPrice={item?.price}
                      currentPrice={item?.sale_price}
                      isImageHeight={true}
                      // boxShadowHover={true}
                      hoverCardImage={
                        item?.image?.split(",").length > 1
                          ? productImageBaseUrl + item?.image?.split(",")[1]
                          : productImageBaseUrl + item?.image?.split(",")[0]
                      }
                      // hoverCardImage={
                      //   imagesArr?.length > 1 ? productImageBaseUrl + item?.image[1] : productImageBaseUrl + item?.image[0]
                      // }
                      discount={`${Math.round(
                        ((item?.price - item?.sale_price) * 100) / 1000,
                      ).toFixed(2)}%`}
                      productID={item?.id}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      ) : null}
      {singleItemData?.length === singleItemLength ? <ProductSet /> : null}
    </>
  );
};

export default SingleProduct;
