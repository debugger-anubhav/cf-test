"use client";
import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Icons, RecentIcon, TrendingIcon} from "@/assets/icon";
import CommonDrawer from "../Drawer";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
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
// import Link from "next/link";
import {
  getLocalStorage,
  productImageBaseUrl,
  setLocalStorage,
} from "@/constants/constant";
import axios from "axios";
import {baseURL, baseInstance} from "@/network/axios";
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

const HEADER_HEIGHT = 32;

const Header = () => {
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  const {checkAuthentication} = useAuthentication();

  const iconRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const isOnMobile = useIsOnMobile();
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
  const [topOffset, settopOffset] = useState(78);
  const [arr, setArr] = React.useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const wishListCount = categoryPageReduxData?.savedProducts?.length;
  // const [profileIconLink, setProfileIconLink] = useState();
  // const [heartIconLink, setHeartIconLink] = useState();
  const [isLogin, setIsLogin] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [click, setClick] = useState();
  const [emptyModal, setEmptyModal] = useState(false);
  // const [userId, setUserId] = useState(decrypt(getLocalStorage("_ga")));
  const [cityForModal, setCityForModal] = useState();

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  useEffect(() => {
    setIsLogin(homePageReduxData.isLogin);
  }, [homePageReduxData.isLogin]);

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const toggleEmptyCartModal = bool => {
    dispatch(reduxSetModalState(bool));
    setEmptyModal(bool);
    console.log(click);
  };

  const cityId = getLocalStorage("cityId");
  if (!cityId) {
    setLocalStorage("cityId", 46);
  }

  // Example of using decryption

  useEffect(() => {
    // Disable scrolling when the search bar is open
    if (openSearchbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSearchbar]);

  useEffect(() => {
    const cityId = getLocalStorage("cityId") || 46;

    getCityList()
      .then(res => {
        if (cityId) {
          const cityName = res.data.data.find(
            item => item?.id === cityId,
          ).list_value;
          dispatch(selectedCityName(cityName));
        }
        dispatch(addCityList(res?.data?.data));
        dispatch(selectedCityId(res?.data?.data[0]?.id));
      })
      .catch(err => console.log(err));
    getTrendingSearch()
      .then(res => {
        setArr(res?.data?.data);
      })
      .catch(err => console.log(err));

    getSidebarMenuList().then(res => {
      dispatch(addSidebarMenuLists(res?.data?.data));
    });
    if (!homePageReduxData?.category.length) {
      axios
        .get(baseURL + endPoints.category)
        .then(res => {
          dispatch(addCategory(res?.data?.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(addCategory([]));
        });
    }
  }, []);

  const cartItemsLength = useSelector(
    state => state.cartPageData.cartItems.length,
  );

  const getSavedItems = userIdToUse => {
    console.log(baseInstance, "base instanec");
    baseInstance
      .get(endPoints.savedItems + `?cityId=${cityId}&userId=${userIdToUse}`)
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err));
  };

  const validateAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    setIsLogin(isAuthenticated);
    const userIdToUse = isAuthenticated ? userId : tempUserId;
    // setUserId(userIdToUse);
    fetchCartItems(userIdToUse);
    getSavedItems(userIdToUse);
  };

  // added for cart icons
  const fetchCartItems = userIdToUse => {
    axios
      .get(baseURL + endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
      .then(res => {
        // console.log(res, "res in fetch itemms");
        // setArr(res?.data?.data);
        dispatch(getCartItems(res?.data?.data));
        dispatch(setShowCartItem(true));
      })
      .catch(err => {
        console.log(err);
        dispatch(setShowCartItem(true));
      });
  };

  useEffect(() => {
    validateAuth();
  }, [isLogin]);

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const data = {
    userId: userId ?? "",
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    tempUserId: decryptBase64(getLocalStorage("tempUserID")),
  };

  // const {refetch: getSavedItems} = useQuery(
  //   "saved-items",
  //   endPoints.savedItems,
  //   `?cityId=${cityId}&userId=${isLogin ? userId : tempUserId}`,
  // );

  useEffect(() => {
    axios
      .post(baseURL + endPoints.sessionUserUrl, data)
      .then(res => {
        if (userId) {
          localStorage.removeItem("user_id");
          const encryptedData = encrypt(res?.data?.data?.userId);
          setLocalStorage("_ga", encryptedData);
          setLocalStorage("user_name", res?.data?.data?.userName);
        } else {
          setLocalStorage(
            "tempUserID",
            encryptBase64(res?.data?.data?.tempUserId),
          );
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {}, [isLogin]);

  // useEffect(() => {
  //   if (userId) {
  //     setProfileIconLink("/usersettings");
  //     setHeartIconLink("/wishlist");
  //   } else {
  //     setProfileIconLink("https://test.rentofurniture.com/user_sign_up");
  //     setHeartIconLink("https://test.rentofurniture.com/user_sign_up");
  //   }
  // }, [userId]);
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      if (window.scrollY > 90 && windowHeight > 90) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        setIsLogin={bool => {
          setIsLogin(bool);
          // dispatch(setLoginState(bool));
        }}
      />
      <EmptyCartModal
        isModalOpen={emptyModal}
        closeModal={() => toggleEmptyCartModal(false)}
        userId={isLogin ? userId : tempUserId}
        city={cityForModal}
      />
      <div
        className={`${modalStateFromRedux && "!z-0"} ${styles.main}`}
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
            />
            <a
              href={"/"}
              onClick={e => {
                e.preventDefault();
              }}>
              <p
                className={styles.logo_text_main_header}
                onClick={() => router.push("/")}>
                cityfurnish
              </p>
            </a>
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
                    src={Icons.Search}
                    alt="search-icon"
                    className={`${styles.header_search_icon} pointer-events-none`}
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
                />
              </div>
            )}
            <div className={styles.wishlist_link_wrapper}>
              <a
                className="cursor-pointer"
                href={isLogin && `/wishlist`}
                onClick={() => {
                  setClick("wishlist");
                  if (isLogin) {
                    router.push("/wishlist");
                  } else {
                    toggleLoginModal(true);
                    // router.push(
                    //   "https://test.rentofurniture.com/user_sign_up",
                    // );
                  }
                }}>
                <div className={`w-100 h-100 absolute z-10`}></div>
                <div
                  className={`${styles.header_favorite_container} relative z-[-1]`}>
                  <Image
                    src={Icons.Favorite}
                    alt="favorite"
                    className={styles.header_favorite}
                    loading="lazy"
                    // onClick={() => {
                    //   if (userId) {
                    //     router.push("/wishlist");
                    //   } else {
                    //     router.push(
                    //       "https://test.rentofurniture.com/user_sign_up",
                    //     );
                    //   }
                    // }}
                  />
                  {categoryPageReduxData?.savedProducts?.length > 0 && (
                    <div className={styles.cart_badge}>{wishListCount}</div>
                  )}
                </div>
              </a>

              <div className={styles.cart_link_wrapper}>
                <a href={"/cart"}>
                  <div
                    className={`w-100 h-100 absolute z-10`}
                    onClick={() => router.push("/cart")}></div>
                  <Image
                    src={Icons.shoppingCard}
                    alt="shopping-card-icon"
                    loading="lazy"
                    className={`${styles.header_shopping_card} relative z-[-1]`}
                    // onClick={() => router.push("/cart")}
                  />
                  {cartItemsLength > 0 && (
                    <div className={styles.cart_badge}>{cartItemsLength}</div>
                  )}
                </a>
              </div>
              {/* </Link> */}
              <div
                className={`pt-[14px] pb-[16px] pl-8
                  
                  ${styles.test}`}
                onMouseLeave={() => {
                  setShowProfileDropdown(false);
                }}
                onMouseEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLogin) {
                    setShowProfileDropdown(true);
                  }
                }}>
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    // setClick("profile");
                    if (isLogin) router.push("/usersettings");
                    else toggleLoginModal(true);
                  }}
                  href={isLogin && "/usersettings"}
                  rel="noopner noreferrer"
                  target="_self"
                  aria-label="profile">
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
                      src={Icons.Profile}
                      alt="profile-icon"
                      loading="lazy"
                      className={`${styles.header_profile_icon} relative z-10 pointer-events-none`}
                      onClick={e => e.preventDefault()}
                      aria-disabled={true}

                      // ref={iconRef}
                    />
                  </div>
                </a>

                {/* </Link> */}
              </div>

              {/* </div> */}
              {/* {getLocalStorage("user_id") !== null && showProfileDropdown && ( */}
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
              {/* </div> */}
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
              src={Icons.Search}
              alt="search-icon"
              className={`ml-2 ${styles.header_search_icon} pointer-events-none`}
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
const SearchModal = ({arr, setOpenSearchBar, isOnMobile, topOffset}) => {
  const modalRef = useRef(null);
  const router = useRouter();

  const homePageReduxData = useSelector(state => state.homePagedata);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchedData, setSearchedData] = React.useState();
  const [searchApiData, setSearchApiData] = React.useState(null);

  const handleSearch = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const city = getLocalStorage("cityId");

    axios.get(baseURL + endPoints.searchKey(newSearchTerm, city)).then(res => {
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
    axios.get(baseURL + endPoints.searchKey + item).then(res => {
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
    setSearchedData(getLocalStorage("searches") || ["No search history"]);
  }, []);

  const onSearchClick = item => {
    router.push(`/search/${item}`);
  };
  //
  const tempTopOffset = 75;
  const MOBILE_TOP_OFFSET = !homePageReduxData?.announcementBar
    ? tempTopOffset + 50
    : tempTopOffset;

  return (
    <div className={styles.backdrop} onClick={() => setOpenSearchBar(false)}>
      <div
        style={{
          top: `${isOnMobile ? MOBILE_TOP_OFFSET : topOffset}px`,
          // top: TOP_OFFSET,
          // top: `75px`,
        }}
        ref={modalRef}
        className={` ${
          homePageReduxData?.announcementBar // OFF
            ? `w-full absolute md:right-[19%] top-[75px] xs:top-[70px] ms:top-[75px] md:top-[30px] lg:top-[44px] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
            : `w-full absolute md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px] lg:top-24 md:top-20 xs:top-32 sm:top-32 top-[7.5rem] `
        }
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
            src={Icons.Search}
            alt="search-icon"
            className={`ml-2 ${styles.header_search_icon} pointer-events-none`}
            loading="lazy"
          />
        </div>
        <div
          className={`${styles.search_wrapper}`}
          onClick={e => e.stopPropagation()}>
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={`${styles.header_search_icon} pointer-events-none`}
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
                        .toLowerCase()}/${item?.seourl}`}>
                      <div
                        className={styles.category_card_in_searchbox}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            setLocalStorage("categoryId", item?.rootID);
                            setLocalStorage("subCategoryId", item?.id);
                          }
                        }}>
                        <img
                          src={
                            "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/" +
                            item.category_image
                          }
                          alt="RentFurnitureImages"
                          className={styles.categories_img}
                          loading="lazy"
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
