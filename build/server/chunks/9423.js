exports.id = 9423;
exports.ids = [9423];
exports.modules = {

/***/ 37028:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FaqsSkeleton: () => (/* binding */ FaqsSkeleton),
  "default": () => (/* binding */ Common_FrequentlyAskedQuestions)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/components/Common/FrequentlyAskedQuestions/style.module.css
var style_module = __webpack_require__(80330);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./src/constants/Constant.json
var Constant = __webpack_require__(23191);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
;// CONCATENATED MODULE: ./src/components/Common/FrequentlyAskedQuestions/singleQuestion.js




const SingleQuestion = ({ ques, ans, isOpen, toggleQuestion })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "pb-6",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).quesWrapper,
                    onClick: toggleQuestion,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: (style_module_default()).ques,
                            children: ques
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: isOpen ? /*#__PURE__*/ jsx_runtime_.jsx(icon/* Minus */.WF, {
                                className: "cursor-pointer",
                                size: 20,
                                color: "#222"
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(icon/* Plus */.v3, {
                                className: "cursor-pointer",
                                size: 20,
                                color: "#222"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        dangerouslySetInnerHTML: {
                            __html: ans
                        },
                        className: `${(style_module_default()).ans} ${isOpen && (style_module_default()).ans_open}`
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const singleQuestion = (SingleQuestion);

// EXTERNAL MODULE: ./src/hooks/useQuery.js
var useQuery = __webpack_require__(78490);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(64085);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(31621);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
;// CONCATENATED MODULE: ./src/components/Common/FrequentlyAskedQuestions/index.js











// h2 h3 p
const FrequentlyAskedQuestions = ({ params, isCitymax })=>{
    const str = Constant.common_components.FAQ;
    const [faqs, setFaqs] = react_default().useState(null);
    const [visibleQues, setVisibleQues] = (0,react_.useState)(7);
    const handleShowMore = ()=>{
        setVisibleQues((prevVisibleRows)=>prevVisibleRows + 5);
    };
    const [openIndex, setOpenIndex] = react_default().useState(null);
    const { refetch: getFaqsLandingPage } = (0,useQuery/* useQuery */.a)("faqsLandingPage", endPoints/* endPoints */.z.faqsLandingPage);
    const { refetch: getFaqsSeoAppliancePage } = (0,useQuery/* useQuery */.a)("faqsSeoAppliancePage", endPoints/* endPoints */.z.seoApplianceFaqs);
    const { refetch: getFaqsSeoFurniturePage } = (0,useQuery/* useQuery */.a)("faqsSeoFurniturePage", endPoints/* endPoints */.z.seoFurnitureFaqs);
    const { refetch: getFaqsCategory } = (0,useQuery/* useQuery */.a)("faqsCategoryPage", endPoints/* endPoints */.z.categortFaq, `?parentCategoryId=27`);
    const getFaqsCitymax = ()=>{
        axios/* default */.Z.get("https://test.rentofurniture.com/ajxapi/frp_faq_details").then((res)=>setFaqs(res?.data?.data?.content)).catch((err)=>console.log(err));
    };
    const toggleQuestion = (index)=>{
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };
    (0,react_.useEffect)(()=>{
        if (params?.category === "appliances-rental") {
            getFaqsSeoAppliancePage().then((res)=>{
                setFaqs(res?.data?.data);
            // console.log("appliances-rental")
            }).catch((err)=>console.log(err));
        } else if (params?.category === "furniture-rental") {
            getFaqsSeoFurniturePage().then((res)=>{
                setFaqs(res?.data?.data);
            // console.log("furniture-rental")
            }).catch((err)=>console.log(err));
        } else if (params === "category") {
            getFaqsCategory().then((res)=>{
                setFaqs(res?.data?.data);
            }).catch((err)=>console.log(err));
        } else if (params === "citymax") {
            getFaqsCitymax();
        } else {
            getFaqsLandingPage().then((res)=>{
                setFaqs(res?.data?.data);
            // console.log("home")
            }).catch((err)=>console.log(err));
        }
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).freq_asked_que_wrapper,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: (style_module_default()).head,
                children: str.header
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).QuesAnsArray_div,
                        children: faqs?.slice(0, visibleQues).map((item, index)=>{
                            return(// index < 7 && (
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(singleQuestion, {
                                        ques: item?.question,
                                        ans: item?.answer,
                                        isOpen: index === openIndex,
                                        toggleQuestion: ()=>toggleQuestion(index)
                                    }),
                                    index !== faqs.slice(0, visibleQues).length - 1 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "bg-EDEDEE h-[1px] w-full"
                                    })
                                ]
                            }, index.toString()));
                        // );
                        })
                    }),
                    isCitymax ? visibleQues < faqs?.length && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: (style_module_default()).show_more_div,
                        onClick: handleShowMore,
                        children: [
                            "See More FAQs",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownArrowUnfilled */.wf, {
                                className: (style_module_default()).down_arrow
                            })
                        ]
                    }) : /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/pages/faq",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).btn,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).btn_txt,
                                    children: str.btn_txt
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {
                                    className: (style_module_default()).forword_icon
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Common_FrequentlyAskedQuestions = (FrequentlyAskedQuestions);
const FaqsSkeleton = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).faq_skeleton_wrapper,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-[30%] h-8",
                children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                    variant: "text",
                    className: "text-16 w-full h-full"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-[45%]",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).QuesAnsArray_div,
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ]?.map((item, index)=>{
                            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                                    variant: "text",
                                    className: "text-16 w-full"
                                })
                            }, index.toString());
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(node.Skeleton, {
                        variant: "text",
                        className: "w-40 h-20 mt-2"
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 33875:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76411);
/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64085);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12301);





const CityMaxDrawer = ({ toggleDrawer, open })=>{
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
    const sidebarDetail = [
        {
            heading: "Select Tenure of Subscription",
            subheading: "Select your preferred duration of subscription. Don't worry, you can extend it later if need be."
        },
        {
            heading: "Select a Plan",
            subheading: "Choose a plan which best suits your need."
        },
        {
            heading: "Choose The Products",
            subheading: "Click on each placeholder box and choose the furniture and appliances you like."
        },
        {
            heading: "Complete the Order & On Boarding Process",
            subheading: "Pay the subscription fee and upload documents required for KYC."
        },
        {
            heading: "Take The Delivery",
            subheading: "We will deliver your products within 4 days after KYC completion."
        },
        {
            heading: "Return or Extend",
            subheading: "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."
        },
        {
            heading: "Return or Extend",
            subheading: "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."
        },
        {
            heading: "Return or Extend",
            subheading: "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
        anchor: isBottomDrawer ? "bottom" : "right",
        open: open,
        onClose: toggleDrawer,
        classes: {
            paper: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().customDrawer)
        },
        children: [
            " ",
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().drawer_main_container),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().close_icon),
                        onClick: toggleDrawer,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_icon__WEBPACK_IMPORTED_MODULE_2__/* .Close */ .x8, {
                            color: "#45454A",
                            size: 24,
                            className: "cursor-pointer"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_header),
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_header_subheading),
                                                children: "CityMax"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_header_heading),
                                                children: "How it works"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "h-[90vh] overflow-scroll pb-[130px] md:pb-0 ",
                                    children: sidebarDetail?.map((item, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().drawer_map_wrapper),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_benefit_wrapper),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_number),
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                children: index + 1
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_detailing),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_detail_heading),
                                                                    children: item.heading
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebar_detail_subheading),
                                                                    children: item.subheading
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                index !== sidebarDetail?.length - 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().divider)
                                                })
                                            ]
                                        }, index.toString()))
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CityMaxDrawer);


/***/ }),

/***/ 80330:
/***/ ((module) => {

// Exports
module.exports = {
	"freq_asked_que_wrapper": "style_freq_asked_que_wrapper__bd_eD",
	"head": "style_head__MKEUT",
	"QuesAnsArray_div": "style_QuesAnsArray_div__Wx_HC",
	"quesWrapper": "style_quesWrapper__kWepr",
	"ques": "style_ques__H3C8g",
	"ans": "style_ans__vNeDH",
	"ans_open": "style_ans_open__6SClO",
	"btn": "style_btn__DV_t6",
	"btn_txt": "style_btn_txt__upQ_O",
	"forword_icon": "style_forword_icon__cEepZ",
	"faq_skeleton_wrapper": "style_faq_skeleton_wrapper__3jvc_",
	"show_more_div": "style_show_more_div__58F1M",
	"down_arrow": "style_down_arrow__zNCJj"
};


/***/ }),

/***/ 76411:
/***/ ((module) => {

// Exports
module.exports = {
	"main_wrapper": "styles_main_wrapper__Mmz2C",
	"left_image_section": "styles_left_image_section__vEM2g",
	"tryCity_image": "styles_tryCity_image__48mlv",
	"right_text_section": "styles_right_text_section__ofRoH",
	"card_icon": "styles_card_icon___eSqi",
	"tryCity_heading": "styles_tryCity_heading__kXp71",
	"tryCity_headingMax": "styles_tryCity_headingMax__XPO2X",
	"TryCity_paragraph": "styles_TryCity_paragraph__xdAnA",
	"check_button": "styles_check_button__TJyB8",
	"check_button_paragraph": "styles_check_button_paragraph__X627q",
	"forward_icon": "styles_forward_icon__J1k91",
	"benefits_text": "styles_benefits_text__0KtlM",
	"line": "styles_line__Sca0g",
	"benefits_of_city_wrapper": "styles_benefits_of_city_wrapper__0sefR",
	"benefits_content": "styles_benefits_content__UP1_k",
	"card_wrapper": "styles_card_wrapper__RtRGz",
	"benefit_title": "styles_benefit_title__8eaSa",
	"benefit_paragraph": "styles_benefit_paragraph__uF160",
	"how_it_works_button": "styles_how_it_works_button__G2XJc",
	"how_it_works_paragraph": "styles_how_it_works_paragraph__gR0wf",
	"forward_arrow": "styles_forward_arrow__fSXyc",
	"underline": "styles_underline__wieus",
	"Skeleton_text": "styles_Skeleton_text__TCgtG",
	"Skeleton_button": "styles_Skeleton_button__WBCPc",
	"sidebar_header": "styles_sidebar_header__AINTx",
	"sidebar_header_subheading": "styles_sidebar_header_subheading__A16Oo",
	"sidebar_header_heading": "styles_sidebar_header_heading__Y2CjL",
	"sidebar_benefit_wrapper": "styles_sidebar_benefit_wrapper__zD68i",
	"sidebar_number": "styles_sidebar_number__LUAHR",
	"sidebar_detailing": "styles_sidebar_detailing__yL9qt",
	"sidebar_detail_heading": "styles_sidebar_detail_heading__xcGG7",
	"sidebar_detail_subheading": "styles_sidebar_detail_subheading__2smmZ",
	"rupeeIcon": "styles_rupeeIcon__ILXhG",
	"skeleton_box": "styles_skeleton_box__yO2bE",
	"divider": "styles_divider__joF5O",
	"drawer_map_wrapper": "styles_drawer_map_wrapper__yODvF",
	"customDrawer": "styles_customDrawer__aWtUR",
	"close_icon": "styles_close_icon__f9zMs",
	"drawer_main_container": "styles_drawer_main_container__L6zni"
};


/***/ })

};
;