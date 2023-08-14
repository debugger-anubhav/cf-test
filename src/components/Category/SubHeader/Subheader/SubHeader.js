import React, {useState} from "react";
import styles from "./style.module.css";
// import {CloseOutline, DownPopUpArrow} from "@/assets/icon";
import {categoryIconsUrl} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useSelector} from "react-redux";
import {ForwardArrow} from "@/assets/icon";
import FilterSortDrawer from "@/components/Common/categoryPopover/categorySideBar";

const SubHeader = () => {
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const [emptyFilterItem, setEmptyFilterItem] = useState(false);
  const [filterSaved, setfiltereSaved] = useState(false);

  console.log(filterSaved, "filterSaved");
  // console.log(emptyFilterItem, "allAndSubCategoryallAndSubCategory");

  // console.log(homePageReduxData?.productName?.cat_name, "homePageReduxData.addProductName?.cat_name")
  return (
    <div className={styles.conatiner_wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <p className={styles.route_text}>Home</p>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>
              {homePageReduxData?.productCategory}
            </p>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>
              {homePageReduxData?.productName?.cat_name}
            </p>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading}>
        Single & Double Bed On Rent In Noida And Ghaziabad, Bedroom Furniture
        Rental
      </h1>
      <div className={styles.category_wrapper}>
        {getAllAndSubCategoryData?.map((item, index) => {
          if (item?.cat_name === homePageReduxData?.productCategory) {
            return item?.sub_categories?.map((subItem, i) => {
              const selectedProduct =
                homePageReduxData?.productName?.cat_name === subItem?.cat_name;
              return (
                <div
                  className={
                    selectedProduct
                      ? styles.category_container_box_active
                      : styles.category_container_box
                  }
                  key={i.toString()}>
                  {selectedProduct ? (
                    <div>
                      <img
                        src={`${categoryIconsUrl}${subItem?.icon_active_image}`}
                        className={styles.selected_icon}
                      />
                    </div>
                  ) : (
                    <div>
                      <img src={`${categoryIconsUrl}${subItem?.icon_image}`} />
                    </div>
                  )}
                  <p className={styles.category_container}>
                    {subItem?.cat_name}
                  </p>
                </div>
              );
            });
          } else return null;
        })}
      </div>

      <div className={styles.filter_sort_section}>
        <div className={styles.filter}>
          <CategoryPopover
            btnName={"click"}
            filterName={"Filter"}
            emptyFilterItem={emptyFilterItem}
            setfiltereSaved={setfiltereSaved}
          />
        </div>
        <div className="flex items-center justify-center ">
          <p className={styles.option_text}>Sortby</p>
          <div className={styles.filter}>
            <CategoryPopover
              btnName={"click"}
              filterName={"Default"}
              setfiltereSaved={setfiltereSaved}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------ */}
      </div>
      <div className={styles.filter_sort_section_mobile}>
        <div className={styles.filter}>
          <FilterSortDrawer filterName={"Filter"} />
          {/* <CategoryPopover btnName={"click"} filterName={"Filter"} emptyFilterItem={emptyFilterItem} setfiltereSaved={setfiltereSaved} /> */}
        </div>
        <div className="flex items-center justify-center ">
          <p className={styles.option_text}>Sortby</p>
          <div className={styles.filter}>
            <FilterSortDrawer filterName={"Default"} />
            {/* <CategoryPopover btnName={"click"} filterName={"Default"} setfiltereSaved={setfiltereSaved} /> */}
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------ */}
      </div>
      <div className={styles.horizontal_line}></div>
      {categoryPageReduxData?.filteredItems.length !== 0 && (
        <div className="flex flex-wrap">
          <div
            className={styles.single_filter_mobile}
            onClick={() => setEmptyFilterItem(true)}>
            <p className={styles.clear_All}>Clear all</p>
          </div>
          {categoryPageReduxData?.filteredItems.length !== 0
            ? categoryPageReduxData?.filteredItems?.map((item, index) => {
                return (
                  <>
                    <div
                      className={styles.filter_card}
                      // className="flex justify-between items-center mr-4 mb-4"
                      key={index.toString()}>
                      <FilterCard text={item} />
                    </div>
                  </>
                );
              })
            : null}
          <div
            className={styles.single_filter}
            onClick={() => setEmptyFilterItem(true)}>
            <p className={styles.clear_All}>Clear all</p>
          </div>
        </div>
      )}
      {/* <div className="flex flex-wrap">
        <div className={styles.single_filter_mobile} onClick={() => setEmptyFilterItem(true)}>
          <p className={styles.clear_All}>Clear all</p>
        </div>
        {categoryPageReduxData?.filteredItems.length !== 0 ? categoryPageReduxData?.filteredItems?.map((item, index) => {
          return (
            <>
              <div
                className={styles.filter_card}
                // className="flex justify-between items-center mr-4 mb-4"
                key={index.toString()}>
                <FilterCard text={item} />
              </div>
            </>
          );
        }) : null}
        <div className={styles.single_filter} onClick={() => setEmptyFilterItem(true)}>
          <p className={styles.clear_All}>Clear all</p>
        </div>
      </div> */}
    </div>
  );
};

export default SubHeader;
