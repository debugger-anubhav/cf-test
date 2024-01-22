exports.id = 1920;
exports.ids = [1920];
exports.modules = {

/***/ 1920:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(16217);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48421);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_images__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17012);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44485);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24664);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78490);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(75484);
/* harmony import */ var react_rating__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29366);
/* harmony import */ var react_rating__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_rating__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(29460);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(40248);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(62219);
/* __next_internal_client_entry_do_not_use__ default auto */ 














const CustomerRating = ()=>{
    const { reviews } = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.homePagedata);
    const sectionHeading = "See what people are saying";
    const subhead = `from ${reviews?.[0]?.fc_google_location_data[0]?.total_review} customers`;
    const btntxt = "Write a review";
    const [reviewLink, setReviewLink] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    // const homePageReduxData = useSelector(state => state.homePagedata);
    const cityIdStr = localStorage.getItem("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    const { refetch: getGoogleReviews } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_8__/* .useQuery */ .a)("google-reviews", _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.googleReviews, `?cityId=${cityId}`);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getGoogleReviews().then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_7__/* .addGoogleReviews */ .GK)(res?.data?.data));
        }).catch((err)=>console.log(err));
    }, [
        cityId
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        axios__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_11__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.googleReviewsLinks((0,_constants_constant__WEBPACK_IMPORTED_MODULE_10__/* .getLocalStorage */ .$o)("cityId"))).then((res)=>{
            setReviewLink(res?.data?.data?.newReviewUri);
        }).catch((err)=>console.log(err));
    }, [
        (0,_constants_constant__WEBPACK_IMPORTED_MODULE_10__/* .getLocalStorage */ .$o)("cityId")
    ]);
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
            mouseDown = false;
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
        return ()=>{
            slider.removeEventListener("mousemove", (e)=>{
                e.preventDefault();
                if (!mouseDown) return;
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            });
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().wrapper),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().head),
                        children: sectionHeading
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().upper_div),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().rating_div),
                                children: [
                                    reviews?.[0]?.fc_google_location_data[0]?.average_review,
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().star),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .RatingStar */ .ep, {
                                            color: "#FFCB45",
                                            size: 24
                                        })
                                    }),
                                    "rating"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: reviewLink,
                                target: "_blank",
                                rel: "noreferrer",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    src: _assets_images__WEBPACK_IMPORTED_MODULE_4__/* .HomePageImages */ .Pr.editIcon,
                                    alt: "editIcon",
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().editIcon),
                                    loading: "lazy"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: reviewLink,
                                target: "_blank",
                                rel: "noreferrer",
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().editlink),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().editBtn),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .EditIcon */ .dY, {
                                            size: 25
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-[#222] font-medium",
                                            children: btntxt
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().subhead),
                        children: subhead
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().card_wrapper),
                ref: sliderRef,
                children: reviews?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().card)} ${index === reviews?.length - 1 && "mr-[16px]"}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().row),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    src: `https://d3juy0zp6vqec8.cloudfront.net/images/google_review/${item?.user_image}`,
                                                    alt: "profile-pic",
                                                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().img)} pointer-events-none`,
                                                    loading: "lazy"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "ml-3 mr-7",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().name),
                                                        children: item?.user_name
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "flex gap-2",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_rating__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                            stop: 5,
                                                            emptySymbol: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bs__WEBPACK_IMPORTED_MODULE_14__/* .BsStarFill */ .kRm, {
                                                                size: 16,
                                                                color: "#fff",
                                                                className: "mr-1"
                                                            }),
                                                            fullSymbol: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bs__WEBPACK_IMPORTED_MODULE_14__/* .BsStarFill */ .kRm, {
                                                                size: 16,
                                                                color: "#FFCB45",
                                                                className: "mr-1"
                                                            }),
                                                            initialRating: item?.fc_google_location_data[0]?.average_review,
                                                            readonly: true
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .GoogleIcon */ ._8, {
                                        color: "#5391F7",
                                        size: 30
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().content),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_13___default().contentP),
                                    children: item?.comment
                                })
                            })
                        ]
                    }, index.toString()))
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomerRating);


/***/ }),

/***/ 16217:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__T8Qwr",
	"head": "style_head__HJx9H",
	"rating_div": "style_rating_div__sx4JH",
	"star": "style_star__LW6Ym",
	"upper_div": "style_upper_div__bQ4Bs",
	"editIcon": "style_editIcon__xCMJt",
	"subhead": "style_subhead__suz6e",
	"card_wrapper": "style_card_wrapper__r5Sa_",
	"card": "style_card__VQvIF",
	"img": "style_img__foXSs",
	"row": "style_row__zUZUp",
	"content": "style_content__b3dhv",
	"contentP": "style_contentP__prV0a",
	"editBtn": "style_editBtn__d0eIG",
	"editlink": "style_editlink__nG4_B"
};


/***/ })

};
;