import React, {useEffect} from "react";
import styles from "./style.module.css";
import PopOver from "../PopOver";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addAllAndSubCategory} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import Skeleton from "@mui/material/Skeleton";

const MenuList = () => {
  const dispatch = useDispatch();
  // const homePageReduxData = useSelector(state => state.homePagedata);
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const [loading, setLoading] = React.useState(true);
  const {refetch: getAllAndSubCategory} = useQuery(
    "category",
    endPoints.allAndSubCategory,
  );

  useEffect(() => {
    getAllAndSubCategory()
      .then(res => {
        dispatch(addAllAndSubCategory(res?.data?.data));
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.menu_list_wrapper}>
      {loading ? (
        <div className="w-[80%]">
          <Skeleton />
        </div>
      ) : (
        <div className={styles.menu_list_left}>
          {getAllAndSubCategoryData?.map((list, index) => {
            return (
              <div className={styles.item_wrap} key={index.toString()}>
                <PopOver
                  list={list?.sub_categories}
                  item={list?.cat_name}
                  parentCategoryId={list.id}
                />
              </div>
            );
          })}
        </div>
      )}
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
