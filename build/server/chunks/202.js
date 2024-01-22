exports.id = 202;
exports.ids = [202];
exports.modules = {

/***/ 20202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(33188);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var _hooks_useMutation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95339);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44485);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29460);
/* harmony import */ var _store_Slices_categorySlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(99166);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(78490);
/* harmony import */ var _hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6833);
/* harmony import */ var _Notifications_toastUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(44772);
/* harmony import */ var _hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(43334);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(24664);
/* harmony import */ var _components_LoginPopups__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(98288);
















const Card = ({ desc, currentPrice, originalPrice, discount, showincludedItem, cardImage, hoverCardImage, itemIncluded, soldOut, isHover = true, productWidth, productID, seourl, isSavedComp = false })=>{
    const { checkAuthentication } = (0,_hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_12__/* .useAuthentication */ .J)();
    const [inWishList, setInWishList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isSavedComp || false);
    const [hoverCard, setHoverCard] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [loginModal, setLoginModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const categoryPageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.categoryPageData);
    const reduxStateOfLoginPopup = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.homePagedata.loginPopupState);
    const updateCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_13__/* .reduxSetModalState */ .V)(loginModal));
        dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_13__/* .setLoginPopupState */ .aM)(loginModal));
    }, [
        loginModal
    ]);
    const toggleLoginModal = (bool)=>{
        console.log(bool, "bool");
        setLoginModal(bool);
    };
    const data = {
        tempUserId: (0,_hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_10__/* .decryptBase64 */ .qW)((0,_constants_constant__WEBPACK_IMPORTED_MODULE_6__/* .getLocalStorage */ .$o)("tempUserID")) ?? "",
        // userId: getLocalStorage("user_id") ?? "",
        userId: (0,_hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_10__/* .decrypt */ .pe)((0,_constants_constant__WEBPACK_IMPORTED_MODULE_6__/* .getLocalStorage */ .$o)("_ga")) ?? "",
        productId: productID
    };
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const cityIdStr = localStorage.getItem("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    const { mutateAsync: addwhislistProduct } = (0,_hooks_useMutation__WEBPACK_IMPORTED_MODULE_3__/* .useMutation */ .D)("add-wishlist", "POST", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.addWishListProduct, data);
    const { mutateAsync: removewhislistProduct } = (0,_hooks_useMutation__WEBPACK_IMPORTED_MODULE_3__/* .useMutation */ .D)("remove-wishlist", "DELETE", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.deleteWishListProduct, data);
    const { refetch: getSavedItems } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_9__/* .useQuery */ .a)("saved-items", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.savedItems, `?cityId=${cityId}&userId=${(0,_hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_10__/* .decrypt */ .pe)((0,_constants_constant__WEBPACK_IMPORTED_MODULE_6__/* .getLocalStorage */ .$o)("_ga"))}`);
    const addToWishlist = ()=>{
        !inWishList ? addwhislistProduct().then((res)=>{
            getSavedItems().then((res)=>{
                dispatch((0,_store_Slices_categorySlice__WEBPACK_IMPORTED_MODULE_7__/* .addSaveditems */ .tA)(res?.data?.data));
                (0,_Notifications_toastUtils__WEBPACK_IMPORTED_MODULE_11__/* .showToastNotification */ .I)("Item added to the wishlist", 1);
                const ids = res?.data?.data.map((item)=>{
                    return item?.id;
                });
                dispatch((0,_store_Slices_categorySlice__WEBPACK_IMPORTED_MODULE_7__/* .addSaveditemID */ ._L)(ids));
            }).catch((err)=>console.log(err));
            if (!isSavedComp) {
                setInWishList((prev)=>!prev);
            }
        }).catch((err)=>console.log(err)) : removewhislistProduct().then((res)=>{
            getSavedItems().then((res)=>{
                dispatch((0,_store_Slices_categorySlice__WEBPACK_IMPORTED_MODULE_7__/* .addSaveditems */ .tA)(res?.data?.data));
                (0,_Notifications_toastUtils__WEBPACK_IMPORTED_MODULE_11__/* .showToastNotification */ .I)("Item removed from the wishlist", 2);
                // addSaveditemID
                const ids = res?.data?.data.map((item)=>{
                    return item?.id;
                });
                dispatch((0,_store_Slices_categorySlice__WEBPACK_IMPORTED_MODULE_7__/* .addSaveditemID */ ._L)(ids));
            }).catch((err)=>console.log(err));
            if (!isSavedComp) {
                setInWishList((prev)=>!prev);
            }
        }).catch((err)=>console.log(err));
    };
    const handleWhislistCard = async (e)=>{
        e.stopPropagation();
        const isAuthenticated = await checkAuthentication();
        console.log(isAuthenticated, "response from isauthencate");
        if (isAuthenticated === false) {
            console.log("inside false");
            toggleLoginModal(true);
        } else addToWishlist();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setInWishList(categoryPageReduxData.savedProducts.map((obj)=>obj.id).includes(productID));
        updateCount.current += 1;
    }, []);
    const handleProductClick = (e, productID, seourl)=>{
        e.stopPropagation();
        if (!e.target.classList.contains((_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().child))) {
            router.push(`/things/${productID}/${seourl}`);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_LoginPopups__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                closeModal: ()=>toggleLoginModal(false),
                isModalOpen: loginModal,
                handleChangeRoute: ()=>{
                    console.log("in handlechangerouteee");
                // call this if you want to show the red heart exactly after login
                // addToWishlist();
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                href: !reduxStateOfLoginPopup && `/things/${productID}/${seourl}`,
                onClick: (e)=>e.preventDefault(),
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().anchor_card),
                "aria-label": desc.replace(/-/g, " "),
                target: "_self",
                rel: "noopener",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    onClick: (e)=>{
                        !reduxStateOfLoginPopup && handleProductClick(e, productID, seourl);
                    },
                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().wrapper)} ${hoverCard && (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().hover_wrapper)} ${productWidth ?? ""} 
      `,
                    onMouseOver: ()=>{
                        isHover && setHoverCard(true);
                    },
                    onMouseOut: ()=>{
                        setHoverCard(false);
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: hoverCard ? hoverCardImage : cardImage,
                                    alt: desc,
                                    loading: "lazy",
                                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().thumbnail)}
          ${hoverCard && (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().card_image_hover)} 
          }
          `
                                }),
                                showincludedItem && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().item_included_container),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().item_icluded_text),
                                        children: `${itemIncluded} items included`
                                    })
                                }),
                                soldOut && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().soldout_tag),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().tag_text),
                                        children: "SOLD OUT"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().desc_div),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().desc),
                                    style: {
                                        lineHeight: "normal"
                                    },
                                    children: desc.replace(/-/g, " ")
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    id: productID,
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleWhislistCard(e);
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Heart */ .Xd, {
                                        size: 25,
                                        color: inWishList ? "#D96060" : "#C0C0C6",
                                        className: "cursor-pointer"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().price_div),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().card_price_wrap),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().currentPrice)} flex`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().rupeeIcon),
                                                    children: "₹"
                                                }),
                                                `${currentPrice} /mo`
                                            ]
                                        }),
                                        // currentPrice >= originalPrice ? (
                                        originalPrice > currentPrice ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().originalPrice)} flex`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().rupeeIcon),
                                                    children: "₹"
                                                }),
                                                `${originalPrice} /mo`
                                            ]
                                        }) : null
                                    ]
                                }),
                                currentPrice < originalPrice && parseInt(discount) > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_15___default().discount),
                                    children: `-${discount} OFF`
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ 95339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useMutation)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98417);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33369);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62219);


const useMutation = (mutationKey, method, url, data, headers = {
    ...(0,_network_axios__WEBPACK_IMPORTED_MODULE_0__/* .staticHeaders */ .LC)()
})=>{
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__/* .useQueryClient */ .NL)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__/* .useMutation */ .D)({
        mutationKey: [
            mutationKey
        ],
        mutationFn: async (payload)=>{
            return (0,_network_axios__WEBPACK_IMPORTED_MODULE_0__/* .baseInstance */ .f$)({
                method,
                url,
                data: payload ?? data,
                headers
            }).then((res)=>{
                queryClient.invalidateQueries([
                    mutationKey
                ]);
                return res.data;
            });
        }
    });
};


/***/ }),

/***/ 33188:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__Zn1kw",
	"hover_wrapper": "style_hover_wrapper__ryfhD",
	"fadeOut": "style_fadeOut__JLVBa",
	"card_image_hover": "style_card_image_hover___ou4D",
	"card_price_wrap": "style_card_price_wrap__6SGxa",
	"thumbnail": "style_thumbnail__YFHzQ",
	"desc_div": "style_desc_div__zcJjb",
	"desc": "style_desc__ART_F",
	"price_div": "style_price_div__8Vm9w",
	"originalPrice": "style_originalPrice__5qck5",
	"currentPrice": "style_currentPrice__2COzg",
	"discount": "style_discount__yH6wn",
	"item_included_container": "style_item_included_container__ctpcU",
	"item_icluded_text": "style_item_icluded_text__jkwXS",
	"soldout_tag": "style_soldout_tag__iPqck",
	"tag_text": "style_tag_text__gy50m",
	"rupeeIcon": "style_rupeeIcon__gYUsX",
	"banner_img": "style_banner_img__rjScp",
	"anchor_card": "style_anchor_card__EJmxN"
};


/***/ })

};
;