import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addSaveditems} from "@/store/Slices/categorySlice";
import {productImageBaseUrl} from "@/constants/constant";

const SavedItem = () => {
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    // `?parentCategoryId=${homePageReduxData?.productName?.rootID}`,
    `?cityId=${cityId}&userId=84285`,
  );

  useEffect(() => {
    getSavedItems()
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  const data = categoryPageReduxData?.savedProducts;

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Your saved items</h2>
      <div className={styles.main_sub_container}>
        {data?.map((item, index) => {
          return (
            <div className="flex flex-wrap mr-4 mb-4" key={index.toString()}>
              <Card
                cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
                desc={item?.product_name}
                originalPrice={item?.price}
                currentPrice={item?.fc_product_sale_price}
                hoverCardImage={
                  item?.image?.split(",").filter(item => item).length > 1
                    ? productImageBaseUrl + item?.image?.split(",")[1]
                    : productImageBaseUrl + item?.image?.split(",")[0]
                }
                discount={`${Math.round(
                  ((item?.price - item?.fc_product_sale_price) * 100) /
                    item?.price,
                ).toFixed(2)}%`}
                productId={item?.id}
                productName={item?.seourl}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedItem;
