exports.id = 8523;
exports.ids = [8523];
exports.modules = {

/***/ 88523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterSkeleton: () => (/* binding */ FooterSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76730);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48421);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12301);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44485);
/* harmony import */ var _hooks_useQuery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(78490);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29460);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43334);











const Footer = ({ params })=>{
    const { checkAuthentication } = (0,_hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_8__/* .useAuthentication */ .J)();
    const cityName = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.homePagedata.cityName);
    const reduxLoginState = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((state)=>state.homePagedata.isLogin);
    const currentYear = new Date().getFullYear();
    const text = `© Copyright ${currentYear} Cityfurnish. All Rights Reserved.`;
    const str = {
        why_furni: "Furniture Rental: An Affordable and Flexible Option",
        why_furni_desc: "Are you looking for a cost-effective and flexible way to furnish your home or office? Furniture rental may be the solution you've been searching for. CityFurnish, a leading furniture rental company, offers a wide range of home and office furniture for rent online, through their user-friendly furniture rental app.",
        contact: "080-66084700",
        time: "(09AM to 09PM)",
        go_to_top: "Go to top"
    };
    const [isLogin, setIsLogin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsLogin(reduxLoginState);
    }, [
        reduxLoginState
    ]);
    // console.log(isLogin, reduxLoginState, "footer");
    // const userId = decrypt(getLocalStorage("_ga"));
    const handleAuthentication = async ()=>{
        const isAuth = await checkAuthentication();
        setIsLogin(isAuth);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        handleAuthentication();
    }, [
        isLogin
    ]);
    const array = [
        {
            head: "Categories",
            points: [
                {
                    text: "All",
                    link: `/${cityName.replace(/\//g, "-").toLowerCase()}/rent`
                },
                {
                    text: "Home Furniture",
                    link: `/${cityName.replace(/\//g, "-").toLowerCase()}/home-furniture-rental`
                },
                {
                    text: "Appliances",
                    link: `/${cityName.replace(/\//g, "-").toLowerCase()}/home-appliances-rental`
                },
                {
                    text: "Workstations",
                    link: `/${cityName.replace(/\//g, "-").toLowerCase()}/workstations`
                },
                {
                    text: "Combos",
                    link: `/${cityName.replace(/\//g, "-").toLowerCase()}/rental-packages`
                },
                {
                    text: "Furniture Sale",
                    link: "https://zior.in/"
                }
            ]
        },
        {
            head: "Cityfurnish",
            points: [
                {
                    text: "About US",
                    link: "/pages/about"
                },
                {
                    text: "Refer a Friend",
                    link: isLogin ? "/referral" : "/pages/refer-a-friend"
                },
                {
                    text: "Career",
                    link: "/pages/careers"
                },
                {
                    text: "Contact US",
                    link: "/pages/contact-us"
                }
            ]
        },
        {
            head: "Information",
            points: [
                {
                    text: "Blog",
                    link: "https://cityfurnish.com/blog/"
                },
                {
                    text: "FAQ",
                    link: "/pages/faq"
                },
                {
                    text: "Sample Rental Agreement",
                    link: "/pages/rentalagreement"
                },
                {
                    text: "Offers",
                    link: "/pages/offers"
                },
                {
                    text: "Benefits",
                    link: "/pages/benefits"
                }
            ]
        },
        {
            head: "Resources",
            points: [
                {
                    text: "Privacy Policy",
                    link: "/pages/privacy-policy"
                },
                {
                    text: "Terms & Conditions",
                    link: "/pages/terms-of-use"
                }
            ]
        }
    ];
    const [points, setPoints] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(array);
    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const cityIdStr = (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .getLocalStorageString */ .$W)("cityId")?.toString()?.replace(/"/g, "");
    const cityId = parseFloat(cityIdStr);
    const { refetch: getcategoryContent } = (0,_hooks_useQuery__WEBPACK_IMPORTED_MODULE_5__/* .useQuery */ .a)("category-content", _network_endPoints__WEBPACK_IMPORTED_MODULE_4__/* .endPoints */ .z.categoryContent, `?cityId=${cityId}&categoryId=27`);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params === "category") {
            getcategoryContent().then((res)=>{
                setContent(res?.data?.data);
            }).catch((err)=>console.log(err));
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPoints(array);
    }, [
        cityName
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().footer_wrapper),
        children: [
            content.map((str, index)=>{
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().head),
                            children: str.cat_heading
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().desc),
                            dangerouslySetInnerHTML: {
                                __html: str.cat_desc
                            }
                        })
                    ]
                }, index.toString());
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().pointers_div),
                children: [
                    points?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().head_wrapper),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    className: `!text-[#222] ${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().head)}`,
                                    children: item.head
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().points_div),
                                    children: item?.points?.map((t, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: t.text === "Refer a Friend" ? isLogin ? "/referral" : "/pages/refer-a-friend" : t.link,
                                            "aria-label": t.text,
                                            target: t.text === "Furniture Sale" ? "_blank" : "_self",
                                            rel: "noopener  noreferrer",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().points),
                                                onClick: ()=>{
                                                    if (t?.text === "Workstations") {
                                                        (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .setLocalStorage */ .qQ)("subCategory", "Workstations");
                                                    } else {
                                                        (0,_constants_constant__WEBPACK_IMPORTED_MODULE_7__/* .setLocalStorage */ .qQ)("subCategory", "All");
                                                    }
                                                },
                                                children: t?.text
                                            })
                                        }, index.toString()))
                                })
                            ]
                        }, index.toString())),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().need_help_box),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: `!text-[#222] ${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().head)}`,
                                children: "Need Help"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().contact_div),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().phoneImg)} pointer-events-none`,
                                        alt: "phone-icon",
                                        src: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .FooterIcons */ .Oq.Phone,
                                        loading: "lazy"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().contact),
                                                children: [
                                                    " ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        href: `tel:${str.contact}`,
                                                        target: "_self",
                                                        rel: "noopener  noreferrer",
                                                        children: str.contact
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().time),
                                                children: str.time
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().social_media_icons_div),
                                children: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .FooterIcons */ .Oq?.social_media_icons?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: item.link,
                                        target: "_blank",
                                        rel: "noopener  noreferrer",
                                        "aria-label": item?.icon,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            alt: item?.icon,
                                            src: item?.icon,
                                            className: "pointer-events-none",
                                            onClick: ()=>console.log("item.link"),
                                            loading: "lazy"
                                        })
                                    }, index.toString()))
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().line)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "xl:hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().contact_div),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().phoneImg)} pointer-events-none`,
                                alt: "phone-icon",
                                src: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .FooterIcons */ .Oq.Phone,
                                loading: "lazy"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().contact),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: `tel:${str.contact}`,
                                            target: "_self",
                                            rel: "noopener  noreferrer",
                                            children: str.contact
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().time),
                                        children: str.time
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().social_media_icons_div),
                        children: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .FooterIcons */ .Oq?.social_media_icons?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: item.link,
                                target: "_blank",
                                rel: "noopener  noreferrer",
                                "aria-label": item?.icon,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    alt: item?.icon,
                                    src: item?.icon,
                                    loading: "lazy",
                                    className: "pointer-events-none"
                                })
                            }, index.toString()))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().copyRight_div),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().copyTxt),
                        children: text
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().goToTopDiv),
                        onClick: (e)=>{
                            e.preventDefault();
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth"
                            });
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                src: _assets_icon__WEBPACK_IMPORTED_MODULE_3__/* .FooterIcons */ .Oq.GoToTopIcon,
                                alt: "go-to-top-icon",
                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().goToTopIcon)} pointer-events-none`,
                                loading: "lazy"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().goToTopTxt),
                                children: str.go_to_top
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);
const FooterSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().footer_wrapper_skeleton),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_div_wrapper),
                children: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ].map((item)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().pointers_div_skeleton),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().head_wrapper_skeleton),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                    variant: "text",
                                    className: "w-full h-full"
                                })
                            }),
                            [
                                1,
                                2,
                                3,
                                4
                            ]?.map((item)=>{
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().points_skeleton),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                        variant: "text",
                                        className: "w-full h-full"
                                    })
                                }, item.toString());
                            })
                        ]
                    }, item.toString());
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().line)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().copyRight_div_skeleton),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().copyright_skeleton),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                            variant: "text",
                            className: "w-full h-full"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_9___default().goToTopDiv),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                variant: "circular",
                                width: 25,
                                height: 25
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                variant: "text",
                                width: 50,
                                height: 10
                            })
                        ]
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 76730:
/***/ ((module) => {

// Exports
module.exports = {
	"footer_wrapper": "style_footer_wrapper__k6U1Q",
	"head": "style_head__eD6X1",
	"desc": "style_desc__BM3CO",
	"pointers_div": "style_pointers_div__TfDME",
	"points_div": "style_points_div__MBBaE",
	"points": "style_points__KSanI",
	"line": "style_line__SmPql",
	"contact_div": "style_contact_div__t9EjJ",
	"phoneImg": "style_phoneImg__vg5KA",
	"contact": "style_contact__5GEOW",
	"time": "style_time__FHDmz",
	"social_media_icons_div": "style_social_media_icons_div__9ygw2",
	"sm_icon": "style_sm_icon__g8znT",
	"copyRight_div": "style_copyRight_div__cyIYp",
	"copyTxt": "style_copyTxt__mnzSF",
	"goToTopDiv": "style_goToTopDiv__x56bM",
	"goToTopIcon": "style_goToTopIcon__6Rn8N",
	"goToTopTxt": "style_goToTopTxt__wtq9t",
	"head_wrapper": "style_head_wrapper___BJfD",
	"need_help_box": "style_need_help_box__k90wx",
	"footer_wrapper_skeleton": "style_footer_wrapper_skeleton__sLaLg",
	"head_wrapper_skeleton": "style_head_wrapper_skeleton__kweUJ",
	"pointers_div_skeleton": "style_pointers_div_skeleton__nTt7C",
	"points_skeleton": "style_points_skeleton__tJ4MI",
	"skeleton_div_wrapper": "style_skeleton_div_wrapper__oXYMk",
	"copyright_skeleton": "style_copyright_skeleton__RqfQs",
	"copyRight_div_skeleton": "style_copyRight_div_skeleton__Np_Bn"
};


/***/ })

};
;