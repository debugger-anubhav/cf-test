exports.id = 6011;
exports.ids = [6011];
exports.modules = {

/***/ 22203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Notifications)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93578);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1536);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);




function Notifications() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .ToastContainer */ .Ix, {})
    });
}


/***/ }),

/***/ 27027:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18191);
/* harmony import */ var _components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93737);
/* harmony import */ var _components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var _appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30455);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93356);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);







const CityDrawer = ({ Cities, toggleDrawer, cityId, open, cityName, handleCityChange })=>{
    const [isBottomDrawer, setIsBottomDrawer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleresize = (e)=>{
        if (window.innerWidth < 768) {
            setIsBottomDrawer(true);
        } else {
            setIsBottomDrawer(false);
        }
    };
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        handleresize();
        window.addEventListener("resize", handleresize);
        return ()=>{
            window.removeEventListener("resize", handleresize);
        };
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_4__["default"], {
        anchor: isBottomDrawer ? "bottom" : "left",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().customDrawer)
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: `${(_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().drawer_wrapper)} `,
            children: [
                isBottomDrawer ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    onClick: toggleDrawer,
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().close_icon),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                        color: "#45454A",
                        size: 20
                    })
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    onClick: toggleDrawer,
                    className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().drawer_close)} ${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_drawer_close)}`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                        className: `!mt-[5px] ${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().close_icon)}`,
                        color: "#45454A",
                        size: 24
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().drawer_content)}`,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().select_heading),
                            children: "Select your city"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_container)} justify-center sm:justify-start items-center`,
                            children: Cities?.map((city, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_wrapper)}
                  `,
                                    onClick: ()=>{
                                        handleCityChange(city?.list_value);
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: _appConfig__WEBPACK_IMPORTED_MODULE_3__/* .cityUrl */ .xB + city?.list_value_seourl + ".webp",
                                            className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_thambnil)} ${cityName === city?.list_value && "border-[2px] rounded-[6px] hover:rounded-[6px] border-primary"}`,
                                            alt: city?.list_value,
                                            loading: "lazy"
                                        }),
                                        city?.id === 50 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_name)}`,
                                            children: [
                                                city?.list_value.split("/")[0],
                                                "/",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                                    className: "flex sm:hidden"
                                                }),
                                                city?.list_value.split("/")[1]
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: `${cityName === city?.list_value ? "text-[#222] font-medium " : "text-45454A"} ${(_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().city_name)}`,
                                            children: city?.list_value
                                        })
                                    ]
                                }, index.toString()))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().bottom_city_content),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().bottom_subheading),
                                    children: "Get the free Cityfurnish app on your phone"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().bottom_heading),
                                    children: "Download mobile app"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().download_qr_wrapper),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "https://d3juy0zp6vqec8.cloudfront.net/images/scan-and-download.webp",
                                            alt: "download-QR",
                                            loading: "lazy"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().qr_text),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().qr_text_span),
                                                    children: "100+"
                                                }),
                                                "People have already downloaded our app \uD83C\uDF89"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: (_components_Common_Drawer_style_module_css__WEBPACK_IMPORTED_MODULE_6___default().detail_line),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-[#7895B0] font-bold",
                                            children: "100k+ "
                                        }),
                                        "\xa0 People have already downloaded our app \uD83C\uDF89"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CityDrawer);


/***/ }),

/***/ 93356:
/***/ ((module) => {

// Exports
module.exports = {
	"customDrawer": "styles_customDrawer__la2bE",
	"close_icon": "styles_close_icon__0TfRv",
	"main_container": "styles_main_container__QrfLf",
	"drawer_wrapper": "styles_drawer_wrapper__1BJA9"
};


/***/ })

};
;