import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
// import {CloseOutline, DownPopUpArrow} from "@/assets/icon";
import {categoryIconsUrl} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useDispatch, useSelector} from "react-redux";
import {ForwardArrow} from "@/assets/icon";
import FilterSortDrawer from "@/components/Common/categoryPopover/categorySideBar";
import {
  addFilterData,
  addFilteredItem,
  isFilterApplied,
} from "@/store/Slices/categorySlice";
import SingleProduct from "../../SingleProduct/SingleProduct";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";

const SubHeader = () => {
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  // const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const [emptyFilterItem, setEmptyFilterItem] = useState(false);
  const [filterSaved, setfiltereSaved] = useState(false);
  const [isApplyFilter, setIsApplyFilter] = useState(false);
  console.log(setIsApplyFilter);

  const category = localStorage.getItem("category").replace(/"/g, "");
  const categoryId = localStorage.getItem("categoryId");
  const subCategory = localStorage.getItem("subCategory").replace(/"/g, "");
  const subCategoryId = localStorage.getItem("subCategoryId");

  const {refetch: getFilterList} = useQuery(
    "filter-list",
    endPoints.categoryFilterOption,
    `?parentCategoryId=${categoryId}&subCategoryId=${subCategoryId}`,
  );

  useEffect(() => {
    getFilterList()
      .then(res => {
        console.log(res?.data?.data, "data");
        dispatch(addFilterData(res?.data?.data));
        // dispatch(addCityList(res?.data?.data));
        // dispatch(selectedCityId(res?.data?.data[0]?.id));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className={styles.conatiner_wrapper}>
        <div className={styles.container}>
          <ul className={styles.listings}>
            <li className={styles.list}>
              <p className={styles.route_text}>Home</p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>
                {category}
                {/* {homePageReduxData?.productCategory} */}
              </p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>
                {subCategory}
                {/* {homePageReduxData?.productName?.cat_name} */}
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
            // if (item?.cat_name === homePageReduxData?.productCategory) {
            if (item?.cat_name === category) {
              const subCategoriesWithNewObject = [
                {
                  ...item,
                  cat_name: "All",
                },
                ...item?.sub_categories,
              ];

              return subCategoriesWithNewObject?.map((subItem, i) => {
                // const selectedProduct =
                //   homePageReduxData?.productName?.cat_name ===
                //   subItem?.cat_name;
                const selectedProduct = subCategory === subItem?.cat_name;
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
                        <img
                          src={`${categoryIconsUrl}${subItem?.icon_image}`}
                          className={styles.selected_icon}
                        />
                      </div>
                    )}
                    <p className={styles.category_container}>
                      {subItem?.cat_name}
                    </p>
                  </div>
                );
              });
            } else {
              // console.log("outttt");
              // Return a placeholder value when the condition is not met
              return null;
            }
          })}
        </div>

        <div className={styles.filter_sort_section}>
          <div>
            <CategoryPopover
              btnName={"click"}
              filterName={"Filter"}
              emptyFilterItem={emptyFilterItem}
              setfiltereSaved={setfiltereSaved}
              setEmptyFilterItem={setEmptyFilterItem}
              filterSaved={filterSaved}
              isApplyFilter={isApplyFilter}
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div>
              <CategoryPopover
                btnName={"click"}
                filterName={"Default"}
                setfiltereSaved={setfiltereSaved}
                isApplyFilter={isApplyFilter}
              />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.filter_sort_section_mobile}>
          <div className={styles.filter}>
            <FilterSortDrawer filterName={"Filter"} />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div className={styles.filter}>
              <FilterSortDrawer filterName={"Default"} />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.horizontal_line}></div>
        {categoryPageReduxData?.filteredItems.length !== 0 && (
          <div className="flex flex-wrap">
            <div
              className={styles.single_filter_mobile}
              onClick={() => {
                dispatch(addFilteredItem([]));
                dispatch(isFilterApplied(false));
                console.log(categoryPageReduxData?.filteredItems, "data");
              }}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
            {categoryPageReduxData?.filteredItems.length !== 0
              ? categoryPageReduxData?.filteredItems?.map((item, index) => {
                  // console.log(item, "itemmmsss filter");
                  return (
                    <>
                      <div
                        className={styles.filter_card}
                        // style={{ background: "red" }}
                        key={index.toString()}>
                        <FilterCard text={item} />
                      </div>
                    </>
                  );
                })
              : null}
            <div
              className={styles.single_filter}
              onClick={() => {
                dispatch(addFilteredItem([]));
                dispatch(isFilterApplied(false));
                console.log(categoryPageReduxData?.filteredItems, "data");
              }}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
          </div>
        )}
        {/* ------------------------------------------------------------------------------------------------------------- */}
      </div>
      <SingleProduct />
    </>
  );
};

export default SubHeader;
