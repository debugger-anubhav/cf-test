import React, {memo, useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Skeleton from "@mui/material/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {
  addCategory,
  setSeoApplianceRentalSubCategory,
  setSeoFurnitureRentalSubCategory,
} from "@/store/Slices";
import {setLocalStorage} from "@/constants/constant";
import Image from "next/image";
import Worker from "worker-loader!./rentworker.js";
import Link from "next/link";

const RentFurnitureAndAppliances = ({params}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const seoAppliancePageReduxData = useSelector(
    state => state.seoApplianceData,
  );

  useEffect(() => {
    const worker = new Worker();
    worker.postMessage({params});

    worker.onmessage = function (e) {
      const {type, data} = e.data;
      switch (type) {
        case "appliance":
          dispatch(setSeoApplianceRentalSubCategory(data));
          break;

        case "furniture":
          dispatch(setSeoFurnitureRentalSubCategory(data));
          break;

        case "category":
          dispatch(addCategory(data));
      }
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const RentFurniture =
    params.category === "appliances-rental"
      ? seoAppliancePageReduxData.seoApplianceSubCategory
      : params.category === "furniture-rental"
        ? homePageReduxData.seoFurnitureSubCategory
        : homePageReduxData.category;

  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <p className={styles.subhead}>{string.landing_page.Explore_by}</p>
      <div className={styles.card_div}>
        {RentFurniture?.map((item, index) => {
          return (
            <Link
              key={index.toString()}
              target="_self"
              rel="noopener"
              className={styles.card_wrapper}
              onClick={() => {
                if (typeof window !== "undefined") {
                  setLocalStorage("categoryId", item?.rootID);
                  setLocalStorage("subCategoryId", item?.id);
                }
              }}
              href={`/${homePageReduxData?.cityName
                .replace(/\//g, "-")
                ?.toLowerCase()}/${item?.seourl}`}>
              <div>
                <Image
                  loader={({src}) => src}
                  src={
                    "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                    item.category_web_image
                  }
                  alt={item?.cat_name}
                  className={styles.category_img}
                  loading="lazy"
                  width={742}
                  height={734}
                />
              </div>

              <div className={styles.label_wrapper}>
                <h2 className={styles.label}>{item.cat_name}</h2>
                {params === "home-page" && (
                  <p className={styles.desc}>{item.category_description}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default memo(RentFurnitureAndAppliances);

export const RentFurnitureSkeleton = memo(() => {
  return (
    <div className={styles.rent_furniture_wrapper}>
      <Skeleton variant="text" className={styles.Skeleton_text} />
      <Skeleton variant="text" className={styles.Skeleton_sub_text} />
      <div className={`${styles.card_div}`}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index.toString()}
            className={`${styles.card_wrapper} ${styles.skeleton_card_wrapper}`}>
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          </div>
        ))}
      </div>
    </div>
  );
});
