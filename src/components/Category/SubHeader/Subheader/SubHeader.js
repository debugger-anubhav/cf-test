import styles from "./style.module.css";
import React, {useState, useEffect, useRef} from "react";
import {
  categoryIconsUrl,
  getLocalStorage,
  setLocalStorage,
  sortByText,
} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
// import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useDispatch, useSelector} from "react-redux";
import {DownPopUpArrow, ForwardArrow} from "@/assets/icon";
import FilterSortDrawer from "@/components/Common/categoryPopover/categorySideBar";
import {
  addAllProduct,
  addFilterData,
  addFilteredItem,
  addOutStockProduct,
  addSetProduct,
  addSingleProduct,
  addSortKey,
  isFilterApplied,
} from "@/store/Slices/categorySlice";
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
import SubHeaderSkeleton from "./SubHeaderSkeleton";
import SingleProduct from "../../SingleProduct/SingleProduct";

const SubHeader = ({params}) => {
  const dropDownRefFilter = useRef(null);
  const dropDownRefSort = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [filterListed, setFilterListed] = useState(false);
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const filtereData = categoryPageReduxData?.filterData;
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [skeletonOpen, setSkeletonOpen] = useState(true);

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
    }

    if (homePageReduxData?.cityList?.length) {
      const id = findIdByURL(homePageReduxData?.cityList, params.city);
      if (id !== null) {
        setLocalStorage("cityId", id);
        dispatch(selectedCityId(id));
      } else {
        console.log(`No match found for`);
      }
    }
  }, [homePageReduxData?.cityList?.length, getAllAndSubCategoryData?.length]);

  const handleSelectedProduct = (e, item, mainCategory) => {
    console.log(item, "itemsss");
    if (item?.cat_name === "All") {
      dispatch(addAllProduct(true));
    } else {
      dispatch(addAllProduct(false));
    }
    setPageNo(1);
    dispatch(addFilteredItem([]));
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
    setTitle(item?.fc_city_category_data?.cat_heading || "");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCategoryId(getLocalStorage("categoryId"));
      setSubCategoryId(getLocalStorage("subCategoryId"));
      setCategory(
        getLocalStorage("category")?.replace(/"/g, "") ?? "Home Furniture",
      );
    }
  }, []);

  const {refetch: getFilterList} = useQuery(
    "filter-list",
    endPoints.categoryFilterOption,
    `?parentCategoryId=${homePageReduxData.categoryId}&subCategoryId=${
      categoryPageReduxData?.isAllProduct ? "" : homePageReduxData.subcategoryId
    }`,
  );

  useEffect(() => {
    if (subCategoryId && categoryId) {
      getFilterList()
        .then(res => {
          dispatch(addFilterData(res?.data?.data));
        })
        .catch(err => console.log(err));
    }
  }, [
    categoryId,
    subCategoryId,
    homePageReduxData.categoryId,
    homePageReduxData.subcategoryId,
  ]);

  const handleTitle = item => {
    if (item?.fc_city_category_data?.cat_heading !== title) {
      setTitle(item?.fc_city_category_data?.cat_heading || "");
    }
  };
  const defaultKey = ["subproducts", "ASC"];
  const newSortKey = ["created", "DESC"];
  const highToLowKey = ["sale_price", "DESC"];
  const lowToHighKey = ["sale_price", "ASC"];
  const handleFilterDivClick = (e, filterTag) => {
    const updatedFilteredList = [...categoryPageReduxData?.filteredItems];
    const filterIndex = updatedFilteredList.indexOf(filterTag);

    if (filterIndex === -1) {
      // If the filter is not in the list, add it
      updatedFilteredList.push(filterTag);
    } else {
      // If the filter is already in the list, remove it
      updatedFilteredList.splice(filterIndex, 1);
    }
    dispatch(addFilteredItem(updatedFilteredList));
  };
  const handleApply = () => {
    setPageNo(1);
    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    dispatch(isFilterApplied(true));
    setFilterListed(true);
    setFilterOpen(false);
  };
  const handleSort = (item, index) => {
    setPageNo(1);
    setSelectedOption(item);
    if (item === "New") {
      dispatch(addSortKey(newSortKey));
    } else if (item === "Price Low to High") {
      dispatch(addSortKey(lowToHighKey));
    } else if (item === "Price Hight to low") {
      dispatch(addSortKey([...highToLowKey]));
    } else {
      dispatch(addSortKey(defaultKey));
    }

    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    setSortOpen(false);
  };
  useEffect(() => {
    if (getAllAndSubCategoryData?.length > 0) {
      setSkeletonOpen(false);
    }
  }, [getAllAndSubCategoryData]);

  // dropdown clickable outside ref
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownRefFilter.current &&
        !dropDownRefFilter.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
      if (
        dropDownRefSort.current &&
        !dropDownRefSort.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdownSort = () => {
    setSortOpen(!sortOpen);
  };

  const toggleDropDownFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      {skeletonOpen ? (
        <SubHeaderSkeleton />
      ) : (
        <div className={styles.conatiner_wrapper}>
          <div className={styles.container}>
            <ul className={styles.listings}>
              <li className={styles.list}>
                <p className={styles.route_text}>Home</p>
                <ForwardArrow size={12} color={"#71717A"} />
              </li>
              <li className={styles.list}>
                <p className={styles.route_text}>
                  {getLocalStorage("category")?.replace(/"/g, "")}
                </p>
                <ForwardArrow size={12} color={"#71717A"} />
              </li>
              <li className={styles.list}>
                <p className={styles.route_text}>
                  {getLocalStorage("subCategory")?.replace(/"/g, "")}
                </p>
              </li>
            </ul>
          </div>
          <h1 className={styles.heading}>{title}</h1>
          <div className={styles.category_wrapper}>
            {getAllAndSubCategoryData?.map((item, index) => {
              if (item?.cat_name === category) {
                handleTitle(item);
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
            {/* <div> */}
            {/* <CategoryPopover
            btnName={"click"}
            filterName={"Filter"}
            emptyFilterItem={emptyFilterItem}
            setfiltereSaved={setfiltereSaved}
            setEmptyFilterItem={setEmptyFilterItem}
            filterSaved={filterSaved}
            isApplyFilter={false}
            setPageNo={setPageNo}
            setFilterListed={setFilterListed}
          /> */}
            <div className="relative">
              <div
                className={`${styles.filter} relative`}

                // onClick={() => setFilterOpen(!fi)}
              >
                <div
                  className={styles.filterbox}
                  onClick={() => {
                    // setFilterOpen(!filterOpen)
                    toggleDropDownFilter();
                    // toggleDropdownSort();
                  }}
                  ref={dropDownRefFilter}>
                  <div className={styles.filter_text_container}>
                    <p className={`${styles.filter_text} text-71717A`}>
                      Filter
                    </p>
                  </div>
                  <div>
                    <DownPopUpArrow
                      size={20}
                      color={"#45454A"}
                      className={
                        filterOpen ? styles.arrow_up : styles.arrow_down
                      }
                    />
                  </div>
                </div>
              </div>
              {filterOpen && (
                <div className=" absolute z-[111] top-12 gap-6 w-[222px] rounded-2xl max-h-[355px] border-[2px] border-71717A bg-white py-4 ">
                  <div className={styles.mapped_filter}>
                    {filtereData?.map((ele, index) => {
                      return (
                        <div
                          className={styles.single_filter_text}
                          key={index.toString()}
                          onClick={e =>
                            handleFilterDivClick(e, ele.filter_tag)
                          }>
                          <p htmlFor={index} className={styles.option_text}>
                            {ele?.filter_name}
                          </p>
                          <input
                            type="checkbox"
                            id={index}
                            name={ele.filter_name}
                            value={ele.filter_tag}
                            checked={categoryPageReduxData?.filteredItems.includes(
                              ele?.filter_tag,
                            )}
                            className="pr-1 cursor-pointer"
                            // onChange={e => handleFilteredItems(e)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 w-full flex justify-center">
                    <div
                      className={styles.btn_container}
                      onClick={() => handleApply()}>
                      <p className={styles.apply_btn}>Apply</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* </div> */}
            {/* <div className="flex items-center justify-center ">
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
          </div> */}

            <div className="relative flex">
              <p className="flex items-center mr-2 text-71717A text-base">
                Sort By
              </p>
              <div
                className={`${styles.filter} relative `}
                // onClick={() => setFilterOpen(!fi)}
              >
                <div
                  className={styles.filterbox}
                  onClick={() => {
                    // setSortOpen(!filterOpen);
                    toggleDropdownSort();
                  }}
                  ref={dropDownRefSort}>
                  <div className={styles.filter_text_container}>
                    <p className={`${styles.filter_text} !text-[#597492]`}>
                      {selectedOption}
                    </p>
                  </div>
                  <div>
                    <DownPopUpArrow
                      size={20}
                      color={"#45454A"}
                      className={sortOpen ? styles.arrow_up : styles.arrow_down}
                    />
                  </div>
                </div>
              </div>
              {sortOpen && (
                <div className="gap-6 absolute z-[111] top-12 right-0 w-[222px] rounded-[20px] border-[2px] border-71717A bg-white py-4">
                  {/* // <div className="gap-6 shadow-md w-[222px] rounded-[20px] border-[2px] border-71717A py-4"> */}
                  {sortByText?.map((ele, index) => {
                    return (
                      <div
                        className={styles.sorted_text}
                        key={index.toString()}
                        onClick={() => handleSort(ele?.text, index)}>
                        <p className={styles.option_text}>{ele.text}</p>
                        <input
                          type="radio"
                          id={index}
                          name="sortBy"
                          value={ele.text}
                          className="cursor-pointer"
                          checked={selectedOption === ele.text}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
          {categoryPageReduxData?.filteredItems.length !== 0 &&
            filterListed && (
              <div className="flex flex-wrap">
                <div
                  className={styles.single_filter_mobile}
                  // className={styles.single_filter}
                  onClick={() => {
                    dispatch(addFilteredItem([]));
                    dispatch(addSingleProduct([]));
                    dispatch(addSetProduct([]));
                    dispatch(addOutStockProduct([]));
                    dispatch(isFilterApplied(false));
                  }}>
                  <p className={styles.clear_All}>Clear all</p>
                </div>
                {filterListed &&
                categoryPageReduxData?.filteredItems.length !== 0
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
                  // className={styles.single_filter_mobile}
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
      )}

      {filtereData && <SingleProduct pageNo={pageNo} setPageNo={setPageNo} />}
    </>
  );
};

export default SubHeader;
