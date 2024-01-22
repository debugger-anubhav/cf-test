exports.id = 4778;
exports.ids = [4778];
exports.modules = {

/***/ 93050:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19666);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable no-prototype-builtins */ 




const BillContent = ({ isCouponApplied, isBottomDrawer, setShowTotalPriceBreakdown, showTotalPriceBreakdown, isOfflineInvoice, isCitymaxBill })=>{
    const pagedata = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.cartPageData);
    const code = pagedata.couponCodeUsed;
    const billBreakup = pagedata.billBreakout;
    console.log(isCitymaxBill, "isCitymaxBillisCitymaxBill");
    console.log(!isCitymaxBill && billBreakup.hasOwnProperty("couponDiscount"));
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().breakup_wrapper),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().left_div),
                            onClick: ()=>setShowTotalPriceBreakdown(!showTotalPriceBreakdown),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: `${isOfflineInvoice && "!text-71717A !no-underline"} ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sub_total_text)}`,
                                    children: [
                                        "Cart Subtotal ",
                                        isBottomDrawer && "(view details)"
                                    ]
                                }),
                                !isBottomDrawer && !isOfflineInvoice && (showTotalPriceBreakdown ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .PopUpArrow */ .UH, {
                                    color: "#5774AC",
                                    size: 20
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .DownPopUpArrow */ .Yd, {
                                    color: "#5774AC",
                                    size: 20
                                }))
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "₹"
                                }),
                                billBreakup?.cartSubTotal
                            ]
                        })
                    ]
                }),
                (showTotalPriceBreakdown || isOfflineInvoice) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().dropdown_wrapper),
                        children: billBreakup?.cartSubTotalList?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().dropdown_row),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: `xl:min-w-[190px] w-[190px] ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().prod_name)}`,
                                        children: item.name
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: `min-w-fit ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().prod_name)}`,
                                        children: item.tenure
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                                children: "₹"
                                            }),
                                            item.price
                                        ]
                                    })
                                ]
                            }, index))
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().line)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                children: "Items discount"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            style: {
                                color: "#2D9469"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "-₹"
                                }),
                                billBreakup?.itemDiscount.toFixed(2)
                            ]
                        })
                    ]
                }),
                !isCitymaxBill && billBreakup.hasOwnProperty("couponDiscount") && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        console.log("ejkw"),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                        children: [
                                            "Coupon discount ",
                                            isCouponApplied && code
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                                    style: {
                                        color: "#2D9469"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                            children: "-₹"
                                        }),
                                        billBreakup?.couponDiscount
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().line)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                children: "Refundable Security Deposit"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            style: {
                                color: "#2D9469"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "₹"
                                }),
                                billBreakup?.refundableDeposite
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                children: "Delivery & Installation fee"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            style: {
                                color: "#2D9469"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "₹"
                                }),
                                billBreakup?.deliveryAndInstallation || 0
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().line)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                children: "GST (18%)"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "₹"
                                }),
                                billBreakup?.gst.toFixed(2)
                            ]
                        })
                    ]
                }),
                !isCitymaxBill && billBreakup.hasOwnProperty("coinsUsed") && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().line)
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().price_label),
                                        children: "Cityfurnish coins used"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                                    style: {
                                        color: "#2D9469"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                            children: "-₹"
                                        }),
                                        billBreakup?.coinsUsed
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().line)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().row),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_txt),
                            children: "Total"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().total_amount),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().rupeeIcon),
                                    children: "₹"
                                }),
                                parseInt(billBreakup?.finalTotalPrice).toFixed(2)
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BillContent);


/***/ }),

/***/ 74778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19666);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(93050);







const TotalBreakup = ({ toggleDrawer, open, isCouponApplied })=>{
    const [isBottomDrawer, setIsBottomDrawer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showTotalPriceBreakdown, setShowTotalPriceBreakdown] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // const code = useSelector(state => state.cartPageData.couponCodeUsed);
    const billBreakup = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.cartPageData.billBreakout);
    console.log(billBreakup, "ue");
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
    const CartSubtotalContent = ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().head),
                    children: "Cart Subtotal: "
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().dropdown_wrapper),
                    children: billBreakup?.cartSubTotalList?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().dropdown_row),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: `min-w-[190px] w-[190px] ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().prod_name)}`,
                                    children: item.name
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: `min-w-fit ${(_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().prod_name)}`,
                                    children: item.tenure
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().total_amount),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().rupeeIcon),
                                            children: "₹"
                                        }),
                                        item.price
                                    ]
                                })
                            ]
                        }, index))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().back_to_breakdown_btn),
                    onClick: ()=>setShowTotalPriceBreakdown(false),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .BackIcon */ .xC, {
                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().backIcon)
                        }),
                        "Go back to Bill Breakup"
                    ]
                })
            ]
        });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Drawer, {
        anchor: isBottomDrawer ? "bottom" : "right",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().customDrawer)
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                    showTotalPriceBreakdown && isBottomDrawer ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CartSubtotalContent, {})
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().head),
                                children: "Cart Breakup:"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_content__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                isBottomDrawer: isBottomDrawer,
                                isCouponApplied: isCouponApplied,
                                showTotalPriceBreakdown: showTotalPriceBreakdown,
                                setShowTotalPriceBreakdown: setShowTotalPriceBreakdown
                            })
                        ]
                    })
                ]
            }),
            ";"
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalBreakup);


/***/ }),

/***/ 19666:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "styles_main_container__mDemV",
	"customDrawer": "styles_customDrawer__6Pak0",
	"head": "styles_head__hdm6P",
	"close_icon": "styles_close_icon__j4o_s",
	"breakup_wrapper": "styles_breakup_wrapper__2Z5_L",
	"left_div": "styles_left_div__AM5Lh",
	"row": "styles_row___cGFO",
	"dropdown_wrapper": "styles_dropdown_wrapper__4qwVj",
	"dropdown_row": "styles_dropdown_row__Yv0m_",
	"prod_name": "styles_prod_name__clGqh",
	"sub_total_text": "styles_sub_total_text__kjx7o",
	"total_amount": "styles_total_amount__VcSyX",
	"rupeeIcon": "styles_rupeeIcon__Gbm1u",
	"line": "styles_line__Maz3T",
	"price_label": "styles_price_label__ZjULe",
	"total_txt": "styles_total_txt__iIR4A",
	"back_to_breakdown_btn": "styles_back_to_breakdown_btn__DwdB6",
	"backIcon": "styles_backIcon__0qzME"
};


/***/ })

};
;