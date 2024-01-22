exports.id = 4094;
exports.ids = [4094];
exports.modules = {

/***/ 4094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AddressDrawerContent),
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79499);
/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14549);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);






const AddressDrawer = ({ toggleDrawer, open, makeDefaultAddress, primaryAddress })=>{
    const [isBottomDrawer, setIsBottomDrawer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(primaryAddress?.id);
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
            paper: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().customDrawer)
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().main_container),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().close_icon),
                    onClick: ()=>{
                        toggleDrawer();
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                        color: "#45454A",
                        size: 24,
                        className: "cursor-pointer"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().head),
                    children: "Saved addresses"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AddressDrawerContent, {
                    makeDefaultAddress: makeDefaultAddress,
                    primaryAddress: primaryAddress,
                    setId: setId
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().btn_wrapper),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().btn),
                        onClick: async ()=>{
                            try {
                                await makeDefaultAddress(id);
                                // await makeAddressPrimary(id);
                                // getAllSavedAddresses();
                                toggleDrawer();
                            } catch (error) {
                                console.error(error);
                            }
                        },
                        children: [
                            "Proceed",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .ForwardArrow */ .Xs, {
                                color: "#71717A"
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressDrawer);
const AddressDrawerContent = ({ primaryAddress, setId })=>{
    const addressArray = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.cartPageData.savedAddresses);
    const primaryIndex = addressArray.findIndex((item)=>item?.id === primaryAddress?.id);
    const [selectedIndex, setSelectedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(primaryIndex);
    const cityName = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata.cityName);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().item_wrapper),
            children: addressArray?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: `${cityName !== item.city ? "cursor-not-allowed" : "cursor-pointer"} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().card_wrapper)}`,
                    onClick: ()=>{
                        if (cityName === item.city) {
                            setSelectedIndex(index);
                            setId(item.id);
                        }
                    },
                    children: [
                        cityName !== item.city && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().not_belong_wrapper),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().not_belong_text),
                                children: "Address does not belong to selected city"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().first_row),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: `${cityName === item.city ? "border-[#5774AC]" : "border-[#9A9AA2]"} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().circle)}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: ` ${selectedIndex === index ? (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().selected_circle) : ""}`
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().name),
                                    children: [
                                        item.full_name,
                                        ", ",
                                        item.phone
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: `truncate ${(_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().address)}`,
                            children: item.address1
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().address),
                            children: [
                                item.city,
                                ", ",
                                item.state
                            ]
                        })
                    ]
                }, index))
        })
    });
};


/***/ }),

/***/ 14549:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container___6Wkj",
	"head": "style_head__Sj6nx",
	"close_icon": "style_close_icon__ZnV_m",
	"card_wrapper": "style_card_wrapper__bQbGZ",
	"circle": "style_circle__Blvtb",
	"selected_circle": "style_selected_circle__oXW2w",
	"first_row": "style_first_row__FQ5xu",
	"name": "style_name__kCdDT",
	"address": "style_address___xtEs",
	"btn_wrapper": "style_btn_wrapper__l_t6b",
	"btn": "style_btn__buQAn",
	"forwIcon": "style_forwIcon__4wJOB",
	"not_belong_wrapper": "style_not_belong_wrapper__102J6",
	"not_belong_text": "style_not_belong_text__Ez_FD",
	"customDrawer": "style_customDrawer__OYSzs",
	"container": "style_container__OPHNH",
	"item_wrapper": "style_item_wrapper__RmCZ_"
};


/***/ })

};
;