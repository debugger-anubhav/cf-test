import React, {memo, useEffect, useState} from "react";
import styles from "./style.module.css";
import PopOver from "../PopOver";
import {useDispatch, useSelector} from "react-redux";
import {addAllAndSubCategory, setShowAllRentLink} from "@/store/Slices";
import Skeleton from "@mui/material/Skeleton";
import {getLocalStorage} from "@/constants/constant";
import Link from "next/link";
import Worker from "worker-loader!./menulistWorker.js";

const MenuList = ({hasMb = true}) => {
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const worker = new Worker();
    worker.postMessage({cityId: getLocalStorage("cityId")});

    worker.onmessage = function ({data: {allCategoryAndSubCategoryData}}) {
      dispatch(addAllAndSubCategory(allCategoryAndSubCategoryData));
      dispatch(setShowAllRentLink(true));
      setLoading(false);
    };
  }, []);

  return (
    <div
      className={`${styles.menu_list_wrapper} ${hasMb ? "mb-4" : ""}`.trim()}>
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
          <Link
            rel="noopner noreferrer"
            target="_blank"
            aria-label="citymax"
            href="/citymax">
            <div className={styles.item_wrap}>CityMax</div>
          </Link>
        </div>
      )}
      <div className={styles.menu_list_right}>
        <p className={styles.item_wrap}>
          <a href={"/pages/offers"}>Offers</a>
        </p>
        <p className={`${styles.item_wrap}`} style={{marginRight: "0"}}>
          <Link href="/pages/bulkorder">CF For Business</Link>
        </p>
      </div>
    </div>
  );
};
export default memo(MenuList);
