import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";
// import {productImageBaseUrl} from "@/constants/constant";

const SubCategorySection = () => {
  const homePageReduxData = useSelector(state => state.homePagedata);
  console.log(homePageReduxData?.allAndSubCategory, "allAndSubCategory");
  const data = homePageReduxData?.allAndSubCategory;
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        {/* <div className='flex w-full justify-between'> */}
        <h1 className={styles.heading}>Home Furniture</h1>
        <div className={styles.viewButton}>
          <p className={styles.viewAllText}>View all home furniture</p>
          <ForwardArrow size={20} color={"#597492"} />
        </div>
      </div>
      <div className="flex pt-6">
        {data?.map((item, index) => {
          return (
            <div className={styles.card_container} key={index.toString()}>
              <div>
                <img
                  src={
                    "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                    item?.image
                  }
                />
              </div>
              <h3 className={styles.card_text}>{item.cat_name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategorySection;
