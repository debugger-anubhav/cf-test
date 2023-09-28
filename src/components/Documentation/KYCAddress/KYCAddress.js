import React, {useState, useEffect} from "react";
import styles from "./KYCAddress.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";
import uploading from "@/assets/common_icons/uploading.jpg";
import {cityUrl} from "../../../../appConfig";
import DropDown from "../DropDown/DropDown";
import {Modal, createTheme, useMediaQuery} from "@mui/material";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import {
  CheckCircleIcon,
  Close,
  DeleteIcon,
  ExclamationCircleFill,
  ReloadIcon,
} from "@/assets/icon";
const KYCAddress = () => {
  const [currAddModal, setCurrAddModal] = useState(false);
  const [perAddModal, setPerAddModal] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const [selectedArr, setSelectedArr] = useState([]);

  const [selectedOptionCur, setSelectedOptionCur] = useState({
    label: "Pan Number (Recommended)",
    value: "PAN Number",
  });
  const [selectedOptionPer, setSelectedOptionPer] = useState({
    label: "Pan Number (Recommended)",
    value: "PAN Number",
  });
  const [formData, setFormData] = useState({
    contactNumber: "",
    addressProof: "", // You can add more fields as needed
    currentAddressProof: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    contactNumber: "",
    addressProof: "",
    currentAddressProof: "",
    termsAccepted: "",
  });
  const theme = createTheme({
    breakpoints: {
      values: {
        md: 768, // Set the 'md' breakpoint to 768 pixels
      },
    },
  });
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
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
    const file = e.target.files[0];
    console.log(file);
    if (e.target.name === "addressProof") {
      if (file) {
        setFormData(prev => {
          return {...prev, addressProof: file};
        });
        if (!allowedFileTypes.includes(file.type)) {
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
          return {...prev, currentAddressProof: file};
        });
        if (!allowedFileTypes.includes(file.type)) {
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
  const handleOptionClickPer = option => {
    setSelectedOptionPer(option);
  };
  const handleOptionClickCur = option => {
    setSelectedOptionCur(option);
  };
  const handleContactBlur = () => {
    const regPat = /[!@#$%^&*()_+{}:;<>,.?~\\/\s]/;
    console.log(regPat.test(formData?.contactNumber), formData?.contactNumber);
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
    if (!formData?.addressProof.name) {
      setFormErrors(prev => {
        return {...prev, addressProof: "Please upload the address proof"};
      });
    } else {
      setFormErrors(prev => {
        return {...prev, addressProof: ""};
      });
    }
    if (!formData?.currentAddressProof.name) {
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
    handleContactBlur();
  };
  const submitHandler = () => {
    validateForm();
  };

  useEffect(() => {
    getAddProofList();
  }, []);
  return (
    <div>
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
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
          <img src={`${cityUrl + "india-icon.svg"}`} className={styles.flag} />
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
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.contactNumber}
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Permanent address proof
        </span>
      </div>
      <div
        className={`${styles.formInputFirst}`}
        onClick={() => {
          setSelectedArr(
            docsData[1]?.supported_docs
              .split(",")
              ?.map(i => ({label: i, value: i})),
          );
        }}>
        <DropDown
          options={docsData[0]?.supported_docs
            .split(",")
            ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
        />
      </div>
      <div className={`${styles.formInputFirst}`}>
        <div className="flex items-center">
          <label
            htmlFor="addressProof"
            className={`${commonStyles.basicInputStyles} md:w-[232px] block  ${
              formErrors.addressProof && "  !bg-[#FFF1F1] md:!bg-white"
            } ${
              !formErrors.addressProof && formData.addressProof.name
                ? "  !bg-[#F1FFF9] md:!bg-white"
                : ""
            }`}>
            {formData?.addressProof.name ? (
              <>
                {formErrors?.addressProof ? (
                  <ExclamationCircleFill
                    color={"#D96060"}
                    className={"inline-block md:hidden w-5"}
                  />
                ) : (
                  <CheckCircleIcon
                    color={"#2D9469"}
                    className={"inline-block md:hidden w-5"}
                  />
                )}
              </>
            ) : (
              <Image
                src={uploading}
                alt="Uploading Icon"
                className="inline-block md:hidden"
              />
            )}
            <Image
              src={uploading}
              alt="Uploading Icon"
              className="md:inline-block hidden"
            />
            <span className="inline-block pl-2">
              {formData?.addressProof?.name ?? "Choose file"}
            </span>
            {!formErrors.addressProof && formData.addressProof.name ? (
              <div className={`${styles.correctFile}`}></div>
            ) : (
              <></>
            )}
          </label>
          {formErrors.addressProof && (
            <>
              <ReloadIcon className="md:hidden ml-3 w-5 h-5" />
              <span
                onClick={e => {
                  e.stopPropagation();
                  setFormData(prev => ({...prev, addressProof: ""}));
                  setFormErrors(prev => ({...prev, addressProof: ""}));
                }}>
                <DeleteIcon className="md:hidden ml-4 w-5 h-5" />
              </span>
            </>
          )}
        </div>

        <input
          type="file"
          name="addressProof"
          id="addressProof"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>
      {formErrors.addressProof && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.addressProof}
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Current address proofs
        </span>
      </div>
      <div
        className={`${styles.formInputFirst}`}
        onClick={() => {
          setSelectedArr(
            docsData[1]?.supported_docs
              .split(",")
              ?.map(i => ({label: i, value: i})),
          );
        }}>
        <DropDown
          options={docsData[1]?.supported_docs
            .split(",")
            ?.map(i => ({label: i, value: i}))}
          setIsDDOpen={setCurrAddModal}
          selectedOption={selectedOptionCur}
          isOpen={currAddModal}
          setSelectedOption={setSelectedOptionCur}
        />
      </div>
      <div className={`${styles.formInputFirst}`}>
        <div className="flex items-center">
          <label
            htmlFor="currrentAdd"
            className={`${commonStyles.basicInputStyles} md:w-[232px] block ${
              formErrors.currentAddressProof && "  !bg-[#FFF1F1] md:!bg-white"
            } ${
              !formErrors.currentAddressProof &&
              formData.currentAddressProof.name
                ? "  !bg-[#F1FFF9] md:!bg-white"
                : ""
            }`}>
            {formData?.currentAddressProof.name ? (
              <>
                {formErrors?.currentAddressProof ? (
                  <ExclamationCircleFill
                    color={"#D96060"}
                    className={"inline-block md:hidden w-5"}
                  />
                ) : (
                  <CheckCircleIcon
                    color={"#2D9469"}
                    className={"inline-block md:hidden w-5"}
                  />
                )}
              </>
            ) : (
              <Image
                src={uploading}
                alt="Uploading Icon"
                className="inline-block md:hidden"
              />
            )}
            <Image
              src={uploading}
              alt="Uploading Icon"
              className="md:inline-block hidden"
            />
            <span className="inline-block pl-2">
              {formData?.currentAddressProof?.name ?? "Choose file"}
            </span>
            {!formErrors.currentAddressProof &&
            formData.currentAddressProof.name ? (
              <div className={`${styles.correctFile}`}></div>
            ) : (
              <></>
            )}
          </label>
          {formErrors.currentAddressProof && (
            <>
              <ReloadIcon className="md:hidden ml-3 w-5 h-5" />
              <span
                onClick={e => {
                  e.stopPropagation();
                  setFormData(prev => ({...prev, currentAddressProof: ""}));
                  setFormErrors(prev => ({...prev, currentAddressProof: ""}));
                }}>
                <DeleteIcon className="md:hidden ml-4 w-5 h-5" />
              </span>
            </>
          )}
        </div>

        <input
          type="file"
          name="currrentAdd"
          id="currrentAdd"
          style={{display: "none"}}
          onChange={e => {
            handleFileInputChange(e);
          }}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>

      {formErrors.currentAddressProof && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.currentAddressProof}
        </div>
      )}
      <div>
        <div className={`${styles.formTermsSection}`}>
          <input
            type="checkbox"
            className={`${commonStyles.basicCheckBox}`}
            onChange={e => {
              handleCheckboxChange(e);
            }}
          />
          <span className={`${commonStyles.termsTxt}`}>
            &nbsp;I accept &nbsp;
          </span>
          <span className={`${commonStyles.termsTxt} text-[#5774AC] underline`}>
            &nbsp;Terms and Conditions
          </span>
        </div>
      </div>
      {formErrors.termsAccepted && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.termsAccepted}
        </div>
      )}
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            // disabled
            onClick={() => {
              submitHandler();
            }}
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span>Proceed</span>
            <Image src={forwardArrow} alt="Forward Arrow Icon" />
          </button>
        </div>
      </div>
      <div className="md:hidden">
        {isMdScreen && (
          <>
            <Modal
              open={perAddModal}
              onClose={() => setPerAddModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus>
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Please provide one ID to fetch your credit score
                </div>
                <ul
                  className={`${
                    perAddModal
                      ? commonStyles.optionsActive
                      : commonStyles.options
                  } `}>
                  {selectedArr.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.value === selectedOptionPer?.value
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClickPer(option)}>
                      <span>{option.label}</span>{" "}
                      <SelectionCircle
                        showInner={option?.value === selectedOptionPer?.value}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  className={`${commonStyles.close_icon_btn}`}
                  onClick={() => {
                    setPerAddModal(false);
                  }}>
                  <div className={`${commonStyles.close_icon}`}>
                    <Close size={25} color={"#222222"} />
                  </div>
                </button>
              </div>
            </Modal>
            <Modal
              open={currAddModal}
              onClose={() => setCurrAddModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableRestoreFocus
              disableEnforceFocus
              disableAutoFocus>
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Please provide one ID to fetch your credit score
                </div>
                <ul
                  className={`${
                    currAddModal
                      ? commonStyles.optionsActive
                      : commonStyles.options
                  } `}>
                  {selectedArr.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.value === selectedOptionCur?.value
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClickCur(option)}>
                      <span>{option.label}</span>{" "}
                      <SelectionCircle
                        showInner={option?.value === selectedOptionCur?.value}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  className={`${commonStyles.close_icon_btn}`}
                  onClick={() => {
                    setCurrAddModal(false);
                  }}>
                  <div className={`${commonStyles.close_icon}`}>
                    <Close size={25} color={"#222222"} />
                  </div>
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default KYCAddress;
