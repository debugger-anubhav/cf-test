import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {productImageBaseUrl} from "@/constants/constant";
import InfiniteScroll from "react-infinite-scroll-component";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSetProduct,
  addSetProductAll,
  addSubCategoryMetaSubProduct,
} from "@/store/Slices/categorySlice";
import SoldOutProduct from "../SoldOutProduct/SoldOutProduct";
import {useParams} from "next/navigation";

const ProductSet = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const comboItemLength =
    categoryPageReduxData?.categoryMetaSubProduct?.totalProduct;

  const categoryId = localStorage.getItem("categoryId")?.replace(/"/g, "");
  const subCategoryId = localStorage
    .getItem("subCategoryId")
    ?.replace(/"/g, "");
  const cityIdStr = localStorage
    .getItem("cityId")
    .toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {productname} = useParams();

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

  const {mutateAsync: getComboProducts} = useMutation(
    "category-combo-product",
    "POST",
    endPoints.categoryComboProduct,
    payload,
  );

  useEffect(() => {
    getComboProducts()
      .then(res => {
        setTotalPage(res?.data?.meta?.totalPage);
        dispatch(addSubCategoryMetaSubProduct(res?.data?.meta));
        if (categoryPageReduxData?.isfilter) {
          if (pageNo === 1) {
            dispatch(addSetProduct([...res?.data?.products]));
          } else {
            dispatch(
              addSetProduct([
                ...categoryPageReduxData?.setProduct,
                ...res?.data?.products,
              ]),
            );
          }
        } else {
          if (categoryPageReduxData?.isAllProduct) {
            dispatch(addSetProductAll([...res?.data?.products]));
          } else {
            if (pageNo === 1) {
              dispatch(addSetProduct([...res?.data?.products]));
            } else {
              dispatch(
                addSetProduct([
                  ...categoryPageReduxData?.setProduct,
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
    ? categoryPageReduxData?.setProductAll
    : categoryPageReduxData?.setProduct;

  return (
    <>
      {data.length ? (
        <div className={style.main_wrapper}>
          <h2 className={style.heading}>Product sets</h2>
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
                        hoverCardImage={
                          item?.image?.split(",").filter(item => item).length >
                          1
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
                  ) : null;
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      ) : null}
      {data?.length === comboItemLength ? <SoldOutProduct /> : null}
    </>
  );
};

export default ProductSet;
