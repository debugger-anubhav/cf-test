exports.id = 4811;
exports.ids = [4811];
exports.modules = {

/***/ 47936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ ProductRowSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99876);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_2__);




const ProductRowSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().main_containor),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                variant: "text",
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_text)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                variant: "text",
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_sub_text)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_row),
                children: [
                    1,
                    2,
                    3,
                    4
                ]?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_wrapper),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                            variant: "rectangular",
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_main)
                        })
                    }, index.toString()))
            })
        ]
    });
};


/***/ }),

/***/ 46470:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OffersSkeleton: () => (/* binding */ OffersSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47919);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23191);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12301);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44485);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78490);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24664);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_9__);










const OffersAndCoupons = ({ page })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    const homePageData = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.homePagedata);
    const cityId = homePageData.cityId;
    const [isCopied, setIsCopied] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const [copiedIndex, setCopiedIndex] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const { refetch: getOfferCupon } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__/* .useQuery */ .a)("offer-cuopons", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.offersAndCupons, `?cityId=${cityId}`);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getOfferCupon().then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_7__/* .offersAndCuponsList */ .BC)(res?.data?.data));
        }).catch((err)=>console.log(err));
    }, []);
    const str = _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.OffersAndDiscount;
    const handleCopyClick = (textToCopy)=>{
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
            document.execCommand("copy");
            setIsCopied(true);
            setTimeout(()=>setIsCopied(false), 2000); // Reset "isCopied" after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
        document.body.removeChild(tempTextArea);
    };
    const sliderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const slider = sliderRef.current;
        if (!slider) return;
        let mouseDown = false;
        let startX, scrollLeft;
        const startDragging = function(e) {
            mouseDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const stopDragging = function() {
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
    return homePageData?.offerCoupons ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: `${page === "product" && "xl:!text-24 xl:!tracking-0.48"} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().heading)}`,
                children: str.heading
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().cards_wrapper),
                ref: sliderRef,
                children: homePageData?.offerCoupons?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().card),
                        onClick: ()=>{
                            handleCopyClick(item.coupon_code);
                            setCopiedIndex(index);
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().ellipse)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().left)}`
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().ellipse)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().right)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "xl:w-full",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().desc),
                                        children: `${item?.price_text} ${item?.max_discount !== "0" ? `(up to Rs ${item?.max_discount})*` : ""} `
                                    }),
                                    item?.price_below_text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().desc),
                                        children: item?.price_below_text.split(" ").slice(0, 7).join(" ")
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().code),
                                        children: [
                                            "Use Code ",
                                            item?.coupon_code
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().line)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().copy_div),
                                children: item?.coupon_code && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    id: index,
                                    className: "text-[#222] flex ",
                                    children: isCopied && copiedIndex === index ? "Copied!" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .CopyIcon */ .TI, {
                                                size: 20,
                                                color: "black",
                                                className: "mr-1"
                                            }),
                                            "Copy"
                                        ]
                                    })
                                })
                            })
                        ]
                    }, index.toString()))
            })
        ]
    }) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OffersAndCoupons);
const OffersSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().skeleton_wrapper)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().wrapper)}`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {
                variant: "text",
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().Skeleton_text)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().offer_card_skeleton),
                children: [
                    1,
                    2,
                    3,
                    4
                ]?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {
                            variant: "rectangular",
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().offer_coupon_skeleton)
                        }, index.toString())
                    }))
            })
        ]
    });
};


/***/ }),

/***/ 99876:
/***/ ((module) => {

// Exports
module.exports = {
	"Skeleton_wrapper": "style_Skeleton_wrapper__21HWv",
	"skeleton_main": "style_skeleton_main__LzQ6H",
	"main_containor": "style_main_containor__F4FRT",
	"Skeleton_row": "style_Skeleton_row__mgGr3",
	"Skeleton_text": "style_Skeleton_text__wKi74",
	"Skeleton_sub_text": "style_Skeleton_sub_text__qIATK"
};


/***/ }),

/***/ 47919:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__SDXGg",
	"heading": "style_heading__abVcz",
	"cards_wrapper": "style_cards_wrapper__WVOic",
	"card": "style_card___YROH",
	"desc": "style_desc__3K748",
	"code": "style_code__u9cCG",
	"copy_div": "style_copy_div__o4dkB",
	"line": "style_line__UX_KH",
	"ellipse": "style_ellipse__iPmwO",
	"left": "style_left__xr5NQ",
	"right": "style_right__6oHaM",
	"Skeleton_text": "style_Skeleton_text__5hX03",
	"offer_card_skeleton": "style_offer_card_skeleton__mUkDC",
	"offer_coupon_skeleton": "style_offer_coupon_skeleton__JECuk",
	"skeleton_wrapper": "style_skeleton_wrapper__w9s55"
};


/***/ })

};
;