exports.id = 1800;
exports.ids = [1800];
exports.modules = {

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

/***/ 10531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RentFurnitureSkeleton: () => (/* binding */ RentFurnitureSkeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(58444);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23191);
/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(35885);
/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1560);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_Slices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24664);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44485);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40248);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62219);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29460);












const RentFurnitureAndAppliances = ({ params })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const homePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.homePagedata);
    const seoAppliancePageReduxData = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.seoApplianceData);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params?.category === "appliances-rental") {
            axios__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.seoApplianceRentalSubCategory).then((res)=>{
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .setSeoApplianceRentalSubCategory */ .CW)(res?.data?.data));
            // console.log("appliances-rental")
            }).catch((err)=>{
                console.log(err);
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .setSeoApplianceRentalSubCategory */ .CW)([]));
            });
        } else if (params?.category === "furniture-rental") {
            axios__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.seoFurnitureRentalSubCategory).then((res)=>{
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .setSeoFurnitureRentalSubCategory */ .u)(res?.data?.data));
            // console.log("furniture-rental")
            }).catch((err)=>{
                console.log(err);
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .setSeoFurnitureRentalSubCategory */ .u)([]));
            });
        } else {
            axios__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_6__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_5__/* .endPoints */ .z.category).then((res)=>{
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .addCategory */ .i8)(res?.data?.data));
            // console.log("home")
            }).catch((err)=>{
                console.log(err);
                dispatch((0,_store_Slices__WEBPACK_IMPORTED_MODULE_4__/* .addCategory */ .i8)([]));
            });
        }
    }, []);
    const RentFurniture = params.category === "appliances-rental" ? seoAppliancePageReduxData.seoApplianceSubCategory : params.category === "furniture-rental" ? homePageReduxData.seoFurnitureSubCategory : homePageReduxData.category;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().rent_furniture_wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().head),
                children: _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.Rent_furni
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().subhead),
                children: _constants_Constant_json__WEBPACK_IMPORTED_MODULE_2__.landing_page.Explore_by
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().card_div),
                children: RentFurniture?.map((item, index)=>{
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().card_wrapper),
                        onClick: ()=>{
                            router.push(`/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${item?.seourl}`);
                            if (false) {}
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${item?.seourl}`,
                                onClick: (e)=>e.preventDefault(),
                                "aria-label": item?.cat_name,
                                target: "_self",
                                rel: "noopener",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: "https://d3juy0zp6vqec8.cloudfront.net/images/category/" + item.category_web_image,
                                    alt: item?.cat_name,
                                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().category_img),
                                    loading: "lazy",
                                    width: "100%",
                                    height: "auto"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().label_wrapper),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().label),
                                        children: item.cat_name
                                    }),
                                    params === "home-page" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().desc),
                                        children: item.category_description
                                    })
                                ]
                            })
                        ]
                    }, index.toString());
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RentFurnitureAndAppliances);
const RentFurnitureSkeleton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().rent_furniture_wrapper),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11___default()), {
                variant: "text",
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().Skeleton_text)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11___default()), {
                variant: "text",
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().Skeleton_sub_text)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().card_div)}`,
                children: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ].map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${(_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().card_wrapper)} ${(_style_module_css__WEBPACK_IMPORTED_MODULE_10___default().skeleton_card_wrapper)}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_11___default()), {
                            variant: "rectangular",
                            className: "h-full"
                        })
                    }, index.toString()))
            })
        ]
    });
};


/***/ }),

/***/ 58444:
/***/ ((module) => {

// Exports
module.exports = {
	"rent_furniture_wrapper": "style_rent_furniture_wrapper__xIHqL",
	"head": "style_head__Gv_v3",
	"subhead": "style_subhead__iA6Su",
	"card_div": "style_card_div__l7HQg",
	"card_wrapper": "style_card_wrapper___ksyd",
	"category_img": "style_category_img__iMYIa",
	"label_wrapper": "style_label_wrapper__z60dS",
	"label": "style_label___oSHn",
	"desc": "style_desc__pYEzP",
	"pricetag": "style_pricetag__HH_Xd",
	"price": "style_price__gqa8h",
	"span": "style_span__kcSlm",
	"rent_furniture_skeleton": "style_rent_furniture_skeleton__WGvUK",
	"Skeleton_text": "style_Skeleton_text__tbUp4",
	"Skeleton_sub_text": "style_Skeleton_sub_text__dM3cr",
	"skeleton_card_wrapper": "style_skeleton_card_wrapper__2E63d"
};


/***/ })

};
;