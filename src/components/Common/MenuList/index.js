import React, {useEffect} from "react";
import styles from "./style.module.css";
import PopOver from "../PopOver";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addAllAndSubCategory, setShowAllRentLink} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import Skeleton from "@mui/material/Skeleton";
import {getLocalStorage} from "@/constants/constant";

const MenuList = ({hasMb = true}) => {
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const [loading, setLoading] = React.useState(true);
  const {refetch: getAllAndSubCategory} = useQuery(
    "category",
    `${endPoints.allAndSubCategory}?cityId=${getLocalStorage("cityId")}`,
  );

  useEffect(() => {
    // if (!getAllAndSubCategoryData?.length) {
    getAllAndSubCategory()
      .then(res => {
        dispatch(addAllAndSubCategory(res?.data?.data));
        dispatch(setShowAllRentLink(true));
        setLoading(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setLoading(false);
      });
    // }
  }, []);

  return (
    <div className={`${styles.menu_list_wrapper} ${hasMb ? "mb-6" : ""}`}>
      {loading && !getAllAndSubCategoryData?.length ? (
        <div className="w-[80%]">
          <Skeleton />
        </div>
      ) : (
        <div className={styles.menu_list_left}>
          {getAllAndSubCategoryData?.map((list, index) => {
            return (
              <div className={styles.item_wrap} key={index.toString()}>
                <PopOver
                  data={list}
                  list={list?.sub_categories}
                  item={list?.cat_name}
                  parentCategoryId={list.id}
                />
              </div>
            );
          })}
          <a
            rel="noopner noreferrer"
            target="_blank"
            aria-label="citymax"
            href="/citymax">
            <div className={styles.item_wrap}>CityMax</div>
          </a>
        </div>
      )}
      <div className={styles.menu_list_right}>
        <p className={styles.item_wrap}>
          <a href={"/pages/offers"}>Offers</a>
        </p>
        <p className={`${styles.item_wrap}`} style={{marginRight: "0"}}>
          <a href="/pages/bulkorder">CF for business</a>
        </p>
      </div>
    </div>
  );
};
export default MenuList;
