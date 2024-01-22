exports.id = 2212;
exports.ids = [2212];
exports.modules = {

/***/ 78060:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ ContentSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39327);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_2__);




const ContentSkeleton = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().main_containor),
        children: [
            1,
            2,
            3,
            4,
            5
        ]?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().wrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_text),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                            variant: "text",
                            className: "w-full h-full"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_sub_text),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                            variant: "text",
                            className: "w-full h-full"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_sub_text_second)} `,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                            variant: "text",
                            className: "w-full h-full"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().Skeleton_sub_text_less)} !w-[80%]`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                            variant: "text",
                            className: "w-full h-full"
                        })
                    })
                ]
            }, index.toString()))
    });
};


/***/ }),

/***/ 73841:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17012);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2252);
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(87224);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55196);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_6__);
/* __next_internal_client_entry_do_not_use__ default auto */ 
// import {HeroBannerText} from "@/constants/constant";







const HeroBanner = ()=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.homePagedata);
    const handleRedirection = ()=>{
        router.push(`/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/rent`);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().hero_banner_main)} landing_page_carousel`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_4__/* .Carousel */ .lr, {
                    showStatus: false,
                    showArrows: false,
                    showThumbs: false,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().hero_banner_cursor_pointer),
                            onClick: ()=>{
                                handleRedirection();
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: _assets_images__WEBPACK_IMPORTED_MODULE_1__/* .HeroBannerImages */ .Pd.HeroBannerImageOne,
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().carousel_images),
                                alt: "hero-banner-1"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().hero_banner_cursor_pointer),
                            onClick: ()=>{
                                handleRedirection();
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: _assets_images__WEBPACK_IMPORTED_MODULE_1__/* .HeroBannerImages */ .Pd.HeroBannerImageTwo,
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().carousel_images),
                                alt: "hero-banner-2"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().hero_banner_cursor_pointer),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: _assets_images__WEBPACK_IMPORTED_MODULE_1__/* .HeroBannerImages */ .Pd.HeroBannerImageThree,
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().carousel_images),
                                alt: "hero-banner-3"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_7___default().hero_banner_wrapper),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: `/${homePageReduxData?.cityName.toLowerCase().replace(/\//g, "-")}/rent`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: _assets_images__WEBPACK_IMPORTED_MODULE_1__/* .HeroFrame */ .VH,
                        alt: "hero-banner",
                        className: "w-full"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeroBanner);


/***/ }),

/***/ 75575:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewlyLauncedSkeleton: () => (/* binding */ NewlyLauncedSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95624);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23191);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24664);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44485);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78490);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_7__);










const NewlyLaunched = ()=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const heading = _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.Newlylaunced.heading;
    const subHeading = _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.Newlylaunced.productRent;
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata);
    const cityId = homePageReduxData.cityId;
    const { refetch: getNewlaunchedProduct } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_6__/* .useQuery */ .a)("new-product", _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.newlylaunchedProduct, `?cityId=${cityId}`);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const { newProduct: newProductFetched } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata);
    const [newProduct, setNewProduct] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getNewlaunchedProduct().then((res)=>{
            setNewProduct(res?.data?.data);
        }).catch((err)=>console.log(err));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        newLaunchedProductData();
    }, [
        newProduct
    ]);
    const newLaunchedProductData = ()=>{
        dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .addNewlaunchedProducts */ .yA)(newProduct));
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().main_container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().brown_box)} hidden lg:flex`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().heading),
                            children: heading
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().subHeading),
                            children: subHeading
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().images_wrapper),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().brown_box)} lg:hidden flex`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().heading),
                                    children: heading
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().subHeading),
                                    children: subHeading
                                })
                            ]
                        })
                    }),
                    newProductFetched?.map((ele, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().width_container)} ${index === newProductFetched?.length - 1 && "mr-[16px]"} relative`,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "w-full h-auto cursor-pointer ",
                                    onClick: ()=>router.push(`/things/${ele.id}/${ele.seourl}`),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        onClick: (e)=>e.preventDefault(),
                                        href: `/things/${ele.id}/${ele.seourl}`,
                                        "aria-label": ele?.product_name,
                                        target: "_self",
                                        rel: "noopener",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/" + ele?.image?.split(",")[0],
                                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().img),
                                            alt: ele?.product_name,
                                            loading: "lazy"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().price_tag),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: `₹${ele?.sale_price} / month`
                                    })
                                })
                            ]
                        }, index.toString()))
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewlyLaunched);
const NewlyLauncedSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().main_container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().skeleton_brown_box)}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().skeleton_box),
                    variant: "rectangular"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().skeleton_images_wrapper),
                children: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().Newlylaunced_skeleton_wrapper),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_8___default().skeleton_box),
                            variant: "rectangular"
                        })
                    }, index.toString()))
            })
        ]
    });
};


/***/ }),

/***/ 74707:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  RentNowBannersSkeleton: () => (/* binding */ RentNowBannersSkeleton),
  "default": () => (/* binding */ Home_RentNowBanner)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Home/RentNowBanner/style.module.css
var style_module = __webpack_require__(99966);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./src/hooks/useQuery.js
var useQuery = __webpack_require__(78490);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
// EXTERNAL MODULE: ./src/components/Common/RentNowCards/style.module.css
var RentNowCards_style_module = __webpack_require__(88031);
var RentNowCards_style_module_default = /*#__PURE__*/__webpack_require__.n(RentNowCards_style_module);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
;// CONCATENATED MODULE: ./src/components/Common/RentNowCards/index.js





const RentNowCard = ({ cardImage, url, alt })=>{
    const router = (0,navigation.useRouter)();
    const [URL, setURL] = (0,react_.useState)();
    const cityName = (0,lib.useSelector)((state)=>state.homePagedata.cityName);
    const imageAlt = alt.replace(/\.webp$/, "");
    (0,react_.useEffect)(()=>{
        if (url.includes("[city]")) {
            setURL(url.replace(/\[city\]/g, cityName.replace(/\//g, "-").toLowerCase()));
        // router.push(url); // Navigate to the URL
        } else {
            setURL(url); // Navigate to the URL
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (RentNowCards_style_module_default()).wrapper,
        onClick: ()=>{
            router.push(URL);
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
            href: URL,
            onClick: (e)=>e.preventDefault(),
            "aria-label": imageAlt,
            target: "_self",
            rel: "noopener",
            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: cardImage,
                className: (RentNowCards_style_module_default())?.banner_img,
                alt: imageAlt,
                loading: "lazy"
            })
        })
    });
};
/* harmony default export */ const RentNowCards = (RentNowCard);

;// CONCATENATED MODULE: ./src/components/Home/RentNowBanner/index.js
/* __next_internal_client_entry_do_not_use__ default,RentNowBannersSkeleton auto */ 






const RentNowBanner = ({ params })=>{
    const [rentNowBanner, setRentNowBanner] = react_default().useState(null);
    const [isDumy, setIsDumy] = react_default().useState(false);
    const { refetch: getRentNowBanners } = (0,useQuery/* useQuery */.a)("rentNowBanners", endPoints/* endPoints */.z.rentNowBanners);
    const { refetch: getSeoApplianceBanners } = (0,useQuery/* useQuery */.a)("seoApplianceBanners", endPoints/* endPoints */.z.seoApplianceBanners);
    const { refetch: getSeoFurnitureBanners } = (0,useQuery/* useQuery */.a)("seoFurnitureBanners", endPoints/* endPoints */.z.seoFurnitureBanners);
    (0,react_.useEffect)(()=>{
        if (params === "home-page") {
            getRentNowBanners().then((res)=>{
                setRentNowBanner(res?.data?.data);
            // console.log("homepage")
            }).catch((err)=>console.log(err));
        } else if (params?.category === "appliances-rental") {
            getSeoApplianceBanners().then((res)=>{
                setRentNowBanner(res?.data?.data);
            // console.log("appliances-rental")
            }).catch((err)=>console.log(err));
        } else if (params?.category === "furniture-rental") {
            getSeoFurnitureBanners().then((res)=>{
                setRentNowBanner(res?.data?.data);
            // console.log("furniture-rental")
            }).catch((err)=>console.log(err));
        }
    }, []);
    const sliderRef = (0,react_.useRef)(null);
    (0,react_.useEffect)(()=>{
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
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (style_module_default()).rentNow_Banner_wrapper,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (style_module_default()).banner_card,
            ref: sliderRef,
            children: rentNowBanner?.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: `${(style_module_default()).banner_wrapper} ${index === rentNowBanner?.length - 1 && "mr-[16px]"} ${isDumy && "pointer-events-none"}`,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(RentNowCards, {
                        cardImage: `https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/${item?.image}`,
                        url: item?.url,
                        alt: item?.image
                    })
                }, index.toString()))
        })
    });
};
/* harmony default export */ const Home_RentNowBanner = (RentNowBanner);
const RentNowBannersSkeleton = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (style_module_default()).rentNow_Banner_wrapper,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (style_module_default()).banner_card,
            children: [
                1,
                2,
                3,
                4,
                5,
                6
            ].map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (style_module_default()).banner_wrapper,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                        variant: "rectangular",
                        className: (style_module_default()).skeleton_box
                    })
                }, index.toString()))
        })
    });
};


/***/ }),

/***/ 75444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TryCityMaxSkeleton: () => (/* binding */ TryCityMaxSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76411);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48421);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12301);
/* harmony import */ var _assets_images__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17012);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _cityMaxDrawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33875);









// import SideDrawer from "./sideDrawer";
const TryCityMax = ()=>{
    const [isDrawerOpen, setIsDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const benefitsOfCity = [
        {
            id: 1,
            img: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .CityMaxIcons */ .xQ.Icon1,
            title: "Quality products",
            paragraph: "Branded appliances and solid Sheesham Wood products in mint new condition"
        },
        {
            id: 2,
            img: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .CityMaxIcons */ .xQ.Icon2,
            title: "Free Swap",
            paragraph: "Swap any product or design anytime during the subscription period"
        },
        {
            id: 3,
            title: "Cancel anytime",
            img: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .CityMaxIcons */ .xQ.Icon3,
            paragraph: "We will deduct 1 month's extra rent as a penalty and refund rest of the amount instantly"
        },
        {
            id: 4,
            img: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .CityMaxIcons */ .xQ.Icon4,
            title: "Easy on Wallet",
            paragraph: "You can pay subscription fee in one go or opt for our no cost EMI plan"
        }
    ];
    const HandleToggleDrawer = ()=>{
        setIsDrawerOpen(!isDrawerOpen);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().main_wrapper),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().left_image_section),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: _assets_images__WEBPACK_IMPORTED_MODULE_4__/* .TryCityMaxBannerWeb */ .Tr,
                            alt: "trycity",
                            className: `hidden xl:flex ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().tryCity_image)} pointer-events-none`,
                            loading: "lazy"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: _assets_images__WEBPACK_IMPORTED_MODULE_4__/* .TryCityMaxBannerMobile */ .yW,
                            alt: "trycity",
                            className: `xl:hidden ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().tryCity_image)} pointer-events-none`,
                            loading: "lazy"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().right_text_section),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().tryCity_heading),
                            children: [
                                "Try ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().tryCity_headingMax),
                                    children: "CityMax."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().TryCity_paragraph),
                            children: [
                                "Unlimited furniture and appliances for",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                " lifetime. Starting at just",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().rupeeIcon),
                                    children: "₹"
                                }),
                                "2,999/month."
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "https://test.rentofurniture.com/citymax",
                            onClick: (e)=>{
                                e.preventDefault();
                            },
                            "aria-label": "Check our plans",
                            target: "_self",
                            rel: "noopener",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().check_button),
                                onClick: ()=>router.push("https://test.rentofurniture.com/citymax"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().check_button_paragraph),
                                        children: "Check our plans"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .ForwardArrow */ .Xs, {
                                        size: 20,
                                        color: "#222",
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().forward_icon)
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().benefits_of_city_wrapper),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().benefits_text),
                                    children: "Benefits of CityMax"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().line)
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().benefits_content),
                                    children: benefitsOfCity?.map((item, index)=>{
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().card_wrapper),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: `w-100 h-100 absolute z-10`
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    src: item?.img,
                                                    className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().card_icon)} relative z-[-1]`,
                                                    alt: "card-icon",
                                                    loading: "lazy"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().benefit_title),
                                                    children: item?.title
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().benefit_paragraph),
                                                    children: item?.paragraph
                                                })
                                            ]
                                        }, index.toString());
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().how_it_works_button),
                                        onClick: HandleToggleDrawer,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().how_it_works_paragraph),
                                                children: "How it works"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .ForwardArrow */ .Xs, {
                                                size: 18,
                                                color: "#597492",
                                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().forward_arrow)
                                            })
                                        ]
                                    })
                                }),
                                isDrawerOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_cityMaxDrawer__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    toggleDrawer: HandleToggleDrawer,
                                    open: isDrawerOpen
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().underline)
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TryCityMax);
const TryCityMaxSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().main_wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().left_image_section),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                    variant: "rectangular",
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().skeleton_box)
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().right_text_section)} h-full`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                        variant: "text",
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().Skeleton_text)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                        variant: "text",
                        className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().Skeleton_text)} w-[80%]`
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                        variant: "text",
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().Skeleton_button)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                        variant: "text",
                        className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_7___default().Skeleton_text)} mt-10 mb-4`,
                        width: "140px"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                        variant: "text",
                        height: "0.5rem",
                        width: "100%"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: " flex flex-wrap",
                        children: [
                            1,
                            2
                        ].map((i, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: " w-[40%] mr-10",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {
                                    variant: "text",
                                    height: "400px"
                                })
                            }, index.toString()))
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 39327:
/***/ ((module) => {

// Exports
module.exports = {
	"main_containor": "styles_main_containor__R6qOG",
	"Skeleton_text": "styles_Skeleton_text__iXrTe",
	"Skeleton_sub_text": "styles_Skeleton_sub_text__TbNg2",
	"Skeleton_sub_text_less": "styles_Skeleton_sub_text_less___kGty",
	"wrapper": "styles_wrapper__X4_as",
	"Skeleton_sub_text_second": "styles_Skeleton_sub_text_second__wEyOi"
};


/***/ }),

/***/ 88031:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__fMg3s",
	"hover_wrapper": "style_hover_wrapper__a2wye",
	"fadeOut": "style_fadeOut__Y_tch",
	"card_image_hover": "style_card_image_hover__kb_D4",
	"card_price_wrap": "style_card_price_wrap__jgJpp",
	"thumbnail": "style_thumbnail__azf9a",
	"desc_div": "style_desc_div__eekD0",
	"desc": "style_desc__ChUIQ",
	"price_div": "style_price_div__80gR3",
	"originalPrice": "style_originalPrice__Vzz8G",
	"currentPrice": "style_currentPrice__MnRCT",
	"discount": "style_discount__0IA2M",
	"item_included_container": "style_item_included_container__BsZ8m",
	"item_icluded_text": "style_item_icluded_text__H_KQM",
	"soldout_tag": "style_soldout_tag___Q7ay",
	"tag_text": "style_tag_text__Kh9FO",
	"banner_img": "style_banner_img__FJbjC"
};


/***/ }),

/***/ 55196:
/***/ ((module) => {

// Exports
module.exports = {
	"hero_banner_wrapper": "style_hero_banner_wrapper__2xSjV",
	"hero_banner_main": "style_hero_banner_main__qv0C2",
	"carousel_images": "style_carousel_images__xe_7D",
	"hero_banner_cursor_pointer": "style_hero_banner_cursor_pointer__uMKPt"
};


/***/ }),

/***/ 95624:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__s_n5l",
	"brown_box": "style_brown_box__BSQqy",
	"heading": "style_heading__cZjes",
	"subHeading": "style_subHeading___UFz_",
	"price_tag": "style_price_tag__zAmzd",
	"img": "style_img__LZB9I",
	"images_wrapper": "style_images_wrapper__xZ5av",
	"width_container": "style_width_container__ikG7k",
	"skeleton_brown_box": "style_skeleton_brown_box__28XM2",
	"skeleton_images_wrapper": "style_skeleton_images_wrapper__NDgHT",
	"Newlylaunced_skeleton_wrapper": "style_Newlylaunced_skeleton_wrapper__5LvwM",
	"skeleton_box": "style_skeleton_box___xH1L"
};


/***/ }),

/***/ 99966:
/***/ ((module) => {

// Exports
module.exports = {
	"rentNow_Banner_wrapper": "style_rentNow_Banner_wrapper__D18eV",
	"banner_card": "style_banner_card__wsPp8",
	"banner_wrapper": "style_banner_wrapper__jcOJ1",
	"banner_img": "style_banner_img__nohc6",
	"main_container": "style_main_container__stZo3",
	"heading": "style_heading__ERyg7",
	"card_box": "style_card_box__JcPVg",
	"recentlyViewed_main": "style_recentlyViewed_main__tjKQJ",
	"wrapper": "style_wrapper__7gHwq",
	"hover_wrapper": "style_hover_wrapper__O8AxG",
	"fadeOut": "style_fadeOut__Yt7tb",
	"card_image_hover": "style_card_image_hover__n8lee",
	"card_price_wrap": "style_card_price_wrap__cI9EH",
	"thumbnail": "style_thumbnail__LTEvg",
	"desc_div": "style_desc_div__DIedc",
	"desc": "style_desc__pd5pa",
	"price_div": "style_price_div__AGZ2c",
	"originalPrice": "style_originalPrice__F_xKl",
	"currentPrice": "style_currentPrice__tCjRG",
	"discount": "style_discount__bLqlq",
	"item_included_container": "style_item_included_container__JTxp8",
	"item_icluded_text": "style_item_icluded_text__n9UlY",
	"soldout_tag": "style_soldout_tag__ETtr_",
	"tag_text": "style_tag_text__ODDf0",
	"skeleton_box": "style_skeleton_box__88tSv"
};


/***/ })

};
;