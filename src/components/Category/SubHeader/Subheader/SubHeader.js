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
import {
  addCategoryId,
  addProductName,
  addSubCategoryId,
  selectedCityId,
  selectedCityName,
} from "@/store/Slices";
import {useRouter} from "next/navigation";

const SubHeader = ({params}) => {
  // console.log(params, "a-------")
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
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  console.log(cityId);
  function findSubCategoryByURL(data, browserURL) {
    for (const category of data) {
      for (const subCategory of category.sub_categories) {
        if (subCategory.seourl === browserURL) {
          return {
            cat_name: subCategory.cat_name,
            id: subCategory.id,
            rootID: subCategory.rootID,
          };
        }
      }
    }
    return null; // Return null if no match is found
  }

  function findIdByURL(list, browserURL) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].list_value_seourl === browserURL) {
        dispatch(selectedCityName(browserURL));
        return list[i].id;
      }
    }
    return null;
  }

  const handleFilterRemove = index => {
    if (index > -1) {
      const newFilteredItems = [
        ...categoryPageReduxData?.filteredItems.slice(0, index),
        ...categoryPageReduxData?.filteredItems.slice(index + 1),
      ];
      dispatch(addFilteredItem(newFilteredItems));
    }
  };

  useEffect(() => {
    if (getAllAndSubCategoryData?.length) {
      const matchedCategoryName = findSubCategoryByURL(
        getAllAndSubCategoryData,
        params?.category,
      );
      if (matchedCategoryName !== null) {
        setLocalStorage("subCategory", matchedCategoryName.cat_name);
        setLocalStorage("subCategoryId", matchedCategoryName.id);
        setLocalStorage("categoryId", matchedCategoryName.rootID);
        dispatch(addCategoryId(matchedCategoryName.rootID));
        dispatch(addSubCategoryId(matchedCategoryName.id));
      } else {
        console.log("No matching category found for the browser URL.");
      }
      setTimeout(() => {
        setIsLoading(true);
      }, 5000);
    }

    if (homePageReduxData?.cityList.length) {
      const id = findIdByURL(homePageReduxData?.cityList, params.city);
      if (id !== null) {
        setLocalStorage("cityId", id);
        dispatch(selectedCityId(id));
      } else {
        console.log(`No match found for`);
      }
    }
  }, [homePageReduxData?.cityList.length, getAllAndSubCategoryData?.length]);

  const handleSelectedProduct = (e, item, mainCategory) => {
    setPageNo(1);
    dispatch(addFilteredItem([]));
    dispatch(addAllProduct(false));
    let previousSubCategory;
    if (typeof window !== "undefined") {
      getLocalStorage("subCategory");
      setLocalStorage("subCategory", item?.cat_name);
    }

    router.push(
      `/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
    );
    dispatch(addSubCategoryId(item?.id));

    if (typeof window !== "undefined") {
      setLocalStorage("category", mainCategory?.cat_name);
      setLocalStorage("categoryId", mainCategory?.id);
      setLocalStorage("subCategory", item?.cat_name);
      setLocalStorage("subCategoryId", item?.id);
      dispatch(addCategoryId(mainCategory?.id));
      dispatch(addSubCategoryId(item?.id));
    }

    dispatch(addProductName(item));

    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCategoryId(getLocalStorage("categoryId"));
      setSubCategoryId(getLocalStorage("subCategoryId"));
      setSubCategory(getLocalStorage("subCategory")?.replace(/"/g, ""));
      setCategory(
        getLocalStorage("category")?.replace(/"/g, "") ?? "Home Furniture",
      );
      setCityId(getLocalStorage("cityId"));
    }
  }, []);

  const {refetch: getFilterList} = useQuery(
    "filter-list",
    endPoints.categoryFilterOption,
    // `?parentCategoryId=${categoryId}&subCategoryId=${subCategoryId}`,
    // `?parentCategoryId=${getLocalStorage("categoryId")}&subCategoryId=${getLocalStorage("subCategoryId")}`,
    `?parentCategoryId=${homePageReduxData.categoryId}&subCategoryId=${homePageReduxData.subcategoryId}`,
  );

  useEffect(() => {
    getFilterList()
      .then(res => {
        dispatch(addFilterData(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, [
    categoryId,
    subCategoryId,
    homePageReduxData.categoryId,
    homePageReduxData.subcategoryId,
  ]);

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
              {/* <p className={styles.route_text}>{category}</p> */}
              <p className={styles.route_text}>
                {getLocalStorage("category")?.replace(/"/g, "")}
              </p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              {/* <p className={styles.route_text}>{subCategory}</p> */}
              <p className={styles.route_text}>
                {getLocalStorage("subCategory")?.replace(/"/g, "")}
              </p>
            </li>
          </ul>
        </div>
        <h1 className={styles.heading}>
          {subCategory} On Rent In {homePageReduxData?.cityName}, {subCategory}{" "}
          Rental
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
                const selectedProduct =
                  getLocalStorage("subCategory")?.replace(/"/g, "") ===
                  subItem?.cat_name;
                // console.log(subCategory, subItem?.cat_name, "tesstsst")
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
                        <FilterCard
                          text={item}
                          onRemove={() => handleFilterRemove(index)}
                        />
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
      {isLoading && <SingleProduct pageNo={pageNo} setPageNo={setPageNo} />}
      {/* <p className="bg-red-400">gfhhmn</p> */}
    </>
  );
};

export default SubHeader;
