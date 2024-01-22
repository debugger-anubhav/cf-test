exports.id = 7950;
exports.ids = [7950];
exports.modules = {

/***/ 67950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7133);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);




const FAQQuestion = ({ ques, ans, isOpen, toggleQuestion, applyBtn = false, applyClick })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "pb-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().quesWrapper),
                    onClick: toggleQuestion,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().ques),
                            children: ques
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: isOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Minus */ .WF, {
                                className: "cursor-pointer",
                                size: 20,
                                color: "#222"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Plus */ .v3, {
                                className: "cursor-pointer",
                                size: 20,
                                color: "#222"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            dangerouslySetInnerHTML: {
                                __html: ans
                            },
                            className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().ans)} ${isOpen && (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().ans_open)}`
                        }),
                        applyBtn && isOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().apply_btn),
                                    onClick: applyClick,
                                    children: "Apply"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().addition_text),
                                    children: [
                                        "Alternatively, you can drop your resume at",
                                        " ",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "mailto:hello@cityfurnish.com",
                                            className: "text-5774AC underline font-medium",
                                            children: "hr@cityfurnish.com"
                                        })
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FAQQuestion);


/***/ }),

/***/ 7133:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__XBSYp",
	"heading": "style_heading__u7Eu2",
	"content_wrapper1": "style_content_wrapper1__Y86XF",
	"content_wrapper": "style_content_wrapper__Ggzt6",
	"detail_heading": "style_detail_heading__IcgGk",
	"line_web": "style_line_web__fqDpz",
	"detail_desc": "style_detail_desc__8r9s4",
	"section1_wrapper1": "style_section1_wrapper1__qWaZJ",
	"section1_wrapper": "style_section1_wrapper__DroFR",
	"login_btn": "style_login_btn__BjBHE",
	"how_it_works_button_wrapper": "style_how_it_works_button_wrapper__JhZDP",
	"how_it_works_button": "style_how_it_works_button__VkEsZ",
	"how_it_works_paragraph": "style_how_it_works_paragraph__D1_6s",
	"forward_arrow": "style_forward_arrow__92uAU",
	"underline": "style_underline__ha4S2",
	"section2_wrapper1": "style_section2_wrapper1__qjF6_",
	"section2_wrapper": "style_section2_wrapper__9qr_w",
	"img_wrapper_wl": "style_img_wrapper_wl__IBnHP",
	"block": "style_block__33KSp",
	"block_head": "style_block_head__OqeUu",
	"block_desc": "style_block_desc__CRKmK",
	"heading2": "style_heading2__c8wuB",
	"team_wrapper": "style_team_wrapper__6Yazk",
	"team_content_wrapper": "style_team_content_wrapper___sM9A",
	"team_content": "style_team_content__QC0BS",
	"image_wrapper": "style_image_wrapper__how70",
	"image_text": "style_image_text__L0N6e",
	"images_container": "style_images_container__41zxI",
	"freq_asked_que_wrapper": "style_freq_asked_que_wrapper__PPJxc",
	"head": "style_head__7RZuR",
	"QuesAnsArray_div": "style_QuesAnsArray_div___mWnx",
	"quesWrapper": "style_quesWrapper__UXruU",
	"ques": "style_ques__rwRZj",
	"ans": "style_ans__Fizs_",
	"ans_open": "style_ans_open__F10_B",
	"btn": "style_btn__UAfqh",
	"btn_txt": "style_btn_txt__EWKXn",
	"forword_icon": "style_forword_icon___dzJZ",
	"faq_skeleton_wrapper": "style_faq_skeleton_wrapper__es_Yr",
	"referral_wrapper": "style_referral_wrapper__X04_E",
	"referral_section": "style_referral_section__fO8Jp",
	"code": "style_code__TVizB",
	"copy_section": "style_copy_section__RKvB_",
	"share_modal_icons_wrapper": "style_share_modal_icons_wrapper__lQHhU",
	"refer_a_friend_image": "style_refer_a_friend_image__CldcZ",
	"referral_wrapper_skeleton": "style_referral_wrapper_skeleton__bLFP_",
	"skeleton_wrapper": "style_skeleton_wrapper__NldK4",
	"skeleton_full_width_height": "style_skeleton_full_width_height__zZut0",
	"apply_btn": "style_apply_btn__ubvv7",
	"addition_text": "style_addition_text__XYVrK"
};


/***/ })

};
;