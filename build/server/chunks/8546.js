exports.id = 8546;
exports.ids = [8546];
exports.modules = {

/***/ 48546:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(31345);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20202);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24664);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44485);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40248);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62219);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29460);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_8__);




// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
// import {HomePageImages} from "@/assets/images";







const YouMightLike = ({ heading, isbg, params })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const pageData = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.productPageData);
    const reduxStateOfLoginPopup = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata.loginPopupState);
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const cityId = (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorage */ .$o)("cityId");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        axios__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.productPage.youMightLike(params.productId, cityId)).then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .addYouMightLike */ .Ed)(res?.data?.data));
        }).catch((err)=>{
            console.log(err);
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .addYouMightLike */ .Ed)([]));
        });
    }, []);
    const scrollerRef1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleScrolling = ()=>{
        const slider = scrollerRef1.current;
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
        const toggleIsDragging = ()=>{
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
        slider.addEventListener("mousemove", toggleIsDragging);
        return ()=>{
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", toggleIsDragging);
        };
    };
    const handleCardClick = (e, item)=>{
        if (!e.target.classList.contains((_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().child))) {
            router.push(`/things/${item.id}/${item.seourl}`);
        }
    };
    if (pageData?.youMightLike?.length > 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().main_container),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().heading),
                    children: "You might also like"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().card_wrapper)}`,
                    ref: scrollerRef1,
                    onMouseOver: ()=>{
                        handleScrolling();
                    },
                    children: pageData?.youMightLike?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            onClick: (e)=>{
                                !reduxStateOfLoginPopup && handleCardClick(e, item);
                            },
                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().child) ?? ""} ${isDumy && "pointer-events-none"}`,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Common_HomePageCards__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                cardImage: `${_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .productPageImagesBaseUrl */ .p5 + item?.image?.split(",")[0]}`,
                                discount: `${Math.round((item?.price - item?.sale_price) * 100 / item?.sale_price).toFixed(0)}%`,
                                originalPrice: item?.price,
                                currentPrice: item?.sale_price,
                                desc: item?.product_name,
                                isHover: false,
                                productID: item?.id,
                                seourl: item?.seourl
                            })
                        }, index))
                })
            ]
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YouMightLike);


/***/ }),

/***/ 31345:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__6S3_H",
	"heading": "style_heading__louL8",
	"card_wrapper": "style_card_wrapper__Y_vTl",
	"scroller_container_card": "style_scroller_container_card__HkdAV"
};


/***/ })

};
;