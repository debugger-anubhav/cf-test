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
import axios from "axios";
import {baseURL} from "@/network/axios";

const RentFurnitureAndAppliances = ({params}) => {
  const dispatch = useDispatch();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const seoAppliancePageReduxData = useSelector(
    state => state.seoApplianceData,
  );

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      axios
        .get(baseURL + endPoints.seoApplianceRentalSubCategory)
        .then(res => {
          dispatch(setSeoApplianceRentalSubCategory(res?.data?.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(setSeoApplianceRentalSubCategory([]));
        });
    } else if (params?.category === "furniture-rental") {
      axios
        .get(baseURL + endPoints.seoFurnitureRentalSubCategory)
        .then(res => {
          dispatch(setSeoFurnitureRentalSubCategory(res?.data?.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(setSeoFurnitureRentalSubCategory([]));
        });
    } else {
      axios
        .get(baseURL + endPoints.category)
        .then(res => {
          dispatch(addCategory(res?.data?.data));
        })
        .catch(err => {
          console.log(err);
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
        {RentFurniture?.map((item, index) => (
          <div key={index.toString()} className={styles.card_wrapper}>
            <img
              src={
                "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                item.category_web_image
              }
              alt="RentFurnitureImage"
              className={styles.category_img}
            />

            <div className={styles.label_wrapper}>
              <h3 className={styles.label}>{item.cat_name}</h3>
              <p className={styles.desc}>{item.category_description}</p>
            </div>
          </div>
        ))}
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
            className={`${styles.card_wrapper} lg:h-[300px] md:h-[200px] sm:h-[180px] h-[100px]`}>
            <Skeleton variant="rectangular" className="h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
