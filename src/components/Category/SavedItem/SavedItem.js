import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";

const SavedItem = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );

  useEffect(() => {
    getSavedItems()
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        // addSaveditemID
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err));
  }, [categoryPageReduxData.addRemoveWhislitItem]);

  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };
  const data = categoryPageReduxData?.savedProducts;

  return data.length ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Your saved items</h2>
      <div className={styles.main_sub_container}>
        {data?.map((item, index) => {
          return (
            <div
              className={`flex flex-wrap mr-4 mb-4 ${styles.child}`}
              key={index.toString()}
              onClick={e => handleCardClick(e, item)}>
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
                ).toFixed(0)}%`}
                productID={item?.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default SavedItem;
