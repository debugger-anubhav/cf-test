exports.id = 7708;
exports.ids = [7708];
exports.modules = {

/***/ 29776:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 53489));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 108))

/***/ }),

/***/ 22203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Notifications)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93578);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1536);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);




function Notifications() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_2__/* .ToastContainer */ .Ix, {})
    });
}


/***/ }),

/***/ 41217:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ReferAFriend_ReferAFriend)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Common/Header/index.js + 2 modules
var Header = __webpack_require__(49166);
// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.cjs.js
var loadable_cjs = __webpack_require__(53207);
// EXTERNAL MODULE: ./src/components/Common/MenuList/index.js + 1 modules
var MenuList = __webpack_require__(67006);
// EXTERNAL MODULE: ./src/components/ReferAFriend/MainSection/style.module.css
var style_module = __webpack_require__(7133);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./src/components/ReferAFriend/HowItWorksDrawer/style.module.css
var HowItWorksDrawer_style_module = __webpack_require__(68466);
var HowItWorksDrawer_style_module_default = /*#__PURE__*/__webpack_require__.n(HowItWorksDrawer_style_module);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
;// CONCATENATED MODULE: ./src/components/ReferAFriend/HowItWorksDrawer/HowItWorksDrawer.js





const HowItWorksDrawer = ({ toggleDrawer, open })=>{
    const [isBottomDrawer, setIsBottomDrawer] = (0,react_.useState)(false);
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
    const sidebarDetail = [
        {
            heading: "Share your Referral Code with Friends",
            subheading: ""
        },
        {
            heading: "Your Friend uses your Referral Code while sign-up",
            subheading: ""
        },
        {
            heading: "You and your Friend both get 500 CF Coins",
            subheading: "Once your friend successfully place a qualifying order using referral code"
        },
        {
            heading: "Use CF Coins against Future Payments or your next Orders",
            subheading: ""
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.Drawer, {
        anchor: isBottomDrawer ? "bottom" : "right",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (HowItWorksDrawer_style_module_default()).customDrawer
        },
        children: [
            " ",
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (HowItWorksDrawer_style_module_default()).drawer_main_container,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (HowItWorksDrawer_style_module_default()).close_icon,
                        onClick: toggleDrawer,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* Close */.x8, {
                            color: "#45454A",
                            size: 24,
                            className: "cursor-pointer"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (HowItWorksDrawer_style_module_default()).sidebar_header,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (HowItWorksDrawer_style_module_default()).sidebar_header_heading,
                                                children: "How it works"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (HowItWorksDrawer_style_module_default()).sidebar_header_subheading,
                                                children: "Become our brand ambassador and earn CF Coins everytime you refer someone"
                                            })
                                        ]
                                    })
                                }),
                                sidebarDetail?.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (HowItWorksDrawer_style_module_default()).drawer_map_wrapper,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: (HowItWorksDrawer_style_module_default()).sidebar_benefit_wrapper,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: (HowItWorksDrawer_style_module_default()).sidebar_number,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        children: index + 1
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: (HowItWorksDrawer_style_module_default()).sidebar_detailing,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            className: (HowItWorksDrawer_style_module_default()).sidebar_detail_heading,
                                                            children: item.heading
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            className: (HowItWorksDrawer_style_module_default()).sidebar_detail_subheading,
                                                            children: item.subheading
                                                        }),
                                                        index !== sidebarDetail?.length - 1 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: (HowItWorksDrawer_style_module_default()).divider
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }, index.toString()))
                            ]
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const HowItWorksDrawer_HowItWorksDrawer = (HowItWorksDrawer);

// EXTERNAL MODULE: ./src/components/ReferAFriend/MainSection/FAQQuestion.js
var FAQQuestion = __webpack_require__(67950);
// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./src/components/Common/Notifications/toastUtils.js
var toastUtils = __webpack_require__(44772);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
// EXTERNAL MODULE: ./src/network/axios/index.js
var network_axios = __webpack_require__(62219);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
// EXTERNAL MODULE: ./src/components/LoginPopups/index.js + 6 modules
var LoginPopups = __webpack_require__(98288);
// EXTERNAL MODULE: ./node_modules/react-responsive-modal/styles.css
var styles = __webpack_require__(14025);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var index_esm = __webpack_require__(16775);
;// CONCATENATED MODULE: ./src/components/ReferAFriend/MainSection/MainSection.js



















const FAQ = [
    {
        id: 0,
        question: "Who Can Refer?",
        answer: "Only Cityfurnish customers can use referral program to refer their friends and family."
    },
    {
        id: 1,
        question: "How Can I Refer?",
        answer: "You can share your referral code on any social platform such as Facebook, Twitter, WhatsApp, etc. from our Referral Page or you can even mail your link to your friends and family."
    },
    {
        id: 2,
        question: "How Can I Use Referral Code?",
        answer: 'If you have a referral code, please enter it in the "Referral Code" box while sign-up.'
    },
    {
        id: 3,
        question: "How Can I Claim The Referral Benefit?",
        answer: "The referrer gets a mail notification once their referral code is used by any of their friends. Contact our customer care via email or phone on receipt of notification to get applicable discount. Amount will be adjusted against remaining rental. No cashbacks are permitted against referral benefit."
    },
    {
        id: 4,
        question: "Is There A Limit On Benefit?",
        answer: "- You can refer as many friends as you want. You get benefit on every successful conversion.<br/>- Referred customer can not club referral benefit with any other offer."
    },
    {
        id: 5,
        question: "Can I Use My Own Referral Code?",
        answer: "You can not use your own referral code. Cityfurnish reserves the right to revoke referral benefits availed by individuals who share a common address with the referrer."
    },
    {
        id: 6,
        question: "Other Terms And Conditions",
        answer: "- Referral program is not appliable on fitness equipments and office furniture. <br/> -Referrer should place an order of min <span style='font-family:Inter'>₹</span>1000 monthly rental to avail benefit of referral program.<br/>-Cityfurnish reserves the right to revoke referral benefits if they were earned against our terms or close the referral program anytime without any prior intimation."
    }
];
const IconLink = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";
const MainSection = ({ login })=>{
    const [isDrawerOpen, setIsDrawerOpen] = (0,react_.useState)(false);
    const [openIndex, setOpenIndex] = (0,react_.useState)(0);
    const [code, setCode] = (0,react_.useState)();
    const [userId, setuserId] = (0,react_.useState)();
    const [loading, setloading] = (0,react_.useState)(true);
    const [loginModal, setLoginModal] = (0,react_.useState)(false);
    const router = (0,navigation.useRouter)();
    const dispatch = (0,lib.useDispatch)();
    const modalStateFromRedux = (0,lib.useSelector)((state)=>state.order.isModalOpen);
    const userIdFromStorage = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    const HandleToggleDrawer = ()=>{
        setIsDrawerOpen(!isDrawerOpen);
    };
    const toggleLoginModal = ()=>{
        dispatch((0,Slices/* reduxSetModalState */.V)(!modalStateFromRedux));
        setLoginModal(!loginModal);
    };
    const toggleQuestion = (index)=>{
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };
    (0,react_.useEffect)(()=>{
        if (userIdFromStorage) {
            axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.referAFreind(userIdFromStorage)).then((res)=>{
                setCode(res?.data?.data);
            }).catch((err)=>console.log(err, "err in referal code"));
        }
        setuserId(userIdFromStorage);
        setloading(false);
    }, [
        userIdFromStorage
    ]);
    const socialMediaIcons = [
        {
            icon: `${IconLink}facebook.svg`,
            link: `https://www.facebook.com/sharer.php?u=https://rentofurniture.com&quote=${code?.url_string}`
        },
        {
            icon: `${IconLink}linkedin.svg`,
            link: `https://www.linkedin.com/shareArticle?mini=true&url=https://cityfurnish.com/&title=${code?.url_string}`
        },
        {
            icon: `${IconLink}mail.svg`,
            link: `mailto:?subject=Cityfurnish&body=${code?.url_string}`
        },
        {
            icon: `${IconLink}whatsapp_icon.svg`,
            link: `https://api.whatsapp.com/send?text=${code?.url_string}`
        }
    ];
    // const copyToClipboard = text => {
    //   if (!text) return;
    //   // Create a temporary input element to copy text
    //   const input = document.createElement("input");
    //   input.style.position = "fixed";
    //   input.style.opacity = 0;
    //   input.value = text;
    //   document.body.appendChild(input);
    //   input.select();
    //   document.execCommand("copy");
    //   document.body.removeChild(input);
    //   showToastNotification("Copied to clipboard!", 1);
    //   input.value = "";
    // };
    const copyToClipboard = (text)=>{
        if (!text) return;
        const input = document.createElement("input");
        input.style.position = "fixed";
        input.style.opacity = 0;
        input.value = text.referral_code;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        (0,toastUtils/* showToastNotification */.I)("Copied to clipboard!", 1);
    };
    const HandleLogin = ()=>{
        // router.push("https://test.rentofurniture.com/user_sign_up");
        toggleLoginModal();
    };
    const shareBtn = (link)=>{
        const url = link;
         false && 0;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `${(style_module_default()).main_container} ${userId && "lg:!pl-[64px]"}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(LoginPopups/* default */.Z, {
                closeModal: toggleLoginModal,
                isModalOpen: loginModal,
                // setIsLogin={bool => {
                //   setIsLogin(bool);
                // }}
                handleChangeRoute: ()=>router.push("/referral")
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: (style_module_default()).heading,
                children: "Referral Code"
            }),
            userId && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (style_module_default()).line_web
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                // className={userId ? styles.content_wrapper : styles.content_wrapper1}>
                className: (style_module_default()).content_wrapper1,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: userId ? (style_module_default()).section1_wrapper : (style_module_default()).section1_wrapper1,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (style_module_default()).detail_heading,
                                children: "Get Rewarded with 500 CF Coins for Every Referral!"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (style_module_default()).detail_desc,
                                children: "Share your Referral Code with friends, both you and your friend get 500 CF Coins."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: `${(style_module_default()).detail_heading} mt-6 md:mt-10`,
                                children: userId ? "Share your Referral via:" : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "flex",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                "Your unique Referral Code is ready and waiting for you!",
                                                " ",
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg",
                                                        alt: "paty_icon",
                                                        className: "w-[24px] h-[24px] ml-2 inline-block"
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                })
                            }),
                            loading && login && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: `${(style_module_default()).referral_wrapper_skeleton} `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "flex w-full",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                                            variant: "text",
                                            className: (style_module_default()).skeleton_full_width_height
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: " flex items-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "w-[60%] h-12 mt-4",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                                                    variant: "rectangular",
                                                    className: (style_module_default()).skeleton_full_width_height
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex items-center",
                                                children: [
                                                    1,
                                                    2,
                                                    3,
                                                    4
                                                ].map((item)=>{
                                                    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "w-6 h-6 ml-2",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                                                            variant: "circular",
                                                            className: (style_module_default()).skeleton_full_width_height
                                                        })
                                                    }, item.toString());
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            userId && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (style_module_default()).referral_wrapper,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).referral_section,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (style_module_default()).code,
                                                children: code?.referral_code
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (style_module_default()).copy_section,
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    copyToClipboard(code);
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: `${IconLink}clipboard.svg`,
                                                        alt: "copy",
                                                        className: "mr-2"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: "copy"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (style_module_default()).share_modal_icons_wrapper,
                                        children: socialMediaIcons?.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                href: item.link,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "outline-none",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    shareBtn(item.link);
                                                },
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                    alt: item?.icon,
                                                    src: item?.icon,
                                                    className: "cursor-pointer pointer-events-none"
                                                })
                                            }, index.toString()))
                                    })
                                ]
                            }),
                            !login && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (style_module_default()).detail_desc,
                                children: "Simply log in to access it now:"
                            }),
                            !login && // <a
                            //   // href="https://test.rentofurniture.com/user_sign_up"
                            //   target="_blank"
                            //   rel="noopner noreferrer">
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                className: (style_module_default()).login_btn,
                                onClick: HandleLogin,
                                children: [
                                    "Login",
                                    /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* FaArrowRight */.Z1Y, {})
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).how_it_works_button_wrapper,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                    className: (style_module_default()).how_it_works_button,
                                    onClick: HandleToggleDrawer,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).how_it_works_paragraph,
                                            children: "How it works"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {
                                            size: 18,
                                            color: "#597492",
                                            className: (style_module_default()).forward_arrow
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: // userId ? styles.section2_wrapper : styles.section2_wrapper1
                        (style_module_default()).img_wrapper_wl,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "https://d3juy0zp6vqec8.cloudfront.net/images/refer-a-friend.webp",
                            alt: "refer-a-friend",
                            className: "w-full h-full"
                        })
                    })
                ]
            }),
            isDrawerOpen && /*#__PURE__*/ jsx_runtime_.jsx(HowItWorksDrawer_HowItWorksDrawer, {
                toggleDrawer: HandleToggleDrawer,
                open: isDrawerOpen
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${(style_module_default()).section1_wrapper} ${userId && "4xl:!mt-[-20px]"}`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).freq_asked_que_wrapper,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            className: (style_module_default()).head,
                            children: "For all other questions regarding Referrals:"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).QuesAnsArray_div,
                                children: FAQ?.map((item, index)=>{
                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(FAQQuestion/* default */.Z, {
                                                ques: item?.question,
                                                ans: item?.answer,
                                                isOpen: index === openIndex,
                                                toggleQuestion: ()=>toggleQuestion(index)
                                            }),
                                            index < FAQ?.length - 1 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "bg-EDEDEE h-[1px] w-full"
                                            })
                                        ]
                                    }, index.toString());
                                })
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const MainSection_MainSection = (MainSection);

// EXTERNAL MODULE: ./src/components/Documentation/Sidebar/DocSidebar.js
var DocSidebar = __webpack_require__(8013);
// EXTERNAL MODULE: ./src/components/Common/Footer/index.js
var Footer = __webpack_require__(88523);
;// CONCATENATED MODULE: ./src/components/ReferAFriend/ReferAFriend.js










const ReferAFriend_DocSidebar = (0,loadable_cjs/* default */.ZP)(()=>Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 8013)));
const ReferAFriend_Footer = (0,loadable_cjs/* default */.ZP)(()=>Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 88523)), {
    fallback: /*#__PURE__*/ jsx_runtime_.jsx(Footer.FooterSkeleton, {})
});
const ReferAFriend = ({ login })=>{
    const [isLoogedIn, setisLoogedIn] = (0,react_.useState)(false);
    const [loading, setloading] = (0,react_.useState)(true);
    const isLoogedInfromStorage = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    (0,react_.useEffect)(()=>{
        if (isLoogedInfromStorage) {
            setisLoogedIn(isLoogedInfromStorage);
            setloading(false);
        } else {
            setloading(true);
        }
    }, [
        isLoogedInfromStorage
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(MenuList/* default */.Z, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "large_layout flex -mt-6 w-full h-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "min-w-fit hidden lg:flex",
                        style: {
                            height: "initial"
                        },
                        children: loading && login ? /*#__PURE__*/ jsx_runtime_.jsx(DocSidebar.DocSidebarSkeleton, {}) : isLoogedIn && /*#__PURE__*/ jsx_runtime_.jsx(ReferAFriend_DocSidebar, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "w-full",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(MainSection_MainSection, {
                            login: login
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ReferAFriend_Footer, {})
        ]
    });
};
/* harmony default export */ const ReferAFriend_ReferAFriend = (ReferAFriend);


/***/ }),

/***/ 68466:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar_header": "style_sidebar_header__pxAfB",
	"sidebar_header_subheading": "style_sidebar_header_subheading__pG8ZW",
	"sidebar_header_heading": "style_sidebar_header_heading__2lwr_",
	"sidebar_benefit_wrapper": "style_sidebar_benefit_wrapper__Uom0p",
	"sidebar_number": "style_sidebar_number__Cbs7a",
	"sidebar_detailing": "style_sidebar_detailing__Lhilt",
	"sidebar_detail_heading": "style_sidebar_detail_heading__Bo5EG",
	"sidebar_detail_subheading": "style_sidebar_detail_subheading__JoPVe",
	"divider": "style_divider__Dqs2i",
	"drawer_map_wrapper": "style_drawer_map_wrapper__amsCu",
	"customDrawer": "style_customDrawer__S4OXq",
	"close_icon": "style_close_icon__CgMdL",
	"drawer_main_container": "style_drawer_main_container__2rJkL"
};


/***/ }),

/***/ 1536:
/***/ (() => {



/***/ })

};
;