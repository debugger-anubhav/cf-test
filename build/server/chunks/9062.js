exports.id = 9062;
exports.ids = [9062];
exports.modules = {

/***/ 99062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3191);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29460);




function MainSection() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().wrapper),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card_wrapper),
                children: _constants_constant__WEBPACK_IMPORTED_MODULE_2__/* .BenefitPageData */ .be?.map((item, index)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "sm:flex hidden",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/frame-about-us.webp",
                                        alt: item.Heading,
                                        className: "max-w-[320px] max-h-[194px]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().detail_wrapper),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: item.icon,
                                                className: "mb-6 w-11 h-11"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().heading)} mb-2 tracking-[-0.4px]`,
                                                children: item.Heading
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().detail),
                                                children: item.text
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "sm:hidden flex",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().responsive_deatil_wrapper),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: item.updatedMobileIcon,
                                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().responsive_icon),
                                            alt: item.Heading
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().heading)} tracking-[-0.4px]`,
                                            children: item.Heading
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().detail)} pt-1`,
                                            children: item.text
                                        })
                                    ]
                                })
                            })
                        ]
                    }, index.toString());
                })
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainSection);


/***/ }),

/***/ 3191:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__WuF7I",
	"main_heading": "style_main_heading__a8l__",
	"card_wrapper": "style_card_wrapper__ppeAC",
	"detail_wrapper": "style_detail_wrapper__aJvC9",
	"heading": "style_heading__Pjq_u",
	"detail": "style_detail__aLnen",
	"responsive_deatil_wrapper": "style_responsive_deatil_wrapper__T71pJ",
	"responsive_icon": "style_responsive_icon__3IFuj"
};


/***/ })

};
;