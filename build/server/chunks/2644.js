exports.id = 2644;
exports.ids = [2644];
exports.modules = {

/***/ 72644:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(13604);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20202);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78490);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24664);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(44485);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29460);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(40248);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(62219);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_9__);
/* __next_internal_client_entry_do_not_use__ default auto */ 











const TrendingProducts = ({ params })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.homePagedata);
    const reduxStateOfLoginPopup = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.homePagedata.loginPopupState);
    const [paramsCityId, setParamsCityId] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(46);
    const [data, setData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const cityId = (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorage */ .$o)("cityId");
    const { refetch: getTrendyProducts } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_3__/* .useQuery */ .a)("trendy-product", _network_endPoints__WEBPACK_IMPORTED_MODULE_6__/* .endPoints */ .z.trendingProduct, `?cityId=${cityId}&userId=${85757}`);
    const { refetch: getSeoApplianceTrendProduct } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_3__/* .useQuery */ .a)("seo-appliance-trend-product", _network_endPoints__WEBPACK_IMPORTED_MODULE_6__/* .endPoints */ .z.seoApplianceTtrendingProduct, paramsCityId);
    const { refetch: getSeoFurnitureTrendProduct } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_3__/* .useQuery */ .a)("seo-furniture-trend-product", _network_endPoints__WEBPACK_IMPORTED_MODULE_6__/* .endPoints */ .z.seoFurnitureTtrendingProduct, paramsCityId);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params?.category === "appliances-rental" || params?.category === "furniture-rental") {
            axios__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_8__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_6__/* .endPoints */ .z.cityIdByCityName + params?.city).then((res)=>setParamsCityId(res?.data?.data?.id)).catch((err)=>console.log(err));
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params?.category === "appliances-rental") {
            getSeoApplianceTrendProduct().then((res)=>{
                // console.log("seoApplianceeeeeeeeeeeeeeeeee")
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_5__/* .setSeoApplianceCrowd */ .pV)(res?.data?.data));
                setData(res?.data?.data);
            }).catch((err)=>console.log(err));
        } else if (params?.category === "furniture-rental") {
            getSeoFurnitureTrendProduct().then((res)=>{
                setData(res?.data?.data);
            // console.log("seooFurniture-rentaleeeeeeeeeee")
            }).catch((err)=>console.log(err));
        } else {
            getTrendyProducts().then((res)=>{
                // console.log("hommmmmmeeeeeeeeeeeeeeeeee")
                setData(res?.data?.data);
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_5__/* .addtrendingproduct */ .KR)(res?.data?.data));
            }).catch((err)=>console.log(err));
        }
    }, []);
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
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
    return homePageReduxData?.trendindProduct ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().main_container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().heading),
                children: "Crowd Favourite"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().subHeading),
                children: "Best Selling Products"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().card_box)} `,
                ref: sliderRef,
                children: data?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_11___default().child) ?? ""} ${index === data?.length - 1 && "mr-[16px]"} ${isDumy && "pointer-events-none"}`,
                        onClick: (e)=>{
                            !reduxStateOfLoginPopup && handleCardClick(e, item);
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            cardImage: _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
                            hoverCardImage: item?.image?.split(",").filter((item)=>item).length > 1 ? _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[1] : _constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productImageBaseUrl */ .d9 + item?.image?.split(",")[0],
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
    }) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrendingProducts);


/***/ }),

/***/ 13604:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__57DBI",
	"heading": "style_heading__vuk7G",
	"subHeading": "style_subHeading__Z_2np",
	"card_box": "style_card_box__cpdu8"
};


/***/ })

};
;