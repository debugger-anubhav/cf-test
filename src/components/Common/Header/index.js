"use client";
import React, {useEffect, useState, useRef, memo} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Icons, RecentIcon, TrendingIcon} from "@/assets/icon";
import CommonDrawer from "../Drawer";
import {endPoints} from "@/network/endPoints";
import {
  addCityList,
  selectedCityId,
  addSidebarMenuLists,
  getCartItems,
  selectedCityName,
  setShowCartItem,
  addCategory,
  reduxSetModalState,
} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/store";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {
  getLocalStorage,
  productImageBaseUrl,
  setLocalStorage,
} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import ProfileDropDown from "./ProfileDropDown";
import {
  decrypt,
  decryptBase64,
  encrypt,
  encryptBase64,
} from "@/hooks/cryptoUtils";
import {useIsOnMobile} from "@/hooks/useIsOnMobile";
import LoginModal from "@/components/LoginPopups";
import "react-responsive-modal/styles.css";
import {useAuthentication} from "@/hooks/checkAuthentication";
import EmptyCartModal from "../Drawer/EmptyModal/EmptyCartModal";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./worker.js";

const HEADER_HEIGHT = 32;

const Header = ({page}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isOnMobile = useIsOnMobile();
  const {checkAuthentication} = useAuthentication();

  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const cartItemsLength = useSelector(
    state => state.cartPageData.cartItems.length,
  );
  const {cityList: storeCityList, sidebarMenuLists: storeSideBarMenuLists} =
    useAppSelector(state => state.homePagedata);

  const [openSearchbar, setOpenSearchBar] = useState(false);
  const [topOffset, settopOffset] = useState(78);
  const [arr, setArr] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const wishListCount = categoryPageReduxData?.savedProducts?.length;
  const [isLogin, setIsLogin] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [click, setClick] = useState();
  const [emptyModal, setEmptyModal] = useState(false);
  const [cityForModal, setCityForModal] = useState();
  const [hasScrolled, setHasScrolled] = useState(false);

  const iconRef = useRef(null);

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const toggleEmptyCartModal = bool => {
    dispatch(reduxSetModalState(bool));
    setEmptyModal(bool);
  };

  const cityId = getLocalStorage("cityId");
  if (!cityId) {
    setLocalStorage("cityId", 46);
  }

  useEffect(() => {
    if (openSearchbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSearchbar]);

  useEffect(() => {
    setIsLogin(homePageReduxData.isLogin);
  }, [homePageReduxData.isLogin]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    if (window.scrollY > 90 && windowHeight > 90) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    const cityId = getLocalStorage("cityId") || 46;
    const worker = new Worker();

    worker.onmessage = function ({data}) {
      switch (data.type) {
        case "cities": {
          const {
            citiesData: {matchedCity, cityList},
          } = data;

          if (data.citiesData.matchedCity) {
            dispatch(selectedCityName(matchedCity));
          }
          dispatch(addCityList(cityList));
          dispatch(selectedCityId(cityList?.[0]?.id));

          break;
        }

        case "trendingSearches": {
          const {trendingSearchData} = data;
          setArr(trendingSearchData);
          break;
        }

        case "sidebarData": {
          const {sidebarData} = data;
          dispatch(addSidebarMenuLists(sidebarData));
          break;
        }

        case "session": {
          const {userSessionData} = data;
          if (userId) {
            localStorage.removeItem("user_id");
            const encryptedData = encrypt(userSessionData?.userId);
            setLocalStorage("_ga", encryptedData);
            setLocalStorage("user_name", userSessionData?.userName);
            setLocalStorage("user_email", userSessionData?.email);
          } else {
            setLocalStorage(
              "tempUserID",
              encryptBase64(userSessionData?.tempUserId),
            );
          }
          break;
        }

        case "categories": {
          const {categoryData} = data;
          dispatch(addCategory(categoryData));
          break;
        }
      }
    };
    worker.postMessage({
      cityId,
      sessionData: data,
      fetchCategories: !homePageReduxData?.category.length,
    });

    function handleClickOutside(event) {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    window?.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      worker.terminate();
      window?.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    validateAuth();
  }, [isLogin]);

  const getSavedItems = userIdToUse => {
    baseInstance
      .get(endPoints.savedItems + `?cityId=${cityId}&userId=${userIdToUse}`)
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => {
        if (err?.message === "Request failed with status code 401") {
          console.log("Api is giving 401 because user is not logging");
        }
      });
  };

  const validateAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    setIsLogin(isAuthenticated);
    const userIdToUse = isAuthenticated ? userId : tempUserId;
    fetchCartItems(userIdToUse);
    isAuthenticated && getSavedItems(userIdToUse);
  };

  // added for cart icons
  const fetchCartItems = userIdToUse => {
    baseInstance
      .get(endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
      .then(res => {
        dispatch(getCartItems(res?.data?.data));
        dispatch(setShowCartItem(true));
      })
      .catch(err => {
        console.log(err?.message || "some error");
        dispatch(setShowCartItem(true));
      });
  };

  const data = {
    userId: userId ?? "",
    tempUserId: decryptBase64(getLocalStorage("tempUserID")),
  };

  return (
    <>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        setIsLogin={bool => {
          setIsLogin(bool);
        }}
      />
      <EmptyCartModal
        isModalOpen={emptyModal}
        closeModal={() => toggleEmptyCartModal(false)}
        userId={isLogin ? userId : tempUserId}
        city={cityForModal}
      />
      <div
        className={` ${styles.main} ${modalStateFromRedux ? "!z-0" : ""}  ${
          page === "login" ? "!z-0" : ""
        }`.trim()}
        style={{
          boxShadow: hasScrolled ? "0 4px 4px 0 rgba(0,0,0,.06)" : "none",
        }}>
        <div className={styles.header_wrapper}>
          <div className={styles.header_left_wrapper}>
            <CommonDrawer
              data={storeSideBarMenuLists}
              DrawerName="menu"
              toggleLoginModal={toggleLoginModal}
              setClick={val => setClick(val)}
              click={click}
            />
            <Link href={"/"}>
              <img
                src="https://d3juy0zp6vqec8.cloudfront.net/images/logo.svg"
                alt="cityfurnish-logo"
                className={styles.main_logo}
                width={"100%"}
                height={"100%"}
                loading="lazy"
              />
            </Link>
            <div className={styles.header_city_wrapper}>
              <div className={styles.header_city_name}>
                <CommonDrawer
                  Cities={storeCityList}
                  DrawerName="cities"
                  toggleEmptyCartModal={toggleEmptyCartModal}
                  setCity={val => setCityForModal(val)}
                />
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
                      window.screen.availWidth <= 768 ? 20 : 44;
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
                    loader={({src}) => src}
                    src={Icons.Search}
                    alt="search-icon"
                    className={`pointer-events-none`}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            {openSearchbar && (
              <div className={styles.openSearchbar_div}>
                <SearchModal
                  arr={arr}
                  isOnMobile={isOnMobile}
                  topOffset={topOffset}
                  openSearchbar={openSearchbar}
                  setOpenSearchBar={setOpenSearchBar}
                  hasScrolled={hasScrolled}
                />
              </div>
            )}
            <div className={styles.wishlist_link_wrapper}>
              <div
                className="cursor-pointer"
                // href={isLogin && `/wishlist`}
                onClick={() => {
                  setClick("wishlist");
                  if (isLogin) {
                    router.push("/wishlist");
                  } else {
                    toggleLoginModal(true);
                  }
                }}>
                <div className={`w-100 h-100 absolute z-10`}></div>
                <div
                  className={`${styles.header_favorite_container} relative z-[-1]`}>
                  <Image
                    loader={({src}) => src}
                    src={Icons.Favorite}
                    alt="favorite"
                    className={styles.header_favorite}
                    loading="lazy"
                  />
                  {categoryPageReduxData?.savedProducts?.length > 0 && (
                    <div
                      className={`${styles.cart_badge} top-[-7px] lg:top-[-10px] left-[1.3rem] lg:left-6`}>
                      {wishListCount}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.cart_link_wrapper}>
                <Link href={"/cart"}>
                  <div
                    className={`w-100 h-100 absolute z-10`}
                    onClick={() => router.push("/cart")}></div>
                  <Image
                    loader={({src}) => src}
                    src={Icons.shoppingCard}
                    alt="shopping-card-icon"
                    loading="lazy"
                    className={`${styles.header_shopping_card} relative z-[-1]  mx-4 cursor-pointer`}
                  />
                  {cartItemsLength > 0 && (
                    <div
                      className={`${styles.cart_badge} top-[-7px] lg:top-[-10px] left-[1.8rem] lg:left-8`}>
                      {cartItemsLength}
                    </div>
                  )}
                </Link>
              </div>
              <div
                className={`lg:pt-[14px] lg:pb-[16px] cursor-pointer lg:px-2`}
                onMouseLeave={() => {
                  setShowProfileDropdown(false);
                }}
                onMouseEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLogin) {
                    setShowProfileDropdown(true);
                  }
                }}
                onClick={() => {
                  if (isLogin) router.push("/usersettings");
                  else toggleLoginModal(true);
                }}>
                <div className="cursor-pointer">
                  <div
                    className="relative z-20"
                    onMouseEnter={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isLogin) {
                        setShowProfileDropdown(true);
                      }
                    }}>
                    <Image
                      loader={({src}) => src}
                      src={Icons.Profile}
                      alt="profile-icon"
                      loading="lazy"
                      className={`${styles.header_profile_icon} relative z-10 pointer-events-none`}
                      onClick={e => e.preventDefault()}
                      aria-disabled={true}
                    />
                  </div>
                </div>
              </div>

              {decrypt(getLocalStorage("_ga")) !== null &&
                showProfileDropdown && (
                  <div
                    className="pt-[14px]"
                    onMouseEnter={() => {
                      setShowProfileDropdown(true);
                    }}>
                    <ProfileDropDown
                      setShowProfileDropdown={setShowProfileDropdown}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className={styles.mobile_search_row}>
          <div className={styles.search_wrapper_mobile} style={{width: "100%"}}>
            <input
              placeholder="Search for Furniture, Appliances, etc"
              className={styles.search_input}
              onClick={() => {
                setOpenSearchBar(true);
                if (window.pageYOffset <= HEADER_HEIGHT) {
                  settopOffset(21 + HEADER_HEIGHT - window.pageYOffset);
                } else {
                  settopOffset(
                    !homePageReduxData.announcementBar
                      ? 21
                      : HEADER_HEIGHT + 21,
                  );
                }
              }}
            />
            <Image
              loader={({src}) => src}
              src={Icons.Search}
              alt="search-icon"
              className={`ml-2 pointer-events-none`}
              loading="lazy"
            />
          </div>

          {openSearchbar && (
            <>
              <SearchModal
                arr={arr}
                isOnMobile={isOnMobile}
                topOffset={topOffset}
                openSearchbar={openSearchbar}
                setOpenSearchBar={setOpenSearchBar}
                hasScrolled={hasScrolled}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Header);

// search modal component
const SearchModal = ({
  arr,
  setOpenSearchBar,
  isOnMobile,
  topOffset,
  hasScrolled,
}) => {
  const modalRef = useRef(null);
  const router = useRouter();

  const homePageReduxData = useSelector(state => state.homePagedata);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchedData, setSearchedData] = React.useState(null);
  const [searchApiData, setSearchApiData] = React.useState(null);

  const handleSearch = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const city = getLocalStorage("cityId");

    baseInstance.get(endPoints.searchKey(newSearchTerm, city)).then(res => {
      setSearchApiData(res?.data?.data);
    });

    // Store search term in local storage
    if (
      e.key === "Enter" ||
      e.type === "click" ||
      e.key === "Go" ||
      e.key === "Done" ||
      e.nativeEvent.inputType === "go"
    ) {
      if (newSearchTerm.trim() !== "") {
        const prevStoredSearches = getLocalStorage("searches");
        let storedSearches;
        const searchesArray = prevStoredSearches?.length
          ? prevStoredSearches
          : [];
        const exists = searchesArray.includes(newSearchTerm);
        if (exists) {
          router.push(`/search/${newSearchTerm}`);
          return;
        }
        searchesArray.unshift(newSearchTerm);
        const maxItems = 5;
        const truncatedArray = searchesArray.slice(0, maxItems);
        if (typeof window !== "undefined") {
          // const existingLocal = getLocalStorage("searches");
          // if (existingLocal) {
          //   setLocalStorage("searches", [...existingLocal, truncatedArray]);
          // } else {
          // }
          setLocalStorage("searches", truncatedArray);
          storedSearches = getLocalStorage("searches");
        }
        setSearchedData(storedSearches);
        router.push(`/search/${truncatedArray[0]}`);
      }
    }
  };

  const handleTrending = (item, event) => {
    event.stopPropagation();
    setSearchedData(prev => [...prev, item]);
    baseInstance.get(endPoints.searchKey + item).then(res => {
      setSearchApiData(res?.data?.data);
      const storedSearches = getLocalStorage("searches");
      const searchesArray = storedSearches?.length ? storedSearches : [];
      const exists = searchesArray.includes(item);
      if (exists) {
        const itm = [item];
        setOpenSearchBar(false);
        onSearchClick(itm);
        return;
      }
      searchesArray.unshift(item);
      const truncatedArray = searchesArray.slice(0, 5);
      setLocalStorage("searches", [...truncatedArray]);
    });
    const itm = [item];
    setOpenSearchBar(false);

    onSearchClick(itm);
  };

  useEffect(() => {
    setSearchedData(getLocalStorage("searches") || "");
    // setSearchedData(getLocalStorage("searches") || ["No search history"]);
  }, []);

  const onSearchClick = item => {
    router.push(`/search/${item}`);
  };
  //
  const [tempTopOffset, setTempTopOffset] = useState("78px");

  useEffect(() => {
    if (!hasScrolled && isOnMobile) {
      setTempTopOffset("119px");
    }
    if (isOnMobile && hasScrolled) {
      setTempTopOffset("78px");
    }
    if (homePageReduxData?.announcementBar && isOnMobile) {
      setTempTopOffset("78px");
    }
    if (homePageReduxData?.announcementBar && !isOnMobile) {
      setTempTopOffset("32px");
    }
  }, [hasScrolled, isOnMobile]);

  return (
    <div className={styles.backdrop} onClick={() => setOpenSearchBar(false)}>
      <div
        style={{
          top: tempTopOffset,
        }}
        ref={modalRef}
        className={` ${
          homePageReduxData?.announcementBar // OFF
            ? `w-full absolute md:right-[19%] top-[75px] xs:top-[70px] ms:top-[75px] md:top-[30px] lg:top-[44px] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
            : `w-full absolute md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px] lg:top-24 md:top-20 xs:top-32 sm:top-32 top-[7.5rem] `
        }
        ${hasScrolled && "md:!top-[26px] !top-[70px] "}
`}>
        <div className={styles.search_wrapper_mobile}>
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            value={searchTerm}
            onClick={e => e.stopPropagation()}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyUp={e => handleSearch(e)}
            autoFocus
          />
          <Image
            loader={({src}) => src}
            src={Icons.Search}
            alt="search-icon"
            className={`ml-2 pointer-events-none`}
            loading="lazy"
          />
        </div>
        <div
          className={`${styles.search_wrapper}`}
          onClick={e => e.stopPropagation()}>
          <Image
            loader={({src}) => src}
            src={Icons.Search}
            alt="search-icon"
            className={`pointer-events-none`}
            loading="lazy"
          />
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyUp={e => handleSearch(e)}
          />
        </div>

        <div
          className={styles.search_open_details}
          open={open}
          onClick={e => {
            e.stopPropagation();
          }}>
          <div>
            {searchApiData &&
              searchApiData?.products?.map((item, index) => (
                <div
                  className={styles.search_rasult_wrapper}
                  key={index.toString()}
                  onClick={() =>
                    router.push(`/things/${item.id}/${item.seourl}`)
                  }>
                  <img
                    src={productImageBaseUrl + item?.image?.split(",")[0]}
                    alt={item?.image}
                    className={styles.serach_result_img}
                    loading="lazy"
                  />
                  <p className={styles.search_result_text}>
                    {item.product_name?.replace(/-/g, " ")}
                  </p>
                </div>
              ))}

            {searchApiData &&
              searchApiData?.categories?.map((item, index) => (
                <div
                  className={styles.search_rasult_wrapper}
                  key={index.toString()}
                  onClick={() =>
                    router.push(`/things/${item.id}/${item.seourl}`)
                  }>
                  <img
                    src={productImageBaseUrl + item?.image?.split(",")[0]}
                    alt={item?.image}
                    className={styles.serach_result_img}
                    loading="lazy"
                  />
                  <p className={styles.search_result_text}>
                    {item.product_name?.replace(/-/g, " ")}
                  </p>
                </div>
              ))}
          </div>
          <div>
            {searchedData?.length > 0 && (
              <div>
                <p className={styles.search_head}>Recent</p>
                <div className={styles.pills_wrapper}>
                  {searchedData?.map((item, index) => {
                    return (
                      <>
                        {index < 5 && (
                          <div
                            key={index.toString()}
                            className={styles.pill}
                            onClick={() => {
                              onSearchClick(item);
                            }}>
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
              </div>
            )}
            <p className={styles.search_head}>Trending searches</p>
            <div className={styles.pills_wrapper}>
              {arr?.map((item, index) => (
                <div
                  key={index.toString()}
                  className={styles.pill}
                  onClick={event => handleTrending(item, event)}>
                  <TrendingIcon
                    className={styles.modal_icon}
                    color={"#2D9469"}
                  />
                  <p className={styles.pill_text}>{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className={styles.search_head}>Categories</p>
              <div className={`${styles.categories_wrapper}`}>
                {homePageReduxData?.category?.map((item, index) => {
                  return (
                    <a
                      key={index.toString()}
                      href={`${
                        window?.location.origin
                      }/${homePageReduxData?.cityName
                        .replace(/\//g, "-")
                        ?.toLowerCase()}/${item?.seourl}`}>
                      <div
                        className={styles.category_card_in_searchbox}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            setLocalStorage("categoryId", item?.rootID);
                            setLocalStorage("subCategoryId", item?.id);
                          }
                        }}>
                        <Image
                          loader={({src}) => src}
                          src={
                            "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                            item.category_web_image
                          }
                          alt="RentFurnitureImages"
                          className={styles.categories_img}
                          loading="lazy"
                          width={88}
                          height={100}
                        />
                        <div>
                          <h3 className={styles.category_label}>
                            {item?.cat_name}
                          </h3>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
