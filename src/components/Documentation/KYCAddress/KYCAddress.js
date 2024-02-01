import React, {useState, useEffect} from "react";
import styles from "./KYCAddress.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import uploading from "@/assets/common_icons/uploading.jpg";
import {cityUrl} from "../../../../appConfig";
import DropDown from "../DropDown/DropDown";
// import {Modal, createTheme, useMediaQuery} from "@mui/material";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
// import SelectionCircle from "../SelectionCircle/SelectionCircle";
import {
  CheckFillIcon,
  CloseCircleIcon,
  // CheckCircleIcon,
  // Close,
  DeleteIcon,
  ExclamationCircleFill,
  OutlineArrowRight,
  // ReloadIcon,
} from "@/assets/icon";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useSelector} from "react-redux";
import CommonField from "../CommonField/CommonField";
import TermsAndConditionsDrawer from "../TermsAndConditionsDrawer";

const KYCAddress = ({handleKycState, step}) => {
  const selectedOrderId = useSelector(state => state.kycPage.orderId);

  const [currAddModal, setCurrAddModal] = useState(false);
  const [perAddModal, setPerAddModal] = useState(false);
  const [docsData, setDocsData] = useState();
  const [orderId] = useState(selectedOrderId);
  const [selectedOptionCur, setSelectedOptionCur] = useState({});
  const [selectedOptionPer, setSelectedOptionPer] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    contactNumber: "",
    addressProof: [], // You can add more fields as needed
    addressProofType: "",
    currentAddressProof: [],
    currentAddressProofType: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    contactNumber: "",
    addressProof: "",
    addressProofType: "",
    currentAddressProof: "",
    currentAddressProofType: "",
    termsAccepted: "",
  });
  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       md: 768, // Set the 'md' breakpoint to 768 pixels
  //     },
  //   },
  // });
  // const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const getAddProofList = () => {
    baseInstance
      .get(baseURL + endPoints.addressProofList)
      .then(res => {
        setDocsData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const handleFileInputChange = e => {
    const file = e.target.files;
    const temp =
      e.target.name === "addressProof"
        ? [...formData.addressProof]
        : [...formData.currentAddressProof];

    const fileArray = Object.keys(file).map(key => {
      return file[key];
    });
    const newArr = temp.concat(fileArray);
    if (e.target.name === "addressProof") {
      if (file) {
        setFormData(prev => {
          return {...prev, addressProof: newArr};
        });
        if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            addressProof: "",
          }));
        }
      }
    }
    if (e.target.name === "currrentAdd") {
      if (file) {
        setFormData(prev => {
          return {...prev, currentAddressProof: newArr};
        });
        if (!allowedFileTypes.includes(newArr?.[0]?.type)) {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "Please select jpg,png, pdf or jpeg file",
          }));
        } else {
          setFormErrors(prev => ({
            ...prev,
            currentAddressProof: "",
          }));
        }
      }
    }
  };

  const handleDeleteFile = (val, index) => {
    if (val === "addressProof") {
      const temp = [...formData.addressProof];
      temp.splice(index, 1);
      setFormData({...formData, addressProof: temp});
    }
    if (val === "currentAddProof") {
      const temp = [...formData.currentAddressProof];
      temp.splice(index, 1);
      setFormData({...formData, currentAddressProof: temp});
    }
  };

  const handleOptionClickPer = option => {
    setFormErrors({...formErrors, addressProofType: ""});
    setFormData({...formData, addressProofType: option?.value});
    setSelectedOptionPer(option);
    setPerAddModal(false);
  };
  const handleOptionClickCur = option => {
    setFormErrors({...formErrors, currentAddressProofType: ""});
    setFormData({...formData, currentAddressProofType: option?.value});
    setSelectedOptionCur(option);
    setCurrAddModal(false);
  };
  const handleContactBlur = () => {
    const regPat = /[!@#$%^&*()_+{}:;<>,.?~\\/\s]/;
    // console.log(regPat.test(formData?.contactNumber), formData?.contactNumber);
    if (formData?.contactNumber?.length < 10) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
      }));
    } else if (
      formData?.contactNumber?.length > 10 &&
      regPat.test(formData?.contactNumber)
    ) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Please enter a valid 10 digit phone number without spaces or special characters.",
      }));
      return null;
    } else if (formData?.contactNumber?.length > 10) {
      setFormErrors(prev => ({
        ...prev,
        contactNumber:
          "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
      }));
      return null;
    } else {
      setFormErrors(prev => ({
        ...prev,
        contactNumber: "",
      }));
      return null;
    }
  };
  const handleCheckboxChange = () => {
    setFormData(prev => {
      if (!prev.termsAccepted) {
        setFormErrors(pre => {
          return {
            ...pre,
            termsAccepted: "",
          };
        });
      }
      return {
        ...prev,
        termsAccepted: !prev.termsAccepted,
      };
    });
  };

  const validateForm = () => {
    if (!formData?.addressProof?.[0]?.name) {
      setFormErrors(prev => {
        return {...prev, addressProof: "Please upload the address proof"};
      });
    } else {
      setFormErrors(prev => {
        return {...prev, addressProof: ""};
      });
    }
    if (!formData?.currentAddressProof?.[0]?.name) {
      setFormErrors(prev => {
        return {
          ...prev,
          currentAddressProof: "Please upload the address proof",
        };
      });
    } else {
      setFormErrors(prev => {
        return {...prev, currentAddressProof: ""};
      });
    }
    if (!formData?.termsAccepted) {
      setFormErrors(prev => {
        return {
          ...prev,
          termsAccepted: "You must accept the terms and conditions.",
        };
      });
    } else {
      setFormErrors(prev => {
        return {...prev, termsAccepted: ""};
      });
    }
    if (!formData?.addressProofType) {
      setFormErrors(prev => {
        return {
          ...prev,
          addressProofType: "Please select the address proof type.",
        };
      });
    } else {
      setFormErrors(prev => {
        return {...prev, addressProofType: ""};
      });
    }
    if (!formData?.currentAddressProofType) {
      setFormErrors(prev => {
        return {
          ...prev,
          currentAddressProofType: "Please select the address proof type.",
        };
      });
    } else {
      setFormErrors(prev => {
        return {...prev, currentAddressProofType: ""};
      });
    }

    handleContactBlur();
  };

  const submitHandler = () => {
    validateForm();
    for (const key in formErrors) {
      if (Object.hasOwnProperty.call(formErrors, key)) {
        const element = formErrors[key];
        if (element) {
          return;
        }
      }
    }
    const allData = new FormData();
    allData.append(
      "permanentAddressProof",
      JSON.stringify({
        doc_id: "cf_permanent_address_proof",
        subDocType: selectedOptionPer?.value,
        // docImageName: formData?.addressProof?.name,
      }),
    );
    allData.append(
      "currentAddressProof",
      JSON.stringify({
        doc_id: "cf_delivery_address_proof",
        subDocType: selectedOptionCur?.value,
        // docImageName: formData?.addressProof?.name,
      }),
    );
    allData.append("userId", decrypt(getLocalStorage("_ga")));
    allData.append("alternateMobNo", formData?.contactNumber);
    for (let i = 0; i < formData.addressProof.length; i++) {
      allData.append("cf_permanent_address_proof", formData.addressProof[i]);
    }
    for (let i = 0; i < formData.currentAddressProof.length; i++) {
      allData.append(
        "cf_delivery_address_proof",
        formData.currentAddressProof[i],
      );
    }
    // allData.append("cf_delivery_address_proof", formData.currentAddressProof);
    allData.append("orderId", orderId);
    baseInstance
      .post(baseURL + endPoints.uploadAddressDocs, allData)
      .then(res => {
        handleKycState(selectedOrderId);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAddProofList();
  }, []);

  return (
    <div>
      <TermsAndConditionsDrawer
        open={drawerOpen}
        toggleDrawer={bool => setDrawerOpen(bool)}
      />
      <CommonField handleKycState={handleKycState} />

      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step {step}</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Please enter an alternative number & address proof.
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Alternative number
        </span>
      </div>
      <div className={`${styles.formInputFirst} sm:w-[505px]`}>
        <div className={`flex gap-2 items-center ${styles.form_input} `}>
          <img
            src={`${cityUrl + "india-icon.svg"}`}
            className={styles.flag}
            alt="India-icon"
          />
          <input
            type="text"
            // readOnly
            name="contactNumber"
            placeholder="Enter 10 digit number "
            className={styles.contact_input}
            onChange={e => {
              setFormData(prev => ({...prev, contactNumber: e.target.value}));
            }}
            onBlur={() => {
              handleContactBlur();
            }}
          />
        </div>
      </div>
      {formErrors.contactNumber && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.contactNumber}
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Permanent address proof
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown
          options={docsData?.[1]?.supported_docs
            .split(",")
            ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
          maxWidth=""
          optionsActive="md:block hidden"
          currAddModal={currAddModal}
          perAddModal={perAddModal}
          docsData={docsData}
          setCurrAddModal={setCurrAddModal}
          setPerAddModal={setPerAddModal}
          // handleOptionClickCur={handleOptionClickCur}
          handleOptionClickPer={handleOptionClickPer}
          selectedOptionPer={selectedOptionPer}
          selectedOptionCur={selectedOptionCur}
          addressScreen
        />
      </div>
      {formErrors.addressProofType && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.addressProofType}
        </div>
      )}

      {formData?.addressProof?.length > 0 &&
        formData?.addressProof?.map((item, index) => (
          <div key={index} className={styles.map_row_wrapper}>
            <div className={`${styles.formInputFirst}`}>
              <div className="flex items-center">
                <label
                  // htmlFor="currrentAdd"
                  className={`${
                    commonStyles.basicInputStyles
                  } md:w-[232px] block ${
                    formErrors.addressProof && "  !bg-[#FFF1F1] md:!bg-white"
                  } ${
                    !formErrors.addressProof &&
                    formData.addressProof?.length > 0
                      ? "  !bg-[#F1FFF9] md:!bg-white text-black"
                      : "text-[#71717a] "
                  }`}>
                  <div className={`${commonStyles.flexICenter} `}>
                    <>
                      {formErrors?.addressProof ? (
                        <ExclamationCircleFill
                          color={"#D96060"}
                          className={`${commonStyles.mdHiddemIcons}`}
                        />
                      ) : (
                        <div className={commonStyles.animate_check_icon}>
                          <CheckFillIcon
                            color={"#2D9469"}
                            className={`${commonStyles.mdHiddemIcons}`}
                          />
                        </div>
                      )}
                    </>

                    <Image
                      src={uploading}
                      alt="Uploading Icon"
                      className={`${commonStyles.mdIBHidden}`}
                    />
                    <span className={`${styles.chooseFile}`}>{item?.name}</span>
                  </div>
                  {!formErrors.addressProof &&
                  formData.addressProof?.length > 0 ? (
                    <div className={`${commonStyles.correctFile}`}></div>
                  ) : (
                    <></>
                  )}
                </label>
                <span
                  onClick={e => {
                    handleDeleteFile("addressProof", item);
                  }}>
                  <DeleteIcon
                    color={"#71717A"}
                    className={`${commonStyles.mdHiddemIcons} ml-3`}
                  />
                </span>
              </div>
            </div>
            <div className={`!hidden md:!flex ${styles.check_wrapper}`}>
              <CheckFillIcon
                color={"#2D9469"}
                className={styles.showCheckCircle}
              />
              <div onClick={() => handleDeleteFile("addressProof", index)}>
                <CloseCircleIcon
                  color={"#D96060"}
                  className={styles.showDeleteIcon}
                />
              </div>
            </div>
          </div>
        ))}

      <div className={`${styles.formInputFirst} !mt-2`}>
        <div className="flex items-center">
          <label
            htmlFor="addressProof"
            className={`${
              commonStyles.basicInputStyles
            } md:w-[232px] block cursor-pointer  ${
              formErrors.addressProof && "  !bg-[#FFF1F1] md:!bg-white"
            } ${
              // !formErrors.addressProof &&
              // formData.addressProof &&
              // formData.addressProof?.length === 1
              //   ? " !bg-[#F1FFF9] md:!bg-white text-black"
              "text-[#71717a]"
            }`}>
            <div className={`${commonStyles.flexICenter}`}>
              <Image
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdHiddenIB}`}
              />

              <Image
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdIBHidden}`}
              />
              <span className={`${styles.chooseFile}`}>Choose file(s)</span>
            </div>
          </label>
        </div>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="addressProof"
          id="addressProof"
          style={{display: "none", cursor: "pointer"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>

      {formErrors.addressProof && (
        <div className={`${commonStyles.basicErrorStyles} `}>
          {formErrors.addressProof}
        </div>
      )}

      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Current address proofs
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown
          options={docsData?.[0]?.supported_docs
            .split(",")
            ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setCurrAddModal}
          selectedOption={selectedOptionCur}
          isOpen={currAddModal}
          setSelectedOption={setSelectedOptionCur}
          maxWidth=""
          optionsActive="md:block hidden"
          currAddModal={currAddModal}
          perAddModal={perAddModal}
          docsData={docsData}
          setCurrAddModal={setCurrAddModal}
          setPerAddModal={setPerAddModal}
          handleOptionClickCur={handleOptionClickCur}
          // handleOptionClickPer={handleOptionClickPer}
          selectedOptionCur={selectedOptionCur}
          selectedOptionPer={selectedOptionPer}
          addressScreen
        />
      </div>
      {formErrors.currentAddressProofType && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.currentAddressProofType}
        </div>
      )}

      {formData?.currentAddressProof?.length > 0 &&
        formData?.currentAddressProof?.map((item, index) => (
          <div key={index} className={styles.map_row_wrapper}>
            <div className={`${styles.formInputFirst}  cursor-pointer`}>
              <div className="flex items-center">
                <label
                  className={`${
                    commonStyles.basicInputStyles
                  } md:w-[232px] block ${
                    formErrors.currentAddressProof &&
                    "  !bg-[#FFF1F1] md:!bg-white"
                  } ${
                    !formErrors.currentAddressProof &&
                    formData?.currentAddressProof?.length > 0
                      ? "  !bg-[#F1FFF9] md:!bg-white text-black"
                      : "text-[#71717a] "
                  }`}>
                  <div className={`${commonStyles.flexICenter} `}>
                    <>
                      {formErrors?.currentAddressProof ? (
                        <ExclamationCircleFill
                          color={"#D96060"}
                          className={`${commonStyles.mdHiddemIcons}`}
                        />
                      ) : (
                        <div className={commonStyles.animate_check_icon}>
                          <CheckFillIcon
                            color={"#2D9469"}
                            className={`${commonStyles.mdHiddemIcons}`}
                          />
                        </div>
                      )}
                    </>

                    <Image
                      src={uploading}
                      alt="Uploading Icon"
                      className={`${commonStyles.mdIBHidden}`}
                    />
                    <span className={`${styles.chooseFile}`}>{item?.name}</span>
                  </div>
                  {!formErrors.currentAddressProof &&
                  formData.currentAddressProof?.length > 0 ? (
                    <div className={`${commonStyles.correctFile}`}></div>
                  ) : (
                    <></>
                  )}
                </label>
                <span
                  onClick={e => {
                    handleDeleteFile("currentAddProof", item);
                  }}>
                  <DeleteIcon
                    color={"#71717A"}
                    className={`${commonStyles.mdHiddemIcons} ml-3`}
                  />
                </span>
              </div>
            </div>
            <div className={`!hidden md:!flex ${styles.check_wrapper}`}>
              <CheckFillIcon
                color="#2D9469"
                className={styles.showCheckCircle}
              />
              <div onClick={() => handleDeleteFile("currentAddProof", index)}>
                <CloseCircleIcon
                  color="#D96060"
                  className={styles.showDeleteIcon}
                />
              </div>
            </div>
          </div>
        ))}

      <div className={`${styles.formInputFirst} !mt-2`}>
        <div className="flex items-center">
          <label
            htmlFor="currrentAdd"
            className={`${
              commonStyles.basicInputStyles
            } md:w-[232px] block cursor-pointer  ${
              formErrors.currentAddressProof && "  !bg-[#FFF1F1] md:!bg-white"
            } ${
              // !formErrors.currentAddressProof &&
              // formData.currentAddressProof &&
              // formData.currentAddressProof?.length === 1
              //   ? "  !bg-[#F1FFF9] md:!bg-white text-black"
              "text-[#71717a] "
            }`}>
            <div className={`${commonStyles.flexICenter} `}>
              <Image
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdHiddenIB}`}
              />

              <Image
                src={uploading}
                alt="Uploading Icon"
                className={`${commonStyles.mdIBHidden}`}
              />
              <span className={`${styles.chooseFile}`}>Choose file(s)</span>
            </div>
          </label>
        </div>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          name="currrentAdd"
          id="currrentAdd"
          style={{display: "none", cursor: "pointer"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
        />
      </div>

      {formErrors.currentAddressProof && (
        <div className={`${commonStyles.basicErrorStyles} `}>
          {formErrors.currentAddressProof}
        </div>
      )}

      <div>
        <div className={`${styles.formTermsSection}`}>
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            className={`${commonStyles.basicCheckBox}`}
            onChange={e => {
              handleCheckboxChange(e);
            }}
          />
          <span className={`${commonStyles.termsTxt}`}>
            &nbsp;I accept &nbsp;
          </span>
          <span
            className={`cursor-pointer ${commonStyles.termsTxt} ${commonStyles.conditionsTxt}`}
            onClick={() => {
              setDrawerOpen(true);
            }}>
            &nbsp;Terms and Conditions
          </span>
        </div>
      </div>
      {formErrors.termsAccepted && (
        <div className={`${commonStyles.basicErrorStyles}`}>
          {formErrors.termsAccepted}
        </div>
      )}
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button className={`${commonStyles.laterBtn} ${styles.laterBtn}  `}>
            I&apos;ll do it later
          </button>
          <button
            // disabled
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn}  `}>
            <span>Proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCAddress;
