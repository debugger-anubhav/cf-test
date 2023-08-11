import React from "react";
import styles from "./style.module.css";
// import {CloseOutline, DownPopUpArrow} from "@/assets/icon";
import {CategoryFilterData} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useSelector} from "react-redux";

const SubHeader = () => {
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );

  console.log(getAllAndSubCategoryData, "allAndSubCategoryallAndSubCategory");

  return (
    <div className={styles.conatiner_wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <p className={styles.route_text}>Home</p>
            <div className={styles.arrow}></div>
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>Home Furniture</p>
            <div className={styles.arrow}></div>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading}>
        Single & Double Bed On Rent In Noida And Ghaziabad, Bedroom Furniture
        Rental
      </h1>
      <div className={styles.category_wrapper}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <div
              className={styles.category_container_box}
              key={index.toString()}>
              <div className="">
                <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/dining-room-active.svg" />
              </div>
              <p className={styles.category_container}>Home furniture</p>
            </div>
          );
        })}
      </div>

      <div className={styles.filter_sort_section}>
        <div className={styles.filter}>
          <CategoryPopover btnName={"click"} filterName={"Filter"} />
        </div>
        <div className="flex items-center justify-center ">
          <p className={styles.option_text}>Sortby</p>
          <div className={styles.filter}>
            <CategoryPopover btnName={"click"} filterName={"Default"} />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------ */}
      </div>
      <div className={styles.horizontal_line}></div>
      <div className="flex flex-wrap">
        <div className={styles.single_filter_mobile}>
          <p className={styles.clear_All}>Clear all</p>
        </div>
        {CategoryFilterData.map((item, index) => {
          return (
            <>
              <div
                className={styles.filter_card}
                // className="flex justify-between items-center mr-4 mb-4"
                key={index.toString()}>
                <FilterCard text={item.item} />
              </div>
            </>
          );
        })}
        <div className={styles.single_filter}>
          <p className={styles.clear_All}>Clear all</p>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
