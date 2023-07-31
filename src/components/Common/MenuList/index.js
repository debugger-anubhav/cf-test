import React, {useEffect} from "react";
import styles from "./style.module.css";
import PopOver from "../PopOver";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addAllAndSubCategory} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";

const MenuList = () => {
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );

  const {refetch: getAllAndSubCategory} = useQuery(
    "category",
    endPoints.allAndSubCategory,
  );

  useEffect(() => {
    getAllAndSubCategory()
      .then(res => {
        dispatch(addAllAndSubCategory(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.menu_list_wrapper}>
      <div className={styles.menu_list_left}>
        {getAllAndSubCategoryData?.map((list, index) => {
          return (
            <div className={styles.item_wrap} key={index.toString()}>
              <PopOver list={list?.sub_categories} item={list?.cat_name} />
            </div>
          );
        })}
      </div>
      <div className={styles.menu_list_right}>
        <p className={styles.item_wrap}>Offers</p>
        <p className={`${styles.item_wrap}`} style={{marginRight: "0"}}>
          CF for buisness
        </p>
      </div>
    </div>
  );
};
export default MenuList;
