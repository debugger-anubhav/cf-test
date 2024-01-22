exports.id = 6278;
exports.ids = [6278];
exports.modules = {

/***/ 26278:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61074);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23191);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24664);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44485);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40248);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62219);
/* __next_internal_client_entry_do_not_use__ default auto */ 



// import {HappySubscriber} from "@/constants/constant";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";





const HappySubscribers = ({ page, params })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const [data, setData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [isDumy, setIsDumy] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const getVideosForProductPage = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.productPage.happySubscribers(params.productId)).then((res)=>{
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .getSubscribersVideos */ .qF)(res?.data?.data));
            setData(res?.data?.data);
        }).catch((err)=>{
            console.log(err);
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .getSubscribersVideos */ .qF)([]));
        });
    };
    const getVideosForHomePage = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.homePageHappySubscriber).then((res)=>{
            const timeOutId = setTimeout(()=>{
                setData(res?.data?.data);
                clearTimeout(timeOutId);
            }, 1000);
        // console.log("home")
        }).catch((err)=>{
            console.log(err);
            dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .getSubscribersVideos */ .qF)([]));
        });
    };
    const getVideosForSeoAppliancesPage = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.seoApplianceHappyCustomer).then((res)=>{
            setData(res?.data?.data);
        // console.log("appliances-rental")
        }).catch((err)=>{
            console.log(err);
        });
    };
    const getVideosForSeoFurniturePage = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.seoFurnitureHappyCustomer).then((res)=>{
            setData(res?.data?.data);
        // console.log("furniture-rental")
        }).catch((err)=>{
            console.log(err);
        });
    };
    const getVideosForCategoryPage = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.categoryHappySubscriber(params)).then((res)=>{
            setData(res?.data?.data);
        }).catch((err)=>{
            console.log(err);
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (page === "home-page") {
            getVideosForHomePage();
        } else if (page === "product") {
            getVideosForProductPage();
        } else if (page === "appliances-rental") {
            getVideosForSeoAppliancesPage();
        } else if (page === "category") {
            getVideosForCategoryPage();
        } else if (page === "furniture-rental") {
            getVideosForSeoFurniturePage();
        } else {
            getVideosForHomePage();
        }
    }, []);
    const str = _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.HappySubscriber;
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleScrolling = ()=>{
        const slider = containerRef.current;
        // console.log(slider);
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
    // const HappySubscriberVideosArray =
    //   page === "product" ? productPageSubscribersVideos : HappySubscriber;
    if (data?.length > 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: `${page === "product" ? "mt-8 xl:mt-[88px]" : ""} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().happy_subscribers_wrapper)}`,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().label),
                    children: str.label
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().head),
                    children: str.head
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().desc),
                    children: str.desc
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().cards_wrapper),
                    ref: containerRef,
                    onMouseOver: handleScrolling,
                    children: data?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().card_div)}  ${index === data?.length - 1 && "mr-[16px]"} ${isDumy && "pointer-events-none"}`,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().video),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("iframe", {
                                        loading: "lazy",
                                        width: "256",
                                        height: "152",
                                        // src="https://www.youtube.com/embed/KAc3AEpQNSs?list=PLRheCL1cXHrtUJKNwE4Ksn6JEpOx5W_ye"
                                        src: item.file_name,
                                        title: "YouTube video player",
                                        allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                                        allowFullScreen: true
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().video_name),
                                    children: item?.title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().video_desc),
                                    children: item?.description.replace(/<[^>]*>/g, "")
                                })
                            ]
                        }, index.toString()))
                })
            ]
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HappySubscribers);


/***/ }),

/***/ 61074:
/***/ ((module) => {

// Exports
module.exports = {
	"happy_subscribers_wrapper": "style_happy_subscribers_wrapper__MjibD",
	"label": "style_label__1c11d",
	"head": "style_head__6Fvsm",
	"desc": "style_desc__W6Jai",
	"cards_wrapper": "style_cards_wrapper__k4meM",
	"card_div": "style_card_div__1B5BG",
	"video": "style_video__aQqgo",
	"video_name": "style_video_name__C_HW8",
	"video_desc": "style_video_desc__U_04z",
	"video_player": "style_video_player__FId2c",
	"play_button_container": "style_play_button_container__5oO1u"
};


/***/ })

};
;