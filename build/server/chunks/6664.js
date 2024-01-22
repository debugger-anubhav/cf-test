"use strict";
exports.id = 6664;
exports.ids = [6664];
exports.modules = {

/***/ 86664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ AuthProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43334);


// import {getLocalStorage} from "@/constants/constant";


function AuthProvider(WrappedComponent) {
    return (props)=>{
        const { checkAuthentication } = (0,_hooks_checkAuthentication__WEBPACK_IMPORTED_MODULE_3__/* .useAuthentication */ .J)();
        const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
        // const login = getLocalStorage("_ga");
        const [isAuthenticated, setisAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
        const validateAuth = async ()=>{
            const isLogin = await checkAuthentication();
            setisAuthenticated(isLogin);
            if (isLogin === false) {
                console.log("in baddd");
                router.push("/");
            }
        };
        (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
            validateAuth();
        }, []);
        // useEffect(() => {
        //   setTimeout(() => {
        //     if (isAuthenticated === false) {
        //       console.log("in baddd");
        //       router.push("/");
        //     }
        //   }, 1000);
        // }, []);
        if (isAuthenticated) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WrappedComponent, {
                ...props
            });
        }
        return null;
    };
}


/***/ })

};
;