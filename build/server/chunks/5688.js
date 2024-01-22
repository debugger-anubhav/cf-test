exports.id = 5688;
exports.ids = [5688];
exports.modules = {

/***/ 35688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Common_OrderSummary)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Common/OrderSummary/styles.module.css
var styles_module = __webpack_require__(34258);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
// EXTERNAL MODULE: ./src/network/axios/index.js
var network_axios = __webpack_require__(62219);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./src/components/Cart/Drawer/TotalBreakupDrawer/index.js
var TotalBreakupDrawer = __webpack_require__(74778);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
// EXTERNAL MODULE: ./node_modules/date-fns/esm/format/index.js + 6 modules
var format = __webpack_require__(47569);
// EXTERNAL MODULE: ./src/components/Common/OrderSummary/reviewDrawer/styles.module.css
var reviewDrawer_styles_module = __webpack_require__(71222);
var reviewDrawer_styles_module_default = /*#__PURE__*/__webpack_require__.n(reviewDrawer_styles_module);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
// EXTERNAL MODULE: ./node_modules/react-rating/lib/react-rating.cjs.js
var react_rating_cjs = __webpack_require__(29366);
var react_rating_cjs_default = /*#__PURE__*/__webpack_require__.n(react_rating_cjs);
// EXTERNAL MODULE: ./src/components/Common/Notifications/toastUtils.js
var toastUtils = __webpack_require__(44772);
;// CONCATENATED MODULE: ./src/components/Common/OrderSummary/reviewDrawer/index.js









const ReviewDrawer = ({ toggleDrawer, open, productImage, productName })=>{
    const [isBottomDrawer, setIsBottomDrawer] = (0,react_.useState)(false);
    const [isHovered, setIsHovered] = (0,react_.useState)(false);
    const [rating, setRating] = (0,react_.useState)(0);
    const [showError, setshowError] = (0,react_.useState)(false);
    const handleresize = (e)=>{
        if (window.innerWidth < 768) {
            setIsBottomDrawer(true);
        } else {
            setIsBottomDrawer(false);
        }
    };
    react_default().useEffect(()=>{
        handleresize();
        window.addEventListener("resize", handleresize);
        return ()=>{
            window.removeEventListener("resize", handleresize);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            " ",
            /*#__PURE__*/ jsx_runtime_.jsx(node.Drawer, {
                anchor: isBottomDrawer ? "bottom" : "right",
                open: open,
                onClose: toggleDrawer,
                classes: {
                    paper: (reviewDrawer_styles_module_default()).customDrawer
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (reviewDrawer_styles_module_default()).main_container,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (reviewDrawer_styles_module_default()).close_icon,
                            onClick: ()=>{
                                toggleDrawer();
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* Close */.x8, {
                                color: "#45454A",
                                size: 24,
                                className: "cursor-pointer"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (reviewDrawer_styles_module_default()).head,
                            children: "Write review"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (reviewDrawer_styles_module_default()).wrapper,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (styles_module_default()).img_wrapper,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        className: "w-full h-full",
                                        src: `${constant/* productPageImagesBaseUrl */.p5 + "thumb/" + productImage}`
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (styles_module_default()).prod_name,
                                            children: productName
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: (reviewDrawer_styles_module_default()).rating_row,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((react_rating_cjs_default()), {
                                                emptySymbol: /*#__PURE__*/ jsx_runtime_.jsx(icon/* RatingStar */.ep, {
                                                    color: "#CACACC",
                                                    className: (reviewDrawer_styles_module_default()).star
                                                }),
                                                fullSymbol: rating > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(icon/* RatingStar */.ep, {
                                                    color: "#F6B704",
                                                    className: (reviewDrawer_styles_module_default()).star
                                                }) : isHovered ? /*#__PURE__*/ jsx_runtime_.jsx(icon/* RatingStar */.ep, {
                                                    color: "#EAD18A",
                                                    className: (reviewDrawer_styles_module_default()).star
                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(icon/* RatingStar */.ep, {
                                                    color: "#F6B704",
                                                    className: (reviewDrawer_styles_module_default()).star
                                                }),
                                                onClick: (ratingValue)=>{
                                                    setRating(ratingValue);
                                                    setIsHovered(false);
                                                },
                                                onHover: ()=>{
                                                    setIsHovered(true);
                                                },
                                                initialRating: rating,
                                                name: "ratingnumber"
                                            })
                                        }),
                                        showError && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (reviewDrawer_styles_module_default()).err,
                                            children: "Please rate the product out of 5 stars"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                className: (reviewDrawer_styles_module_default()).input_area,
                                placeholder: "Let us know what did you think of the product"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (reviewDrawer_styles_module_default()).btn_wrapper,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (reviewDrawer_styles_module_default()).btn,
                                onClick: ()=>{
                                    if (rating > 0) {
                                        setshowError(false);
                                        toggleDrawer();
                                        (0,toastUtils/* showToastNotification */.I)("Your review has been saved successfully", 1);
                                    } else setshowError(true);
                                },
                                children: [
                                    "Submit",
                                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {
                                        className: (reviewDrawer_styles_module_default()).arrow
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const OrderSummary_reviewDrawer = (ReviewDrawer);

// EXTERNAL MODULE: ./src/components/Cart/Drawer/TotalBreakupDrawer/content.js
var content = __webpack_require__(93050);
;// CONCATENATED MODULE: ./src/components/Common/OrderSummary/index.js















const OrderSummary = ({ orderNumber, isDelivered, isOfflineInvoice, isSubscriptionPage, subscriptionData })=>{
    const [breakupDrawer, setBreakupDrawer] = (0,react_.useState)(false);
    const [reviewDrawer, setReviewDrawer] = (0,react_.useState)(false);
    const [data, setData] = (0,react_.useState)();
    const [isCitymaxBill, setIsCitymaxBill] = (0,react_.useState)(false);
    const userId = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    console.log(subscriptionData, "subscriptionData");
    const dispatch = (0,lib.useDispatch)();
    const getOrderSummary = ()=>{
        if (isSubscriptionPage) {
            setData(subscriptionData);
            dispatch((0,Slices/* getBillDetails */.qn)(subscriptionData?.bill));
            setIsCitymaxBill(false);
        } else {
            axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.myOrdersPage.getOrderSummary(orderNumber, userId)).then((res)=>{
                console.log(res, "resss");
                setData(res?.data?.data);
                dispatch((0,Slices/* getBillDetails */.qn)(res?.data?.data?.bill));
                setIsCitymaxBill(res?.data?.data?.productsList[0]?.is_frp === "1");
            }).catch((err)=>console.log(err));
        }
    };
    (0,react_.useEffect)(()=>{
        getOrderSummary();
    }, [
        subscriptionData
    ]);
    const toggleDrawerBreakup = ()=>{
        setBreakupDrawer(!breakupDrawer);
    };
    const toggleReviewDrawer = ()=>{
        setReviewDrawer(!reviewDrawer);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (styles_module_default()).main_container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (styles_module_default()).products_wrapper,
                children: [
                    data && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (styles_module_default()).order_date_wrapper,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            children: [
                                "Order placed on",
                                " ",
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                    className: (styles_module_default()).bold_txt,
                                    children: [
                                        " ",
                                        subscriptionData ? `${(0,format/* default */.Z)(new Date(data?.start_date), "d LLL, yyyy")}` : `${(0,format/* default */.Z)(new Date(data.orderDate), "d LLL, yyyy")}`
                                    ]
                                }),
                                " ",
                                !isSubscriptionPage && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        "at",
                                        " ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: (styles_module_default()).bold_txt,
                                            children: `${(0,format/* default */.Z)(new Date(data?.orderDate), "h:mm a")}`
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: data?.productsList?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: `${isOfflineInvoice && "!items-start"} ${(styles_module_default()).single_order_wrapper}`,
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: `${isOfflineInvoice && "xl:!h-[90px] xl:!min-w-[120px]"} ${(styles_module_default()).img_wrapper}`,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        className: "w-full h-full",
                                                        src: `${isSubscriptionPage ? constant/* productPageImagesBaseUrl */.p5 + "thumb/" + item?.image?.split(",")[0] : constant/* productPageImagesBaseUrl */.p5 + "thumb/" + item?.product_image?.split(",")[0]}`
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: (styles_module_default()).quantity_label,
                                                        children: [
                                                            item?.quantity,
                                                            "x"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "w-full",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).prod_name,
                                                        children: item.product_name
                                                    }),
                                                    isOfflineInvoice ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).tenure,
                                                                children: [
                                                                    "Quantity: ",
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: (styles_module_default()).rupeeIcon,
                                                                        children: "₹"
                                                                    }),
                                                                    item?.quantity
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).tenure,
                                                                children: [
                                                                    "Refundable deposit:",
                                                                    " ",
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: (styles_module_default()).rupeeIcon,
                                                                        children: "₹"
                                                                    }),
                                                                    item?.product_shipping_cost
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).tenure,
                                                                children: [
                                                                    "Monthly Rent:",
                                                                    " ",
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: (styles_module_default()).rupeeIcon,
                                                                        children: "₹"
                                                                    }),
                                                                    item?.price
                                                                ]
                                                            })
                                                        ]
                                                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: (styles_module_default()).tenure_div,
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).tenure,
                                                                children: [
                                                                    "Tenure:",
                                                                    " ",
                                                                    subscriptionData ? `${data?.tenure} months` : item.subproduct_attr_name
                                                                ]
                                                            }),
                                                            isDelivered && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                onClick: toggleReviewDrawer,
                                                                className: `${(styles_module_default()).review} ${(styles_module_default()).view_breakup_txt}`,
                                                                children: "Write Review"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    item?.includedProducts && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: (styles_module_default()).plan_contain_txt,
                                                children: [
                                                    "This plan contains ",
                                                    item?.includedProducts?.length,
                                                    " items"
                                                ]
                                            }),
                                            item?.includedProducts?.map((p, i)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: (styles_module_default()).included_item_wrapper,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                            className: (styles_module_default()).included_prod_img,
                                                            src: constant/* productImageBaseUrl */.d9 + p?.fc_product?.image?.split(",")?.[0]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            className: (styles_module_default()).prod_name,
                                                            children: p?.fc_product?.product_name
                                                        })
                                                    ]
                                                }, i))
                                        ]
                                    }),
                                    reviewDrawer && /*#__PURE__*/ jsx_runtime_.jsx(OrderSummary_reviewDrawer, {
                                        toggleDrawer: toggleReviewDrawer,
                                        open: reviewDrawer,
                                        productImage: item?.product_image?.split(",")[0],
                                        productName: item?.product_name
                                    })
                                ]
                            }, index))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: `${isOfflineInvoice && "!w-full xs:!w-[408px] xl:!min-w-max"} ${(styles_module_default()).box}`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (styles_module_default()).box_header,
                                children: "Address:"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (styles_module_default()).name_div,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* PersonIcon */.Tk, {
                                        color: "#2D9469",
                                        className: (styles_module_default()).person_icon
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: (styles_module_default()).saved_name,
                                        children: [
                                            data?.address?.fullName,
                                            ", ",
                                            data?.address?.phone
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: (styles_module_default()).address,
                                children: [
                                    data?.address?.address1,
                                    "",
                                    " ",
                                    data?.address?.city,
                                    " ",
                                    "",
                                    data?.address?.state
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "h-4 xl:h-6"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: `hover:border-5774AC cursor-pointer ${isOfflineInvoice && "!w-full xs:!w-[408px] xl:!min-w-max"} ${(styles_module_default()).box}`,
                        onClick: ()=>{
                            isOfflineInvoice ? console.log("not") : setBreakupDrawer(true);
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (styles_module_default()).box_header,
                                children: "Payment details:"
                            }),
                            isOfflineInvoice ? /*#__PURE__*/ jsx_runtime_.jsx(content/* default */.Z, {
                                isOfflineInvoice: isOfflineInvoice,
                                isCitymaxBill: isCitymaxBill
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (styles_module_default()).amount_div,
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: `!text-71717A ${(styles_module_default()).saved_name}`,
                                                children: [
                                                    "Paid using ",
                                                    data?.bill?.mode
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: (styles_module_default()).amount,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: (styles_module_default()).rupeeIcon,
                                                        children: "₹"
                                                    }),
                                                    parseInt(data?.bill?.finalTotalPrice).toFixed(2)
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (styles_module_default()).flex_div,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).view_breakup_txt,
                                                children: "View cart breakup"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {
                                                className: (styles_module_default()).forward_icon
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    breakupDrawer && /*#__PURE__*/ jsx_runtime_.jsx(TotalBreakupDrawer/* default */.Z, {
                        toggleDrawer: toggleDrawerBreakup,
                        open: breakupDrawer
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Common_OrderSummary = (OrderSummary);


/***/ }),

/***/ 71222:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "styles_main_container__cEK9S",
	"customDrawer": "styles_customDrawer__KubOI",
	"head": "styles_head__gUhdc",
	"close_icon": "styles_close_icon__cFyyV",
	"wrapper": "styles_wrapper__byU24",
	"img": "styles_img___oVAO",
	"rating_row": "styles_rating_row__qs708",
	"star": "styles_star__eDTX6",
	"input_area": "styles_input_area__3Pgq3",
	"btn_wrapper": "styles_btn_wrapper__ZiZAr",
	"btn": "styles_btn__d51He",
	"arrow": "styles_arrow__uqked",
	"err": "styles_err__Fk__5"
};


/***/ }),

/***/ 34258:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "styles_main_container__6jpSE",
	"products_wrapper": "styles_products_wrapper__N7_iQ",
	"order_date_wrapper": "styles_order_date_wrapper__S52t5",
	"bold_txt": "styles_bold_txt__6cDJ9",
	"single_order_wrapper": "styles_single_order_wrapper__iAxn0",
	"img_wrapper": "styles_img_wrapper__Be_Zw",
	"quantity_label": "styles_quantity_label__QKnR0",
	"prod_name": "styles_prod_name__XTAQ6",
	"tenure": "styles_tenure__45X4G",
	"tenure_div": "styles_tenure_div__5SJml",
	"review": "styles_review__1vg9e",
	"box": "styles_box__e_h1W",
	"box_header": "styles_box_header__GvT6h",
	"amount_div": "styles_amount_div__7F8Ih",
	"rupeeIcon": "styles_rupeeIcon__s45SA",
	"flex_div": "styles_flex_div__d43Sk",
	"view_breakup_txt": "styles_view_breakup_txt__dWWCp",
	"amount": "styles_amount__nMtRI",
	"forward_icon": "styles_forward_icon__POZbN",
	"name_div": "styles_name_div__NlZtU",
	"saved_name": "styles_saved_name__5y300",
	"person_icon": "styles_person_icon__3NAoU",
	"address": "styles_address__V9NxE",
	"plan_contain_txt": "styles_plan_contain_txt__29I6C",
	"included_item_wrapper": "styles_included_item_wrapper___YrYO",
	"included_prod_img": "styles_included_prod_img__mmVe3"
};


/***/ })

};
;