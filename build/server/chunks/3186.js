exports.id = 3186;
exports.ids = [3186];
exports.modules = {

/***/ 23186:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72622);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29460);




const HasselFreeServicesCards = ()=>{
    const Title = "Truly hassle free service";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().main_container),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().heading),
                children: Title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card_container),
                    children: _constants_constant__WEBPACK_IMPORTED_MODULE_2__/* .HasselFreeData */ .ls?.map((data, index)=>{
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card_wrapper)} hidden xl:flex ${index === _constants_constant__WEBPACK_IMPORTED_MODULE_2__/* .HasselFreeData */ .ls?.length - 1 && "mr-[16px] lg:mr-0"}`,
                                    style: {
                                        backgroundImage: `url("${data.backgroungImage}")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().hassel_heading_wrapper),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().heading_text),
                                                children: data?.Heading
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().content),
                                                children: data?.text
                                            })
                                        ]
                                    })
                                }, index.toString()),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card_wrapper)} flex xl:hidden ${index === _constants_constant__WEBPACK_IMPORTED_MODULE_2__/* .HasselFreeData */ .ls?.length - 1 && "mr-[16px] lg:mr-0"}`,
                                    style: {
                                        backgroundImage: `url("${data.bgImgMobile}")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().hassel_heading_wrapper),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().heading_text),
                                                children: data?.Heading
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().content),
                                                children: data?.text
                                            })
                                        ]
                                    })
                                }, index.toString())
                            ]
                        });
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HasselFreeServicesCards);


/***/ }),

/***/ 72622:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__XGN_u",
	"heading": "style_heading__7vU2_",
	"card_container": "style_card_container__RfoDv",
	"card_wrapper": "style_card_wrapper__YprXO",
	"heading_text": "style_heading_text__4mw4E",
	"content": "style_content__BtHcr",
	"hassel_heading_wrapper": "style_hassel_heading_wrapper__3sxbB"
};


/***/ })

};
;