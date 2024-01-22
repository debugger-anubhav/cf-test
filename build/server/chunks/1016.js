exports.id = 1016;
exports.ids = [1016];
exports.modules = {

/***/ 29776:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 53489));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 108))

/***/ }),

/***/ 41146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74907);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);





const CommonCard = ({ isHalfYearly, item, plans })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    // const productNameArray = item.product_name.split(" ");
    // productNameArray.pop();
    // const modifiedProductName = productNameArray.join("");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().card),
        onClick: ()=>router.push(`/choose-products/${item.id}/${isHalfYearly ? 6 : 12}`),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().card_head),
                children: item.product_name
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().card_desc),
                children: item.description
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().card_offer),
                children: [
                    plans.slots[item.id].length,
                    " products @ just"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().card_price),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                        children: "₹"
                    }),
                    item.attr_price,
                    "/mo"
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().btn),
                children: "Select plan"
            }),
            item.product_label && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().tag),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: `${_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .IconLink */ .JH + "popular-icon.svg"}`,
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().leaf_icon),
                        loading: "lazy",
                        alt: "LeafIcon"
                    }),
                    item.product_label
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommonCard);


/***/ }),

/***/ 33335:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Header)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Citymax/Header/style.module.css
var style_module = __webpack_require__(90423);
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
// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/SwipeableDrawer/index.js
var SwipeableDrawer = __webpack_require__(18191);
// EXTERNAL MODULE: ./src/components/Citymax/Header/menuDrawer/styles.module.css
var styles_module = __webpack_require__(54756);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./src/constants/Constant.json
var Constant = __webpack_require__(23191);
// EXTERNAL MODULE: ./src/hooks/checkAuthentication.js
var hooks_checkAuthentication = __webpack_require__(43334);
;// CONCATENATED MODULE: ./src/components/Citymax/Header/menuDrawer/MenuDrawer.js











// import {useDispatch, useSelector} from "react-redux";
// import {reduxSetModalState} from "@/store/Slices";
// import LoginModal from "@/components/LoginPopups";


const MenuDrawer = ({ toggleDrawer, open, toggleLoginModal, setClick })=>{
    const { checkAuthentication } = (0,hooks_checkAuthentication/* useAuthentication */.J)();
    const router = (0,navigation.useRouter)();
    const loginStateFromRedux = (0,lib.useSelector)((state)=>state.homePagedata.isLogin);
    const isHalfYearly = (0,lib.useSelector)((state)=>state?.citymax?.isHalfYearly);
    const [plans, setPlans] = (0,react_.useState)();
    const [isLogin, setIsLogin] = (0,react_.useState)();
    (0,react_.useEffect)(()=>{
        setIsLogin(loginStateFromRedux);
    }, [
        loginStateFromRedux
    ]);
    const fetchPlans = ()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.cityMaxPage.getAllPlans).then((res)=>{
            setPlans(res?.data?.data);
        }).catch((err)=>console.log(err));
    };
    (0,react_.useEffect)(()=>{
        fetchPlans();
    }, []);
    // const userId = getLocalStorage(decrypt("_ga"));
    const handleAuthentication = async ()=>{
        const isAuth = await checkAuthentication();
        setIsLogin(isAuth);
    };
    (0,react_.useEffect)(()=>{
        handleAuthentication();
    }, [
        isLogin
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(SwipeableDrawer["default"], {
        anchor: "left",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (styles_module_default()).customDrawer
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: `${(styles_module_default()).drawer_wrapper} `,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    onClick: toggleDrawer,
                    className: (styles_module_default()).close_icon,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* Close */.x8, {
                        color: "#45454A",
                        size: 20
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    className: (styles_module_default()).logo,
                    src: `${icon/* IconLink */.JH + "citymax_final.svg"}`
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (styles_module_default()).content_wrapper,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).map_wrapper,
                            children: plans?.citymax_plans?.filter((item)=>isHalfYearly ? item.attr_name === "6 Months" : item.attr_name === "12 Months").map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    onClick: ()=>router.push(`/choose-products/${item.id}/${isHalfYearly ? 6 : 12}`),
                                    className: (styles_module_default()).map_item,
                                    children: item.product_name
                                }, index))
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).line
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).map_wrapper,
                            children: Constant.landing_page.header.menuList2?.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: item.link,
                                        target: index === 0 ? "_blank" : "_self",
                                        rel: "noreferrer",
                                        className: (styles_module_default()).map_item,
                                        children: item.item
                                    }, index.toString())
                                }))
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).line
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (styles_module_default()).map_wrapper,
                            children: Constant.landing_page.header.menuList3?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: (styles_module_default()).map_item,
                                            target: index === 0 ? "_blank" : "_self",
                                            rel: "noreferrer",
                                            onClick: ()=>{
                                                if (isLogin) router.push("/usersettings");
                                                else {
                                                    toggleDrawer();
                                                    setClick("profile");
                                                    toggleLoginModal(true);
                                                }
                                            },
                                            href: index === 3 ? isLogin && "/usersettings" : item.link,
                                            children: item?.item
                                        }, index.toString()),
                                        index === 2 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: `${(styles_module_default()).line} mt-4`
                                        })
                                    ]
                                }))
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: "/",
                            target: "_blank",
                            className: "cursor-pointer",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (styles_module_default()).button,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: (styles_module_default()).back_txt,
                                        children: "Back to Cityfurnish"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: `${icon/* IconLink */.JH + "home-cityfurnish.svg"}`,
                                        className: (styles_module_default()).home_icon
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const menuDrawer_MenuDrawer = (MenuDrawer);

// EXTERNAL MODULE: ./node_modules/react-responsive-modal/styles.css
var styles = __webpack_require__(14025);
// EXTERNAL MODULE: ./src/components/LoginPopups/index.js + 6 modules
var LoginPopups = __webpack_require__(98288);
// EXTERNAL MODULE: ./src/store/Slices/categorySlice.js
var categorySlice = __webpack_require__(99166);
// EXTERNAL MODULE: ./src/components/Common/Header/ProfileDropDown.js
var ProfileDropDown = __webpack_require__(12316);
// EXTERNAL MODULE: ./src/components/Common/Drawer/EmptyModal/EmptyCartModal.js
var EmptyCartModal = __webpack_require__(45172);
;// CONCATENATED MODULE: ./src/components/Citymax/Header/index.js
/* __next_internal_client_entry_do_not_use__ default auto */ 











// import Link from "next/link";




// import {RxHamburgerMenu} from "react-icons/rx";








const CitymaxHeader = ({ zIndex })=>{
    const { checkAuthentication } = (0,hooks_checkAuthentication/* useAuthentication */.J)();
    const iconRef = (0,react_.useRef)(null);
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const modalStateFromRedux = (0,lib.useSelector)((state)=>state.order.isModalOpen);
    // const [openSearchbar] = React.useState(false);
    const { cityList: storeCityList } = (0,store/* useAppSelector */.CG)((state)=>state.homePagedata);
    const { refetch: getCityList } = (0,useQuery/* useQuery */.a)("city-list", endPoints/* endPoints */.z.cityList);
    const { refetch: getTrendingSearch } = (0,useQuery/* useQuery */.a)("trending-search", endPoints/* endPoints */.z.trendingSearchConstants);
    const { refetch: getSidebarMenuList } = (0,useQuery/* useQuery */.a)("sideBarMenuLists", endPoints/* endPoints */.z.sidebarMenuLists);
    const homePageReduxData = (0,lib.useSelector)((state)=>state.homePagedata);
    const [showProfileDropdown, setShowProfileDropdown] = react_default().useState(false);
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const wishListCount = categoryPageReduxData?.savedProducts?.length;
    // const [profileIconLink, setProfileIconLink] = useState();
    // const [heartIconLink, setHeartIconLink] = useState();
    const [menuDrawer, setMenuDrawer] = (0,react_.useState)(false);
    const [isLogin, setIsLogin] = (0,react_.useState)();
    const [loginModal, setLoginModal] = (0,react_.useState)(false);
    const [click, setClick] = (0,react_.useState)();
    const [cityForModal, setCityForModal] = (0,react_.useState)();
    const [emptyModal, setEmptyModal] = (0,react_.useState)(false);
    const userId = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    const tempUserId = (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"));
    (0,react_.useEffect)(()=>{
        setIsLogin(homePageReduxData.isLogin);
    }, [
        homePageReduxData.isLogin
    ]);
    console.log(isLogin, homePageReduxData.isLogin, "huh");
    const toggleLoginModal = (bool)=>{
        dispatch((0,Slices/* reduxSetModalState */.V)(bool));
        setLoginModal(bool);
    };
    const cityId = (0,constant/* getLocalStorage */.$o)("cityId");
    if (!cityId) {
        (0,constant/* setLocalStorage */.qQ)("cityId", 46);
    }
    // const {refetch: getSavedItems} = useQuery(
    //   "saved-items",
    //   endPoints.savedItems,
    //   `?cityId=${cityId}&userId=${isLogin ? userId : tempUserId}`,
    // );
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
        // setArr(res?.data?.data);
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
        if (isAuthenticated === true) {
            setIsLogin(true);
        } else setIsLogin(false);
        const userIdToUse = isAuthenticated ? userId : tempUserId;
        fetchCartItems(userIdToUse);
        getSavedItems(userIdToUse);
    };
    const fetchCartItems = (userIdToUse)=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.addToCart.fetchCartItems(cityId, userIdToUse)).then((res)=>{
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
    // useEffect(() => {
    //   if (userId) {
    //     setProfileIconLink("/usersettings");
    //     setHeartIconLink("/wishlist");
    //   } else {
    //     setProfileIconLink("https://test.rentofurniture.com/user_sign_up");
    //     setHeartIconLink("https://test.rentofurniture.com/user_sign_up");
    //   }
    // }, [userId]);
    const toggleDrawer = ()=>{
        setMenuDrawer(!menuDrawer);
    };
    const toggleEmptyCartModal = (bool)=>{
        console.log("inn");
        dispatch((0,Slices/* reduxSetModalState */.V)(bool));
        setEmptyModal(bool);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(LoginPopups/* default */.Z, {
                closeModal: ()=>toggleLoginModal(false),
                isModalOpen: loginModal,
                setIsLogin: (bool)=>{
                    setIsLogin(bool);
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
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${modalStateFromRedux && "!z-0"} ${(style_module_default()).main}`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).header_wrapper,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).header_left_wrapper,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    onClick: toggleDrawer,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: icon/* Icons */.PJ.Menu,
                                        alt: "menu-icon",
                                        // className={styles.menu_icon_drawer}
                                        className: (style_module_default()).hamburger_icon,
                                        loading: "lazy"
                                    })
                                }),
                                menuDrawer && /*#__PURE__*/ jsx_runtime_.jsx(menuDrawer_MenuDrawer, {
                                    open: menuDrawer,
                                    toggleDrawer: toggleDrawer,
                                    toggleLoginModal: (val)=>toggleLoginModal(val),
                                    setClick: (val)=>setClick(val)
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    href: "/citymax",
                                    onClick: (e)=>{
                                        e.preventDefault();
                                    },
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).logo,
                                        onClick: ()=>router.push("/citymax"),
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "https://d3juy0zp6vqec8.cloudfront.net/images/citymax_logo.png",
                                            alt: "CityMax"
                                        })
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
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    href: "/",
                                    target: "_blank",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).cityfurnish_wrapper,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                src: `${icon/* IconLink */.JH + "home-cityfurnish.svg"}`,
                                                className: (style_module_default()).home_icon,
                                                alt: "cityfurnish"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).cityfurnish_txt,
                                                children: "cityfurnish"
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).header_right_wrapper,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (style_module_default()).wishlist_link_wrapper,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
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
                                                    className: `w-100 h-100 absolute z-10 cursor-pointer`,
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
                                        className: `pt-[14px]  pb-[16px] cursor-pointer  ${(style_module_default()).test}`,
                                        onMouseLeave: ()=>{
                                            setShowProfileDropdown(false);
                                        },
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            onClick: ()=>{
                                                setClick("profile");
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
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (style_module_default()).end_line
            })
        ]
    });
};
/* harmony default export */ const Header = (CitymaxHeader);


/***/ }),

/***/ 74907:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "styles_card__7KdVn",
	"card_head": "styles_card_head__PNgD8",
	"card_desc": "styles_card_desc__hozaR",
	"card_offer": "styles_card_offer__oP7_i",
	"card_price": "styles_card_price__lPmBQ",
	"rupeeIcon": "styles_rupeeIcon__7MOoO",
	"btn": "styles_btn__J1UHa",
	"tag": "styles_tag__qs_iL",
	"leaf_icon": "styles_leaf_icon__tr6BY"
};


/***/ }),

/***/ 54756:
/***/ ((module) => {

// Exports
module.exports = {
	"customDrawer": "styles_customDrawer__uq5yf",
	"close_icon": "styles_close_icon__C1tBI",
	"drawer_wrapper": "styles_drawer_wrapper__evI_x",
	"logo": "styles_logo__YQIgZ",
	"content_wrapper": "styles_content_wrapper__MlEez",
	"map_wrapper": "styles_map_wrapper__vZZFL",
	"map_item": "styles_map_item__LdUsQ",
	"line": "styles_line__Ck283",
	"button": "styles_button___hgRX",
	"home_icon": "styles_home_icon__7fXWK"
};


/***/ }),

/***/ 90423:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "style_main__ejTX_",
	"header_wrapper": "style_header_wrapper__tXzn4",
	"hamburger_icon": "style_hamburger_icon__kJ4KV",
	"logo": "style_logo__xZysd",
	"home_icon": "style_home_icon__R64jY",
	"cityfurnish_wrapper": "style_cityfurnish_wrapper__NSRqU",
	"cityfurnish_txt": "style_cityfurnish_txt__woC6P",
	"header_left_wrapper": "style_header_left_wrapper__pcx47",
	"header_right_wrapper": "style_header_right_wrapper__uW6Ii",
	"header_city_wrapper": "style_header_city_wrapper__pjT__",
	"header_city_name": "style_header_city_name__CRPb5",
	"header_favorite": "style_header_favorite__ZHlE0",
	"header_shopping_card": "style_header_shopping_card__9iZ9b",
	"cart_badge": "style_cart_badge__E8iMz",
	"header_profile_icon": "style_header_profile_icon__L__nm",
	"header_favorite_container": "style_header_favorite_container__s_KKl",
	"header_favorite_count": "style_header_favorite_count__4GrcV",
	"wishlist_link_wrapper": "style_wishlist_link_wrapper__ftqNK",
	"cart_link_wrapper": "style_cart_link_wrapper__ImKoA",
	"end_line": "style_end_line__Omdd_"
};


/***/ })

};
;