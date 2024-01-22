exports.id = 4004;
exports.ids = [4004];
exports.modules = {

/***/ 74004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Subheader_SubHeader)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/components/Category/SubHeader/Subheader/style.module.css
var style_module = __webpack_require__(91308);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./src/components/Common/FilterCard/style.module.css
var FilterCard_style_module = __webpack_require__(68975);
var FilterCard_style_module_default = /*#__PURE__*/__webpack_require__.n(FilterCard_style_module);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.esm.js
var index_esm = __webpack_require__(45489);
;// CONCATENATED MODULE: ./src/components/Common/FilterCard/FilterCard.js



// import { CloseOutline } from "@/assets/icon";

const FilterCard = ({ text, onRemove })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (FilterCard_style_module_default()).main_container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* IoClose */.bjh, {
                color: "#597492",
                size: "16px",
                onClick: onRemove
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: (FilterCard_style_module_default()).filter_card_text,
                children: text
            })
        ]
    });
};
/* harmony default export */ const FilterCard_FilterCard = (FilterCard);

// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Drawer/index.js
var Drawer = __webpack_require__(79499);
var Drawer_default = /*#__PURE__*/__webpack_require__.n(Drawer);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/List/index.js
var List = __webpack_require__(54436);
var List_default = /*#__PURE__*/__webpack_require__.n(List);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Divider/index.js
var Divider = __webpack_require__(73638);
var Divider_default = /*#__PURE__*/__webpack_require__.n(Divider);
// EXTERNAL MODULE: ./src/store/Slices/categorySlice.js
var categorySlice = __webpack_require__(99166);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
;// CONCATENATED MODULE: ./src/components/Common/categoryPopover/categorySideBar.js












function FilterSortDrawer({ filterName, setPageNo, setFilterListed }) {
    const dispatch = (0,lib.useDispatch)();
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const [state, setState] = react_.useState({
        bottom: false
    });
    const [updatedFilter, setUpdatedFilter] = (0,react_.useState)([]);
    const [itemCount, setItemCount] = (0,react_.useState)(7);
    const [selectedOption, setSelectedOption] = (0,react_.useState)("Default");
    const router = (0,navigation.useRouter)();
    const defaultKey = 1;
    const newSortKey = 2;
    const highToLowKey = 3;
    const lowToHighKey = 4;
    const loadMoreItems = ()=>{
        setItemCount(filtereData.length);
    };
    const toggleDrawer = (anchor, open)=>(event)=>{
            if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
                return;
            }
            setState({
                ...state,
                [anchor]: open
            });
        };
    const handleFilterDivClick = (e, filterTag)=>{
        // let updatedFilteredList = [...categoryPageReduxData?.filteredItems];
        let updatedFilteredList = [
            ...updatedFilter
        ];
        const filterIndex = updatedFilteredList.indexOf(filterTag);
        if (filterIndex === -1) {
            // If the filter is not in the list, add it
            updatedFilteredList.push(filterTag);
        } else {
            // If the filter is already in the list, remove it
            updatedFilteredList = [
                ...updatedFilteredList.slice(0, filterIndex),
                ...updatedFilteredList.slice(filterIndex + 1)
            ];
        }
        setUpdatedFilter(updatedFilteredList);
    // dispatch(addFilteredItem(updatedFilteredList));
    };
    const handleSort = (item, index)=>{
        setPageNo(1);
        setSelectedOption(item);
        if (item === "New") {
            dispatch((0,categorySlice/* addSortKey */.ic)(newSortKey));
        } else if (item === "Price: Low to High") {
            dispatch((0,categorySlice/* addSortKey */.ic)(lowToHighKey));
        } else if (item === "Price: High to low") {
            dispatch((0,categorySlice/* addSortKey */.ic)(highToLowKey));
        } else {
            dispatch((0,categorySlice/* addSortKey */.ic)(defaultKey));
        }
        dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
        dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
        dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        setState({
            ...state,
            bottom: false
        });
    };
    const handleApply = ()=>{
        let url = "";
        for(let i = 0; i < updatedFilter.length; i++){
            url += "filter=" + encodeURIComponent(updatedFilter[i]);
            if (i < updatedFilter.length - 1) {
                url += "&";
            }
        }
        router.push(`?${url}`);
        dispatch((0,categorySlice/* addFilteredItem */.Ix)(updatedFilter));
        setPageNo(1);
        dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
        dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
        dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        dispatch((0,categorySlice/* isFilterApplied */.Yb)(true));
        setFilterListed(true);
        setState({
            ...state,
            bottom: false
        });
    // setFilterOpen(false);
    };
    const filtereData = categoryPageReduxData?.filterData;
    const list = (anchor)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role: "presentation",
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown: toggleDrawer(anchor, false),
            className: "relative",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((List_default()), {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "rounded-t-2xl",
                        children: filterName === "Filter" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "gap-6 shadow-md w-full bg-white px-4 pt-4 pb-8",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).headin_text,
                                    children: filterName === "Filter" ? filterName : selectedOption
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "h-[1px] bg-EDEDEE"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: `overflow-scroll ${(style_module_default()).mapped_filter_mobile}`,
                                    children: filtereData?.map((ele, index)=>{
                                        // {CategoryFilterData.slice(0).map((ele, index) => {
                                        return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: index < itemCount && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (style_module_default()).single_filter_text,
                                                onClick: (e)=>handleFilterDivClick(e, ele.filter_tag),
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (style_module_default()).option_text,
                                                        children: ele?.filter_name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "checkbox",
                                                        id: index,
                                                        name: ele.filter_name,
                                                        value: ele.filter_tag,
                                                        // checked={categoryPageReduxData?.filteredItems.includes(
                                                        //   ele?.filter_tag,
                                                        // )}
                                                        checked: updatedFilter.includes(ele?.filter_tag),
                                                        className: "pr-1 cursor-pointer"
                                                    })
                                                ]
                                            }, index.toString())
                                        });
                                    })
                                }),
                                filtereData.length > itemCount && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).see_more_text,
                                    onClick: loadMoreItems,
                                    children: "See more"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "mt-4 w-full flex justify-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).btn_container,
                                        onClick: ()=>handleApply(),
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            style: {
                                                boxShadow: "rgba(0, 0, 0, 0.25)"
                                            },
                                            className: (style_module_default()).apply_btn,
                                            children: "Apply"
                                        })
                                    })
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "gap-6 shadow-md w-full rounded-t-2xl bg-white p-4",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).headin_text,
                                    children: "Sort By"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "",
                                    children: constant/* sortByText */.ge.map((ele, index)=>{
                                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            onClick: ()=>handleSort(ele?.text, index),
                                            className: (style_module_default()).sorted_text,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).option_text,
                                                    children: ele.text
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    type: "radio",
                                                    id: index,
                                                    name: "sortBy",
                                                    value: ele.text,
                                                    className: "cursor-pointer",
                                                    checked: selectedOption === ele.text
                                                })
                                            ]
                                        }, index.toString());
                                    })
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((Divider_default()), {})
            ]
        });
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: [
            "bottom"
        ].map((anchor)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).filterbox,
                        onClick: toggleDrawer(anchor, true),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).filter_text_container,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: `${filterName === "Default" ? "!text-[#597492]" : "!text-71717A"} ${(style_module_default()).filter_text}`,
                                    children: filterName === "Filter" ? filterName : selectedOption
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownPopUpArrow */.Yd, {
                                    size: 20,
                                    color: filterName === "Default" ? "#597492" : "#71717A",
                                    className: state.bottom ? (style_module_default()).arrow_up : (style_module_default()).arrow_down
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Drawer_default()), {
                        anchor: anchor,
                        PaperProps: {
                            sx: {
                                borderTopRightRadius: "20px",
                                borderTopLeftRadius: "20px",
                                position: "absolute"
                            }
                        },
                        open: state[anchor],
                        onClose: toggleDrawer(anchor, false),
                        sx: {
                            borderTop: "20px",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                // className="relative top-4 right-[24px] flex w-full justify-end z-[111] "
                                className: "fixed right-4 lg:right-8 w-8 h-8 bg-fff rounded-2xl cursor-pointer items-center flex justify-center -mt-12 lg:-mt-0",
                                onClick: toggleDrawer("bottom", false),
                                children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* Close */.x8, {
                                    size: 25,
                                    color: "#000"
                                })
                            }),
                            list(anchor)
                        ]
                    })
                ]
            }, anchor))
    });
}

// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./src/hooks/useQuery.js
var useQuery = __webpack_require__(78490);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
// EXTERNAL MODULE: ./src/components/Category/SubHeader/Subheader/SubHeaderSkeleton.js
var SubHeaderSkeleton = __webpack_require__(64792);
// EXTERNAL MODULE: ./node_modules/react-infinite-scroll-component/dist/index.js
var dist = __webpack_require__(16290);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
// EXTERNAL MODULE: ./src/components/Category/SingleProduct/style.module.css
var SingleProduct_style_module = __webpack_require__(21408);
var SingleProduct_style_module_default = /*#__PURE__*/__webpack_require__.n(SingleProduct_style_module);
// EXTERNAL MODULE: ./src/hooks/useMutation.js
var useMutation = __webpack_require__(95339);
// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.cjs.js
var loadable_cjs = __webpack_require__(53207);
// EXTERNAL MODULE: ./src/components/Category/SingleProduct/CommonCard/style.module.css
var CommonCard_style_module = __webpack_require__(83654);
var CommonCard_style_module_default = /*#__PURE__*/__webpack_require__.n(CommonCard_style_module);
// EXTERNAL MODULE: ./node_modules/react-icons/ri/index.esm.js
var ri_index_esm = __webpack_require__(83751);
// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
// EXTERNAL MODULE: ./src/components/Common/Notifications/toastUtils.js
var toastUtils = __webpack_require__(44772);
// EXTERNAL MODULE: ./src/hooks/checkAuthentication.js
var hooks_checkAuthentication = __webpack_require__(43334);
// EXTERNAL MODULE: ./src/components/LoginPopups/index.js + 6 modules
var LoginPopups = __webpack_require__(98288);
;// CONCATENATED MODULE: ./src/components/Category/SingleProduct/CommonCard/index.js

















const CategoryCard = ({ hoverCardImage, cardImage, desc, currentPrice, originalPrice, discount, productID, soldOut, seourl, subProduct, label })=>{
    const { checkAuthentication } = (0,hooks_checkAuthentication/* useAuthentication */.J)();
    const [hoverCard, setHoverCard] = react_default().useState(false);
    const [inWishList, setInWishList] = react_default().useState(false);
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const reduxStateOfLoginPopup = (0,lib.useSelector)((state)=>state.homePagedata.loginPopupState);
    const [isDumy, setIsDumy] = react_default().useState(false);
    const [loginModal, setLoginModal] = (0,react_.useState)(false);
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const cityIdStr = localStorage.getItem("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    (0,react_.useEffect)(()=>{
        dispatch((0,Slices/* reduxSetModalState */.V)(loginModal));
        dispatch((0,Slices/* setLoginPopupState */.aM)(loginModal));
    }, [
        loginModal
    ]);
    const toggleLoginModal = (bool)=>{
        setLoginModal(bool);
    };
    const data = {
        tempUserId: (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID")) ?? "",
        // userId: getLocalStorage("user_id") ?? "",
        userId: (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga")) ?? "",
        productId: productID
    };
    const { mutateAsync: addwhislistProduct } = (0,useMutation/* useMutation */.D)("add-wishlist", "POST", endPoints/* endPoints */.z.addWishListProduct, data);
    const { mutateAsync: removewhislistProduct } = (0,useMutation/* useMutation */.D)("remove-wishlist", "DELETE", endPoints/* endPoints */.z.deleteWishListProduct, data);
    const { refetch: getSavedItems } = (0,useQuery/* useQuery */.a)("saved-items", endPoints/* endPoints */.z.savedItems, `?cityId=${cityId}&userId=${// getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga")) ?? (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"))}`);
    // const userId = decrypt(getLocalStorage("_ga"));
    const addToWishlist = ()=>{
        !inWishList ? addwhislistProduct().then((res)=>{
            getSavedItems().then((res)=>{
                dispatch((0,categorySlice/* addSaveditems */.tA)(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map((item)=>{
                    return item?.id;
                });
                dispatch((0,categorySlice/* addSaveditemID */._L)(ids));
                (0,toastUtils/* showToastNotification */.I)("Item added to the wishlist", 1);
            }).catch((err)=>console.log(err));
            setInWishList((prev)=>!prev);
        }).catch((err)=>console.log(err)) : removewhislistProduct().then((res)=>{
            getSavedItems().then((res)=>{
                dispatch((0,categorySlice/* addSaveditems */.tA)(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map((item)=>{
                    return item?.id;
                });
                dispatch((0,categorySlice/* addSaveditemID */._L)(ids));
                (0,toastUtils/* showToastNotification */.I)("Item removed from the wishlist", 2);
            }).catch((err)=>console.log(err));
            setInWishList((prev)=>!prev);
        }).catch((err)=>console.log(err));
    };
    const handleWhislistCard = async (e)=>{
        e.stopPropagation();
        const isAuthenticated = await checkAuthentication();
        console.log(isAuthenticated, "response from isauthencate");
        if (isAuthenticated === false) {
            toggleLoginModal(true);
        } else addToWishlist();
    // dispatch(addRemoveWhishListitems(!inWishList));
    };
    (0,react_.useEffect)(()=>{
        setInWishList(categoryPageReduxData.savedProducts.map((obj)=>obj.id).includes(productID));
    }, []);
    const handleProductClick = (e, productID, seourl)=>{
        if (!e.target.classList.contains((CommonCard_style_module_default()).child)) {
            !reduxStateOfLoginPopup && router.push(`/things/${productID}/${seourl}`);
        }
    };
    const sliderRef = (0,react_.useRef)(null);
    (0,react_.useEffect)(()=>{
        const slider = sliderRef.current;
        if (!slider) return;
        let mouseDown = false;
        let startX, scrollLeft;
        const startDragging = (e)=>{
            mouseDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const stopDragging = ()=>{
            setIsDumy(false);
            mouseDown = false;
        };
        const toggleIsdragging = ()=>{
            if (mouseDown && !isDumy) setIsDumy(true);
        };
        slider.addEventListener("mousemove", (e)=>{
            e.preventDefault();
            if (!mouseDown) return;
            const x = e.pageX - slider.offsetLeft;
            const scroll = x - startX;
            slider.scrollLeft = scrollLeft - scroll;
        });
        slider.addEventListener("mousedown", startDragging, false);
        slider.addEventListener("mouseup", stopDragging, false);
        slider.addEventListener("mouseleave", stopDragging, false);
        slider.addEventListener("mousemove", toggleIsdragging);
        return ()=>{
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", toggleIsdragging);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(LoginPopups/* default */.Z, {
                closeModal: ()=>toggleLoginModal(false),
                isModalOpen: loginModal,
                handleChangeRoute: ()=>{
                    console.log("in handlechangerouteee");
                // call this if you want to show the red heart exactly after login
                // addToWishlist();
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                href: !reduxStateOfLoginPopup && `/things/${productID}/${seourl}`,
                onClick: (e)=>{
                    e.preventDefault();
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: `${(CommonCard_style_module_default()).card_wrapper} `,
                    onMouseOver: ()=>{
                        setHoverCard(true);
                    },
                    onMouseOut: ()=>setHoverCard(false),
                    onClick: (e)=>handleProductClick(e, productID, seourl),
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: hoverCard ? hoverCardImage : cardImage,
                                    alt: desc.replace(/-/g, " "),
                                    className: (CommonCard_style_module_default()).img,
                                    loading: "lazy"
                                }),
                                soldOut ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: `${(CommonCard_style_module_default()).soldout_div} ${(CommonCard_style_module_default()).label_tag}`,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(ri_index_esm/* RiSparklingFill */.Nbd, {
                                            size: 16,
                                            color: "#ffffff"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (CommonCard_style_module_default()).tag_text,
                                            children: "SOLD OUT"
                                        })
                                    ]
                                }) : label === "Trending" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: `${(CommonCard_style_module_default()).trending_div} ${(CommonCard_style_module_default()).label_tag}`,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(ri_index_esm/* RiSparklingFill */.Nbd, {
                                            size: 16,
                                            color: "#ffffff"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (CommonCard_style_module_default()).tag_text,
                                            children: "POPULAR"
                                        })
                                    ]
                                }) : label === "New Launch" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: `${(CommonCard_style_module_default()).newlylaunch_div} ${(CommonCard_style_module_default()).label_tag}`,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(ri_index_esm/* RiSparklingFill */.Nbd, {
                                            size: 16,
                                            color: "#ffffff"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (CommonCard_style_module_default()).tag_text,
                                            children: "NEW LAUNCH"
                                        })
                                    ]
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "hidden"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (CommonCard_style_module_default()).desc_div,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: (CommonCard_style_module_default()).desc,
                                    style: {
                                        lineHeight: "normal"
                                    },
                                    children: desc.replace(/-/g, " ")
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(icon/* Heart */.Xd, {
                                    size: 25,
                                    color: inWishList ? "#D96060" : "#C0C0C6",
                                    // onClick={e => {
                                    //   e.preventDefault();
                                    //   setInWishList(!inWishList);
                                    // }}
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleWhislistCard(e);
                                    },
                                    className: "cursor-pointer"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (CommonCard_style_module_default()).price_div,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (CommonCard_style_module_default()).card_price_wrap,
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                            className: `${(CommonCard_style_module_default()).currentPrice} flex`,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: (CommonCard_style_module_default()).rupeeIcon,
                                                    children: "₹"
                                                }),
                                                `${currentPrice} /mo`
                                            ]
                                        }),
                                        currentPrice < originalPrice && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                            className: `${(CommonCard_style_module_default()).originalPrice} flex`,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: (CommonCard_style_module_default()).rupeeIcon,
                                                    children: "₹"
                                                }),
                                                `${originalPrice} /mo`
                                            ]
                                        })
                                    ]
                                }),
                                currentPrice < originalPrice && parseInt(discount) > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (CommonCard_style_module_default()).discount,
                                    children: `-${discount} OFF`
                                })
                            ]
                        }),
                        categoryPageReduxData?.isCombos && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (CommonCard_style_module_default()).combos_wrapper,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: `${(CommonCard_style_module_default()).items_included} ${subProduct?.length === 0 && (CommonCard_style_module_default()).no_included}`,
                                        children: [
                                            subProduct?.length,
                                            " items included"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (CommonCard_style_module_default()).combos_images,
                                        ref: sliderRef,
                                        children: [
                                            subProduct?.length === 0 && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (CommonCard_style_module_default()).no_included_image
                                            }),
                                            subProduct?.map((item, index)=>{
                                                return /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                    src: `${constant/* productImageBaseUrl */.d9}${item?.image?.split(",")[0]}`,
                                                    alt: "Product Image",
                                                    className: `${(CommonCard_style_module_default()).included_image} ${isDumy && "pointer-events-none"} `,
                                                    loading: "lazy"
                                                }, index.toString());
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const CommonCard = (CategoryCard);

// EXTERNAL MODULE: ./src/components/Home/RecentlyViewedProduct/index.js
var RecentlyViewedProduct = __webpack_require__(59787);
// EXTERNAL MODULE: ./src/components/Category/SavedItem/style.module.css
var SavedItem_style_module = __webpack_require__(91292);
var SavedItem_style_module_default = /*#__PURE__*/__webpack_require__.n(SavedItem_style_module);
// EXTERNAL MODULE: ./src/components/Common/HomePageCards/index.js
var HomePageCards = __webpack_require__(20202);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
// EXTERNAL MODULE: ./src/network/axios/index.js
var network_axios = __webpack_require__(62219);
;// CONCATENATED MODULE: ./src/components/Category/SavedItem/SavedItem.js






// import {useQuery} from "@/hooks/useQuery";







const SavedItem = ()=>{
    const { checkAuthentication } = (0,hooks_checkAuthentication/* useAuthentication */.J)();
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const loginStateFromRedux = (0,lib.useSelector)((state)=>state.homePagedata.isLogin);
    const reduxStateOfLoginPopup = (0,lib.useSelector)((state)=>state.homePagedata.loginPopupState);
    const [isDumy, setIsDumy] = react_default().useState(false);
    const [isLogin, setIsLogin] = react_default().useState(loginStateFromRedux);
    const sliderRef = (0,react_.useRef)(null);
    const cityIdStr = localStorage.getItem("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    // const {refetch: getSavedItems} = useQuery(
    //   "saved-items",
    //   endPoints.savedItems,
    //   `?cityId=${cityId}&userId=${
    //     // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    //     isLogin
    //       ? decrypt(getLocalStorage("_ga"))
    //       : decryptBase64(getLocalStorage("tempUserID"))
    //   }`,
    // );
    const getSavedItems = (isAuthenticated)=>{
        console.log(isAuthenticated, "isAuthenticated");
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.savedItems + `?cityId=${cityId}&userId=${isAuthenticated ? (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga")) : (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"))}`).then((res)=>{
            dispatch((0,categorySlice/* addSaveditems */.tA)(res?.data?.data));
            const ids = res?.data?.data.map((item)=>{
                return item?.id;
            });
            dispatch((0,categorySlice/* addSaveditemID */._L)(ids));
        }).catch((err)=>console.log(err));
    };
    const isAuth = async ()=>{
        const isAuthenticated = await checkAuthentication();
        setIsLogin(isAuthenticated);
        getSavedItems(isAuthenticated);
    };
    (0,react_.useEffect)(()=>{
        isAuth();
    }, [
        isLogin
    ]);
    // useEffect(() => {}, [categoryPageReduxData?.savedItems?.length]);
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((SavedItem_style_module_default()).child)) {
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
    (0,react_.useEffect)(()=>{
        const slider = sliderRef.current;
        if (!slider) return;
        let mouseDown = false;
        let startX, scrollLeft;
        const startDragging = (e)=>{
            mouseDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const stopDragging = ()=>{
            setIsDumy(false);
            mouseDown = false;
        };
        const toggleIsdragging = ()=>{
            if (mouseDown && !isDumy) setIsDumy(true);
        };
        slider.addEventListener("mousemove", (e)=>{
            e.preventDefault();
            if (!mouseDown) return;
            const x = e.pageX - slider.offsetLeft;
            const scroll = x - startX;
            slider.scrollLeft = scrollLeft - scroll;
        });
        slider.addEventListener("mousedown", startDragging, false);
        slider.addEventListener("mouseup", stopDragging, false);
        slider.addEventListener("mouseleave", stopDragging, false);
        slider.addEventListener("mousemove", toggleIsdragging);
        return ()=>{
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", toggleIsdragging);
        };
    }, []);
    const data = categoryPageReduxData?.savedProducts;
    return data.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (SavedItem_style_module_default()).main_container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: (SavedItem_style_module_default()).heading,
                children: "Your saved items"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (SavedItem_style_module_default()).main_sub_container,
                ref: sliderRef,
                children: data?.map((item, index)=>{
                    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `flex flex-wrap mr-4 mb-4 ${(SavedItem_style_module_default()).child}`,
                        onClick: (e)=>{
                            !reduxStateOfLoginPopup && handleCardClick(e, item);
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(HomePageCards/* default */.Z, {
                            cardImage: constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                            desc: item?.product_name,
                            originalPrice: item?.price,
                            currentPrice: item?.fc_product_sale_price,
                            hoverCardImage: item?.image?.split(",").filter((item)=>item).length > 1 ? constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[1] : constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                            discount: `${Math.round((item?.price - item?.fc_product_sale_price) * 100 / item?.fc_product_sale_price).toFixed(0)}%`,
                            productID: item?.id,
                            seourl: item?.seourl,
                            isSavedComp: true
                        })
                    }, index.toString());
                })
            })
        ]
    }) : null;
};
/* harmony default export */ const SavedItem_SavedItem = (SavedItem);

// EXTERNAL MODULE: ./src/components/Category/TrendingItem/style.module.css
var TrendingItem_style_module = __webpack_require__(82597);
var TrendingItem_style_module_default = /*#__PURE__*/__webpack_require__.n(TrendingItem_style_module);
;// CONCATENATED MODULE: ./src/components/Category/TrendingItem/TrendingItem.js










const TrendingItem = ()=>{
    const router = (0,navigation.useRouter)();
    const dispatch = (0,lib.useDispatch)();
    const [isDumy, setIsDumy] = react_default().useState(false);
    // const homePageReduxData = useSelector(state => state.homePagedata);
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const reduxStateOfLoginPopup = (0,lib.useSelector)((state)=>state.homePagedata.loginPopupState);
    const sliderRef = (0,react_.useRef)(null);
    const cityIdStr = localStorage.getItem("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    const { refetch: getTrendyProducts } = (0,useQuery/* useQuery */.a)("trendy-product", endPoints/* endPoints */.z.trendingProduct, `?cityId=${cityId}&userId=${85757}`);
    (0,react_.useEffect)(()=>{
        getTrendyProducts().then((res)=>{
            dispatch((0,categorySlice/* addCategoryTrendingProduct */.Eb)(res?.data?.data));
        }).catch((err)=>console.log(err));
    }, []);
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((TrendingItem_style_module_default()).child)) {
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
    (0,react_.useEffect)(()=>{
        const slider = sliderRef.current;
        if (!slider) return;
        let mouseDown = false;
        let startX, scrollLeft;
        const startDragging = (e)=>{
            mouseDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const stopDragging = ()=>{
            setIsDumy(false);
            mouseDown = false;
        };
        const toggleIsdragging = ()=>{
            if (mouseDown && !isDumy) setIsDumy(true);
        };
        slider.addEventListener("mousemove", (e)=>{
            e.preventDefault();
            if (!mouseDown) return;
            const x = e.pageX - slider.offsetLeft;
            const scroll = x - startX;
            slider.scrollLeft = scrollLeft - scroll;
        });
        slider.addEventListener("mousedown", startDragging, false);
        slider.addEventListener("mouseup", stopDragging, false);
        slider.addEventListener("mouseleave", stopDragging, false);
        slider.addEventListener("mousemove", toggleIsdragging);
        return ()=>{
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", toggleIsdragging);
        };
    }, []);
    const Data = categoryPageReduxData?.tendingItems;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (TrendingItem_style_module_default()).main_container,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: (TrendingItem_style_module_default()).heading,
                children: "Trending products"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (TrendingItem_style_module_default()).main_sub_container,
                ref: sliderRef,
                children: Data?.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `${(TrendingItem_style_module_default()).child}flex flex-wrap mr-4 mb-4
            `,
                        onClick: (e)=>{
                            !reduxStateOfLoginPopup && handleCardClick(e, item);
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(HomePageCards/* default */.Z, {
                            cardImage: constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                            hoverCardImage: item?.image?.split(",").filter((item)=>item).length > 1 ? constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[1] : constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                            desc: item?.product_name,
                            originalPrice: item?.price,
                            currentPrice: item?.sale_price,
                            discount: `${Math.round((item?.price - item?.sale_price) * 100 / item?.sale_price).toFixed(0)}%`,
                            productID: item?.id,
                            seourl: item?.seourl
                        })
                    }, index.toString()))
            })
        ]
    });
};
/* harmony default export */ const TrendingItem_TrendingItem = (TrendingItem);

// EXTERNAL MODULE: ./src/components/Home/HasselFreeServicesCards/index.js
var HasselFreeServicesCards = __webpack_require__(23186);
// EXTERNAL MODULE: ./src/components/Common/FrequentlyAskedQuestions/index.js + 1 modules
var FrequentlyAskedQuestions = __webpack_require__(37028);
// EXTERNAL MODULE: ./src/components/Home/HappySubscribers/index.js
var HappySubscribers = __webpack_require__(26278);
// EXTERNAL MODULE: ./src/components/Home/Rating/index.js
var Rating = __webpack_require__(1920);
// EXTERNAL MODULE: ./src/components/Category/categoryContent/style.module.css
var categoryContent_style_module = __webpack_require__(81168);
var categoryContent_style_module_default = /*#__PURE__*/__webpack_require__.n(categoryContent_style_module);
;// CONCATENATED MODULE: ./src/components/Category/categoryContent/categoryContent.js








const CategoryContent = ()=>{
    let cityIdStr;
    let categoryId;
    const dispatch = (0,lib.useDispatch)();
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    if (false) {}
    const cityId = parseFloat(cityIdStr);
    const { refetch: getCategoryText } = (0,useQuery/* useQuery */.a)("category-content", endPoints/* endPoints */.z.categoryContent, `?cityId=${cityId}&categoryId=${categoryId}`);
    (0,react_.useEffect)(()=>{
        getCategoryText().then((res)=>dispatch((0,categorySlice/* addCategoryTextContent */._d)(res?.data?.data))).catch((err)=>console.log(err));
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (categoryContent_style_module_default()).wrapper,
        children: categoryPageReduxData?.categorTextContent?.map((ele, index)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    dangerouslySetInnerHTML: {
                        __html: ele?.cat_meta_keyword
                    },
                    className: (categoryContent_style_module_default()).apiData
                })
            });
        })
    });
};
/* harmony default export */ const categoryContent = (CategoryContent);

// EXTERNAL MODULE: ./src/components/Common/Footer/index.js
var Footer = __webpack_require__(88523);
;// CONCATENATED MODULE: ./src/components/Category/SingleProduct/SingleProduct.js






// import Card from "@/components/Common/HomePageCards";















const SingleProduct_Footer = (0,loadable_cjs/* default */.ZP)(()=>Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 88523)), {
    fallback: /*#__PURE__*/ jsx_runtime_.jsx(Footer.FooterSkeleton, {})
});
const SingleProduct_FrequentlyAskedQuestions = (0,loadable_cjs/* default */.ZP)(()=>Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 37028)), {
    fallback: /*#__PURE__*/ jsx_runtime_.jsx(FrequentlyAskedQuestions["default"], {})
});
const SingleProduct = ({ pageNo, setPageNo })=>{
    const [totalPage, setTotalPage] = (0,react_.useState)(1);
    const router = (0,navigation.useRouter)();
    const dispatch = (0,lib.useDispatch)();
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const reduxStateOfLoginPopup = (0,lib.useSelector)((state)=>state.homePagedata.loginPopupState);
    let categoryId;
    let subCategoryId;
    let cityIdStr;
    if (false) {}
    const cityId = parseFloat(cityIdStr);
    const bodyData = {
        parentCategoryId: categoryId,
        subCategoryId,
        cityId,
        pageNo,
        filterList: categoryPageReduxData?.filteredItems,
        // filterList: categoryPageReduxData?.isfilter
        //   ? categoryPageReduxData?.filteredItems
        //   : [],
        sortKey: categoryPageReduxData?.sortKey
    };
    const bodyDataAll = {
        parentCategoryId: categoryId,
        cityId,
        pageNo,
        filterList: categoryPageReduxData?.filteredItems,
        // filterList: categoryPageReduxData?.isfilter
        //   ? categoryPageReduxData?.filteredItems
        //   : [],
        sortKey: categoryPageReduxData?.sortKey
    };
    const data = (0,constant/* getLocalStorage */.$o)("subCategory")?.replace(/"/g, "") === "All" || categoryPageReduxData?.isAllProduct ? bodyDataAll : bodyData;
    const singleItemLength = categoryPageReduxData?.categoryMetaData?.totalProduct;
    const { mutateAsync: getSingleProducts } = (0,useMutation/* useMutation */.D)("category-single-product", "POST", endPoints/* endPoints */.z.categorySingleProduct, data);
    (0,react_.useEffect)(()=>{
        getSingleProducts().then((res)=>{
            setTotalPage(res?.data?.meta?.totalPage);
            dispatch((0,categorySlice/* addSubCategoryMetaData */.RW)(res?.data?.meta));
            if (categoryPageReduxData?.isfilter) {
                if (pageNo === 1) {
                    dispatch((0,categorySlice/* addSingleProduct */.dF)([
                        ...res?.data?.products
                    ]));
                } else {
                    if (pageNo === 1) {
                        dispatch((0,categorySlice/* addSingleProduct */.dF)([
                            ...res?.data?.products
                        ]));
                    } else {
                        dispatch((0,categorySlice/* addSingleProduct */.dF)([
                            ...categoryPageReduxData?.singleProduct,
                            ...res?.data?.products
                        ]));
                    }
                }
            } else {
                if (categoryPageReduxData?.isAllProduct) {
                    if (pageNo === 1) {
                        dispatch((0,categorySlice/* addSingleAllProduct */.NK)([
                            ...res?.data?.products
                        ]));
                    } else {
                        dispatch((0,categorySlice/* addSingleAllProduct */.NK)([
                            ...categoryPageReduxData?.singleProductAll,
                            ...res?.data?.products
                        ]));
                    }
                } else {
                    if (pageNo === 1) {
                        dispatch((0,categorySlice/* addSingleProduct */.dF)([
                            ...res?.data?.products
                        ]));
                    } else {
                        dispatch((0,categorySlice/* addSingleProduct */.dF)([
                            ...categoryPageReduxData?.singleProduct,
                            ...res?.data?.products
                        ]));
                    }
                }
            }
        }).catch((err)=>console.log(err));
    }, [
        pageNo,
        categoryPageReduxData?.isfilter,
        categoryPageReduxData?.sortKey,
        categoryPageReduxData?.filteredItems
    ], subCategoryId);
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((SingleProduct_style_module_default()).child)) {
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
    const singleItemData = categoryPageReduxData?.isAllProduct ? categoryPageReduxData?.singleProductAll : categoryPageReduxData?.singleProduct;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            singleItemData?.length ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: /*#__PURE__*/ jsx_runtime_.jsx((dist_default()), {
                    dataLength: singleItemData?.length,
                    next: ()=>{
                        if (pageNo < totalPage) {
                            setPageNo((prev)=>prev + 1);
                        }
                    },
                    hasMore: true,
                    className: "!w-full !h-full",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (SingleProduct_style_module_default()).main_container,
                        children: singleItemData?.map((item, index)=>{
                            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                onClick: (e)=>{
                                    !reduxStateOfLoginPopup && handleCardClick(e, item);
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx(CommonCard, {
                                    cardImage: `${constant/* productImageBaseUrl */.d9}${item?.image?.split(",")[0]}`,
                                    desc: item?.product_name,
                                    originalPrice: item?.price,
                                    currentPrice: item?.sale_price,
                                    hoverCardImage: item?.image?.split(",")[1] !== "" ? constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[1] : constant/* productImageBaseUrl */.d9 + item?.image?.split(",")[0],
                                    discount: `${Math.round((item?.price - item?.sale_price) * 100 / item?.price).toFixed(0)}%`,
                                    productID: item?.id,
                                    seourl: item?.seourl,
                                    subProduct: item?.subProduct,
                                    label: item?.product_label,
                                    soldOut: item?.pq_quantity <= 0
                                })
                            }, index);
                        })
                    })
                })
            }) : null,
            singleItemData?.length === singleItemLength ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(RecentlyViewedProduct["default"], {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(SavedItem_SavedItem, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(TrendingItem_TrendingItem, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(HappySubscribers["default"], {
                        page: "category",
                        params: categoryId
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Rating["default"], {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(HasselFreeServicesCards["default"], {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(SingleProduct_FrequentlyAskedQuestions, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(categoryContent, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(SingleProduct_Footer, {})
                ]
            }) : null
        ]
    });
};
/* harmony default export */ const SingleProduct_SingleProduct = (SingleProduct);

;// CONCATENATED MODULE: ./src/components/Category/SubHeader/Subheader/SubHeader.js





// import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";












const SubHeader = ({ params })=>{
    const dropDownRefFilter = (0,react_.useRef)(null);
    const dropDownRefSort = (0,react_.useRef)(null);
    const dispatch = (0,lib.useDispatch)();
    const router = (0,navigation.useRouter)();
    const query = (0,navigation.useParams)();
    const searchParams = (0,navigation.useSearchParams)();
    const filterFromUrl = searchParams.getAll("filter");
    const [pageNo, setPageNo] = (0,react_.useState)(1);
    const [filterListed, setFilterListed] = (0,react_.useState)(false);
    const { allAndSubCategory: getAllAndSubCategoryData } = (0,lib.useSelector)((state)=>state.homePagedata);
    const homePageReduxData = (0,lib.useSelector)((state)=>state.homePagedata);
    const categoryPageReduxData = (0,lib.useSelector)((state)=>state.categoryPageData);
    const filtereData = categoryPageReduxData?.filterData;
    const [category, setCategory] = (0,react_.useState)("");
    const [categoryId, setCategoryId] = (0,react_.useState)("");
    const [subCategoryId, setSubCategoryId] = (0,react_.useState)("");
    const [subCategory, setSubCategory] = (0,react_.useState)("");
    const [title, setTitle] = (0,react_.useState)("");
    const [filterOpen, setFilterOpen] = (0,react_.useState)(false);
    const [sortOpen, setSortOpen] = (0,react_.useState)(false);
    const [selectedOption, setSelectedOption] = (0,react_.useState)("Default");
    const [skeletonOpen, setSkeletonOpen] = (0,react_.useState)(true);
    const [showFilter, setShowFilter] = (0,react_.useState)(false);
    const [showData, setShowData] = (0,react_.useState)(false);
    const [seoUrl, setSeoUrl] = (0,react_.useState)();
    const [itemCount, setItemCount] = (0,react_.useState)(7);
    const [updatedFilter, setUpdatedFilter] = (0,react_.useState)([]);
    (0,react_.useEffect)(()=>{
        setFilterFromUrlToStore();
    }, [
        JSON.stringify(filterFromUrl)
    ]);
    const setFilterFromUrlToStore = ()=>{
        if (filterFromUrl?.length) {
            setFilterListed(true);
            setUpdatedFilter(filterFromUrl);
            dispatch((0,categorySlice/* addFilteredItem */.Ix)(filterFromUrl));
        } else {
            setFilterListed(false);
        }
    };
    function findSubCategoryByURL(data, browserURL) {
        for (const category of data){
            for (const subCategory of category.sub_categories){
                if (subCategory.seourl === browserURL) {
                    return {
                        cat_name: subCategory.cat_name,
                        id: subCategory.id,
                        rootID: subCategory.rootID
                    };
                }
            }
        }
        return null; // Return null if no match is found
    }
    function findIdByURL(list, browserURL) {
        for(let i = 0; i < list.length; i++){
            if (list[i].list_value_seourl === browserURL) {
                dispatch((0,Slices/* selectedCityName */._6)(browserURL));
                return list[i].id;
            }
        }
        return null;
    }
    const handleFilterRemove = (index)=>{
        if (index > -1 && categoryPageReduxData?.filteredItems) {
            if (index > -1 && updatedFilter) {
                const newFilters = [
                    ...updatedFilter.slice(0, index),
                    ...updatedFilter.slice(index + 1)
                ];
                setUpdatedFilter(newFilters);
            }
            const newFilteredItems = [
                ...categoryPageReduxData?.filteredItems.slice(0, index),
                ...categoryPageReduxData?.filteredItems.slice(index + 1)
            ];
            dispatch((0,categorySlice/* addFilteredItem */.Ix)(newFilteredItems));
            const filtersQueryParam = newFilteredItems.map((filter)=>`filter=${encodeURIComponent(filter)}`).join("&");
            const newUrl = filtersQueryParam ? `?${filtersQueryParam}` : "";
            // Construct the new URL by replacing the query parameters
            const updatedUrl = `${window.location.origin}${window.location.pathname}${newUrl}`;
            // Update the URL and Redux state
            router.push(updatedUrl);
            dispatch((0,categorySlice/* isFilterApplied */.Yb)(true));
        }
    };
    (0,react_.useEffect)(()=>{
        if (getAllAndSubCategoryData?.length) {
            const matchedCategoryName = findSubCategoryByURL(getAllAndSubCategoryData, params?.category);
            if (matchedCategoryName !== null) {
                (0,constant/* setLocalStorage */.qQ)("subCategory", matchedCategoryName.cat_name);
                (0,constant/* setLocalStorage */.qQ)("subCategoryId", matchedCategoryName.id);
                (0,constant/* setLocalStorage */.qQ)("categoryId", matchedCategoryName.rootID);
                dispatch((0,Slices/* addCategoryId */.hA)(matchedCategoryName.rootID));
                dispatch((0,Slices/* addSubCategoryId */.C7)(matchedCategoryName.id));
            } else {
                console.log("No matching category found for the browser URL.");
            }
        }
        if (homePageReduxData?.cityList?.length) {
            const id = findIdByURL(homePageReduxData?.cityList, params.city);
            if (id !== null) {
                (0,constant/* setLocalStorage */.qQ)("cityId", id);
                dispatch((0,Slices/* selectedCityId */.E8)(id));
            } else {
                console.log(`No match found for`);
            }
        }
    }, [
        homePageReduxData?.cityList?.length,
        getAllAndSubCategoryData?.length
    ]);
    const handleSelectedProduct = (e, item, mainCategory)=>{
        if (item?.cat_name === "All") {
            dispatch((0,categorySlice/* addAllProduct */.ZY)(true));
        } else {
            dispatch((0,categorySlice/* addAllProduct */.ZY)(false));
        }
        setPageNo(1);
        dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
        let previousSubCategory;
        if (false) {}
        router.push(`/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${item?.seourl}`);
        dispatch((0,Slices/* addSubCategoryId */.C7)(item?.id));
        if (false) {}
        dispatch((0,Slices/* addProductName */.jx)(item));
        if (previousSubCategory !== item?.cat_name) {
            dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
            dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
            dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        }
    };
    (0,react_.useEffect)(()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.getCategoryIdBySeoUrl(query.category)).then((res)=>{
            (0,constant/* setLocalStorage */.qQ)("category", res?.data?.data?.parentCategory ? res?.data?.data?.parentCategory?.cat_name : res?.data?.data?.cat_name);
            (0,constant/* setLocalStorage */.qQ)("categoryId", res?.data?.data?.parentCategory ? res?.data?.data?.parentCategory?.id : res?.data?.data?.id);
            (0,constant/* setLocalStorage */.qQ)("subCategory", res?.data?.data?.parentCategory ? res?.data?.data?.cat_name : "All");
            (0,constant/* setLocalStorage */.qQ)("subCategoryId", res?.data?.data?.id);
            setCategory(res?.data?.data?.parentCategory ? res?.data?.data?.parentCategory?.cat_name : res?.data?.data?.cat_name);
            setCategoryId(res?.data?.data?.parentCategory ? res?.data?.data?.parentCategory?.id : res?.data?.data?.id);
            setSubCategory(res?.data?.data?.parentCategory ? res?.data?.data?.cat_name : "All");
            setSubCategoryId(res?.data?.data?.id);
        });
    }, []);
    const { refetch: getFilterList } = (0,useQuery/* useQuery */.a)("filter-list", endPoints/* endPoints */.z.categoryFilterOption, `?parentCategoryId=${categoryId}${(0,constant/* getLocalStorage */.$o)("subCategory") === "All" ? "" : `&subCategoryId=${subCategoryId}`}`);
    (0,react_.useEffect)(()=>{
        if (subCategoryId || categoryId) {
            getFilterList().then((res)=>{
                if (res?.data?.data.length) {
                    setShowFilter(true);
                }
                dispatch((0,categorySlice/* addFilterData */.Mp)(res?.data?.data));
                setShowData(true);
            }).catch((err)=>console.log(err));
        }
    }, [
        categoryId,
        subCategoryId,
        homePageReduxData.categoryId,
        homePageReduxData.subcategoryId,
        filtereData.length
    ]);
    const defaultKey = 1;
    const newSortKey = 2;
    const highToLowKey = 3;
    const lowToHighKey = 4;
    const handleFilterDivClick = (e, filterTag)=>{
        // let updatedFilteredList = [...categoryPageReduxData?.filteredItems];
        let updatedFilteredList = [
            ...updatedFilter
        ];
        const filterIndex = updatedFilteredList.indexOf(filterTag);
        if (filterIndex === -1) {
            // If the filter is not in the list, add it
            updatedFilteredList.push(filterTag);
        } else {
            // If the filter is already in the list, remove it
            updatedFilteredList = [
                ...updatedFilteredList.slice(0, filterIndex),
                ...updatedFilteredList.slice(filterIndex + 1)
            ];
        }
        setUpdatedFilter(updatedFilteredList);
    // dispatch(addFilteredItem(updatedFilteredList));
    };
    const handleApply = ()=>{
        let url = "";
        for(let i = 0; i < updatedFilter.length; i++){
            url += "filter=" + encodeURIComponent(updatedFilter[i]);
            if (i < updatedFilter.length - 1) {
                url += "&";
            }
        }
        router.push(`?${url}`);
        dispatch((0,categorySlice/* addFilteredItem */.Ix)(updatedFilter));
        setPageNo(1);
        dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
        dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
        dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        dispatch((0,categorySlice/* isFilterApplied */.Yb)(true));
        setFilterListed(true);
        setFilterOpen(false);
    };
    const handleSort = (item, index)=>{
        setPageNo(1);
        setSelectedOption(item);
        if (item === "New") {
            dispatch((0,categorySlice/* addSortKey */.ic)(newSortKey));
        } else if (item === "Price: Low to High") {
            dispatch((0,categorySlice/* addSortKey */.ic)(lowToHighKey));
        } else if (item === "Price: High to low") {
            dispatch((0,categorySlice/* addSortKey */.ic)(highToLowKey));
        } else {
            dispatch((0,categorySlice/* addSortKey */.ic)(defaultKey));
        }
        dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
        dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
        dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
        setSortOpen(false);
    };
    (0,react_.useEffect)(()=>{
        if (getAllAndSubCategoryData?.length > 0) {
            setSkeletonOpen(false);
        }
    }, [
        getAllAndSubCategoryData
    ]);
    // dropdown clickable outside ref
    (0,react_.useEffect)(()=>{
        function handleClickOutside(event) {
            if (dropDownRefFilter.current && !dropDownRefFilter.current.contains(event.target)) {
                if (event.target.innerHTML !== "See more") {
                    setFilterOpen(false);
                }
            }
            if (dropDownRefSort.current && !dropDownRefSort.current.contains(event.target)) {
                setSortOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return ()=>{
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const toggleDropdownSort = ()=>{
        setSortOpen(!sortOpen);
    };
    const toggleDropDownFilter = ()=>{
        setFilterOpen(!filterOpen);
    };
    (0,react_.useEffect)(()=>{
        setSeoUrl(getAllAndSubCategoryData?.find((item)=>item?.id === (0,constant/* getLocalStorage */.$o)("categoryId")));
    }, [
        getAllAndSubCategoryData
    ]);
    const loadMoreItems = ()=>{
        setItemCount(filtereData.length);
    };
    (0,react_.useEffect)(()=>{
        getAllAndSubCategoryData?.forEach((ele)=>{
            if (ele?.cat_name === category) {
                if (subCategory === "All") {
                    setTitle(ele?.fc_city_category_data?.cat_heading || ele?.page_heading);
                } else {
                    const t = ele?.sub_categories.find((el)=>el?.cat_name === subCategory);
                    setTitle(t?.fc_city_category_data?.cat_heading || t?.page_heading);
                }
            }
        });
    }, [
        getAllAndSubCategoryData,
        subCategory
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            skeletonOpen ? /*#__PURE__*/ jsx_runtime_.jsx(SubHeaderSkeleton/* default */.Z, {}) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).conatiner_wrapper,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).container,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: (style_module_default()).listings,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                    className: (style_module_default()).list,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "/",
                                            target: "_self",
                                            rel: "noopener",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: `${(style_module_default()).route_text} cursor-pointer`,
                                                children: "Home"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {
                                            size: 12,
                                            color: "#71717A"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                    className: (style_module_default()).list,
                                    onClick: ()=>{
                                        (0,constant/* setLocalStorage */.qQ)("subCategory", "All");
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${seoUrl?.seourl}`,
                                            target: "_self",
                                            rel: "noopener",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: `${(style_module_default()).route_text} cursor-pointer `,
                                                children: category
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {
                                            size: 12,
                                            color: "#71717A"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    className: (style_module_default()).list,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: `${(style_module_default()).route_text} !font-medium`,
                                        children: subCategory
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: (style_module_default()).heading,
                        children: title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).category_wrapper,
                        children: getAllAndSubCategoryData?.map((item, index)=>{
                            if (item?.cat_name === category) {
                                const subCategoriesWithNewObject = [
                                    {
                                        ...item,
                                        cat_name: "All"
                                    },
                                    ...item?.sub_categories
                                ];
                                return subCategoriesWithNewObject?.map((subItem, i)=>{
                                    const selectedProduct = (0,constant/* getLocalStorage */.$o)("subCategory")?.replace(/"/g, "") === subItem?.cat_name;
                                    return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${subItem?.seourl}`,
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            (0,constant/* setLocalStorage */.qQ)("subCategory", subItem?.cat_name);
                                            (0,constant/* setLocalStorage */.qQ)("subCategoryId", subItem?.id);
                                            dispatch((0,categorySlice/* isFilterApplied */.Yb)(false));
                                        },
                                        className: "mr-3 md:mr-0",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: selectedProduct ? (style_module_default()).category_container_box_active : (style_module_default()).category_container_box,
                                            onClick: (e)=>handleSelectedProduct(e, subItem, item),
                                            children: [
                                                selectedProduct ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: `${constant/* categoryIconsUrl */.zp}${subItem?.icon_active_image}`,
                                                        className: (style_module_default()).selected_icon,
                                                        alt: subItem.cat_name,
                                                        loading: "lazy"
                                                    })
                                                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: `${constant/* categoryIconsUrl */.zp}${subItem?.icon_image}`,
                                                        className: (style_module_default()).selected_icon,
                                                        alt: subItem.cat_name,
                                                        loading: "lazy"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).category_container,
                                                    children: subItem?.cat_name
                                                })
                                            ]
                                        })
                                    }, i.toString());
                                });
                            } else {
                                return null;
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).filter_sort_section,
                        children: [
                            showFilter && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "relative",
                                ref: dropDownRefFilter,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: `${(style_module_default()).filter} relative`,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (style_module_default()).filterbox,
                                            onClick: ()=>{
                                                // setFilterOpen(!filterOpen)
                                                toggleDropDownFilter();
                                            // toggleDropdownSort();
                                            },
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: (style_module_default()).filter_text_container,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: `${(style_module_default()).filter_text} text-71717A`,
                                                        children: "Filter"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownPopUpArrow */.Yd, {
                                                        // size={20}
                                                        color: "#71717A",
                                                        className: filterOpen ? (style_module_default()).arrow_up : (style_module_default()).arrow_down
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    filterOpen && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: " absolute z-[111] top-12 gap-6 w-[222px] rounded-2xl max-h-[370px] border-[2px] border-71717A bg-white py-4 ",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (style_module_default()).mapped_filter_class,
                                                children: filtereData?.map((ele, index)=>{
                                                    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: index < itemCount && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: (style_module_default()).single_filter_text,
                                                            onClick: (e)=>handleFilterDivClick(e, ele?.filter_tag),
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                    htmlFor: index,
                                                                    className: (style_module_default()).option_text,
                                                                    children: ele?.filter_name
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "checkbox",
                                                                    id: index,
                                                                    name: ele.filter_name,
                                                                    value: ele.filter_tag,
                                                                    // checked={categoryPageReduxData?.filteredItems.includes(
                                                                    //   ele?.filter_tag,
                                                                    // )}
                                                                    checked: updatedFilter.includes(ele?.filter_tag),
                                                                    className: "pr-1 cursor-pointer"
                                                                })
                                                            ]
                                                        }, index.toString())
                                                    });
                                                })
                                            }),
                                            filtereData.length > itemCount && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).see_more_text,
                                                onClick: loadMoreItems,
                                                children: "See more"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "mt-2 w-full flex justify-center ",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: (style_module_default()).btn_container,
                                                    onClick: ()=>handleApply(),
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (style_module_default()).apply_btn,
                                                        children: "Apply"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "relative flex",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "hidden md:flex items-center mr-2 text-71717A text-base",
                                        children: "Sort By"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: `${(style_module_default()).filter} relative `,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (style_module_default()).filterbox,
                                            onClick: ()=>{
                                                // setSortOpen(!filterOpen);
                                                toggleDropdownSort();
                                            },
                                            ref: dropDownRefSort,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: (style_module_default()).filter_text_container,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: `${(style_module_default()).filter_text} !text-[#597492]`,
                                                        children: selectedOption
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownPopUpArrow */.Yd, {
                                                        size: 20,
                                                        color: "#597492",
                                                        className: `!text-[#597492] ${sortOpen ? (style_module_default()).arrow_up : (style_module_default()).arrow_down}`
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    sortOpen && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "gap-6 absolute z-[111] top-12 right-0 w-[222px] rounded-[20px] border-[2px] border-71717A bg-white py-4",
                                        children: constant/* sortByText */.ge?.map((ele, index)=>{
                                            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (style_module_default()).sorted_text,
                                                onClick: ()=>handleSort(ele?.text, index),
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (style_module_default()).option_text,
                                                        children: ele.text
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "radio",
                                                        id: index,
                                                        name: "sortBy",
                                                        value: ele.text,
                                                        className: "cursor-pointer",
                                                        checked: selectedOption === ele.text
                                                    })
                                                ]
                                            }, index.toString());
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).filter_sort_section_mobile,
                        children: [
                            showFilter && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).filter,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(FilterSortDrawer, {
                                    filterName: "Filter",
                                    setPageNo: setPageNo,
                                    setFilterListed: setFilterListed
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center justify-center ",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: `hidden md:flex ${(style_module_default()).option_text}`,
                                        children: "Sortby"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).filter,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(FilterSortDrawer, {
                                            filterName: "Default",
                                            setPageNo: setPageNo,
                                            setFilterListed: setFilterListed
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).horizontal_line
                    }),
                    categoryPageReduxData?.filteredItems.length !== 0 && filterListed && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-7 lg:mb-8 flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-2 lg:gap-y-3",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).single_filter_mobile,
                                // className={styles.single_filter}
                                onClick: ()=>{
                                    const url = window?.location.href;
                                    const temp = url.split("?");
                                    temp.splice(1, 1);
                                    const finalUrl = temp.join("?");
                                    router.push(finalUrl);
                                    setUpdatedFilter([]);
                                    dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
                                    dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
                                    dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
                                    dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
                                    dispatch((0,categorySlice/* isFilterApplied */.Yb)(false));
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).clear_All,
                                    children: "Clear all"
                                })
                            }),
                            filterListed && categoryPageReduxData?.filteredItems.length !== 0 ? categoryPageReduxData?.filteredItems?.map((item, index)=>{
                                const words = item.split("_");
                                const capitalizedWords = words.map((word)=>{
                                    if (word.length === 0) return word; // Handle empty words
                                    return word.charAt(0).toUpperCase() + word.slice(1);
                                });
                                item = capitalizedWords.join(" ");
                                return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).filter_card,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(FilterCard_FilterCard, {
                                            text: item,
                                            onRemove: ()=>handleFilterRemove(index)
                                        })
                                    }, index.toString())
                                });
                            }) : null,
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                // className={styles.single_filter_mobile}
                                className: (style_module_default()).single_filter,
                                onClick: ()=>{
                                    const url = window?.location.href;
                                    const temp = url.split("?");
                                    temp.splice(1, 1);
                                    const finalUrl = temp.join("?");
                                    router.push(finalUrl);
                                    setUpdatedFilter([]);
                                    dispatch((0,categorySlice/* addFilteredItem */.Ix)([]));
                                    dispatch((0,categorySlice/* isFilterApplied */.Yb)(false));
                                    dispatch((0,categorySlice/* addSingleProduct */.dF)([]));
                                    dispatch((0,categorySlice/* addSetProduct */.Ag)([]));
                                    dispatch((0,categorySlice/* addOutStockProduct */.p)([]));
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).clear_All,
                                    children: "Clear all"
                                })
                            })
                        ]
                    })
                ]
            }),
            showData && /*#__PURE__*/ jsx_runtime_.jsx(SingleProduct_SingleProduct, {
                pageNo: pageNo,
                setPageNo: setPageNo
            })
        ]
    });
};
/* harmony default export */ const Subheader_SubHeader = (SubHeader);


/***/ }),

/***/ 91292:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__56YDW",
	"main_sub_container": "style_main_sub_container__76HCk",
	"heading": "style_heading__do36g"
};


/***/ }),

/***/ 83654:
/***/ ((module) => {

// Exports
module.exports = {
	"card_wrapper": "style_card_wrapper__bQ3RD",
	"img": "style_img__hyfdV",
	"hover_wrapper": "style_hover_wrapper___nJ3Y",
	"fadeOut": "style_fadeOut__BJUeB",
	"card_image_hover": "style_card_image_hover__6FnqG",
	"card_price_wrap": "style_card_price_wrap___Nbew",
	"desc_div": "style_desc_div__5_Fb2",
	"desc": "style_desc__IMX8L",
	"price_div": "style_price_div__CZM0x",
	"originalPrice": "style_originalPrice__jGIqi",
	"currentPrice": "style_currentPrice__xdMCP",
	"discount": "style_discount__TFKoH",
	"label_tag": "style_label_tag__4wcOF",
	"soldout_div": "style_soldout_div__g6A1b",
	"newlylaunch_div": "style_newlylaunch_div__1hg1u",
	"trending_div": "style_trending_div__mleiX",
	"tag_text": "style_tag_text__DaJBs",
	"tag_icon": "style_tag_icon__hprmf",
	"rupeeIcon": "style_rupeeIcon__Y_sQm",
	"combos_wrapper": "style_combos_wrapper__Il5lJ",
	"items_included": "style_items_included__OJt_q",
	"no_included": "style_no_included__57n2I",
	"combos_images": "style_combos_images__6MkJG",
	"included_image": "style_included_image__XnCWb",
	"no_included_image": "style_no_included_image__dorPe"
};


/***/ }),

/***/ 21408:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__O3_NC"
};


/***/ }),

/***/ 91308:
/***/ ((module) => {

// Exports
module.exports = {
	"conatiner_wrapper": "style_conatiner_wrapper__Yoeln",
	"container": "style_container__zlrcV",
	"listings": "style_listings__b9yQY",
	"list": "style_list__JEX6f",
	"route_text": "style_route_text__KsCw4",
	"inner_banner": "style_inner_banner__5D8GG",
	"heading": "style_heading___mgbn",
	"category_wrapper": "style_category_wrapper___DOZV",
	"category_container_box": "style_category_container_box__LIhaK",
	"category_container_box_active": "style_category_container_box_active__TyOyw",
	"category_container": "style_category_container__u3e12",
	"filter_sort_section": "style_filter_sort_section__Wu1Ce",
	"filter_sort_section_mobile": "style_filter_sort_section_mobile__KUuU_",
	"filter": "style_filter__UwONX",
	"filterbox": "style_filterbox__tns6X",
	"filter_text_container": "style_filter_text_container__Cx9qh",
	"filter_text": "style_filter_text__tUmB1",
	"arrow_down": "style_arrow_down__kulEy",
	"arrow_up": "style_arrow_up__Sutnb",
	"filter_sort_Dropdown_container": "style_filter_sort_Dropdown_container__OVq79",
	"sort_Dropdown_container": "style_sort_Dropdown_container__2bfQU",
	"option_text": "style_option_text__mbarh",
	"sortBy_container": "style_sortBy_container__Odq00",
	"sortBy_text": "style_sortBy_text__eBPOB",
	"horizontal_line": "style_horizontal_line__WnQ58",
	"btn_container": "style_btn_container___C_Fp",
	"apply_btn": "style_apply_btn__W5Kld",
	"single_filter": "style_single_filter__HaDWr",
	"single_filter_mobile": "style_single_filter_mobile____fNo",
	"clear_All": "style_clear_All__6XClK",
	"icon_size": "style_icon_size__ewD1Z",
	"filter_card": "style_filter_card__nfh7f",
	"selected_icon": "style_selected_icon__vDuYX",
	"single_filter_text": "style_single_filter_text__7dUzk",
	"sorted_text": "style_sorted_text__GpCKZ",
	"mapped_filter_class": "style_mapped_filter_class__JA5dL",
	"mapped_filter_mobile": "style_mapped_filter_mobile__hZkJa",
	"headin_text": "style_headin_text__ItmXr",
	"see_more_text": "style_see_more_text__3KDLT",
	"popover_wrapper": "style_popover_wrapper__jxxFE"
};


/***/ }),

/***/ 82597:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__8MFy_",
	"main_sub_container": "style_main_sub_container__VFAXm",
	"heading": "style_heading__5hEpp"
};


/***/ }),

/***/ 81168:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__KyG12",
	"text1": "style_text1__vaii1",
	"text2": "style_text2__PdfNj",
	"wrapper": "style_wrapper__yF3dA",
	"apiData": "style_apiData__wW32Y"
};


/***/ }),

/***/ 68975:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__d9i3O",
	"filter_card_text": "style_filter_card_text__iJAWR"
};


/***/ })

};
;