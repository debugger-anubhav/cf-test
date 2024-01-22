exports.id = 1424;
exports.ids = [1424];
exports.modules = {

/***/ 11424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ FormSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3956);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);




function FormSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "mt-8",
                children: [
                    1,
                    2,
                    3,
                    4
                ]?.map((item)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_form_field),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().field_heading),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                                    variant: "text",
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_full),
                                    height: 12
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().field_input),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                                    variant: "text",
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_full),
                                    height: 56
                                })
                            })
                        ]
                    }, item.toString());
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_submit_btn),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                    variant: "rectangular",
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_2___default().skeleton_full)
                })
            })
        ]
    });
}


/***/ }),

/***/ 3956:
/***/ ((module) => {

// Exports
module.exports = {
	"skeleton_wrapper": "style_skeleton_wrapper__1kZAx",
	"skeleton_full": "style_skeleton_full__hV3F_",
	"skeleton_form_field": "style_skeleton_form_field__cYEC3",
	"field_heading": "style_field_heading__jfHy4",
	"field_input": "style_field_input__DRUsz",
	"skeleton_submit_btn": "style_skeleton_submit_btn__fOHUK"
};


/***/ })

};
;