exports.id = 9787;
exports.ids = [9787];
exports.modules = {

/***/ 59787:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(86672);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20202);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44485);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24664);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78490);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29460);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6833);
/* harmony import */ var _hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(43334);
/* __next_internal_client_entry_do_not_use__ default auto */ 











const RecentlyViewedProduct = ({ page })=>{
    const { checkAuthentication } = (0,_hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_10__/* .useAuthentication */ .J)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.homePagedata);
    const reduxStateOfLoginPopup = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.homePagedata.loginPopupState);
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const [isLogin, setIsLogin] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    let cityIdStr;
    if (false) {}
    const cityId = parseFloat(cityIdStr);
    const { refetch: recentlyViewed } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__/* .useQuery */ .a)("recently-view", _network_endPoints__WEBPACK_IMPORTED_MODULE_3__/* .endPoints */ .z.recentlyViewedProduct, `?cityId=${cityId}&userId=${isLogin ? (0,_hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_9__/* .decrypt */ .pe)((0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorage */ .$o)("_ga")) : (0,_hooks_cryptoUtils__WEBPACK_IMPORTED_MODULE_9__/* .decryptBase64 */ .qW)((0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorage */ .$o)("tempUserID"))}`);
    const isAuth = async ()=>{
        const isAuthenticated = await checkAuthentication();
        setIsLogin(isAuthenticated);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        isAuth();
        recentlyViewed().then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_5__/* .addRecentlyViewedProduct */ .vQ)(res?.data?.data));
        }).catch((err)=>console.log(err));
    }, [
        isLogin
    ]);
    const sliderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().child))) {
            router.push(`/things/${item.product_id}/${item.seourl}`);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: homePageReduxData?.recentProduct ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().main_container),
            children: [
                homePageReduxData?.recentProduct?.length ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: `${page === "product" && "xl:!text-24 xl:!tracking-0.48"} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().heading)}`,
                    children: "Recently Viewed products"
                }) : null,
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().recentlyViewed_main)}`,
                    ref: sliderRef,
                    children: homePageReduxData?.recentProduct?.map((item, index)=>{
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: (item?.image || item?.price) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: (e)=>{
                                    !reduxStateOfLoginPopup && handleCardClick(e, item);
                                },
                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().child) ?? ""}  ${index === homePageReduxData?.recentProduct?.length - 1 && "mr-[16px]"} ${isDumy && "pointer-events-none"}`,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                    cardImage: _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
                                    hoverCardImage: item?.image?.split(",").filter((item)=>item).length > 1 ? _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[1] : _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
                                    discount: `${Math.round((item?.price - item?.product_sale_price) * 100 / item?.product_sale_price).toFixed(0)}%`,
                                    originalPrice: item?.price,
                                    currentPrice: item?.product_sale_price,
                                    desc: item?.product_name,
                                    productID: item?.product_id,
                                    seourl: item?.seourl
                                })
                            }, index.toString())
                        });
                    })
                })
            ]
        }) : null
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecentlyViewedProduct);


/***/ }),

/***/ 86672:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__jV4G5",
	"heading": "style_heading__5ypuH",
	"recentlyViewed_main": "style_recentlyViewed_main__UyLVD"
};


/***/ })

};
;