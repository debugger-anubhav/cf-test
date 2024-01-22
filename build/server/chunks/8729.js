exports.id = 8729;
exports.ids = [8729];
exports.modules = {

/***/ 29776:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 53489));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 108))

/***/ }),

/***/ 44666:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ BreadCrumbsCommon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12301);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68867);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);




function BreadCrumbsCommon({ currentPage }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().bread_crumbs),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                href: "/",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().bread_crumbs_text),
                    children: "Home"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_1__/* .ForwardArrow */ .Xs, {
                color: "#71717A",
                size: 12
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().bread_crumbs_text)} !font-medium font-Poppins`,
                children: currentPage
            })
        ]
    });
}


/***/ }),

/***/ 68867:
/***/ ((module) => {

// Exports
module.exports = {
	"bread_crumbs": "style_bread_crumbs__JAtCH",
	"bread_crumbs_text": "style_bread_crumbs_text__LnswY"
};


/***/ })

};
;