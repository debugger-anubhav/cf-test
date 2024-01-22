"use strict";
exports.id = 2932;
exports.ids = [2932];
exports.modules = {

/***/ 2932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79499);
/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52663);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var _cityShieldContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40881);






const CityShieldDrawerForCart = ({ toggleDrawer, open, cityShieldOriginalPrice, cityShieldCurrentPrice, cityShieldDiscount, toggleCheckbox })=>{
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
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4___default()), {
        anchor: isBottomDrawer ? "bottom" : "right",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().customDrawer)
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().main_container),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().close_icon),
                    onClick: ()=>{
                        toggleDrawer();
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                        color: "#45454A",
                        size: 24,
                        className: "cursor-pointer"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_cityShieldContent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    cityShieldCurrentPrice: cityShieldCurrentPrice,
                    cityShieldOriginalPrice: cityShieldOriginalPrice,
                    cityShieldDiscount: cityShieldDiscount,
                    toggleDrawer: toggleDrawer,
                    toggleCheckbox: (bool)=>toggleCheckbox(bool)
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CityShieldDrawerForCart);


/***/ })

};
;