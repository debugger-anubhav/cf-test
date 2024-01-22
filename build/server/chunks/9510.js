exports.id = 9510;
exports.ids = [9510];
exports.modules = {

/***/ 89510:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66902);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40248);
/* harmony import */ var _network_endPoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44485);
/* harmony import */ var _network_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62219);






function TextContent({ params }) {
    const [data, setData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState();
    const [paramsCityId, setParamsCityId] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(46);
    const HomePageText = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_3__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_2__/* .endPoints */ .z.homePageTextContent).then((res)=>{
            setData(res?.data?.data);
        // console.log("home");
        }).catch((err)=>console.log(err));
    };
    const SeoAppliancesPageText = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_3__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_2__/* .endPoints */ .z.seoAppliancesTextContent + `?cityId=${paramsCityId}&categoryId=26`).then((res)=>{
            setData(res?.data?.data);
        }).catch((err)=>console.log(err));
    };
    const SeoFurniturePageText = ()=>{
        axios__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_3__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_2__/* .endPoints */ .z.seoFurnitureTextContent + `?cityId=${paramsCityId}&categoryId=27`).then((res)=>{
            setData(res?.data);
        }).catch((err)=>console.log(err));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params?.category === "appliances-rental" || params?.category === "furniture-rental") {
            axios__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.get(_network_axios__WEBPACK_IMPORTED_MODULE_3__/* .baseURL */ .v2 + _network_endPoints__WEBPACK_IMPORTED_MODULE_2__/* .endPoints */ .z.cityIdByCityName + params?.city).then((res)=>setParamsCityId(res?.data?.data?.id)).catch((err)=>console.log(err));
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (params.category === "appliances-rental") SeoAppliancesPageText();
        else if (params.category === "furniture-rental") SeoFurniturePageText();
        else HomePageText();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().wrapper),
        children: [
            params === "home-page" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: data?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        dangerouslySetInnerHTML: {
                            __html: item.meta_keyword
                        },
                        className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().apiData)
                    }, index.toString()))
            }),
            params.category === "furniture-rental" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    dangerouslySetInnerHTML: {
                        __html: data?.data?.cat_meta_keyword
                    },
                    className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().apiDataSeo)
                })
            }),
            params.category === "appliances-rental" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                dangerouslySetInnerHTML: {
                    __html: data?.cat_meta_keyword
                },
                className: (_style_module_css__WEBPACK_IMPORTED_MODULE_5___default().apiDataSeo)
            })
        ]
    });
}


/***/ }),

/***/ 66902:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "style_wrapper__eakXF",
	"apiData": "style_apiData__O9e5J",
	"apiDataSeo": "style_apiDataSeo__0yOwu"
};


/***/ })

};
;