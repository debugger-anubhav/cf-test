exports.id = 306;
exports.ids = [306];
exports.modules = {

/***/ 90306:
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
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74427);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29460);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23191);





const MediaCoverage = ()=>{
    const str = _constants_Constant_json__WEBPACK_IMPORTED_MODULE_3__.landing_page.Media_coverage;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().media_coverage_wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().label),
                children: str.label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().heading)} mb-8`,
                children: str.desc
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_4___default().ticker_container)} gap-12`,
                children: _constants_constant__WEBPACK_IMPORTED_MODULE_2__/* .MediaCoverageImages */ .at?.map((imageUrl, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: `w-100 h-100 absolute z-10`
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex items-center py-[16px] !min-w-[124px] md:!min-w-[147px] lg:!min-w-max  relative",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: imageUrl.img,
                                    alt: imageUrl.alt,
                                    className: "flex items-center w-full mix-blend-darken md:mix-blend-normal",
                                    loading: "lazy"
                                })
                            }, index.toString())
                        ]
                    }))
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaCoverage);


/***/ }),

/***/ 74427:
/***/ ((module) => {

// Exports
module.exports = {
	"media_coverage_wrapper": "style_media_coverage_wrapper__Q4MGJ",
	"label": "style_label__fC_c9",
	"heading": "style_heading__un24l",
	"carousel": "style_carousel__tQewu",
	"slide": "style_slide__S2J79",
	"ticker_container": "style_ticker_container__9usn0",
	"img": "style_img__M_WwL",
	"scrollAnimation": "style_scrollAnimation__SYwBv"
};


/***/ })

};
;