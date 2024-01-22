exports.id = 3069;
exports.ids = [3069];
exports.modules = {

/***/ 23069:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DropDown_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(96018);
/* harmony import */ var _DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);




const DropDown = ({ handleSelectChange, selectedOption, style, useDefaultStyle, options, setIsDDOpen, setSelectedOption, isOpen, maxWidth, optionsActive, isInitialScreen = false, handleKycState })=>{
    const handleOptionClick = (option)=>{
        setSelectedOption(option);
        setIsDDOpen(false);
        isInitialScreen && handleKycState(option);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default()["custom-select"])} ${isOpen ? "active" : ""}`,
        // style={isOpen ? {boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} : {}}
        style: {
            maxWidth,
            boxShadow: isOpen ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : ""
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `mt-1 ${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default()["selected-option"])} ${isOpen ? "border-none" : "border-[#DDDDDF]"}`,
                onClick: ()=>{
                    setIsDDOpen((prev)=>!prev);
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: ` ${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().selected_txt)} ${selectedOption?.value || selectedOption?.dealCodeNumber ? "text-black" : "text-[#71717A]"}`,
                        children: isInitialScreen ? selectedOption?.dealCodeNumber || "Select order" : selectedOption?.label || "Select an option"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().ddArrow)}`,
                        children: isOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .PopUpArrow */ .UH, {
                            size: 25,
                            className: `${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().pointer)}`
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .DownPopUpArrow */ .Yd, {
                            size: 25,
                            className: `${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().pointer)}`
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                className: `${isOpen ? optionsActive : (_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().options)} max-h-[260px]`,
                children: options?.map((option, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        className: `${(_DropDown_module_css__WEBPACK_IMPORTED_MODULE_3___default().option)} ${index === options.length - 1 ? "rounded-b-xl border-none" : ""} ${index === 0 ? "border-t" : ""}`,
                        onClick: ()=>handleOptionClick(option),
                        children: isInitialScreen ? option.dealCodeNumber : option.label
                    }, index))
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropDown);


/***/ }),

/***/ 96018:
/***/ ((module) => {

// Exports
module.exports = {
	"custom-select": "DropDown_custom-select__G40V_",
	"selected-option": "DropDown_selected-option__TCq_V",
	"options": "DropDown_options__mEII1",
	"option": "DropDown_option__AsbYj",
	"optionsActive": "DropDown_optionsActive__KlCa8",
	"ddArrow": "DropDown_ddArrow__Bw0EE",
	"pointer": "DropDown_pointer__n8hVs",
	"selected_txt": "DropDown_selected_txt__lblVv"
};


/***/ })

};
;