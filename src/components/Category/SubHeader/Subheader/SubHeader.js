import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {
  categoryIconsUrl,
  getLocalStorage,
  setLocalStorage,
} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useDispatch, useSelector} from "react-redux";
import {ForwardArrow} from "@/assets/icon";
import FilterSortDrawer from "@/components/Common/categoryPopover/categorySideBar";
import {
  addAllProduct,
  addFilterData,
  addFilteredItem,
  addOutStockProduct,
  addSetProduct,
  addSingleProduct,
  isFilterApplied,
} from "@/store/Slices/categorySlice";
import SingleProduct from "../../SingleProduct/SingleProduct";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addProductName, addSubCategoryId} from "@/store/Slices";
import {useRouter} from "next/navigation";

const SubHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [filterListed, setFilterListed] = useState(false);
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const [emptyFilterItem, setEmptyFilterItem] = useState(false);
  const [filterSaved, setfiltereSaved] = useState(false);
  // const category = localStorage.getItem("category")?.replace(/"/g, "");
  // const categoryId = localStorage.getItem("categoryId");
  // const subCategory = localStorage.getItem("subCategory")?.replace(/"/g, "");
  // const subCategoryId = localStorage.getItem("subCategoryId");
  let category;
  let categoryId;
  let subCategoryId;
  let subCategory;

  if (typeof window !== "undefined") {
    categoryId = getLocalStorage("categoryId");
    subCategoryId = getLocalStorage("subCategoryId");
    subCategory = getLocalStorage("subCategory")?.replace(/"/g, "");
    category = getLocalStorage("category")?.replace(/"/g, "");
  }

  const {refetch: getFilterList} = useQuery(
    "filter-list",
    endPoints.categoryFilterOption,
    `?parentCategoryId=${categoryId}&subCategoryId=${subCategoryId}`,
  );

  const handleSelectedProduct = (e, item, mainCategory) => {
    setPageNo(1);
    dispatch(addFilteredItem([]));
    dispatch(addAllProduct(false));
    const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));
    if (typeof window !== "undefined") {
      setLocalStorage("subCategory", item?.cat_name);
    }

    router.push(
      `/next/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
    );
    dispatch(addSubCategoryId(item?.id));

    if (typeof window !== "undefined") {
      setLocalStorage("category", mainCategory?.cat_name);
      setLocalStorage("categoryId", mainCategory?.id);
      setLocalStorage("subCategory", item?.cat_name);
      setLocalStorage("subCategoryId", item?.id);
    }

    dispatch(addProductName(item));

    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
  };

  useEffect(() => {
    getFilterList()
      .then(res => {
        dispatch(addFilterData(res?.data?.data));
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
              <p className={styles.route_text}>{category}</p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>{subCategory}</p>
            </li>
          </ul>
        </div>
        <h1 className={styles.heading}>
          {subCategory} On Rent In {homePageReduxData?.cityName},{subCategory}{" "}
          Furniture Rental
        </h1>
        <div className={styles.category_wrapper}>
          {getAllAndSubCategoryData?.map((item, index) => {
            if (item?.cat_name === category) {
              const subCategoriesWithNewObject = [
                {
                  ...item,
                  cat_name: "All",
                },
                ...item?.sub_categories,
              ];

              return subCategoriesWithNewObject?.map((subItem, i) => {
                const selectedProduct = subCategory === subItem?.cat_name;
                return (
                  <div
                    className={
                      selectedProduct
                        ? styles.category_container_box_active
                        : styles.category_container_box
                    }
                    onClick={e => handleSelectedProduct(e, subItem, item)}
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
              isApplyFilter={false}
              setPageNo={setPageNo}
              setFilterListed={setFilterListed}
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div>
              <CategoryPopover
                btnName={"click"}
                filterName={"Default"}
                setfiltereSaved={setfiltereSaved}
                isApplyFilter={false}
                setPageNo={setPageNo}
                setFilterListed={setFilterListed}
              />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.filter_sort_section_mobile}>
          <div className={styles.filter}>
            <FilterSortDrawer
              filterName={"Filter"}
              setPageNo={setPageNo}
              setFilterListed={setFilterListed}
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div className={styles.filter}>
              <FilterSortDrawer
                filterName={"Default"}
                setPageNo={setPageNo}
                setFilterListed={setFilterListed}
              />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.horizontal_line}></div>
        {categoryPageReduxData?.filteredItems.length !== 0 && filterListed && (
          <div className="flex flex-wrap">
            <div
              className={styles.single_filter_mobile}
              onClick={() => {
                dispatch(addFilteredItem([]));
                dispatch(addSingleProduct([]));
                dispatch(addSetProduct([]));
                dispatch(addOutStockProduct([]));
                dispatch(isFilterApplied(false));
              }}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
            {filterListed && categoryPageReduxData?.filteredItems.length !== 0
              ? categoryPageReduxData?.filteredItems?.map((item, index) => {
                  const words = item.split("_");

                  const capitalizedWords = words.map(word => {
                    if (word.length === 0) return word; // Handle empty words
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  });

                  item = capitalizedWords.join(" ");

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
                dispatch(addSingleProduct([]));
                dispatch(addSetProduct([]));
                dispatch(addOutStockProduct([]));
              }}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
          </div>
        )}
        {/* ------------------------------------------------------------------------------------------------------------- */}
      </div>
      <SingleProduct pageNo={pageNo} setPageNo={setPageNo} />
      {/* <p className="bg-red-400">gfhhmn</p> */}
    </>
  );
};

export default SubHeader;
