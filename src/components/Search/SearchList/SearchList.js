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
import {useQuery} from "@/hooks/useQuery";
import {baseURL} from "@/network/axios";
import axios from "axios";
import {DownPopUpArrow, ForwardArrow} from "@/assets/icon";
import {useRouter} from "next/navigation";
import {BsEmojiFrown} from "react-icons/bs";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";

const defaultKey = 1;
const newSortKey = 2;
const highToLowKey = 3;
const lowToHighKey = 4;

const SearchList = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage] = useState(1);
  const router = useRouter();
  const [refreshState, setRefreshState] = useState(1);
  const dispatch = useDispatch();
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  console.log(reduxStateOfLoginPopup, "reduxStateOfLoginPopup");
  const dropDownRefSort = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState(defaultKey);
  const [searchKey, setSearchKey] = useState();

  const city = getLocalStorage("cityId");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const url = window?.location.pathname.split("/");
    const key = url[url.length - 1].replace(/%20/g, " ");
    setSearchKey(key);

    axios.get(baseURL + endPoints.searchKey(key, city, sort)).then(res => {
      setSearchData(res?.data?.data?.products);
    });
  }, [sort]);

  const cityIdStr = getLocalStorageString("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);
  const productCardWidth = "xl:!w-full lg:!w-[20rem] sm:!w-[18rem]  !w-full ";
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      decrypt(getLocalStorage("_ga")) ??
      decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );

  useEffect(() => {
    getSavedItems()
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        // addSaveditemID
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err));
  }, [refreshState]);

  useEffect(() => {
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
            <a href="/cityfurnish">
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
      <div className="relative flex my-8">
        <p className="hidden md:flex items-center mr-2 text-71717A text-base">
          Sort By
        </p>
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
            <div>
              <DownPopUpArrow
                size={20}
                color={"#45454A"}
                className={sortOpen ? style.arrow_up : style.arrow_down}
              />
            </div>
          </div>
        </div>
        {sortOpen && (
          <div className="gap-6 absolute z-[111] top-12 w-[222px] rounded-[20px] border-[2px] border-71717A bg-white py-4 sm:ml-16">
            {/* // <div className="gap-6 shadow-md w-[222px] rounded-[20px] border-[2px] border-71717A py-4"> */}
            {sortByText?.map((ele, index) => {
              return (
                <div
                  className={style.sorted_text}
                  key={index.toString()}
                  onClick={() => handleSort(ele?.text, index)}>
                  <p className={style.option_text}>{ele.text}</p>
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

      {/* Horizontal line */}
      <div className="bg-DDDDDF h-[2px] w-full"></div>

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
