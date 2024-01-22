exports.id = 881;
exports.ids = [881];
exports.modules = {

/***/ 40881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52663);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var _assets_images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17012);





const CityShieldContent = ({ cityShieldCurrentPrice, cityShieldOriginalPrice, cityShieldDiscount, toggleDrawer, toggleCheckbox })=>{
    const benefits = [
        {
            img: _assets_images__WEBPACK_IMPORTED_MODULE_3__/* .ProductPageImages */ .wl.sratches,
            label: "Scratches & dents"
        },
        {
            img: _assets_images__WEBPACK_IMPORTED_MODULE_3__/* .ProductPageImages */ .wl.liquidSpill,
            label: "Liquid spills & stains"
        },
        {
            img: _assets_images__WEBPACK_IMPORTED_MODULE_3__/* .ProductPageImages */ .wl.brokenFurni,
            label: "Broken furniture"
        },
        {
            img: _assets_images__WEBPACK_IMPORTED_MODULE_3__/* .ProductPageImages */ .wl.cracksTears,
            label: "Cracks, tears & more"
        }
    ];
    const coveredPoints = [
        "Damages due to normal wear and tear",
        "Scratches and dents on the product(s)",
        "Liquid spills and food stains on the upholstery or product surfaces",
        "Cracks and tears to the product(s)",
        "Bugs and fungus damaging the product(s)",
        "And more"
    ];
    const uncoveredPoints = [
        " Damages voluntarily caused or worsened, with sharp objects, hand or power tools, cigarette butts, or other such abuse",
        "Burglary or theft of the product(s)"
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-[100vh] overflow-scroll pb-[200px] md:pb-0",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().value_added_txt),
                children: "Value added service"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().flexx),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .VerifyIcon */ .R$, {
                        size: 30,
                        color: "#2D9469"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().city_shield_head)} `,
                        children: "Cityshield "
                    })
                ]
            }),
            cityShieldCurrentPrice ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().opt_for),
                children: [
                    "Opt for City Shield today and get covered for accidental damages at ONLY ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                        children: "₹"
                    }),
                    cityShieldCurrentPrice,
                    "/month!"
                ]
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "h-4"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().protect),
                children: [
                    "Protect your appliances and furniture worth upto",
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                        children: "₹"
                    }),
                    "70,000",
                    " "
                ]
            }),
            cityShieldOriginalPrice && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().cityshield_prices),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().currentPrice),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                children: "₹"
                            }),
                            cityShieldCurrentPrice,
                            "/mo"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().originalPrice),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                children: "₹"
                            }),
                            " ",
                            cityShieldOriginalPrice,
                            " / mo"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().discount),
                        children: [
                            "-",
                            cityShieldDiscount,
                            "% OFF"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().arr_wrapper),
                children: benefits.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().arr_item),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().img_div),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: item.img,
                                    alt: item.label,
                                    loading: "lazy",
                                    className: "pointer-events-none"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: `${index === 0 ? "w-[55px] lg:w-[80px]" : index === 1 ? "w-[65px] lg:w-[91px]" : index === 2 ? "w-[50px] lg:w-[68px]" : "w-[75px] lg:w-[104px]"} ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().benefits_label)}`,
                                children: item.label
                            })
                        ]
                    }, index))
            }),
            toggleCheckbox && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().btn),
                        onClick: ()=>{
                            toggleDrawer();
                            toggleCheckbox(true);
                        },
                        children: "Continue with Cityshield"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().risk_text),
                        onClick: ()=>{
                            toggleCheckbox(false);
                            toggleDrawer();
                        },
                        children: "No, I wanna risk damaging the furniture & Applicances"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().dashed_line)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().points_wrappper),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().cover_head),
                                children: "What is covered?"
                            }),
                            coveredPoints.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().list),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().dot)
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().points_item),
                                            children: item
                                        })
                                    ]
                                }, index))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-6",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().cover_head),
                                children: "What is not covered?"
                            }),
                            uncoveredPoints.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().list),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().dot)
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().points_item),
                                            children: item
                                        }, index)
                                    ]
                                }, index))
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CityShieldContent);


/***/ }),

/***/ 52663:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "styles_main_container__s_5O5",
	"city_shield_head": "styles_city_shield_head__8_fFw",
	"opt_for": "styles_opt_for__6PNL7",
	"protect": "styles_protect__iJQRi",
	"option_text": "styles_option_text__4naWQ",
	"cityshield_prices": "styles_cityshield_prices__9BLYb",
	"flexx": "styles_flexx__qklAB",
	"value_added_txt": "styles_value_added_txt__DnAUE",
	"originalPrice": "styles_originalPrice__5k9bZ",
	"currentPrice": "styles_currentPrice__S4gci",
	"discount": "styles_discount__ZLlT7",
	"benefits_label": "styles_benefits_label__udoK6",
	"arr_wrapper": "styles_arr_wrapper__7soRc",
	"img_div": "styles_img_div__MTmVq",
	"btn": "styles_btn__rQXzs",
	"close_icon": "styles_close_icon__QkS9B",
	"customDrawer": "styles_customDrawer__7h__P",
	"risk_text": "styles_risk_text__jNAzq",
	"dashed_line": "styles_dashed_line__Gmkfh",
	"cover_head": "styles_cover_head__705eX",
	"list": "styles_list__MlXVi",
	"points_item": "styles_points_item__jtYq8",
	"dot": "styles_dot__XZDpW",
	"rupeeIcon": "styles_rupeeIcon__powt_",
	"arr_item": "styles_arr_item__Bc6la",
	"bounceLR": "styles_bounceLR__L_4tn",
	"bounceUD": "styles_bounceUD__PwZ4V"
};


/***/ })

};
;