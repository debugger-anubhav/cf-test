exports.id = 1739;
exports.ids = [1739];
exports.modules = {

/***/ 91739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ServiceRequests_ServiceRequestType)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/components/ServiceRequests/style.module.css
var style_module = __webpack_require__(83870);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: ./src/assets/icon.js + 11 modules
var icon = __webpack_require__(12301);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(40248);
// EXTERNAL MODULE: ./src/network/axios/index.js
var network_axios = __webpack_require__(62219);
// EXTERNAL MODULE: ./src/network/endPoints.js
var endPoints = __webpack_require__(44485);
// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js + 15 modules
var react_select_esm = __webpack_require__(28260);
// EXTERNAL MODULE: ./src/constants/constant.js
var constant = __webpack_require__(29460);
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(1560);
// EXTERNAL MODULE: ./src/store/Slices/index.js
var Slices = __webpack_require__(24664);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/CancelOrder.js








const customStylesForSelect = {
    control: (baseStyles, state)=>({
            ...baseStyles,
            padding: "4px 16px",
            borderRadius: "12px",
            outline: "none",
            cursor: "pointer",
            ".css-1u9des2-indicatorSeparator": {
                display: "none"
            },
            border: "1px solid  #DDDDDF",
            boxShadow: 0,
            "&:hover": {
                border: "1px solid #71717A"
            }
        }),
    option: (base, state)=>({
            ...base,
            color: state.isSelected ? "#5774AC" : "#222",
            backgroundColor: state.isSelected ? "#EFF5FF" : "#fff",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "#EFF5FF",
                color: "#5774AC"
            },
            fonetSize: "16px",
            borderBottom: "1px solid #DDDDDF"
        })
};
function CencelOrder({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const cencellationOptions = [
        {
            value: "1",
            label: "Wrong items selected"
        },
        {
            value: "2",
            label: "Late delivery"
        },
        {
            value: "3",
            label: "Want to buy items"
        },
        {
            value: "4",
            label: "Items not required anymore"
        },
        {
            value: "5",
            label: "Other"
        }
    ];
    const [selected, setSelected] = (0,react_.useState)(null);
    const [description, setDescription] = (0,react_.useState)("");
    const handleChange = (selectedOption)=>{
        setSelected(selectedOption);
    };
    const handleRequest = ()=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            Possible_Values: selected.label,
            type: selectedType,
            description
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>prevScreen(true),
                        className: "cursor-pointer"
                    }),
                    "Cancel order"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).cancellation_info,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_select_esm/* default */.ZP, {
                        options: cencellationOptions,
                        styles: customStylesForSelect,
                        onChange: handleChange,
                        placeholder: "Reason for cancellation"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: (style_module_default()).form_label,
                        children: "Your comment (optional)"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: "text",
                        placeholder: "Please share any specific instructions or provide feedback.",
                        className: (style_module_default()).form_input_textarea,
                        onChange: (e)=>setDescription(e.target.value)
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: `${(style_module_default()).proceed_btn}  !w-fit ${selected === null ? "!bg-[#FFDF85] !cursor-not-allowed" : ``}`,
                        onClick: handleRequest,
                        children: [
                            "Create request ",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const CancelOrder = (CencelOrder);

// EXTERNAL MODULE: ./node_modules/react-icons/io/index.esm.js
var index_esm = __webpack_require__(85780);
// EXTERNAL MODULE: ./node_modules/react-icons/bs/index.esm.js
var bs_index_esm = __webpack_require__(75484);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/SwapProduct.js












function SwapProduct({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const [showSwapScreen, setShowSwapScreen] = (0,react_.useState)(1);
    const [ProductInfo, setProductInfo] = (0,react_.useState)(data);
    const [selectedProduct, setSelectedProduct] = (0,react_.useState)(null);
    const [selectedProductForSwap, setSelectedProductForSwap] = (0,react_.useState)(null);
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const handleCreateRequest = ()=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            upgrade_product: selectedProductForSwap?.product_name,
            selected_product_name: selectedProduct?.product_name
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    (0,react_.useEffect)(()=>{
        setProductInfo(data);
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>{
                            if (showSwapScreen === 2) setShowSwapScreen(1);
                            else prevScreen(true);
                        },
                        className: "cursor-pointer"
                    }),
                    "Swap product"
                ]
            }),
            showSwapScreen === 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${(style_module_default()).swap_first_screen} ${showSwapScreen === 1 ? "flex flex-col" : "hidden"} `,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).buy_info,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).desc,
                            children: "Select products to swap"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: ProductInfo?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: ` ${index !== ProductInfo.length - 1 ? " border-b border-EDEDEE" : "border-0"} ${(style_module_default()).request_info_div}`,
                                    onClick: ()=>{
                                        setSelectedProduct(item);
                                        setShowSwapScreen(2);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "flex gap-2 items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                    className: (style_module_default()).product_imge_thambnil,
                                                    src: `${constant/* productPageImagesBaseUrl */.p5 + "thumb/" + item.product_image?.split(",")[0]}`,
                                                    alt: item.product_name
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).request_type,
                                                    children: item.product_name
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
                                        })
                                    ]
                                }, index.toString()))
                        })
                    ]
                })
            }) : /*#__PURE__*/ jsx_runtime_.jsx(SecondScreen, {
                data: selectedProduct,
                setSelectedProductForSwap: setSelectedProductForSwap
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).bottom_row,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (style_module_default()).bottom_line
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: `${(style_module_default()).proceed_btn} ${showSwapScreen === 1 || selectedProductForSwap === null ? "!bg-[#FFDF85] !cursor-not-allowed" : ""}`,
                        onClick: ()=>handleCreateRequest(),
                        disabled: showSwapScreen === 1 || selectedProductForSwap === null,
                        children: [
                            "Create request ",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const ServiceRequests_SwapProduct = (SwapProduct);
const SecondScreen = ({ data, setSelectedProductForSwap })=>{
    const city = (0,constant/* getLocalStorage */.$o)("cityId");
    const [searchModalOpen, setsearchModalOpen] = (0,react_.useState)(false);
    const [inputKey, setInputKey] = (0,react_.useState)("");
    const [productData, setProductData] = (0,react_.useState)(null);
    const searchApi = ()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.searchKey(inputKey, city)).then((res)=>setProductData(res?.data?.data?.products)).catch((err)=>console.log(err));
    };
    (0,react_.useEffect)(()=>{
        searchApi();
    }, [
        inputKey
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `${(style_module_default()).swap_second_screen} flex flex-col`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).selected_product_info_wrapper,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (style_module_default()).desc,
                                children: "Selected product:"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: `${(style_module_default()).desc} !text-222`,
                                children: data.product_name
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).swap_info,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                className: (style_module_default()).product_imge_thambnil,
                                src: `${constant/* productPageImagesBaseUrl */.p5 + "thumb/" + data.product_image?.split(",")[0]}`
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* IoIosSwap */.nWb, {
                                color: "#9A9AA2",
                                size: 22
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: (style_module_default()).swap_heading,
                children: "Select product to swap to"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).search_wrapper,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(bs_index_esm/* BsSearch */.dVI, {}),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                className: (style_module_default()).search_input,
                                type: "text",
                                placeholder: "Search for Furniture, Appliances, etc",
                                // onClick={() => setsearchModalOpen(true)}
                                onChange: (e)=>{
                                    setsearchModalOpen(true);
                                    setInputKey(e.target.value);
                                },
                                value: inputKey
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* DownArrowUnfilled */.wf, {})
                        ]
                    }),
                    searchModalOpen && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: `${(style_module_default()).search_modal}`,
                        children: productData?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex w-full gap-3 cursor-pointer items-center",
                                onClick: ()=>{
                                    setInputKey(item?.product_name);
                                    setSelectedProductForSwap(productData[index]);
                                    setsearchModalOpen(false);
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: `${constant/* productPageImagesBaseUrl */.p5 + "thumb/" + item?.image?.split(",")[0]}`,
                                        className: (style_module_default()).product_imge_thambnil,
                                        alt: item?.seourl
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: (style_module_default()).desc,
                                        children: item?.product_name
                                    })
                                ]
                            }, index.toString()))
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: ./src/hooks/cryptoUtils.js
var cryptoUtils = __webpack_require__(6833);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Checkbox/index.js
var Checkbox = __webpack_require__(63754);
var Checkbox_default = /*#__PURE__*/__webpack_require__.n(Checkbox);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/Repair.js










function Repair({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const [toggleStates, setToggleStates] = (0,react_.useState)(data.map(()=>({
            istoggled: false,
            selected: null,
            detail: null
        })));
    const repairOptions = [
        {
            value: "1",
            label: "Wrong items selected"
        },
        {
            value: "2",
            label: "Late delivery"
        },
        {
            value: "3",
            label: "Want to buy items"
        },
        {
            value: "4",
            label: "Items not required anymore"
        },
        {
            value: "5",
            label: "Other"
        }
    ];
    const handleChange = (selectedOption, index)=>{
        setToggleStates((prevStates)=>prevStates.map((state, i)=>i === index ? {
                    ...state,
                    selected: selectedOption
                } : state));
    };
    const handleDetailChange = (e, index)=>{
        setToggleStates((prevStates)=>prevStates.map((state, i)=>i === index ? {
                    ...state,
                    detail: e.target.value
                } : state));
    };
    const handleCreateRequest = ()=>{
        const selectedData = toggleStates.filter((state)=>state.istoggled && state.selected !== null).map((state, index)=>({
                product_name: data[index]?.product_name,
                repair_reason: `${data[index]?.product_name} : ${state.selected.label || "NA"}  `,
                repair_details: state.detail || " "
            }));
        const tempSelectedProductName = selectedData?.map((item)=>{
            return item.product_name;
        });
        const tempRepairReason = selectedData?.map((item)=>{
            return item.repair_reason;
        });
        const tempRepairDetails = selectedData?.map((item)=>{
            return item.repair_details;
        });
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            selected_product_name: tempSelectedProductName.join(", "),
            repair_reason: tempRepairReason.join(", "),
            repair_details: tempRepairDetails.join(", ")
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
        setToggleStates(data.map(()=>({
                istoggled: false,
                selected: null
            })));
    };
    const handleToggle = (index)=>{
        setToggleStates((prevStates)=>prevStates.map((state, i)=>i === index ? {
                    ...state,
                    istoggled: !state.istoggled,
                    selected: "NA"
                } : state));
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>prevScreen(true),
                        className: "cursor-pointer"
                    }),
                    "Repair"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).buy_info,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: (style_module_default()).desc,
                        children: "Select products to repair"
                    }),
                    data?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).repair_info,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex gap-2 items-center",
                                    children: [
                                        toggleStates[index].istoggled ? /*#__PURE__*/ jsx_runtime_.jsx(bs_index_esm/* BsToggleOn */.XGl, {
                                            color: "#5774AC",
                                            size: 28,
                                            onClick: ()=>handleToggle(index),
                                            className: "cursor-pointer"
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(icon/* ToggleOff */.HN, {
                                            size: 28,
                                            color: "#E3E1DC",
                                            onClick: ()=>handleToggle(index),
                                            className: "cursor-pointer"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).desc,
                                            children: item?.product_name
                                        })
                                    ]
                                }),
                                toggleStates[index].istoggled && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "mt-4 flex flex-col",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).desc,
                                                    children: "Reason for repair"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_select_esm/* default */.ZP, {
                                                    options: repairOptions,
                                                    styles: customStylesForSelect,
                                                    onChange: (selectedOption)=>handleChange(selectedOption, index),
                                                    placeholder: "Select a reason for repair"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "mt-4",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: (style_module_default()).desc,
                                                    children: "Repair details"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                    type: "text",
                                                    placeholder: "Enter repair details",
                                                    className: (style_module_default()).form_input_textarea,
                                                    onChange: (e)=>handleDetailChange(e, index)
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }, index.toString())),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (style_module_default()).bottom_row,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (style_module_default()).bottom_line
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                className: `${(style_module_default()).proceed_btn}  ${toggleStates.some((state)=>state.istoggled && state.selected) ? "" : "!bg-[#FFDF85] !cursor-not-allowed"}`,
                                disabled: !toggleStates.some((state)=>state.istoggled),
                                onClick: handleCreateRequest,
                                children: [
                                    "Create request ",
                                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const ServiceRequests_Repair = (Repair);

// EXTERNAL MODULE: ./node_modules/formik/dist/index.js
var dist = __webpack_require__(6135);
// EXTERNAL MODULE: ./node_modules/yup/index.js
var yup = __webpack_require__(58952);
// EXTERNAL MODULE: ./src/components/Cart/AddressSection/styles.module.css
var styles_module = __webpack_require__(52536);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./appConfig.js
var appConfig = __webpack_require__(30455);
// EXTERNAL MODULE: ./src/assets/common_icons/uploading.jpg
var uploading = __webpack_require__(20121);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(48421);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var fa_index_esm = __webpack_require__(16775);
// EXTERNAL MODULE: ./src/components/YourAddresses/Drawer/CityDrawer.js
var CityDrawer = __webpack_require__(27027);
// EXTERNAL MODULE: ./src/store/index.js
var store = __webpack_require__(80734);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/Relocation.js


















function Relocation({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const { cityList: storeCityList } = (0,store/* useAppSelector */.CG)((state)=>state.homePagedata);
    const [cityDrawerOpen, setCityDrawerOpen] = (0,react_.useState)(false);
    const doctsData = [
        {
            label: "PAN Number",
            value: "1"
        },
        {
            label: "Driving license",
            value: "2"
        },
        {
            label: "Voter ID",
            value: "3"
        }
    ];
    const validationSchema = yup/* object */.Ry({
        contactNumber: yup/* string */.Z_().test("no-spaces-special-characters", "Please enter a valid 10 digit phone number without spaces or special characters", (value)=>{
            return /^[0-9]*$/.test(value);
        }).min(10, "Oops! Looks like you missed some digits. Please enter complete 10 digit number.").max(10, "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.").required("Contact number is required"),
        address: yup/* string */.Z_().required("Address is required"),
        addressProof: yup/* string */.Z_().required("Address Proof is required"),
        currentAddressProof: yup/* string */.Z_().required("Please upload the address proof"),
        postalCode: yup/* string */.Z_().test("no-spaces-special-characters", "Please enter a valid 6 digit postal code without spaces or special characters", (value)=>{
            return /^[0-9]*$/.test(value);
        }).min(6, "Oops! Looks like you missed some digits. Please 6 digit postal code.").max(6, "Oops! It looks like you entered too many digits. Please enter valid 6 digit postal code.").required("Postal code is required"),
        city: yup/* string */.Z_().required("City is required")
    });
    const handleSubmit = (values)=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            mobile_number: values.contactNumber,
            postal_code: values.postalCode,
            city: values.city,
            address1: values.address,
            address2: values.landmark,
            // addressProof: "",
            file: values.currentAddressProof
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    const customStylesForSelect = {
        control: (baseStyles)=>({
                ...baseStyles,
                padding: "4px 8px",
                borderRadius: "12px",
                outline: "none",
                cursor: "pointer",
                ".css-1u9des2-indicatorSeparator": {
                    display: "none"
                },
                boxShadow: 0,
                "&:hover": {
                    border: "1px solid #71717A"
                },
                fontSize: "14px",
                color: "#71717A"
            }),
        option: (base, state)=>({
                ...base,
                backgroundColor: state.isSelected ? "#EFF5FF" : "#fff",
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#EFF5FF",
                    color: "#5774AC"
                },
                fonetSize: "14px",
                color: "#71717A"
            })
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>prevScreen(true),
                        className: "cursor-pointer"
                    }),
                    "Relocation"
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${(style_module_default()).buy_info} !h-full`,
                children: /*#__PURE__*/ jsx_runtime_.jsx(dist.Formik, {
                    initialValues: {
                        contactNumber: "",
                        city: "",
                        address: "",
                        landmark: "",
                        postalCode: "",
                        addressProof: "",
                        currentAddressProof: ""
                    },
                    validationSchema: validationSchema,
                    onSubmit: (values)=>{
                        handleSubmit(values);
                    },
                    children: (formik)=>/*#__PURE__*/ jsx_runtime_.jsx(dist.Form, {
                            className: (style_module_default()).form_wrapper,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "Alternative number"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: `${(style_module_default()).row} ${(styles_module_default()).form_input}`,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "flex gap-2 items-center",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                            src: `${appConfig/* cityUrl */.xB + "india-icon.svg"}`,
                                                            className: (styles_module_default()).flag,
                                                            loading: "lazy",
                                                            alt: "India-icon"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                            type: "number",
                                                            onKeyPress: constant/* keyPressForContactField */.CH,
                                                            // readOnly
                                                            name: "contactNumber",
                                                            placeholder: "Enter 10 digit number ",
                                                            className: (styles_module_default()).contact_input
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "contactNumber",
                                                children: (msg)=>formik.touched.contactNumber && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: (styles_module_default()).error,
                                                        children: [
                                                            msg,
                                                            " "
                                                        ]
                                                    })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "Address"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                as: "textarea",
                                                name: "address",
                                                placeholder: "Enter your address here including flat/building no.",
                                                className: (styles_module_default()).form_input
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "address",
                                                children: (msg)=>formik.touched.address && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).error,
                                                        children: msg
                                                    })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "Nearest Landmark (optional)"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                name: "landmark",
                                                placeholder: "Enter your nearest landmark (eg. school, office, park, etc) ",
                                                className: (styles_module_default()).form_input
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "Postal code"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                type: "number",
                                                onKeyPress: constant/* keyPressForContactField */.CH,
                                                name: "postalCode",
                                                placeholder: "Enter 6 digit postal code",
                                                className: (styles_module_default()).form_input
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "postalCode",
                                                children: (msg)=>formik.touched.postalCode && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: (styles_module_default()).error,
                                                        children: [
                                                            msg,
                                                            " "
                                                        ]
                                                    })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4",
                                        onClick: ()=>setCityDrawerOpen(!cityDrawerOpen),
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "City"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                type: "text",
                                                name: "city",
                                                placeholder: "Enter your city",
                                                className: (styles_module_default()).form_input,
                                                value: formik.values.city
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "city",
                                                children: (msg)=>formik.touched.city && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: (styles_module_default()).error,
                                                        children: [
                                                            msg,
                                                            " "
                                                        ]
                                                    })
                                            })
                                        ]
                                    }),
                                    cityDrawerOpen && /*#__PURE__*/ jsx_runtime_.jsx(CityDrawer/* default */.Z, {
                                        toggleDrawer: ()=>setCityDrawerOpen(!cityDrawerOpen),
                                        Cities: storeCityList,
                                        open: cityDrawerOpen,
                                        cityName: formik.values.city,
                                        handleCityChange: (val)=>{
                                            formik.setFieldValue("city", val);
                                            setCityDrawerOpen(!cityDrawerOpen);
                                        }
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mt-4 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (styles_module_default()).form_label,
                                                children: "Current address proof"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_select_esm/* default */.ZP, {
                                                name: "addressProof",
                                                options: doctsData,
                                                styles: customStylesForSelect,
                                                onChange: (selectedOption)=>{
                                                    formik.setFieldValue("addressProof", selectedOption.label);
                                                },
                                                placeholder: "Select any current address proof"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "addressProof",
                                                children: (msg)=>formik.touched.addressProof && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).error,
                                                        children: msg
                                                    })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: `mt-4 flex mb-16 ${(style_module_default()).demo} ${!formik.values.currentAddressProof ? "flex-col" : "flex-row"}`,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "file",
                                                id: "currentAddProof",
                                                name: "currentAddressProof",
                                                placeholder: "choose file",
                                                className: `hidden`,
                                                onChange: (e)=>formik.setFieldValue("currentAddressProof", e.target.files[0])
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                htmlFor: "currentAddProof",
                                                className: `${(styles_module_default()).form_input} flex items-center !h-full cursor-pointer ${formik.values.currentAddressProof && "!max-w-[95%] !w-fit"} `,
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: `flex w-full flex-col `,
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    src: uploading/* default */.Z,
                                                                    alt: "Uploading Icon",
                                                                    className: `h-full`
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: "text-14 font-Poppins text-71717A pl-2",
                                                                    children: formik.values.currentAddressProof ? formik.values.currentAddressProof.name : "Choose file"
                                                                })
                                                            ]
                                                        }),
                                                        formik.values.currentAddressProof && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: `${(style_module_default()).running_line} bottom-[3px]`
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                children: formik.values.currentAddressProof && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "flex items-center mt-8 ml-2",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(fa_index_esm/* FaCheckCircle */.FJM, {
                                                            color: "#2D9469",
                                                            className: (style_module_default()).showCheckCircle
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* IoIosCloseCircle */.FMH, {
                                                            color: "#D96060",
                                                            size: 20,
                                                            className: (style_module_default()).showDeleteIcon
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                name: "currentAddressProof",
                                                children: (msg)=>formik.touched.currentAddressProof && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: (styles_module_default()).error,
                                                        children: [
                                                            msg,
                                                            " "
                                                        ]
                                                    })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (style_module_default()).bottom_row,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: (style_module_default()).bottom_line
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                type: "submit",
                                                className: `${(style_module_default()).proceed_btn} bg-none ${!formik.isValid ? "!bg-[#FFDF85] !cursor-not-allowed" : `!bg-F6B704`}`,
                                                onClick: ()=>{
                                                    if (!formik.isValid) {
                                                        console.log("errors", formik.errors);
                                                    }
                                                },
                                                children: [
                                                    "Create request ",
                                                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                })
            })
        ]
    });
}
/* harmony default export */ const ServiceRequests_Relocation = (Relocation);

// EXTERNAL MODULE: ./src/components/Cart/Drawer/SaveAddressesDrawer/index.js
var SaveAddressesDrawer = __webpack_require__(4094);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/TransferOwnership.js


















function TransferOwnership({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const userId = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    const tempUserId = (0,cryptoUtils/* decryptBase64 */.qW)((0,constant/* getLocalStorage */.$o)("tempUserID"));
    const userIdToUse = userId || tempUserId;
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const cartPageData = (0,lib.useSelector)((state)=>state.cartPageData);
    const addressArray = cartPageData.savedAddresses;
    const cityName = (0,lib.useSelector)((state)=>state.homePagedata.cityName);
    const { cityList: storeCityList } = (0,store/* useAppSelector */.CG)((state)=>state.homePagedata);
    const validationSchema = yup/* object */.Ry({
        fullName: yup/* string */.Z_().required("Full name is required").min(2, "Name should be of atleast 2 characters long"),
        contactNumber: yup/* string */.Z_().test("no-spaces-special-characters", "Please enter a valid 10 digit phone number without spaces or special characters", (value)=>{
            return /^[0-9]*$/.test(value);
        }).min(10, "Oops! Looks like you missed some digits. Please enter complete 10 digit number.").max(10, "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.").required("Contact number is required"),
        email: yup/* string */.Z_().email().required("Please enter a valid email address."),
        landmark: yup/* string */.Z_(),
        address: yup/* string */.Z_().required("Address is required"),
        postalCode: yup/* string */.Z_().test("no-spaces-special-characters", "Please enter a valid 6 digit postal code without spaces or special characters", (value)=>{
            return /^[0-9]*$/.test(value);
        }).min(6, "Oops! Looks like you missed some digits. Please 6 digit postal code.").max(6, "Oops! It looks like you entered too many digits. Please enter valid 6 digit postal code.").required("Postal code is required"),
        city: yup/* string */.Z_().required("City is required")
    });
    const [addressDrawer, setAddressDrawer] = (0,react_.useState)(false);
    const [primaryAddress, setPrimaryAddress] = (0,react_.useState)();
    const [showAddressFields, setShowAddressFields] = (0,react_.useState)(false);
    const [id, setId] = (0,react_.useState)(primaryAddress?.id);
    const [cityDrawerOpen, setCityDrawerOpen] = (0,react_.useState)(false);
    const [description, setDescription] = (0,react_.useState)("");
    const makeDefaultAddress = (id)=>{
        const newPrimaryAddress = addressArray.find((item)=>item.id === id);
        setPrimaryAddress(newPrimaryAddress);
        toggleDrawer();
    };
    const getAllSavedAddresses = ()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.addToCart.fetchSavedAddress(userIdToUse)).then((res)=>{
            dispatch((0,Slices/* getSavedAddress */.Lt)(res?.data?.data));
            const newPrimaryAddress = res?.data?.data.find((item)=>item.city === cityName);
            setPrimaryAddress(newPrimaryAddress);
            setAddressDrawer(!addressDrawer);
        }).catch((err)=>console.log(err, "err"));
    };
    const toggleDrawer = ()=>{
        setAddressDrawer(!addressDrawer);
    };
    const handleSubmit = async (values)=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            description,
            full_name: values.fullName,
            mobile_number: values.contactNumber,
            email: values.email,
            postal_code: values.postalCode,
            city: values.city,
            address1: values.address,
            address2: values.landmark,
            state: primaryAddress ? primaryAddress.state : ""
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `${(style_module_default()).content_wrapper} flex-row`,
        children: addressDrawer ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            className: "cursor-pointer",
                            onClick: ()=>{
                                setAddressDrawer(!addressDrawer);
                            }
                        }),
                        "Saved addresses"
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(SaveAddressesDrawer/* AddressDrawerContent */.A, {
                    makeDefaultAddress: (id)=>makeDefaultAddress(id),
                    primaryAddress: primaryAddress,
                    setId: setId
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (style_module_default()).bottom_row,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: (style_module_default()).plain_btn,
                        onClick: async ()=>{
                            try {
                                makeDefaultAddress(id);
                                //   toggleDrawer();
                                setShowAddressFields(true);
                            } catch (error) {
                                console.error(error);
                            }
                        },
                        children: [
                            "Proceed ",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
                        ]
                    })
                })
            ]
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            className: "cursor-pointer",
                            onClick: ()=>prevScreen(true)
                        }),
                        "Transfer ownership"
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).transferownership_wrapper,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).desc,
                            children: "New owner contact details"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(dist.Formik, {
                            initialValues: {
                                fullName: primaryAddress && primaryAddress.full_name,
                                contactNumber: primaryAddress && primaryAddress.phone,
                                email: "",
                                message: "",
                                address: primaryAddress ? primaryAddress.address1 : addressArray[0]?.address1,
                                landmark: primaryAddress ? primaryAddress.address2 : addressArray[0]?.address2,
                                postalCode: primaryAddress ? primaryAddress.postal_code : addressArray[0]?.postal_code,
                                city: primaryAddress ? primaryAddress.city : addressArray[0]?.city
                            },
                            validationSchema: validationSchema,
                            onSubmit: async (values)=>{
                                await handleSubmit(values);
                            },
                            children: (formik)=>/*#__PURE__*/ jsx_runtime_.jsx(dist.Form, {
                                    className: (style_module_default()).form_wrapper,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).form_label,
                                                        children: "Full name"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                        type: "text",
                                                        name: "fullName",
                                                        placeholder: "Enter your name",
                                                        className: (style_module_default()).form_input_textarea
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                        name: "fullName",
                                                        children: (msg)=>formik.touched.fullName && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).error,
                                                                children: [
                                                                    msg,
                                                                    " "
                                                                ]
                                                            })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).form_label,
                                                        children: "Contact number"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: `${(style_module_default()).row} ${(styles_module_default()).form_input}`,
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "flex gap-2 items-center",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                    src: `${appConfig/* cityUrl */.xB + "india-icon.svg"}`,
                                                                    className: (styles_module_default()).flag,
                                                                    loading: "lazy",
                                                                    alt: "India-icon"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                                    type: "number",
                                                                    onKeyPress: constant/* keyPressForContactField */.CH,
                                                                    // readOnly
                                                                    name: "contactNumber",
                                                                    placeholder: "Enter 10 digit number ",
                                                                    className: (styles_module_default()).contact_input
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                        name: "contactNumber",
                                                        children: (msg)=>formik.touched.contactNumber && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).error,
                                                                children: [
                                                                    msg,
                                                                    " "
                                                                ]
                                                            })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).form_label,
                                                        children: "Email"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                        type: "email",
                                                        name: "email",
                                                        placeholder: "Enter your email",
                                                        className: (styles_module_default()).form_input
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                        name: "email",
                                                        children: (msg)=>formik.touched.email && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                className: (styles_module_default()).error,
                                                                children: [
                                                                    msg,
                                                                    " "
                                                                ]
                                                            })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: (styles_module_default()).form_label,
                                                        children: "Your comment (optional)"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "text",
                                                        placeholder: "Please share any specific instructions or provide feedback.",
                                                        className: (style_module_default()).form_input_textarea,
                                                        onChange: (e)=>setDescription(e.target.value)
                                                    })
                                                ]
                                            }),
                                            showAddressFields && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-4",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                className: (styles_module_default()).form_label,
                                                                children: "Address"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                                as: "textarea",
                                                                name: "address",
                                                                placeholder: "Enter your address here including flat/building no.",
                                                                className: (styles_module_default()).form_input
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                                name: "address",
                                                                children: (msg)=>formik.touched.address && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                        className: (styles_module_default()).error,
                                                                        children: msg
                                                                    })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-4",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                className: (styles_module_default()).form_label,
                                                                children: "Nearest Landmark (optional)"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                                name: "landmark",
                                                                placeholder: "Enter your nearest landmark (eg. school, office, park, etc) ",
                                                                className: (styles_module_default()).form_input
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-4",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                className: (styles_module_default()).form_label,
                                                                children: "Postal code"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                                type: "number",
                                                                onKeyPress: constant/* keyPressForContactField */.CH,
                                                                name: "postalCode",
                                                                placeholder: "Enter 6 digit postal code",
                                                                className: (styles_module_default()).form_input
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                                name: "postalCode",
                                                                children: (msg)=>formik.touched.postalCode && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        className: (styles_module_default()).error,
                                                                        children: [
                                                                            msg,
                                                                            " "
                                                                        ]
                                                                    })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-4",
                                                        onClick: ()=>setCityDrawerOpen(!cityDrawerOpen),
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                className: (styles_module_default()).form_label,
                                                                children: "City"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.Field, {
                                                                readOnly: true,
                                                                type: "text",
                                                                name: "city",
                                                                value: formik.values.city,
                                                                placeholder: "Enter city",
                                                                className: (styles_module_default()).form_input
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(dist.ErrorMessage, {
                                                                name: "city",
                                                                children: (msg)=>formik.touched.city && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        className: (styles_module_default()).error,
                                                                        children: [
                                                                            msg,
                                                                            " "
                                                                        ]
                                                                    })
                                                            })
                                                        ]
                                                    }),
                                                    cityDrawerOpen && /*#__PURE__*/ jsx_runtime_.jsx(CityDrawer/* default */.Z, {
                                                        toggleDrawer: ()=>setCityDrawerOpen(!cityDrawerOpen),
                                                        Cities: storeCityList,
                                                        open: cityDrawerOpen,
                                                        cityName: formik.values.city,
                                                        handleCityChange: (val)=>{
                                                            formik.setFieldValue("city", val);
                                                            setCityDrawerOpen(!cityDrawerOpen);
                                                        }
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "mt-4 mb-8 text-5774AC text-16 font-medium font-Poppins cursor-pointer",
                                                        onClick: ()=>{
                                                            setAddressDrawer(!addressDrawer);
                                                        },
                                                        children: "Want to select a different address?"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (style_module_default()).bottom_row,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: (style_module_default()).bottom_line
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                        className: `${(style_module_default()).transfer_create_btn}
                        ${!formik.isValid ? "!bg-[#FFDF85] !cursor-not-allowed" : `!bg-F6B704`}
                        `,
                                                        type: "submit",
                                                        // disabled={!formik.isValid }
                                                        onClick: (values)=>{
                                                            if (!formik.isValid) {
                                                                console.log(formik.errors);
                                                            }
                                                        },
                                                        children: [
                                                            "Create request ",
                                                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                        }),
                        !showAddressFields && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: (style_module_default()).main_sub_heading,
                                    children: "Address"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: ` ${(style_module_default()).request_info_div} border-b `,
                                    onClick: ()=>{
                                        getAllSavedAddresses();
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex gap-2 items-center",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).request_type,
                                                children: "Select from saved address"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: ` ${(style_module_default()).request_info_div}`,
                                    onClick: ()=>setShowAddressFields(true),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex gap-2 items-center",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: (style_module_default()).request_type,
                                                children: "Select Add new saved address"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
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
/* harmony default export */ const ServiceRequests_TransferOwnership = (TransferOwnership);

;// CONCATENATED MODULE: ./src/components/ServiceRequests/PickupReasonCommonScreen.js












function PickupReasonCommonScreen({ reason, subTitle, setCurrentScreen, selectedProducts, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const [description, setDescription] = (0,react_.useState)("");
    const [showScreenName, setShowScreenName] = (0,react_.useState)(null);
    const handleCreateRequest = ()=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            selected_product_name: selectedProducts.join(", "),
            type: selectedType,
            pickup_reason: reason.title,
            description
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: showScreenName === reason.btnName ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                showScreenName === "Repair product(s)" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Repair, {
                    prevScreen: setShowScreenName,
                    data: data
                }),
                showScreenName === "Ownership transfer" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_TransferOwnership, {
                    prevScreen: setShowScreenName,
                    data: data
                }),
                showScreenName === "Relocation" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Relocation, {
                    prevScreen: setShowScreenName,
                    data: data
                }),
                showScreenName === "Swap product(s)" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_SwapProduct, {
                    prevScreen: setShowScreenName,
                    data: data
                }),
                showScreenName === "Buy product(s)" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Buy, {
                    prevScreen: setShowScreenName,
                    data: data,
                    heading: "Buy"
                })
            ]
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (style_module_default()).content_wrapper,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            onClick: ()=>setCurrentScreen(1),
                            className: "cursor-pointer"
                        }),
                        reason.title
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex flex-col w-full my-8",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: (style_module_default()).desc,
                        children: subTitle
                    })
                }),
                (reason.title === "Other" || reason.title === "Requirement Fulfilled") && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).desc,
                            children: "Your comment (optional)"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            placeholder: "Please share any specific instructions or provide feedback.",
                            className: (style_module_default()).form_input_textarea,
                            onChange: (e)=>setDescription(e.target.value)
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: `${(style_module_default()).proceed_btn} ${reason.title !== "Other" && reason.title !== "Requirement Fulfilled" ? "!mt-0" : ""}`,
                    onClick: ()=>{
                        if (reason.btnName === "Create request") {
                            handleCreateRequest();
                        } else {
                            setShowScreenName(reason.btnName);
                        }
                    },
                    children: [
                        reason.btnName,
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                    ]
                }),
                reason.title !== "Other" && reason.title !== "Requirement Fulfilled" ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: `${(style_module_default()).plain_btn} !mt-0 justify-center`,
                        onClick: handleCreateRequest,
                        children: [
                            "No, let me proceed with pickup ",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                        ]
                    })
                }) : null
            ]
        })
    });
}
/* harmony default export */ const ServiceRequests_PickupReasonCommonScreen = (PickupReasonCommonScreen);

;// CONCATENATED MODULE: ./src/components/ServiceRequests/PickupReasonOptions.js





function PickupReasonOptions({ setScreen, selectedProducts, data }) {
    const [selectedPickupReason, setSelectedPickupReason] = (0,react_.useState)(null);
    const [showCommonPickupScreen, setShowCommonPickupScreen] = (0,react_.useState)(false);
    const [currentScreen, setCurrentScreen] = (0,react_.useState)(1);
    const PickupReasons = [
        {
            title: "Faced problems in service",
            btnName: "Repair product(s)"
        },
        {
            title: "Faced problems in products",
            btnName: "Repair product(s)"
        },
        {
            title: "Moving out of country",
            btnName: "Ownership transfer"
        },
        {
            title: "Moving to other city",
            btnName: "Relocation"
        },
        {
            title: "Want to purchase things now",
            btnName: "Buy product(s)"
        },
        {
            title: "Moving to fully furnished property",
            btnName: "Buy product(s)"
        },
        {
            title: "Did not like the products",
            btnName: "Swap product(s)"
        },
        {
            title: "Requirement Fulfilled",
            btnName: "Create request"
        },
        {
            title: "Other",
            btnName: "Create request"
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: showCommonPickupScreen && currentScreen === 2 ? /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_PickupReasonCommonScreen, {
            reason: selectedPickupReason,
            subTitle: "We are sorry to hear that. This is what we can offer.",
            setCurrentScreen: setCurrentScreen,
            selectedProducts: selectedProducts,
            data: data
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (style_module_default()).content_wrapper,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            onClick: ()=>setScreen(1),
                            className: "cursor-pointer"
                        }),
                        "Pickup reason"
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: ` my-6 flex w-full flex-col mt-4`,
                    children: PickupReasons?.map((item, index)=>{
                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: ` ${index !== PickupReasons.length - 1 ? " border-b border-EDEDEE" : "border-0"} ${(style_module_default()).request_info_div}`,
                            onClick: ()=>{
                                setSelectedPickupReason(item);
                                setShowCommonPickupScreen(true);
                                setCurrentScreen(2);
                            },
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "flex gap-2 items-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: (style_module_default()).request_type,
                                        children: item.title
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "flex",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
                                })
                            ]
                        }, index.toString());
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const ServiceRequests_PickupReasonOptions = (PickupReasonOptions);

;// CONCATENATED MODULE: ./src/components/ServiceRequests/Buy.js









function Buy({ heading, prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const label = {
        inputProps: {
            "aria-label": "Checkbox demo"
        }
    };
    // const [selected, setSelected] = useState(false);
    const [showPickupReason, setShowPickupReason] = (0,react_.useState)(false);
    const [Screen, setScreen] = (0,react_.useState)(1);
    const [description, setDescription] = (0,react_.useState)("");
    const [selectedProducts, setSelectedProducts] = (0,react_.useState)([]);
    const handleChangeCheckbox = (index, e)=>{
        const productName = e.target.value;
        setSelectedProducts((prevSelected)=>{
            if (prevSelected.includes(productName)) {
                return prevSelected.filter((name)=>name !== productName);
            } else {
                return [
                    ...prevSelected,
                    productName
                ];
            }
        });
    };
    const handleCreateRequest = ()=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            selected_product_name: selectedProducts.join(", "),
            description
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: showPickupReason && Screen === 2 ? /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_PickupReasonOptions, {
            setScreen: setScreen,
            selectedProducts: selectedProducts,
            data: data
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (style_module_default()).content_wrapper,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            onClick: ()=>{
                                prevScreen(true);
                            },
                            className: "cursor-pointer"
                        }),
                        heading
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).buy_info,
                    children: [
                        heading === "Buy" && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).desc,
                            children: "We are glad that you liked our products and considering to buy them."
                        }),
                        heading === "Request order pickup" ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: `${(style_module_default()).desc}`,
                            children: "Select products for pickup"
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: `${(style_module_default()).desc} ${heading === "Buy" && "mt-8"}`,
                            children: [
                                "Select products to ",
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "lowercase",
                                    children: heading
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "product_to_buy_wrapper",
                            children: data?.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "buy_checkbox_info",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((Checkbox_default()), {
                                            ...label,
                                            onChange: (e)=>handleChangeCheckbox(index, e),
                                            checked: selectedProducts.includes(item.product_name),
                                            value: item.product_name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            className: (style_module_default()).product_imge_thambnil,
                                            src: `${constant/* productPageImagesBaseUrl */.p5 + "thumb/" + item?.product_image?.split(",")[0]}`,
                                            alt: item?.product_name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).desc,
                                            children: item?.product_name
                                        })
                                    ]
                                }, index.toString()))
                        }),
                        heading !== "Request order pickup" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "mt-8",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).desc,
                                            children: "Your comment (optional)"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "text",
                                            placeholder: "Please share any specific instructions or provide feedback.",
                                            className: (style_module_default()).form_input_textarea,
                                            onChange: (e)=>setDescription(e.target.value)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (style_module_default()).bottom_row,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: (style_module_default()).bottom_line
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                            className: `${(style_module_default()).proceed_btn} ${selectedProducts.length === 0 ? "!bg-[#FFDF85] !cursor-not-allowed" : ``}`,
                                            onClick: ()=>handleCreateRequest(),
                                            children: [
                                                "Create request ",
                                                /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).bottom_row,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (style_module_default()).bottom_line
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                    className: `${(style_module_default()).proceed_btn} ${selectedProducts.length === 0 ? "!bg-[#FFDF85] !cursor-not-allowed" : ``}`,
                                    onClick: ()=>{
                                        setShowPickupReason(true);
                                        setScreen(2);
                                    },
                                    children: [
                                        "Proceed ",
                                        /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
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
/* harmony default export */ const ServiceRequests_Buy = (Buy);

// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
;// CONCATENATED MODULE: ./src/components/ServiceRequests/ExtendTenure.js





function ExtendTenure({ prevScreen }) {
    const [count, setCount] = (0,react_.useState)(5);
    const router = (0,navigation.useRouter)();
    (0,react_.useEffect)(()=>{
        for(let i = 0; i <= 4; i++){
            if (count > 1) {
                setTimeout(()=>{
                    setCount(count - 1);
                }, 1000);
            } else {
                router.push("/upfront_tenure_extension/43093421");
            }
        }
    }, [
        count
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>prevScreen(true),
                        className: "cursor-pointer"
                    }),
                    "Extend tenure"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).buy_info,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: (style_module_default()).desc,
                        children: ` Ready to extend your tenure? You'll be redirected to our Tenure
          Extension page. See you there!`
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: (style_module_default()).main_sub_heading,
                        children: [
                            "Redirecting you to Tenure Extension page in ",
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                children: count
                            }),
                            " ",
                            "seconds."
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const ServiceRequests_ExtendTenure = (ExtendTenure);

;// CONCATENATED MODULE: ./src/components/ServiceRequests/ChangeBillCycle.js








function ChangeBillCycle({ prevScreen, data }) {
    const dispatch = (0,lib.useDispatch)();
    const selectedType = (0,lib.useSelector)((state)=>state.homePagedata.serviceRequestType);
    const [istoggled, setIstoggled] = (0,react_.useState)(true);
    const [description, setDescription] = (0,react_.useState)("");
    const handleCreateRequest = ()=>{
        const payload = {
            ...constant/* CreateRequestPayload */.yZ,
            deal_id: data[0]?.dealCodeNumber,
            type: selectedType,
            description
        };
        (0,constant/* CreateRequest */.Fo)(payload);
        dispatch((0,Slices/* setServiceRequestDrawer */.Hc)(false));
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).content_wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).main_heading,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                        onClick: ()=>prevScreen(true),
                        className: "cursor-pointer"
                    }),
                    "Change bill cycle"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (style_module_default()).buy_info,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "border border-DDDDDF p-4 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex gap-2 items-center",
                                children: [
                                    istoggled ? /*#__PURE__*/ jsx_runtime_.jsx(bs_index_esm/* BsToggleOn */.XGl, {
                                        color: "#5774AC",
                                        size: 28,
                                        onClick: ()=>setIstoggled(!istoggled),
                                        className: "cursor-pointer"
                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(icon/* ToggleOff */.HN, {
                                        size: 28,
                                        color: "#E3E1DC",
                                        onClick: ()=>{
                                            setIstoggled(!istoggled);
                                        },
                                        className: "cursor-pointer"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: (style_module_default()).desc,
                                        children: "Align Bill Cycle to 1st day of Month"
                                    })
                                ]
                            }),
                            !istoggled && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: (style_module_default()).desc,
                                        children: "Suggest your preferred start date"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "date",
                                        placeholder: "Enter a number",
                                        className: (style_module_default()).form_input_textarea
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mt-8",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: (style_module_default()).desc,
                                children: "Your comment (optional)"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "text",
                                placeholder: "Please share any specific instructions or provide feedback.",
                                className: (style_module_default()).form_input_textarea,
                                onChange: (e)=>setDescription(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: `${(style_module_default()).proceed_btn} !w-fit `,
                        // ${!istoggled ? "!bg-[#FFDF85] !cursor-not-allowed" : ``} `
                        onClick: handleCreateRequest,
                        children: [
                            "Create request ",
                            /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrowWithLine */.tm, {})
                        ]
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const ServiceRequests_ChangeBillCycle = (ChangeBillCycle);

;// CONCATENATED MODULE: ./src/components/ServiceRequests/ServiceRequestType.js



















function ServiceRequestType({ orderId, isHelpDrawer, title, setShowNextComponent, invoiceUrl }) {
    const dispatch = (0,lib.useDispatch)();
    const userId = (0,cryptoUtils/* decrypt */.pe)((0,constant/* getLocalStorage */.$o)("_ga"));
    const [servicesType, setServicesType] = (0,react_.useState)();
    const [selectedType, setSelectedType] = (0,react_.useState)(null);
    const [currentScreen, setCurrentScreen] = (0,react_.useState)(true);
    const [productDetail, setProductDetail] = (0,react_.useState)(null);
    const getServicesType = ()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.myOrdersPage.getServiceRequest(orderId)).then((res)=>{
            setServicesType(res?.data?.data);
        }).catch((err)=>console.log(err));
    };
    const getProductLists = ()=>{
        axios/* default */.Z.get(network_axios/* baseURL */.v2 + endPoints/* endPoints */.z.serviceRequestPage.getProductLists(orderId, userId)).then((res)=>{
            setProductDetail(res?.data?.data);
        }).catch((err)=>console.log(err));
    };
    (0,react_.useEffect)(()=>{
        getServicesType();
        getProductLists();
    }, []);
    (0,react_.useEffect)(()=>{
        dispatch((0,Slices/* setServiceRequestType */.NI)(selectedType));
    }, [
        selectedType
    ]);
    const handleDownload = ()=>{
        const anchor = document.createElement("a");
        anchor.href = invoiceUrl;
        anchor.download = "invoice.pdf"; // Set the desired file name
        document.body.appendChild(anchor);
        // Trigger a click event on the anchor element to initiate the download
        anchor.click();
        // Remove the anchor element from the DOM
        document.body.removeChild(anchor);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: currentScreen ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (style_module_default()).content_wrapper,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).main_heading,
                    children: [
                        !isHelpDrawer && /*#__PURE__*/ jsx_runtime_.jsx(icon/* BackIcon */.xC, {
                            className: "cursor-pointer",
                            onClick: ()=>setShowNextComponent(false)
                        }),
                        title
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: ` my-6 flex w-full flex-col mt-4`,
                    children: servicesType?.map((item, index)=>{
                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: ` ${index !== servicesType.length - 1 ? " border-b border-EDEDEE" : "border-0"} ${(style_module_default()).request_info_div}`,
                            onClick: ()=>{
                                setSelectedType(item.key);
                                setCurrentScreen(false);
                            },
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex gap-2 items-center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            className: (style_module_default()).request_type_icon,
                                            src: item.image,
                                            alt: "icon"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: (style_module_default()).request_type,
                                            children: item.optionValue
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "flex",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icon/* ForwardArrow */.Xs, {})
                                })
                            ]
                        }, index.toString());
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).divider_row,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).doted_line
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).or_text,
                            children: "OR"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (style_module_default()).doted_line
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: `${(style_module_default()).request_type} mt-7`,
                    children: "Chat with us"
                }),
                isHelpDrawer && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: (style_module_default()).additional_content,
                            children: "Additionally"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: ()=>handleDownload(),
                            className: (style_module_default()).download_btn,
                            children: "Download invoice"
                        })
                    ]
                })
            ]
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                selectedType === "cancellation" && /*#__PURE__*/ jsx_runtime_.jsx(CancelOrder, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "upgrade" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_SwapProduct, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "ownership" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_TransferOwnership, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "buy" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Buy, {
                    prevScreen: setCurrentScreen,
                    data: productDetail,
                    heading: "Buy"
                }),
                selectedType === "installation" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Buy, {
                    prevScreen: setCurrentScreen,
                    data: productDetail,
                    heading: "Installation"
                }),
                selectedType === "repair" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Repair, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "full_extension" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_ExtendTenure, {
                    prevScreen: setCurrentScreen
                }),
                selectedType === "change_bill_cycle" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_ChangeBillCycle, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "relocation" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Relocation, {
                    prevScreen: setCurrentScreen,
                    data: productDetail
                }),
                selectedType === "request_pickup" && /*#__PURE__*/ jsx_runtime_.jsx(ServiceRequests_Buy, {
                    prevScreen: setCurrentScreen,
                    data: productDetail,
                    heading: "Request order pickup"
                })
            ]
        })
    });
}
/* harmony default export */ const ServiceRequests_ServiceRequestType = (ServiceRequestType);


/***/ }),

/***/ 83870:
/***/ ((module) => {

// Exports
module.exports = {
	"main_container": "style_main_container__1nkPn",
	"web": "style_web__5FIGq",
	"mobile": "style_mobile__xI9Hm",
	"doc_side_bar": "style_doc_side_bar__Ew1Tc",
	"mobile_close_icon": "style_mobile_close_icon__n_86X",
	"detail_div": "style_detail_div__4rcRM",
	"header": "style_header__FnbPR",
	"desc": "style_desc__k4jTg",
	"createRequestBtn": "style_createRequestBtn__w5xUP",
	"des_wrapper": "style_des_wrapper__jWggx",
	"rightDrawer": "style_rightDrawer___wE_I",
	"content_wrapper": "style_content_wrapper__xEbsW",
	"main_heading": "style_main_heading__iqWZ6",
	"sub_heading": "style_sub_heading__fW_6x",
	"info_wrapper": "style_info_wrapper__yYvDk",
	"order_row": "style_order_row__6ZZLK",
	"radio_button": "style_radio_button__w0Mo4",
	"bottom_row": "style_bottom_row__ohVCo",
	"bottom_line": "style_bottom_line__k1fq5",
	"proceed_btn": "style_proceed_btn__s8AWE",
	"product_img": "style_product_img__24vQN",
	"request_type": "style_request_type__675ex",
	"divider_row": "style_divider_row__fEo06",
	"doted_line": "style_doted_line__de04O",
	"or_text": "style_or_text__rrjFY",
	"request_info_div": "style_request_info_div__IVXmm",
	"form_input_textarea": "style_form_input_textarea__GHcLg",
	"form_label": "style_form_label__32wAs",
	"cancellation_info": "style_cancellation_info__u1OTM",
	"buy_info": "style_buy_info__7T_BT",
	"product_to_buy_wrapper": "style_product_to_buy_wrapper__R9h96",
	"product_imge_thambnil": "style_product_imge_thambnil__7jGGT",
	"repair_info": "style_repair_info__D8ZGf",
	"selected_product_info_wrapper": "style_selected_product_info_wrapper__kjk_u",
	"swap_info": "style_swap_info__23ram",
	"swap_heading": "style_swap_heading__XW0mG",
	"search_wrapper": "style_search_wrapper__SC5iF",
	"search_input": "style_search_input__DJuxH",
	"search_modal": "style_search_modal___enUl",
	"swap_second_screen": "style_swap_second_screen__kM0eP",
	"transferownership_wrapper": "style_transferownership_wrapper__FULGC",
	"main_sub_heading": "style_main_sub_heading__RLSro",
	"additional_content": "style_additional_content__rVnZ9",
	"download_btn": "style_download_btn__W0Wb5",
	"plain_btn": "style_plain_btn__NYUkr",
	"counter_box": "style_counter_box__1tOsW",
	"images_wraper": "style_images_wraper__RHgUH",
	"running_line": "style_running_line__h_tge",
	"animate": "style_animate__WufSS",
	"showCheckCircle": "style_showCheckCircle__GSgWA",
	"showDeleteIcon": "style_showDeleteIcon__g250G",
	"demo": "style_demo__46trO",
	"transfer_create_btn": "style_transfer_create_btn__yI7RL"
};


/***/ }),

/***/ 20121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/uploading.a28f7852.jpg","height":26,"width":25,"blurDataURL":"data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAdEAACAQQDAAAAAAAAAAAAAAAAARECAwUxEyFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKQ6Mysk7yT4nuiem591AAA//9k=","blurWidth":8,"blurHeight":8});

/***/ })

};
;