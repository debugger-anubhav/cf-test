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
import {useRouter, useParams} from "next/navigation";
import SubHeaderSkeleton from "./SubHeaderSkeleton";
import SingleProduct from "../../SingleProduct/SingleProduct";
import axios from "axios";
import {baseURL} from "@/network/axios";

const SubHeader = ({params}) => {
  const dropDownRefFilter = useRef(null);
  const dropDownRefSort = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const query = useParams();
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
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [skeletonOpen, setSkeletonOpen] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showData, setShowData] = useState(false);
  const [seoUrl, setSeoUrl] = useState();
  const [itemCount, setItemCount] = useState(7);

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
    if (index > -1 && categoryPageReduxData?.filteredItems) {
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
    if (item?.cat_name === "All") {
      dispatch(addAllProduct(true));
    } else {
      dispatch(addAllProduct(false));
    }
    setPageNo(1);
    dispatch(addFilteredItem([]));
    let previousSubCategory;
    if (typeof window !== "undefined") {
      setLocalStorage("subCategory", item?.cat_name);
    }

    router.push(
      `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${
        item?.seourl
      }`,
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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setCategoryId(getLocalStorage("categoryId"));
  //     setSubCategoryId(getLocalStorage("subCategoryId"));
  //     setCategory(
  //       getLocalStorage("category")?.replace(/"/g, "") ?? "Home Furniture",
  //     );
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get(baseURL + endPoints.getCategoryIdBySeoUrl(query.category))
      .then(res => {
        setLocalStorage(
          "category",
          res?.data?.data?.parentCategory
            ? res?.data?.data?.parentCategory?.cat_name
            : res?.data?.data?.cat_name,
        );
        setLocalStorage(
          "categoryId",
          res?.data?.data?.parentCategory
            ? res?.data?.data?.parentCategory?.id
            : res?.data?.data?.id,
        );
        setLocalStorage(
          "subCategory",
          res?.data?.data?.parentCategory ? res?.data?.data?.cat_name : "All",
        );
        setLocalStorage("subCategoryId", res?.data?.data?.id);
        setCategory(
          res?.data?.data?.parentCategory
            ? res?.data?.data?.parentCategory?.cat_name
            : res?.data?.data?.cat_name,
        );
        setCategoryId(
          res?.data?.data?.parentCategory
            ? res?.data?.data?.parentCategory?.id
            : res?.data?.data?.id,
        );
        setSubCategory(
          res?.data?.data?.parentCategory ? res?.data?.data?.cat_name : "All",
        );
        setSubCategoryId(res?.data?.data?.id);
      });
  }, []);

  const {refetch: getFilterList} = useQuery(
    "filter-list",
    endPoints.categoryFilterOption,
    `?parentCategoryId=${categoryId}${
      getLocalStorage("subCategory") === "All"
        ? ""
        : `&subCategoryId=${subCategoryId}`
    }`,
  );

  useEffect(() => {
    if (subCategoryId || categoryId) {
      getFilterList()
        .then(res => {
          if (res?.data?.data.length) {
            setShowFilter(true);
          }
          dispatch(addFilterData(res?.data?.data));
          setShowData(true);
        })
        .catch(err => console.log(err));
    }
  }, [
    categoryId,
    subCategoryId,
    homePageReduxData.categoryId,
    homePageReduxData.subcategoryId,
    filtereData.length,
  ]);

  const defaultKey = 1;
  const newSortKey = 2;
  const highToLowKey = 3;
  const lowToHighKey = 4;

  const handleFilterDivClick = (e, filterTag) => {
    let updatedFilteredList = [...categoryPageReduxData?.filteredItems];
    const filterIndex = updatedFilteredList.indexOf(filterTag);

    if (filterIndex === -1) {
      // If the filter is not in the list, add it
      updatedFilteredList.push(filterTag);
    } else {
      // If the filter is already in the list, remove it
      updatedFilteredList = [
        ...updatedFilteredList.slice(0, filterIndex),
        ...updatedFilteredList.slice(filterIndex + 1),
      ];
    }

    dispatch(addFilteredItem(updatedFilteredList));
  };

  const handleApply = () => {
    // var myArray = ["abc", "xyz"];
    // var baseUrl = "https://example.com/my-route?";

    // for (var i = 0; i < myArray.length; i++) {
    //   baseUrl += "filter=" + encodeURIComponent(myArray[i]);

    //   if (i < myArray.length - 1) {
    //     baseUrl += "&";
    //   }
    // }
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
    } else if (item === "Price High to low") {
      dispatch(addSortKey(highToLowKey));
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

  useEffect(() => {
    setSeoUrl(
      getAllAndSubCategoryData?.find(
        item => item?.id === getLocalStorage("categoryId"),
      ),
    );
  }, [getAllAndSubCategoryData]);

  const loadMoreItems = () => {
    setItemCount(itemCount + 7);
  };

  useEffect(() => {
    getAllAndSubCategoryData.forEach(ele => {
      if (ele?.cat_name === category) {
        if (subCategory === "All") {
          setTitle(
            ele?.fc_city_category_data?.cat_heading || ele?.page_heading,
          );
        } else {
          const t = ele?.sub_categories.find(
            el => el?.cat_name === subCategory,
          );
          setTitle(t?.fc_city_category_data?.cat_heading || t?.page_heading);
        }
      }
    });
  }, [getAllAndSubCategoryData, subCategory]);

  return (
    <>
      {skeletonOpen ? (
        <SubHeaderSkeleton />
      ) : (
        <div className={styles.conatiner_wrapper}>
          <div className={styles.container}>
            <ul className={styles.listings}>
              <li className={styles.list}>
                <a href="/cityfurnish" target="_self" rel="noopener">
                  <p className={`${styles.route_text} cursor-pointer`}>Home</p>
                </a>
                <ForwardArrow size={12} color={"#71717A"} />
              </li>
              <li
                className={styles.list}
                onClick={() => {
                  setLocalStorage("subCategory", "All");
                }}>
                <a
                  href={`/${homePageReduxData?.cityName
                    .replace(/\//g, "-")
                    .toLowerCase()}/${seoUrl?.seourl}`}
                  target="_self"
                  rel="noopener">
                  <p className={`${styles.route_text} cursor-pointer`}>
                    {/* {getLocalStorage("category")?.replace(/"/g, "")} */}
                    {category}
                  </p>
                </a>
                <ForwardArrow size={12} color={"#71717A"} />
              </li>
              <li className={styles.list}>
                <p className={styles.route_text}>
                  {/* {getLocalStorage("subCategory")?.replace(/"/g, "")} */}
                  {subCategory}
                </p>
              </li>
            </ul>
          </div>
          <h1 className={styles.heading}>{title}</h1>
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
                  return (
                    <a
                      href={`/${homePageReduxData?.cityName.toLowerCase()}/${
                        item?.seourl
                      }`}
                      onClick={e => {
                        e.preventDefault();
                        setLocalStorage("subCategory", subItem?.cat_name);
                        setLocalStorage("subCategoryId", subItem?.id);
                      }}
                      className="mr-3 md:mr-0"
                      key={i.toString()}>
                      <div
                        className={
                          selectedProduct
                            ? styles.category_container_box_active
                            : styles.category_container_box
                        }
                        onClick={e => handleSelectedProduct(e, subItem, item)}>
                        {selectedProduct ? (
                          <div>
                            <img
                              src={`${categoryIconsUrl}${subItem?.icon_active_image}`}
                              className={styles.selected_icon}
                              alt={subItem.cat_name}
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              src={`${categoryIconsUrl}${subItem?.icon_image}`}
                              className={styles.selected_icon}
                              alt={subItem.cat_name}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <p className={styles.category_container}>
                          {subItem?.cat_name}
                        </p>
                      </div>
                    </a>
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
            {showFilter && (
              <div className="relative" ref={dropDownRefFilter}>
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
                    }}>
                    <div className={styles.filter_text_container}>
                      <p className={`${styles.filter_text} text-71717A`}>
                        Filter
                      </p>
                    </div>
                    <div>
                      <DownPopUpArrow
                        // size={20}

                        color={"#71717A"}
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
                          <>
                            {index < itemCount && (
                              <div
                                className={styles.single_filter_text}
                                key={index.toString()}
                                onClick={e =>
                                  handleFilterDivClick(e, ele?.filter_tag)
                                }>
                                <p
                                  htmlFor={index}
                                  className={styles.option_text}>
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
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    {filtereData.length > itemCount && (
                      <p
                        className={styles.see_more_text}
                        onClick={loadMoreItems}>
                        See more
                      </p>
                    )}
                    <div className="mt-2 w-full flex justify-center">
                      <div
                        className={styles.btn_container}
                        onClick={() => handleApply()}>
                        <p className={styles.apply_btn}>Apply</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

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
              <p className="hidden md:flex items-center mr-2 text-71717A text-base">
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
                      color={"#597492"}
                      className={`!text-[#597492] ${
                        sortOpen ? styles.arrow_up : styles.arrow_down
                      }`}
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
            {showFilter && (
              <div className={styles.filter}>
                <FilterSortDrawer
                  filterName={"Filter"}
                  setPageNo={setPageNo}
                  setFilterListed={setFilterListed}
                />
              </div>
            )}
            <div className="flex items-center justify-center ">
              <p className={`hidden md:flex ${styles.option_text}`}>Sortby</p>
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
              <div className="mb-7 lg:mb-8 flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-2 lg:gap-y-3">
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
                            // style={{background: "red"}}
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

      {showData && <SingleProduct pageNo={pageNo} setPageNo={setPageNo} />}
    </>
  );
};

export default SubHeader;
