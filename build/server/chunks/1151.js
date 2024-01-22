exports.id = 1151;
exports.ids = [1151];
exports.modules = {

/***/ 78117:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(65095);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23191);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24664);
// "use client"







// import {useQuery} from "@/hooks/useQuery";
// import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
// import {endPoints} from "@/network/endPoints";
// import {getLocalStorage} from "@/constants/constant";
// import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
const AnnouncementBar = ()=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const closeBar = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.homePagedata.announcementBar);
    // const categoryPageReduxData = useSelector(state => state.categoryPageData);
    // let cityIdStr;
    // if (typeof window !== "undefined") {
    //   cityIdStr = getLocalStorage("cityId");
    // }
    // const cityId = parseFloat(cityIdStr);
    // const {refetch: getSavedItems} = useQuery(
    //   "saved-items",
    //   endPoints.savedItems,
    //   `?cityId=${cityId}&userId=${
    //     // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    //     decrypt(getLocalStorage("_ga")) ??
    //     decryptBase64(getLocalStorage("tempUserID"))
    //     // JSON.parse(localStorage.getItem("user_id")) ??
    //     // JSON.parse(localStorage.getItem("tempUserID"))
    //   }`,
    // );
    // useEffect(() => {
    //   getSavedItems()
    //     .then(res => {
    //       dispatch(addSaveditems(res?.data?.data));
    //       // addSaveditemID
    //       const ids = res?.data?.data.map(item => {
    //         return item?.id;
    //       });
    //       dispatch(addSaveditemID(ids));
    //     })
    //     .catch(err => console.log(err));
    // }, [categoryPageReduxData.addRemoveWhislitItem]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: !closeBar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().announcement_bar_wrapper),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().announcement_bar_text),
                    children: _constants_Constant_json__WEBPACK_IMPORTED_MODULE_3__.landing_page.announcement_bar
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().announcement_close_icon),
                    onClick: ()=>dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_5__/* .setAnnouncementBar */ .tS)(true)),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                        size: 20,
                        color: "#fff",
                        className: "cursor-pointer"
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnnouncementBar);


/***/ }),

/***/ 49166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Common_Header)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Common/Header/style.module.css
var style_module = __webpack_require__(54559);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(48421);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./src/components/Common/Drawer/index.js
var Drawer = __webpack_require__(47769);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./src/hooks/useQuery.js
var useQuery = __webpack_require__(78490);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/store/index.js
var store = __webpack_require__(80734);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
// EXTERNAL MODULE: ./src/network/axios/index.js
var network_axios = __webpack_require__(62219);
// EXTERNAL MODULE: ./src/components/Common/Header/ProfileDropDown.js
var ProfileDropDown = __webpack_require__(12316);
// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
;// CONCATENATED MODULE: ./src/hooks/useWindowSize.js

const useWindowSize = ()=>{
    const [windowSize, setWindowSize] = (0,react_.useState)({
        width: undefined,
        height: undefined
    });
    (0,react_.useEffect)(()=>{
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
};

;// CONCATENATED MODULE: ./src/hooks/useIsOnMobile.js


const useIsOnMobile = ()=>{
    const windowResize = useWindowSize();
    const [isOnMobile, setisOnMobile] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        setisOnMobile(windowResize.width <= 780);
    }, [
        windowResize
    ]);
    return isOnMobile;
};

// EXTERNAL MODULE: ./src/components/LoginPopups/index.js + 6 modules
var LoginPopups = __webpack_require__(98288);
// EXTERNAL MODULE: ./node_modules/react-responsive-modal/styles.css
var styles = __webpack_require__(14025);
// EXTERNAL MODULE: ./src/hooks/checkAuthentication.js
var hooks_checkAuthentication = __webpack_require__(43334);
// EXTERNAL MODULE: ./src/components/Common/Drawer/EmptyModal/EmptyCartModal.js
var EmptyCartModal = __webpack_require__(45172);
// EXTERNAL MODULE: ./src/store/Slices/categorySlice.js
var categorySlice = __webpack_require__(99166);
;// CONCATENATED MODULE: ./src/components/Common/Header/index.js
/* __next_internal_client_entry_do_not_use__ default auto */ 











// import Link from "next/link";











const HEADER_HEIGHT = 48;
const Header = ()=>{
    const modalStateFromRedux = (0,lib.useSelector)((state)=>state.order.isModalOpen);
    const { checkAuthentication } = (0,hooks_checkAuthentication/* useAuthentication */.J)();
    const iconRef = (0,react_.useRef)(null);
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const isOnMobile = useIsOnMobile();
    const [openSearchbar, setOpenSearchBar] = react_default().useState(false);
    const { cityList: storeCityList, sidebarMenuLists: storeSideBarMenuLists } = (0,store/* useAppSelector */.CG)((state)=>state.homePagedata);
    const { refetch: getCityList } = (0,useQuery/* useQuery */.a)("city-list", endPoints/* endPoints */.z.cityList);
    const { refetch: getTrendingSearch } = (0,useQuery/* useQuery */.a)("trending-search", endPoints/* endPoints */.z.trendingSearchConstants);
    const { refetch: getSidebarMenuList } = (0,useQuery/* useQuery */.a)("sideBarMenuLists", endPoints/* endPoints */.z.sidebarMenuLists);
    const homePageReduxData = (0,lib.useSelector)((state)=>state.homePagedata);
    const [topOffset, settopOffset] = (0,react_.useState)(78);
    const [arr, setArr] = react_default().useState(null);
    const [showProfileDropdown, setShowProfileDropdown] = react_default().useState(false);
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const wishListCount = categoryPageReduxData?.savedProducts?.length;
    // const [profileIconLink, setProfileIconLink] = useState();
    // const [heartIconLink, setHeartIconLink] = useState();
    const [isLogin, setIsLogin] = (0,react_.useState)();
    const [loginModal, setLoginModal] = (0,react_.useState)(false);
    const [click, setClick] = (0,react_.useState)();
    const [emptyModal, setEmptyModal] = (0,react_.useState)(false);
    // const [userId, setUserId] = useState(decrypt(getLocalStorage("_ga")));
    const [cityForModal, setCityForModal] = (0,react_.useState)();
    const userId = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    const tempUserId = (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"));
    (0,react_.useEffect)(()=>{
        setIsLogin(homePageReduxData.isLogin);
    }, [
        homePageReduxData.isLogin
    ]);
    const toggleLoginModal = (bool)=>{
        dispatch((0,Slices/* reduxSetModalState */.V)(bool));
        setLoginModal(bool);
    };
    const toggleEmptyCartModal = (bool)=>{
        console.log("inn");
        dispatch((0,Slices/* reduxSetModalState */.V)(bool));
        setEmptyModal(bool);
    };
    const cityId = (0,constant/* getLocalStorage */.$o)("cityId");
    if (!cityId) {
        (0,constant/* setLocalStorage */.qQ)("cityId", 46);
    }
    // Example of using decryption
    (0,react_.useEffect)(()=>{
        // Disable scrolling when the search bar is open
        if (openSearchbar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [
        openSearchbar
    ]);
    (0,react_.useEffect)(()=>{
        const cityId = (0,constant/* getLocalStorage */.$o)("cityId") || 46;
        getCityList().then((res)=>{
            if (cityId) {
                const cityName = res.data.data.find((item)=>item?.id === cityId).list_value;
                dispatch((0,Slices/* selectedCityName */._6)(cityName));
            }
            dispatch((0,Slices/* addCityList */.Y5)(res?.data?.data));
            dispatch((0,Slices/* selectedCityId */.E8)(res?.data?.data[0]?.id));
        }).catch((err)=>console.log(err));
        getTrendingSearch().then((res)=>{
            setArr(res?.data?.data);
        }).catch((err)=>console.log(err));
        getSidebarMenuList().then((res)=>{
            dispatch((0,Slices/* addSidebarMenuLists */.vB)(res?.data?.data));
        });
        if (!homePageReduxData?.category.length) {
            axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.category).then((res)=>{
                dispatch((0,Slices/* addCategory */.i8)(res?.data?.data));
            }).catch((err)=>{
                console.log(err);
                dispatch((0,Slices/* addCategory */.i8)([]));
            });
        }
    }, []);
    const cartItemsLength = (0,lib.useSelector)((state)=>state.cartPageData.cartItems.length);
    const getSavedItems = (userIdToUse)=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.savedItems + `?cityId=${cityId}&userId=${userIdToUse}`).then((res)=>{
            dispatch((0,categorySlice/* addSaveditems */.tA)(res?.data?.data));
            const ids = res?.data?.data.map((item)=>{
                return item?.id;
            });
            dispatch((0,categorySlice/* addSaveditemID */._L)(ids));
        }).catch((err)=>console.log(err));
    };
    const validateAuth = async ()=>{
        const isAuthenticated = await checkAuthentication();
        setIsLogin(isAuthenticated);
        const userIdToUse = isAuthenticated ? userId : tempUserId;
        // setUserId(userIdToUse);
        fetchCartItems(userIdToUse);
        getSavedItems(userIdToUse);
    };
    // added for cart icons
    const fetchCartItems = (userIdToUse)=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.addToCart.fetchCartItems(cityId, userIdToUse)).then((res)=>{
            // console.log(res, "res in fetch itemms");
            // setArr(res?.data?.data);
            dispatch((0,Slices/* getCartItems */.fq)(res?.data?.data));
            dispatch((0,Slices/* setShowCartItem */.hk)(true));
        }).catch((err)=>{
            console.log(err);
            dispatch((0,Slices/* setShowCartItem */.hk)(true));
        });
    };
    (0,react_.useEffect)(()=>{
        validateAuth();
    }, [
        isLogin
    ]);
    // useEffect(() => {
    //   fetchCartItems();
    // }, []);
    (0,react_.useEffect)(()=>{
        function handleClickOutside(event) {
            if (iconRef.current && !iconRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return ()=>{
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const data = {
        userId: userId ?? "",
        // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
        tempUserId: (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"))
    };
    // const {refetch: getSavedItems} = useQuery(
    //   "saved-items",
    //   endPoints.savedItems,
    //   `?cityId=${cityId}&userId=${isLogin ? userId : tempUserId}`,
    // );
    (0,react_.useEffect)(()=>{
        axios/* default */.Z.post(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.sessionUserUrl, data).then((res)=>{
            if (userId) {
                localStorage.removeItem("user_id");
                const encryptedData = (0,cryptoUtils/* encrypt */.HI)(res?.data?.data?.userId);
                (0,constant/* setLocalStorage */.qQ)("_ga", encryptedData);
                (0,constant/* setLocalStorage */.qQ)("user_name", res?.data?.data?.userName);
            } else {
                (0,constant/* setLocalStorage */.qQ)("tempUserID", (0,cryptoUtils/* encryptBase64 */.FT)(res?.data?.data?.tempUserId));
            }
        }).catch((err)=>console.log(err));
    }, []);
    (0,react_.useEffect)(()=>{}, [
        isLogin
    ]);
    // useEffect(() => {
    //   if (userId) {
    //     setProfileIconLink("/usersettings");
    //     setHeartIconLink("/wishlist");
    //   } else {
    //     setProfileIconLink("https://test.rentofurniture.com/user_sign_up");
    //     setHeartIconLink("https://test.rentofurniture.com/user_sign_up");
    //   }
    // }, [userId]);
    const [hasScrolled, setHasScrolled] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        const handleScroll = ()=>{
            const windowHeight = window.innerHeight;
            if (window.scrollY > 90 && windowHeight > 90) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(LoginPopups/* default */.Z, {
                closeModal: ()=>toggleLoginModal(false),
                isModalOpen: loginModal,
                setIsLogin: (bool)=>{
                    setIsLogin(bool);
                // dispatch(setLoginState(bool));
                },
                handleChangeRoute: ()=>{
                    if (click === "profile") router.push(`/usersettings`);
                    else if (click === "wishlist") router.push(`/wishlist`);
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(EmptyCartModal/* default */.Z, {
                isModalOpen: emptyModal,
                closeModal: ()=>toggleEmptyCartModal(false),
                userId: isLogin ? userId : tempUserId,
                city: cityForModal
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `${modalStateFromRedux && "!z-0"} ${(style_module_default()).main}`,
                style: {
                    boxShadow: hasScrolled ? "0 4px 4px 0 rgba(0,0,0,.06)" : "none"
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).header_wrapper,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (style_module_default()).header_left_wrapper,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Drawer/* default */.Z, {
                                        data: storeSideBarMenuLists,
                                        DrawerName: "menu",
                                        toggleLoginModal: toggleLoginModal,
                                        setClick: (val)=>setClick(val)
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "/",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                        },
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).logo_text_main_header,
                                            onClick: ()=>router.push("/"),
                                            children: "cityfurnish"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).header_city_wrapper,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: (style_module_default()).header_city_name,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(Drawer/* default */.Z, {
                                                Cities: storeCityList,
                                                DrawerName: "cities",
                                                toggleEmptyCartModal: toggleEmptyCartModal,
                                                setCity: (val)=>setCityForModal(val)
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (style_module_default()).header_right_wrapper,
                                children: [
                                    !openSearchbar && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).open_searchbar_main,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (style_module_default()).search_wrapper,
                                            onClick: ()=>{
                                                setOpenSearchBar(!openSearchbar);
                                                const SCREEN_TYPE_OFFSET = window.screen.availWidth <= 768 ? 20 : 44;
                                                if (window.pageYOffset <= HEADER_HEIGHT) {
                                                    settopOffset((!homePageReduxData.announcementBar ? SCREEN_TYPE_OFFSET + HEADER_HEIGHT : HEADER_HEIGHT) - window.pageYOffset);
                                                } else settopOffset(SCREEN_TYPE_OFFSET);
                                            },
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    placeholder: "Search for Furniture, Appliances, etc",
                                                    className: (style_module_default()).search_input
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                    src: icon/* Icons */.PJ.Search,
                                                    alt: "search-icon",
                                                    className: `${(style_module_default()).header_search_icon} pointer-events-none`,
                                                    loading: "lazy"
                                                })
                                            ]
                                        })
                                    }),
                                    openSearchbar && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).openSearchbar_div,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(SearchModal, {
                                            arr: arr,
                                            isOnMobile: isOnMobile,
                                            topOffset: topOffset,
                                            openSearchbar: openSearchbar,
                                            setOpenSearchBar: setOpenSearchBar
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).wishlist_link_wrapper,
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                className: "cursor-pointer",
                                                href: isLogin && `/wishlist`,
                                                onClick: ()=>{
                                                    setClick("wishlist");
                                                    if (isLogin) {
                                                        router.push("/wishlist");
                                                    } else {
                                                        toggleLoginModal(true);
                                                    // router.push(
                                                    //   "https://test.rentofurniture.com/user_sign_up",
                                                    // );
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: `w-100 h-100 absolute z-10`
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: `${(style_module_default()).header_favorite_container} relative z-[-1]`,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                src: icon/* Icons */.PJ.Favorite,
                                                                alt: "favorite",
                                                                className: (style_module_default()).header_favorite,
                                                                loading: "lazy"
                                                            }),
                                                            categoryPageReduxData?.savedProducts?.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: (style_module_default()).cart_badge,
                                                                children: wishListCount
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (style_module_default()).cart_link_wrapper,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                    href: "/cart",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: `w-100 h-100 absolute z-10`,
                                                            onClick: ()=>router.push("/cart")
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: icon/* Icons */.PJ.shoppingCard,
                                                            alt: "shopping-card-icon",
                                                            loading: "lazy",
                                                            className: `${(style_module_default()).header_shopping_card} relative z-[-1]`
                                                        }),
                                                        cartItemsLength > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: (style_module_default()).cart_badge,
                                                            children: cartItemsLength
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: `pt-[14px]  pb-[16px] 
                  
                  ${(style_module_default()).test}`,
                                                onMouseLeave: ()=>{
                                                    setShowProfileDropdown(false);
                                                },
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    className: "cursor-pointer",
                                                    onClick: ()=>{
                                                        // setClick("profile");
                                                        if (isLogin) router.push("/usersettings");
                                                        else toggleLoginModal(true);
                                                    },
                                                    href: isLogin && "/usersettings",
                                                    rel: "noopner noreferrer",
                                                    target: "_self",
                                                    "aria-label": "profile",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "relative z-20",
                                                        onMouseEnter: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            if (isLogin) {
                                                                setShowProfileDropdown(true);
                                                            }
                                                        },
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: icon/* Icons */.PJ.Profile,
                                                            alt: "profile-icon",
                                                            loading: "lazy",
                                                            className: `${(style_module_default()).header_profile_icon} relative z-10 pointer-events-none`,
                                                            onClick: (e)=>e.preventDefault(),
                                                            "aria-disabled": true
                                                        })
                                                    })
                                                })
                                            }),
                                            (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga")) !== null && showProfileDropdown && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "pt-[14px]",
                                                onMouseEnter: ()=>{
                                                    setShowProfileDropdown(true);
                                                },
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(ProfileDropDown/* default */.Z, {
                                                    setShowProfileDropdown: setShowProfileDropdown
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).mobile_search_row,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (style_module_default()).search_wrapper_mobile,
                                style: {
                                    width: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        placeholder: "Search for Furniture, Appliances, etc",
                                        className: (style_module_default()).search_input,
                                        onClick: ()=>{
                                            setOpenSearchBar(true);
                                            if (window.pageYOffset <= HEADER_HEIGHT) {
                                                settopOffset(21 + HEADER_HEIGHT - window.pageYOffset);
                                            } else {
                                                settopOffset(!homePageReduxData.announcementBar ? 21 : HEADER_HEIGHT + 21);
                                            }
                                        }
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: icon/* Icons */.PJ.Search,
                                        alt: "search-icon",
                                        className: `ml-2 ${(style_module_default()).header_search_icon} pointer-events-none`,
                                        loading: "lazy"
                                    })
                                ]
                            }),
                            openSearchbar && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(SearchModal, {
                                    arr: arr,
                                    isOnMobile: isOnMobile,
                                    topOffset: topOffset,
                                    openSearchbar: openSearchbar,
                                    setOpenSearchBar: setOpenSearchBar
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Common_Header = (Header);
// search modal component
const SearchModal = ({ arr, setOpenSearchBar, isOnMobile, topOffset })=>{
    const modalRef = (0,react_.useRef)(null);
    const router = (0,navigation.useRouter)();
    const homePageReduxData = (0,lib.useSelector)((state)=>state.homePagedata);
    const [searchTerm, setSearchTerm] = react_default().useState("");
    const [searchedData, setSearchedData] = react_default().useState();
    const [searchApiData, setSearchApiData] = react_default().useState(null);
    const handleSearch = (e)=>{
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const city = (0,constant/* getLocalStorage */.$o)("cityId");
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.searchKey(newSearchTerm, city)).then((res)=>{
            setSearchApiData(res?.data?.data);
        });
        // Store search term in local storage
        if (e.key === "Enter" || e.type === "click" || e.key === "Go" || e.key === "Done" || e.nativeEvent.inputType === "go") {
            if (newSearchTerm.trim() !== "") {
                const prevStoredSearches = (0,constant/* getLocalStorage */.$o)("searches");
                let storedSearches;
                const searchesArray = prevStoredSearches?.length ? prevStoredSearches : [];
                const exists = searchesArray.includes(newSearchTerm);
                if (exists) {
                    router.push(`/search/${newSearchTerm}`);
                    return;
                }
                searchesArray.unshift(newSearchTerm);
                const maxItems = 5;
                const truncatedArray = searchesArray.slice(0, maxItems);
                if (false) {}
                setSearchedData(storedSearches);
                router.push(`/search/${truncatedArray[0]}`);
            }
        }
    };
    const handleTrending = (item, event)=>{
        event.stopPropagation();
        setSearchedData((prev)=>[
                ...prev,
                item
            ]);
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.searchKey + item).then((res)=>{
            setSearchApiData(res?.data?.data);
            const storedSearches = (0,constant/* getLocalStorage */.$o)("searches");
            const searchesArray = storedSearches?.length ? storedSearches : [];
            const exists = searchesArray.includes(item);
            if (exists) {
                const itm = [
                    item
                ];
                setOpenSearchBar(false);
                onSearchClick(itm);
                return;
            }
            searchesArray.unshift(item);
            const truncatedArray = searchesArray.slice(0, 5);
            // if (storedSearches?.length) {
            //   setLocalStorage("searches", [...truncatedArray]);
            // } else {
            //   setLocalStorage("searches", truncatedArray);
            // }
            (0,constant/* setLocalStorage */.qQ)("searches", [
                ...truncatedArray
            ]);
        });
        const itm = [
            item
        ];
        setOpenSearchBar(false);
        onSearchClick(itm);
    };
    (0,react_.useEffect)(()=>{
        setSearchedData((0,constant/* getLocalStorage */.$o)("searches") || [
            "No search history"
        ]);
    }, []);
    const onSearchClick = (item)=>{
        router.push(`/search/${item}`);
    };
    //
    const MOBILE_TOP_OFFSET = !homePageReduxData?.announcementBar ? topOffset + 50 : topOffset;
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (style_module_default()).backdrop,
        onClick: ()=>setOpenSearchBar(false),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            style: {
                top: `${isOnMobile ? MOBILE_TOP_OFFSET : topOffset}px`
            },
            ref: modalRef,
            className: ` ${homePageReduxData?.announcementBar // OFF
             ? `w-full absolute md:right-[19%] top-[75px] xs:top-[70px] ms:top-[75px] md:top-[30px] lg:top-[44px] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]` : `w-full absolute md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px] lg:top-24 md:top-20 xs:top-32 sm:top-32 top-[7.5rem] `}
`,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).search_wrapper_mobile,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            placeholder: "Search for Furniture, Appliances, etc",
                            className: (style_module_default()).search_input,
                            value: searchTerm,
                            onClick: (e)=>e.stopPropagation(),
                            onChange: (e)=>setSearchTerm(e.target.value),
                            onKeyUp: (e)=>handleSearch(e),
                            autoFocus: true
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: icon/* Icons */.PJ.Search,
                            alt: "search-icon",
                            className: `ml-2 ${(style_module_default()).header_search_icon} pointer-events-none`,
                            loading: "lazy"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: `${(style_module_default()).search_wrapper}`,
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: icon/* Icons */.PJ.Search,
                            alt: "search-icon",
                            className: `${(style_module_default()).header_search_icon} pointer-events-none`,
                            loading: "lazy"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            placeholder: "Search for Furniture, Appliances, etc",
                            className: (style_module_default()).search_input,
                            autoFocus: true,
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            onKeyUp: (e)=>handleSearch(e)
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).search_open_details,
                    open: open,
                    onClick: (e)=>{
                        e.stopPropagation();
                    },
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                searchApiData && searchApiData?.products?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).search_rasult_wrapper,
                                        onClick: ()=>router.push(`/things/${item.id}/${item.seourl}`),
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                src: constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                                                alt: item?.image,
                                                className: (style_module_default()).serach_result_img,
                                                loading: "lazy"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).search_result_text,
                                                children: item.product_name?.replace(/-/g, " ")
                                            })
                                        ]
                                    }, index.toString())),
                                searchApiData && searchApiData?.categories?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).search_rasult_wrapper,
                                        onClick: ()=>router.push(`/things/${item.id}/${item.seourl}`),
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                src: constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                                                alt: item?.image,
                                                className: (style_module_default()).serach_result_img,
                                                loading: "lazy"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).search_result_text,
                                                children: item.product_name?.replace(/-/g, " ")
                                            })
                                        ]
                                    }, index.toString()))
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).search_head,
                                    children: "Recent"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (style_module_default()).pills_wrapper,
                                    children: searchedData?.map((item, index)=>{
                                        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: index < 5 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (style_module_default()).pill,
                                                onClick: ()=>{
                                                    onSearchClick(item);
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* RecentIcon */.Q8, {
                                                        className: (style_module_default()).modal_icon,
                                                        color: "#E0806A"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (style_module_default()).pill_text,
                                                        children: item
                                                    })
                                                ]
                                            }, index.toString())
                                        });
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "mt-6"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).search_head,
                                    children: "Trending searches"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (style_module_default()).pills_wrapper,
                                    children: arr?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (style_module_default()).pill,
                                            onClick: (event)=>handleTrending(item, event),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(icon/* TrendingIcon */.Ql, {
                                                    className: (style_module_default()).modal_icon,
                                                    color: "#2D9469"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).pill_text,
                                                    children: item
                                                })
                                            ]
                                        }, index.toString()))
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "mt-6",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).search_head,
                                            children: "Categories"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: `${(style_module_default()).categories_wrapper}`,
                                            children: homePageReduxData?.category?.map((item, index)=>{
                                                return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: `${window?.location.origin}/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${item?.seourl}`,
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: (style_module_default()).category_card_in_searchbox,
                                                        onClick: ()=>{
                                                            if (false) {}
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                src: "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/" + item.category_image,
                                                                alt: "RentFurnitureImages",
                                                                className: (style_module_default()).categories_img,
                                                                loading: "lazy"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                    className: (style_module_default()).category_label,
                                                                    children: item?.cat_name
                                                                })
                                                            })
                                                        ]
                                                    })
                                                }, index.toString());
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};


/***/ }),

/***/ 67006:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Common_MenuList)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Common/MenuList/style.module.css
var style_module = __webpack_require__(20766);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./src/components/Common/PopOver/style.module.css
var PopOver_style_module = __webpack_require__(31700);
var PopOver_style_module_default = /*#__PURE__*/__webpack_require__.n(PopOver_style_module);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
// EXTERNAL MODULE: ./src/store/Slices/categorySlice.js
var categorySlice = __webpack_require__(99166);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(46661);
;// CONCATENATED MODULE: ./src/components/Common/PopOver/index.js











const PopOver = ({ list, item, parentCategoryId, data })=>{
    const homePageReduxData = (0,lib.useSelector)((state)=>state.homePagedata);
    const hoverRef = react_.useRef("");
    const [anchorEl, setAnchorEl] = react_.useState(null);
    const router = (0,navigation.useRouter)();
    const dispatch = (0,lib.useDispatch)();
    const handleCategory = (event)=>{
        setAnchorEl(event.currentTarget);
        dispatch((0,categorySlice/* addAllProduct */.ZY)(true));
        dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
        let previouseSubCategory;
        if (false) {}
        dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
        dispatch((0,Slices/* addProductCategory */.Vh)(hoverRef.current));
        if (false) {}
        dispatch((0,categorySlice/* addParentCategoryId */.tx)(parentCategoryId));
        dispatch((0,Slices/* addProductName */.jx)(item));
        dispatch((0,Slices/* addSubCategoryId */.C7)(""));
        dispatch((0,Slices/* addProductName */.jx)(null));
        dispatch((0,categorySlice/* addAllProduct */.ZY)(true));
        if (previouseSubCategory !== "All") {
            dispatch((0,categorySlice/* addSingleAllProduct */.NK)([]));
            dispatch((0,categorySlice/* addSetProductAll */.SG)([]));
            dispatch((0,categorySlice/* addOutStockProductAll */.k)([]));
        }
        router.push(`/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${data.seourl}`);
        if (item === "Combos") {
            dispatch((0,categorySlice/* addIsCombos */.xb)(true));
        } else {
            dispatch((0,categorySlice/* addIsCombos */.xb)(false));
        }
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    const handMainCategory = (e)=>{
        dispatch((0,categorySlice/* addAllProduct */.ZY)(true));
        let previouseSubCategory;
        if (false) {}
        dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
        dispatch((0,Slices/* addProductCategory */.Vh)(hoverRef.current));
        if (false) {}
        dispatch((0,categorySlice/* addParentCategoryId */.tx)(parentCategoryId));
        dispatch((0,Slices/* addProductName */.jx)(item));
        dispatch((0,Slices/* addSubCategoryId */.C7)(""));
        dispatch((0,Slices/* addProductName */.jx)(null));
        dispatch((0,categorySlice/* addAllProduct */.ZY)(true));
        if (previouseSubCategory !== "All") {
            dispatch((0,categorySlice/* addSingleAllProduct */.NK)([]));
            dispatch((0,categorySlice/* addSetProductAll */.SG)([]));
            dispatch((0,categorySlice/* addOutStockProductAll */.k)([]));
        }
        setAnchorEl(null);
    // router.push(
    //   `/${homePageReduxData?.cityName.toLowerCase()}/${data?.seourl}`,
    // );
    };
    const handleSelectedProduct = (e, item)=>{
        dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
        dispatch((0,categorySlice/* addAllProduct */.ZY)(false));
        const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));
        // router.push(
        //   `/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
        // );
        if (false) {}
        dispatch((0,Slices/* addSubCategoryId */.C7)(item?.id));
        dispatch((0,Slices/* addProductName */.jx)(item));
        dispatch((0,Slices/* addProductCategory */.Vh)(hoverRef.current));
        if (previousSubCategory !== item?.cat_name) {
            dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
            dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
            dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        }
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        onMouseLeave: ()=>{
            setAnchorEl("");
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${data?.seourl}`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    onClick: (e)=>handleCategory(e),
                    className: "flex items-center whitespace-nowrap cursor-pointer",
                    onMouseEnter: (e)=>{
                        setAnchorEl(e.currentTarget);
                        hoverRef.current = item;
                    },
                    children: [
                        item,
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownArrow */.pL, {
                            size: 20,
                            color: "#45454A",
                            // onMouseLeave={() => {
                            //   setAnchorEl(null);
                            //   hoverRef.current = "";
                            // }}
                            className: open ? (PopOver_style_module_default()).arrow_up : (PopOver_style_module_default()).arrow_down
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(node.Popper, {
                id: id,
                open: open,
                anchorEl: anchorEl,
                onClose: handleClose,
                // onMouseLeave={handleClose}
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                sx: {
                    zIndex: 2
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box["default"], {
                    className: (PopOver_style_module_default()).sub_item_wrapper,
                    sx: {
                        mt: 2.4
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${data?.seourl}`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (PopOver_style_module_default()).sub_item,
                                onClick: handMainCategory,
                                children: "All"
                            })
                        }),
                        list?.map((item, index)=>{
                            return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${item?.seourl}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (PopOver_style_module_default()).sub_item,
                                    onClick: (e)=>handleSelectedProduct(e, item),
                                    children: item?.cat_name
                                })
                            }, index.toString());
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const Common_PopOver = (PopOver);

// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./src/hooks/useQuery.js
var useQuery = __webpack_require__(78490);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Skeleton/index.js
var Skeleton = __webpack_require__(35885);
var Skeleton_default = /*#__PURE__*/__webpack_require__.n(Skeleton);
;// CONCATENATED MODULE: ./src/components/Common/MenuList/index.js











const MenuList = ({ hasMb = true })=>{
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const { allAndSubCategory: getAllAndSubCategoryData } = (0,lib.useSelector)((state)=>state.homePagedata);
    const [loading, setLoading] = react_default().useState(true);
    const { refetch: getAllAndSubCategory } = (0,useQuery/* useQuery */.a)("category", `${endPoints/* endPoints */.z.allAndSubCategory}?cityId=${(0,constant/* getLocalStorage */.$o)("cityId")}`);
    (0,react_.useEffect)(()=>{
        // if (!getAllAndSubCategoryData?.length) {
        getAllAndSubCategory().then((res)=>{
            dispatch((0,Slices/* addAllAndSubCategory */.LE)(res?.data?.data));
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        });
    // }
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `${(style_module_default()).menu_list_wrapper} ${hasMb ? "mb-6" : ""}`,
        children: [
            loading && !getAllAndSubCategoryData?.length ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-[80%]",
                children: /*#__PURE__*/ jsx_runtime_.jsx((Skeleton_default()), {})
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).menu_list_left,
                children: [
                    getAllAndSubCategoryData?.map((list, index)=>{
                        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).item_wrap,
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Common_PopOver, {
                                data: list,
                                list: list?.sub_categories,
                                item: list?.cat_name,
                                parentCategoryId: list.id
                            })
                        }, index.toString());
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        rel: "noopner noreferrer",
                        target: "_self",
                        "aria-label": "citymax",
                        href: "/citymax",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).item_wrap,
                            children: "CityMax"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).menu_list_right,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        onClick: ()=>{
                            router.push("/pages/offers");
                        },
                        href: "/pages/offers",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).item_wrap,
                            children: "Offers"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "/pages/bulkorder",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: `${(style_module_default()).item_wrap}`,
                            style: {
                                marginRight: "0"
                            },
                            children: "CF for business"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Common_MenuList = (MenuList);


/***/ }),

/***/ 65095:
/***/ ((module) => {

// Exports
module.exports = {
	"announcement_bar_wrapper": "style_announcement_bar_wrapper__Tyyy0",
	"announcement_bar_text": "style_announcement_bar_text__odFj5",
	"announcement_close_icon": "style_announcement_close_icon__5MQou"
};


/***/ }),

/***/ 54559:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "style_main__v8Var",
	"header_wrapper": "style_header_wrapper__tei8o",
	"logo_text": "style_logo_text__6TdWZ",
	"logo_text_main_header": "style_logo_text_main_header__Y1KS4",
	"open_searchbar_main": "style_open_searchbar_main__oLXcI",
	"header_left_wrapper": "style_header_left_wrapper__99Yac",
	"header_right_wrapper": "style_header_right_wrapper__tXU31",
	"menu_icon": "style_menu_icon__P5QIp",
	"header_city_wrapper": "style_header_city_wrapper__DUas5",
	"header_city_name": "style_header_city_name__SOwGc",
	"search_wrapper": "style_search_wrapper__A2j4J",
	"search_input": "style_search_input__Jb8dL",
	"header_favorite": "style_header_favorite__9pmWv",
	"header_shopping_card": "style_header_shopping_card__BC0uM",
	"cart_badge": "style_cart_badge__V0DlW",
	"header_profile_icon": "style_header_profile_icon__tFE1V",
	"mobile_search_row": "style_mobile_search_row__CLyCi",
	"search_wrapper_mobile": "style_search_wrapper_mobile__NUiyN",
	"search_details_wrapper": "style_search_details_wrapper__2btOe",
	"search_open_details": "style_search_open_details___wr8N",
	"pills_wrapper": "style_pills_wrapper__aSy0Z",
	"pill": "style_pill__G_9oR",
	"pill_text": "style_pill_text__kWFiu",
	"modal_icon": "style_modal_icon__rY59_",
	"search_head": "style_search_head__1iVtz",
	"categories_wrapper": "style_categories_wrapper__bd73Y",
	"categories_img": "style_categories_img__NDcDU",
	"category_label": "style_category_label__pa51_",
	"backdrop": "style_backdrop__0wjZW",
	"search_rasult_wrapper": "style_search_rasult_wrapper__FWvf_",
	"serach_result_img": "style_serach_result_img__rq6Z4",
	"search_result_text": "style_search_result_text__59wwL",
	"header_favorite_container": "style_header_favorite_container__xo3s_",
	"header_favorite_count": "style_header_favorite_count__5SFSb",
	"category_card_in_searchbox": "style_category_card_in_searchbox__uOHw9",
	"openSearchbar_div": "style_openSearchbar_div__MJEjk",
	"wishlist_link_wrapper": "style_wishlist_link_wrapper__019t_",
	"cart_link_wrapper": "style_cart_link_wrapper__2EuBY"
};


/***/ }),

/***/ 20766:
/***/ ((module) => {

// Exports
module.exports = {
	"menu_list_wrapper": "style_menu_list_wrapper__ixfKs",
	"menu_list_left": "style_menu_list_left__cxT9Y",
	"menu_list_right": "style_menu_list_right__VSaME",
	"item_wrap": "style_item_wrap___MLWg"
};


/***/ }),

/***/ 31700:
/***/ ((module) => {

// Exports
module.exports = {
	"sub_item_wrapper": "style_sub_item_wrapper__GIsXy",
	"sub_item": "style_sub_item__g0fDV",
	"arrow_down": "style_arrow_down__0V4o_",
	"arrow_up": "style_arrow_up__K_QDB",
	"shadow_box": "style_shadow_box__cWyRS"
};


/***/ })

};
;