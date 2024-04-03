import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import {
  getLocalStorage,
  getLocalStorageString,
  productImageBaseUrl,
  sortByText,
} from "@/constants/constant";
import SearchCard from "../SeachCard/SearchCard";
import style from "./style.module.css";
import {endPoints} from "@/network/endPoints";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {baseInstance} from "@/network/axios";
import {DownPopUpArrow, ForwardArrow} from "@/assets/icon";
import {useRouter} from "next/navigation";
import {BsEmojiFrown} from "react-icons/bs";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {useAuthentication} from "@/hooks/checkAuthentication";
import SortDropdown from "./SortDropdown";

const defaultKey = 1;
const newSortKey = 2;
const highToLowKey = 3;
const lowToHighKey = 4;

const SearchList = () => {
  const {checkAuthentication} = useAuthentication();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage] = useState(1);
  const router = useRouter();
  const [refreshState, setRefreshState] = useState(1);
  const dispatch = useDispatch();
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const dropDownRefSort = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState(defaultKey);
  const [searchKey, setSearchKey] = useState();

  const city = getLocalStorage("cityId");
  const [searchData, setSearchData] = useState([]);
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    const url = window?.location.pathname.split("/");
    const key = url[url.length - 1].replace(/%20/g, " ");
    setSearchKey(key);

    baseInstance.get(endPoints.searchKey(key, city, sort)).then(res => {
      setSearchData(res?.data?.data?.products);
    });
  }, [sort]);

  const cityIdStr = getLocalStorageString("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);
  const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";

  const getSavedItems = isValid => {
    baseInstance
      .get(
        endPoints.savedItems +
          `?cityId=${cityId}&userId=${
            isValid
              ? decrypt(getLocalStorage("_ga"))
              : decryptBase64(getLocalStorage("tempUserID"))
          }`,
      )
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const validateAuth = async () => {
    const isValid = await checkAuthentication();
    setIsLogin(isValid);

    isValid && getSavedItems(isValid);
  };

  useEffect(() => {
    const isValid = checkAuthentication();
    isValid && getSavedItems();
  }, [refreshState]);

  useEffect(() => {
    validateAuth();
    function handleClickOutside(event) {
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

  const handleSort = (item, index) => {
    setPageNo(1);
    setSelectedOption(item);
    if (item === "New") {
      setSort(newSortKey);
    } else if (item === "Price: Low to High") {
      setSort(lowToHighKey);
    } else if (item === "Price: High to low") {
      setSort(highToLowKey);
    } else {
      setSort(defaultKey);
    }

    setSortOpen(false);
  };

  const handleCardClick = (e, item) => {
    !reduxStateOfLoginPopup && router.push(`/things/${item.id}/${item.seourl}`);
  };

  return (
    <div className={style.conatiner_wrapper}>
      <div className={style.container}>
        <ul className={style.listings}>
          <li className={style.list}>
            <a href="/">
              <p className={`${style.route_text} cursor-pointer`}>Home</p>
            </a>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={style.list}>
            <p className={style.route_text}>
              {`Search results for “${searchKey}”`}
            </p>
          </li>
        </ul>
      </div>

      {/* sort by */}
      <div className={style.sort_div_wrapper}>
        <p className={style.sort_by_text}>Sort By</p>
        <div className={`${style.filter} relative `}>
          <div
            className={style.filterbox}
            onClick={() => {
              toggleDropdownSort();
            }}
            ref={dropDownRefSort}>
            <div className={style.filter_text_container}>
              <p className={`${style.filter_text} !text-[#597492]`}>
                {selectedOption}
              </p>
            </div>
            <div className="cursor-pointer">
              <DownPopUpArrow
                // size={20}
                color={"#597492"}
                className={sortOpen ? style.arrow_up : style.arrow_down}
              />
            </div>
          </div>
        </div>

        <SortDropdown
          isDropdownOpen={sortOpen}
          closeDropdown={() => setSortOpen(false)}
          sortByText={sortByText}
          handleSort={handleSort}
          selectedOption={selectedOption}
        />
      </div>

      {/* Horizontal line */}
      <div className={style.horizontal_line_next}></div>

      {searchData?.length ? (
        <div>
          <InfiniteScroll
            dataLength={searchData?.length}
            next={() => {
              if (pageNo < totalPage) {
                setPageNo(prev => prev + 1);
              }
            }}
            hasMore={true} // Replace with a condition based on your data source
            className="!w-full !h-full"
            style={{overflow: "visible"}}>
            <div className={style.main_container}>
              {searchData?.map((item, index) => {
                return (
                  <div
                    className={`${style.card_box_product} child`}
                    key={index.toString()}
                    onClick={e => handleCardClick(e, item)}>
                    <a
                      href={
                        !reduxStateOfLoginPopup &&
                        `/things/${item.id}/${item.seourl}`
                      }>
                      <SearchCard
                        productWidth={productCardWidth}
                        cardImage={`${productImageBaseUrl}${
                          item?.image?.split(",")[0]
                        }`}
                        productImageBaseUrl
                        desc={item?.product_name}
                        originalPrice={item?.price}
                        soldOut={item?.pq_quantity > 0}
                        currentPrice={item?.sale_price}
                        isImageHeight={true}
                        boxShadowHover={true}
                        hoverCardImage={
                          item?.image?.split(",")[1] !== ""
                            ? productImageBaseUrl + item?.image?.split(",")[1]
                            : productImageBaseUrl + item?.image?.split(",")[0]
                        }
                        discount={`${Math.round(
                          ((item?.price - item?.sale_price) * 100) /
                            item?.price,
                        ).toFixed(0)}%`}
                        productID={item?.id}
                        refreshFunction={setRefreshState}
                        isLogin={isLogin}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className={style.noContentContainer}>
          <BsEmojiFrown className={style.noContentEmoji} color="#9A9AA2" />
          <p className={style.noContentText}>
            Oops! We don’t have any results for your query
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchList;

export const SearchListSkeleton = () => {
  return (
    <div className="mb-8">
      <RentFurnitureSkeleton />
    </div>
  );
};
