import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Skeleton from "@mui/material/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {
  addCategory,
  setSeoApplianceRentalSubCategory,
  setSeoFurnitureRentalSubCategory,
} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {useRouter} from "next/navigation";
import {setLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import Image from "next/image";

const RentFurnitureAndAppliances = ({params}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const seoAppliancePageReduxData = useSelector(
    state => state.seoApplianceData,
  );

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      baseInstance
        .get(endPoints.seoApplianceRentalSubCategory)
        .then(res => {
          dispatch(setSeoApplianceRentalSubCategory(res?.data?.data));
          // console.log("appliances-rental")
        })
        .catch(err => {
          console.log(err?.message || "some error");
          dispatch(setSeoApplianceRentalSubCategory([]));
        });
    } else if (params?.category === "furniture-rental") {
      baseInstance
        .get(endPoints.seoFurnitureRentalSubCategory)
        .then(res => {
          dispatch(setSeoFurnitureRentalSubCategory(res?.data?.data));
          // console.log("furniture-rental")
        })
        .catch(err => {
          console.log(err?.message || "some error");
          dispatch(setSeoFurnitureRentalSubCategory([]));
        });
    } else {
      baseInstance
        .get(endPoints.category)
        .then(res => {
          dispatch(addCategory(res?.data?.data));
          // console.log("home")
        })
        .catch(err => {
          console.log(err?.message || "some error");
          dispatch(addCategory([]));
        });
    }
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
      <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
      <div className={styles.card_div}>
        {RentFurniture?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={styles.card_wrapper}
              onClick={() => {
                router.push(
                  `/${homePageReduxData?.cityName
                    .replace(/\//g, "-")
                    .toLowerCase()}/${item?.seourl}`,
                );
                if (typeof window !== "undefined") {
                  setLocalStorage("categoryId", item?.rootID);
                  setLocalStorage("subCategoryId", item?.id);
                }
              }}>
              <a
                href={`/${homePageReduxData?.cityName
                  .replace(/\//g, "-")
                  .toLowerCase()}/${item?.seourl}`}
                onClick={e => e.preventDefault()}
                target="_self"
                rel="noopener">
                <Image
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
              </a>

              <div className={styles.label_wrapper}>
                <h3 className={styles.label}>{item.cat_name}</h3>
                {params === "home-page" && (
                  <p className={styles.desc}>{item.category_description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RentFurnitureAndAppliances;

export const RentFurnitureSkeleton = () => {
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
};
