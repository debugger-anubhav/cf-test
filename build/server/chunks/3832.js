exports.id = 3832;
exports.ids = [3832];
exports.modules = {

/***/ 73832:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home_CombineSection)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/components/Home/PartnershipBanner/style.module.css
var style_module = __webpack_require__(71691);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
;// CONCATENATED MODULE: ./src/components/Home/PartnershipBanner/index.js


// import partner from "../../../assets/partnership.svg";
// import Image from "next/image";

const PartnershipBanner = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (style_module_default()).partnership_banner,
        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
            alt: "our-reputation",
            src: "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/our-reputation.webp",
            loading: "lazy",
            className: "w-full h-full pointer-events-none"
        })
    });
};
/* harmony default export */ const Home_PartnershipBanner = (PartnershipBanner);

// EXTERNAL MODULE: ./src/components/Home/FourSteps/style.module.css
var FourSteps_style_module = __webpack_require__(48204);
var FourSteps_style_module_default = /*#__PURE__*/__webpack_require__.n(FourSteps_style_module);
// EXTERNAL MODULE: ./src/constants/Constant.json
var Constant = __webpack_require__(23191);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
;// CONCATENATED MODULE: ./src/components/Home/FourSteps/index.js





// h2 p h3 p
const FourSteps = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (FourSteps_style_module_default()).four_steps_wrapper,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: (FourSteps_style_module_default()).head,
                children: Constant.landing_page.Four_steps.heading
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: (FourSteps_style_module_default()).subhead,
                children: Constant.landing_page.Four_steps.subhead
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (FourSteps_style_module_default()).card_wrapper,
                children: constant/* FourStepsCardData */.tM?.map((itemm, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (FourSteps_style_module_default()).card,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: `w-100 h-100 absolute z-10`
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: itemm?.img1,
                                        alt: `step-${index + 1}`,
                                        loading: "lazy",
                                        className: `${index === 0 ? "w-[80px] h-[80px]" : index === 1 ? "w-[85px] h-[80px]" : index === 2 ? "w-[137px] h-[73.5px]" : "w-[161px] h-[70px]"} md:flex hidden relative z-[-1]`
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: itemm?.img2,
                                        className: `min-w-[160px] h-[160px] flex md:hidden relative z-[-1]`,
                                        // className={`w-full md:hidden`}
                                        loading: "lazy"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: (FourSteps_style_module_default()).head1,
                                children: itemm?.head
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (FourSteps_style_module_default()).content1,
                                children: itemm?.content
                            })
                        ]
                    }, index.toString()))
            })
        ]
    });
};
/* harmony default export */ const Home_FourSteps = (FourSteps);

// EXTERNAL MODULE: ./src/components/Home/ChatWithUs/style.module.css
var ChatWithUs_style_module = __webpack_require__(9441);
var ChatWithUs_style_module_default = /*#__PURE__*/__webpack_require__.n(ChatWithUs_style_module);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
;// CONCATENATED MODULE: ./src/components/Home/ChatWithUs/index.js




// import { useChatScript } from "../../../../useChatScript";
function ChatWithUs() {
    const handleButtonClick = ()=>{};
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (ChatWithUs_style_module_default()).main_container,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ChatWithUs_style_module_default()).sub_container,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            className: (ChatWithUs_style_module_default()).sub_paragraph,
                            children: "Have a query? Need help?"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: (ChatWithUs_style_module_default()).sub_heading,
                            children: "Chat with us"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ChatWithUs_style_module_default()).mid_section,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: (ChatWithUs_style_module_default()).sub_paragraph_details,
                            children: [
                                "Write to us at",
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: (ChatWithUs_style_module_default()).mail_address,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        href: "mailto:hello@cityfurnish.com",
                                        className: "text-[#48678B]",
                                        children: [
                                            "hello@cityfurnish.com",
                                            " "
                                        ]
                                    })
                                }),
                                "or talk to our customer care representative at",
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                    className: (ChatWithUs_style_module_default()).mail_address,
                                    children: [
                                        " ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: `tel:080-66084700 `,
                                            target: "_self",
                                            className: "text-[#48678B]",
                                            children: "080-66084700"
                                        })
                                    ]
                                }),
                                " ",
                                "(9 AM - 9 PM)"
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ChatWithUs_style_module_default()).btn_wrapper,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    href: "mailto:hello@cityfurnish.com",
                                    className: "text-[#48678B]",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                        className: (ChatWithUs_style_module_default()).write_to_us_wrapper,
                                        onClick: ()=>{
                                            handleButtonClick();
                                        },
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* Mail */.Mh, {
                                                size: 20,
                                                color: "#71717A",
                                                className: (ChatWithUs_style_module_default()).tbMail_icon
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (ChatWithUs_style_module_default()).write_to_us_text,
                                                children: "Write to us"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (ChatWithUs_style_module_default()).chat_now_wrapper,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* Message */.v0, {
                                            size: 20,
                                            color: "#222",
                                            className: (ChatWithUs_style_module_default()).message_icon
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (ChatWithUs_style_module_default()).chat_now_text,
                                            children: "Chat now"
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
}

;// CONCATENATED MODULE: ./src/components/Home/CombineSection/index.js





const CombineSection = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "hidden lg:flex pb-20 pt-12 px-[70px] xl:px-[90px] relative macbook:px-[122px] 3xl:px-[160px] mt-10 gap-4 xl:gap-7 macbook:gap-[33px] 2xl:gap-12 3xl:gap-20 4xl:gap-10",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Home_PartnershipBanner, {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Home_FourSteps, {}),
                            /*#__PURE__*/ jsx_runtime_.jsx(ChatWithUs, {})
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "lg:hidden",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Home_PartnershipBanner, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(Home_FourSteps, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(ChatWithUs, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const Home_CombineSection = (CombineSection);


/***/ }),

/***/ 9441:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__weOIv",
	"sub_container": "style_sub_container__VsLmO",
	"sub_paragraph": "style_sub_paragraph__2MhVU",
	"sub_heading": "style_sub_heading__BKJJj",
	"mid_section": "style_mid_section__0pQDG",
	"sub_paragraph_details": "style_sub_paragraph_details__N2RB9",
	"mail_address": "style_mail_address__CEI2z",
	"write_to_us_wrapper": "style_write_to_us_wrapper__WfWZy",
	"tbMail_icon": "style_tbMail_icon__PB6O9",
	"write_to_us_text": "style_write_to_us_text__8zfn8",
	"chat_now_wrapper": "style_chat_now_wrapper__2EPnW",
	"message_icon": "style_message_icon__yjieJ",
	"chat_now_text": "style_chat_now_text__JHXe2",
	"btn_wrapper": "style_btn_wrapper__JzjJ8"
};


/***/ }),

/***/ 48204:
/***/ ((module) => {

// Exports
module.exports = {
	"four_steps_wrapper": "style_four_steps_wrapper__a4_Jt",
	"head": "style_head__RMkY7",
	"subhead": "style_subhead__qttEJ",
	"card_wrapper": "style_card_wrapper__mJNeb",
	"head1": "style_head1__9F7Bp",
	"content1": "style_content1__m19j_"
};


/***/ }),

/***/ 71691:
/***/ ((module) => {

// Exports
module.exports = {
	"partnership_banner": "style_partnership_banner__X4dBo"
};


/***/ })

};
;