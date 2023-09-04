import React, {useEffect} from "react";
import styles from "./style.module.css";
import PopOver from "../PopOver";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {addAllAndSubCategory} from "@/store/Slices";
import {useQuery} from "@/hooks/useQuery";
import Skeleton from "@mui/material/Skeleton";
import {useRouter} from "next/navigation";
import {getLocalStorage} from "@/constants/constant";

const MenuList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const [loading, setLoading] = React.useState(true);
  const {refetch: getAllAndSubCategory} = useQuery(
    "category",
    // endPoints.allAndSubCategory,
    `${endPoints.allAndSubCategory}?cityId=${getLocalStorage("cityId")},`,
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
                  data={list}
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
        <p
          className={styles.item_wrap}
          onClick={() => {
            router.push("https://cityfurnish.com/pages/offers");
          }}>
          Offers
        </p>
        <p
          className={`${styles.item_wrap}`}
          style={{marginRight: "0"}}
          onClick={() => {
            router.push("https://cityfurnish.com/pages/bulkorder");
          }}>
          CF for business
        </p>
      </div>
    </div>
  );
};
export default MenuList;
