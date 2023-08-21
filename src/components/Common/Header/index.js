"use client";
import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Icons, DownArrow, RecentIcon, TrendingIcon} from "@/assets/icon";
import CommonDrawer from "../Drawer";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addCityList, selectedCityId, addSidebarMenuLists} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/store";

const HEADER_HEIGHT = 48;

const Header = () => {
  const dispatch = useDispatch();
  const [openSearchbar, setOpenSearchBar] = React.useState(false);
  const {cityList: storeCityList, sidebarMenuLists: storeSideBarMenuLists} =
    useAppSelector(state => state.homePagedata);
  const {refetch: getCityList} = useQuery("city-list", endPoints.cityList);
  const {refetch: getTrendingSearch} = useQuery(
    "trending-search",
    endPoints.trendingSearchConstants,
  );
  const {refetch: getSidebarMenuList} = useQuery(
    "sideBarMenuLists",
    endPoints.sidebarMenuLists,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);

  const [topOffset, settopOffset] = useState(0);

  useEffect(() => {
    getCityList()
      .then(res => {
        dispatch(addCityList(res?.data?.data));
        dispatch(selectedCityId(res?.data?.data[0]?.id));
      })
      .catch(err => console.log(err));
    getTrendingSearch()
      .then(res => setArr(res?.data?.data))
      .catch(err => console.log(err));

    getSidebarMenuList().then(res => {
      dispatch(addSidebarMenuLists(res?.data?.data));
    });
  }, []);

  const [arr, setArr] = React.useState(null);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header_wrapper}>
          <div className={styles.header_left_wrapper}>
            <CommonDrawer data={storeSideBarMenuLists} DrawerName="menu" />
            <p className={styles.logo_text}>cityfurnish</p>
            <div className={styles.header_city_wrapper}>
              <div className={styles.header_city_name}>
                <CommonDrawer Cities={storeCityList} DrawerName="cities" />
                <DownArrow size={20} color={"#45454A"} />
              </div>
            </div>
          </div>
          <div className={styles.header_right_wrapper}>
            {!openSearchbar && (
              <div className={styles.open_searchbar_main}>
                <div
                  className={styles.search_wrapper}
                  onClick={() => {
                    setOpenSearchBar(!openSearchbar);
                    const SCREEN_TYPE_OFFSET =
                      window.screen.availWidth <= 768 ? 20 : 40;
                    if (window.pageYOffset <= HEADER_HEIGHT) {
                      settopOffset(
                        (!homePageReduxData.announcementBar
                          ? SCREEN_TYPE_OFFSET + HEADER_HEIGHT
                          : HEADER_HEIGHT) - window.pageYOffset,
                      );
                    } else settopOffset(SCREEN_TYPE_OFFSET);
                  }}>
                  <input
                    placeholder="Search for Furniture, Appliances, etc"
                    className={styles.search_input}
                  />
                  <Image
                    src={Icons.Search}
                    alt="search-icon"
                    className={styles.header_search_icon}
                  />
                </div>
              </div>
            )}
            {openSearchbar && (
              <>
                <SearchModal
                  arr={arr}
                  topOffset={topOffset}
                  openSearchbar={openSearchbar}
                  setOpenSearchBar={setOpenSearchBar}
                />
              </>
            )}

            <Image
              src={Icons.Favorite}
              alt="favorite"
              className={styles.header_favorite}
            />
            <Image
              src={Icons.shoppingCard}
              alt="shopping-card-icon"
              className={styles.header_shopping_card}
            />
            <Image
              src={Icons.Profile}
              alt="profile-icon"
              className={styles.header_profile_icon}
            />
          </div>
        </div>
        <div className={styles.mobile_search_row}>
          <div className={styles.search_wrapper_mobile} style={{width: "100%"}}>
            <input
              placeholder="Search for Furniture, Appliances, etc"
              className={styles.search_input}
              onClick={() => {
                // setOpenSearchBar(!openSearchbar);
                settopOffset(65 - window.pageYOffset);
                console.log("dsajh");
              }}
            />
            <Image
              src={Icons.Search}
              alt="search-icon"
              className={styles.header_search_icon}
            />
          </div>

          {openSearchbar && (
            <>
              <SearchModal
                arr={arr}
                openSearchbar={openSearchbar}
                setOpenSearchBar={setOpenSearchBar}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;

// search modal component
const SearchModal = ({arr, setOpenSearchBar, openSearchbar, topOffset}) => {
  const modalRef = useRef(null);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleClick = event => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      event.target.tagName !== "INPUT"
    ) {
      setOpenSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   console.log(e.target.value, "valueuuu")
  // };

  const handleSearch = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Store search term in local storage
    if (newSearchTerm.trim() !== "") {
      const storedSearches = localStorage.getItem("searches");
      const searchesArray = storedSearches ? JSON.parse(storedSearches) : [];

      // Add new search term to the beginning of the array
      searchesArray.unshift(newSearchTerm);

      // Limit the array to a certain number of items if needed
      const maxItems = 10;
      const truncatedArray = searchesArray.slice(0, maxItems);

      localStorage.setItem("searches", JSON.stringify(truncatedArray));
    }
  };

  const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];

  return (
    <div className={styles.backdrop}>
      <div
        style={{
          top: `${
            !homePageReduxData?.announcementBar ? topOffset : topOffset
          }px`,
        }}
        ref={modalRef}
        className={` ${
          homePageReduxData?.announcementBar
            ? `w-full absolute top-[${topOffset}px] md:top-[16px] lg:top-[44px] md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
            : `w-full absolute md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
        }
`}>
        <div className={styles.search_wrapper_mobile}>
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            value={searchTerm}
            onChange={e => handleSearch(e)}
          />
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={styles.header_search_icon}
          />
        </div>
        <div className={`${styles.search_wrapper}`}>
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={styles.header_search_icon}
          />
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            value={searchTerm}
            onChange={e => handleSearch(e)}
          />
        </div>

        <div className={styles.search_open_details} open={open}>
          <p className={styles.search_head}>Recent</p>
          <div className={styles.pills_wrapper}>
            {storedSearches?.map((item, index) => {
              return (
                <>
                  {index < 5 && (
                    <div key={index.toString()} className={styles.pill}>
                      <RecentIcon
                        className={styles.modal_icon}
                        color={"#E0806A"}
                      />
                      <p className={styles.pill_text}>{item}</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="mt-6"></div>
          <p className={styles.search_head}>Trending searches</p>
          <div className={styles.pills_wrapper}>
            {arr?.map((item, index) => (
              <div key={index.toString()} className={styles.pill}>
                <TrendingIcon className={styles.modal_icon} color={"#2D9469"} />
                <p className={styles.pill_text}>{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className={styles.search_head}>Categories</p>
            <div className={styles.categories_wrapper}>
              {homePageReduxData?.category?.map((item, index) => (
                <div key={index.toString()} className={styles.card_wrapper}>
                  <img
                    src={
                      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/" +
                      item.category_image
                    }
                    alt="RentFurnitureImages"
                    className={styles.categories_img}
                  />
                  <div>
                    <h3 className={styles.category_label}>{item?.cat_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
