import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import InfiniteScroll from "react-infinite-scroll-component";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSetProduct,
  addSetProductAll,
  addSubCategoryMetaSubProduct,
} from "@/store/Slices/categorySlice";
import {useParams, useRouter} from "next/navigation";
import {SoldOutProduct} from "../SoldOutProduct/SoldOutProduct";
import CategoryCard from "../SingleProduct/CommonCard";

export const ProductSet = () => {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );

  const comboItemLength =
    categoryPageReduxData?.categoryMetaSubProduct?.totalProduct;

  let categoryId;
  let subCategoryId;
  let cityIdStr;

  if (typeof window !== "undefined") {
    categoryId = getLocalStorage("categoryId");
    subCategoryId = getLocalStorage("subCategoryId");
    cityIdStr = getLocalStorage("cityId");
  }

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
            if (pageNo === 1)
              dispatch(addSetProductAll([...res?.data?.products]));
            else
              dispatch(
                addSetProductAll([
                  ...categoryPageReduxData?.setProductAll,
                  ...res?.data?.products,
                ]),
              );
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
  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(style.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
  const data = categoryPageReduxData?.isAllProduct
    ? categoryPageReduxData?.setProductAll
    : categoryPageReduxData?.setProduct;

  return (
    <>
      {data.length ? (
        <>
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
                    return (
                      <div
                        key={index}
                        onClick={e => {
                          !reduxStateOfLoginPopup && handleCardClick(e, item);
                        }}>
                        <CategoryCard
                          cardImage={`${productImageBaseUrl}${
                            item?.image?.split(",")[0]
                          }`}
                          productImageBaseUrl
                          desc={item?.product_name}
                          originalPrice={item?.price}
                          currentPrice={item?.sale_price}
                          hoverCardImage={
                            item?.image?.split(",")[1] !== ""
                              ? productImageBaseUrl + item?.image?.split(",")[1]
                              : productImageBaseUrl + item?.image?.split(",")[0]
                          }
                          discount={`${Math.round(
                            ((item?.price - item?.sale_price) * 100) /
                              item?.price,
                          ).toFixed(0)}%`}
                          productID={item?.id}
                          seourl={item?.seourl}
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
      {data?.length === comboItemLength ? <SoldOutProduct /> : null}
    </>
  );
};

export default ProductSet;
