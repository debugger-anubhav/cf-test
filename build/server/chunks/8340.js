exports.id = 8340;
exports.ids = [8340];
exports.modules = {

/***/ 68340:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(89500);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20202);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44485);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24664);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78490);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29460);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_8__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


// import string from "@/constants/Constant.json";







const PreDesignCombos = ()=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata);
    const reduxStateOfLoginPopup = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata.loginPopupState);
    const cityId = (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorage */ .$o)("cityId");
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const { refetch: getPreDesignCombos } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__/* .useQuery */ .a)("design-combos", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.productCombos, `?cityId=${cityId}&userId=${85757}`);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getPreDesignCombos().then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_5__/* .addComboProducts */ .fX)(res?.data?.data));
        }).catch((err)=>console.log(err));
    }, []);
    const sliderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().child))) {
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
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
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: homePageReduxData?.designComboProduct ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().main_container),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().heading),
                    children: "Predesigned combos for you"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().card_box),
                    ref: sliderRef,
                    children: homePageReduxData?.designComboProduct?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().child) ?? ""}  ${index === homePageReduxData?.designComboProduct?.length - 1 && "mr-[16px]"} ${isDumy && "pointer-events-none"}`,
                            onClick: (e)=>{
                                !reduxStateOfLoginPopup && handleCardClick(e, item);
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                cardImage: _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
                                // hoverCard="false"
                                hoverCardImage: item?.image?.split(",").filter((item)=>item).length > 1 ? _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[1] : _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
                                desc: item?.product_name,
                                originalPrice: item?.price,
                                currentPrice: item?.sale_price,
                                discount: `${Math.round((item?.price - item?.sale_price) * 100 / item?.sale_price).toFixed(0)}%`,
                                showincludedItem: true,
                                itemIncluded: item?.subProduct.length,
                                productID: item?.id,
                                seourl: item?.seourl
                            })
                        }, index.toString()))
                })
            ]
        }) : null
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreDesignCombos);


/***/ }),

/***/ 89500:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__9mbY1",
	"heading": "style_heading__WpxCY",
	"card_box": "style_card_box__gzESL"
};


/***/ })

};
;