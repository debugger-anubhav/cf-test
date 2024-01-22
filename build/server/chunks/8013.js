exports.id = 8013;
exports.ids = [8013];
exports.modules = {

/***/ 8013:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocSidebarSkeleton: () => (/* binding */ DocSidebarSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31621);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31364);
/* harmony import */ var _docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41759);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29460);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(56135);
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(universal_cookie__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24664);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);











const DocSidebar = ({ isOverviewSelected = false })=>{
    const [isActive, setIsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const fetchActiveDocItem = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useSelector)((state)=>state.homePagedata.docSidebarActiveItem);
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
    const authCookies = new (universal_cookie__WEBPACK_IMPORTED_MODULE_8___default())();
    const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const userNameFromLocalStorage = (0,_constants_constant__WEBPACK_IMPORTED_MODULE_5__/* .getLocalStorage */ .$o)("user_name");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const user = userNameFromLocalStorage || "Hello User";
        setUserName(user);
    }, [
        userNameFromLocalStorage
    ]);
    // const userName = getLocalStorage("user_name") || "Hello User";
    const url =  false && 0;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
    }, []);
    const firstContainerArr = [
        {
            heading: "My Orders",
            link: "/purchases"
        },
        {
            heading: "My Service Requests",
            link: "/service-requests"
        },
        {
            heading: "My Payments",
            link: "/payments"
        },
        {
            heading: "My Invoices",
            link: "/invoices"
        }
    ];
    const secondContainerArr = [
        {
            heading: "CF coins",
            link: "/wallet"
        },
        {
            heading: "Referral Code",
            link: "/referral"
        }
    ];
    const thirdContainerArr = [
        {
            heading: "KYC & Documentation",
            link: "documentation"
        },
        {
            heading: "Profile Settings",
            link: "/profilesettings"
        },
        {
            heading: "Your Addresses",
            link: "/usersettings/youraddresses"
        }
    ];
    const onLogout = ()=>{
        if (false) {}
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().mainContainer)} ${url === "referral" && "h-full"}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().firstContainer),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().sectionHeadings),
                        children: "Your Account,"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().userNameText),
                        children: userName
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: `${fetchActiveDocItem === "Overview" ? "!text-5774AC" : "!text-45454A"} ${(_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().sectionItems)} !mt-10 !mb-0 hover:!text-5774AC`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/usersettings",
                            children: "Overview"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuComp, {
                list: firstContainerArr,
                heading: "Orders",
                setIsActive: setIsActive,
                isActive: isActive
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuComp, {
                list: secondContainerArr,
                heading: "Benefits",
                setIsActive: setIsActive,
                isActive: isActive
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuComp, {
                list: thirdContainerArr,
                heading: "Account",
                setIsActive: setIsActive,
                isActive: isActive
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().logoutTxt),
                onClick: onLogout,
                children: "Logout"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DocSidebar);
const MenuComp = ({ list, heading, isActive, setIsActive })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const fetchActiveDocItem = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useSelector)((state)=>state.homePagedata.docSidebarActiveItem);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${heading === "Account" && (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().border_none)} ${(_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().secondContainer)}`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().sectionHeadings),
                children: heading
            }),
            list?.map((i, index)=>{
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                    href: i?.link,
                    className: `${isActive === i.heading ? (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().sectionItemsActive) : (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().sectionItems)} block`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().side_label),
                        value: i.heading,
                        onClick: (e)=>{
                            e.preventDefault();
                            setIsActive(e.target.value);
                            router.push(i?.link);
                        },
                        // style={i.heading == fetchActiveDocItem && {color: "#5774AC"}}
                        style: i.heading === fetchActiveDocItem ? {
                            color: "#5774AC"
                        } : {},
                        children: i.heading
                    })
                }, index.toString());
            })
        ]
    });
};
const DocSidebarSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().mainContainer_skeleton)}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().firstContainer),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().firstContainer_skeleton_div),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                            variant: "text",
                            className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_full_width_height)
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "w-20 h-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                            variant: "text",
                            className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_full_width_height)
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_menu_docsidebar),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: [
                        1,
                        2
                    ].map((ele)=>{
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_menu_mapping),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "w-36 h-2 mb-6",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                        variant: "text",
                                        className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_full_width_height)
                                    })
                                }),
                                [
                                    1,
                                    2,
                                    3,
                                    4
                                ].map((item)=>{
                                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "w-36 h-4 mb-3",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                                            variant: "text",
                                            className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_full_width_height)
                                        })
                                    }, item.toString);
                                })
                            ]
                        }, ele.toString());
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().logoutTxt_skeleton),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
                    variant: "text",
                    className: (_docSidebar_module_css__WEBPACK_IMPORTED_MODULE_9___default().skeleton_full_width_height)
                })
            })
        ]
    });
};


/***/ }),

/***/ 31364:
/***/ ((module) => {

// Exports
module.exports = {
	"mainContainer": "docSidebar_mainContainer__JfKnR",
	"sectionHeadings": "docSidebar_sectionHeadings__wKZns",
	"userNameText": "docSidebar_userNameText__2dQCA",
	"sectionItems": "docSidebar_sectionItems__3HrOY",
	"sectionItemsActive": "docSidebar_sectionItemsActive__jiYYU",
	"firstContainer": "docSidebar_firstContainer__9XWEb",
	"secondContainer": "docSidebar_secondContainer__Gxb5c",
	"border_none": "docSidebar_border_none__Ma2SN",
	"logoutTxt": "docSidebar_logoutTxt__VhYqu",
	"mainContainer_skeleton": "docSidebar_mainContainer_skeleton__yXlo9",
	"logoutTxt_skeleton": "docSidebar_logoutTxt_skeleton__jJBqj",
	"skeleton_full_width_height": "docSidebar_skeleton_full_width_height__MFHce",
	"skeleton_menu_docsidebar": "docSidebar_skeleton_menu_docsidebar__iSSm0",
	"skeleton_menu_mapping": "docSidebar_skeleton_menu_mapping__x9g5T",
	"firstContainer_skeleton_div": "docSidebar_firstContainer_skeleton_div__hd6F4",
	"side_label": "docSidebar_side_label__ikes1"
};


/***/ })

};
;