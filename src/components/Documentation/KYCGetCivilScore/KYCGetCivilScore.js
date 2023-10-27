import React, {useState} from "react";
import styles from "./KYCCommon.module.css";
import commonStyles from "../common.module.css";
import DropDown from "../DropDown/DropDown";
import {OutlineArrowRight, Close} from "@/assets/icon";
import {
  Box,
  Modal,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import DocLoader from "../DocLoader/DocLoader";

// import axios from "axios";
// import { baseURL } from "@/network/axios";
// import { endPoints } from "@/network/endPoints";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {baseInstance, baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import CommonField from "../CommonField/CommonField";
import {useSelector} from "react-redux";
// let src;
// if (typeof window !== "undefined") {
//   src = window.screen.availWidth;
// } else {
//   src = 767;
// }
const theme = createTheme({
  breakpoints: {
    values: {
      md: 768, // Set the 'md' breakpoint to 768 pixels
    },
  },
});
const KYCGetCivilScore = ({handleKycState}) => {
  const selectedOrderId = useSelector(state => state.kycPage.orderId);

  const [progressModal, setProgressModal] = useState(false);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    label: "PAN Number (Recommended)",
    value: "",
  });
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    dob: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({
    idType: "",
    idNumber: "",
    dob: "",
    termsAccepted: "",
  });

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const submitHandler = () => {
    setSubmitting(true);
    const data = {
      docDetail: JSON.stringify({
        id: selectedOption.value,
        value: formData.idNumber,
      }),
      dob: formData.dob,
      userId: decrypt(getLocalStorage("_ga")),
      orderId: selectedOrderId,
    };
    baseInstance
      .post(baseURL + endPoints.getAndSaveCibilScore, data)
      .then(res => {
        console(res, "res in getcibilsvoreapiiii");
        setSubmitting(false);
        handleKycState(selectedOrderId);
      })

      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  };
  const idOptions = [
    {label: "PAN Number", value: "1"},
    {label: "Driving license", value: "2"},
    {label: "Voter ID", value: "3"},
  ];
  // const getOption = () => {
  //   axios.get(baseURL + endPoints.addToCart.deleteItem(id, userId));
  // };
  const handleOptionClick = option => {
    setSelectedOption(option);
  };
  const validateForm = () => {
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    // const drivingRegex = / ^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})/;
    const voterIdRegex = /^[A-Z]{3}[0-9]{7}$/;
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;

    const errors = {};
    switch (selectedOption.label) {
      case "PAN Number" || "PAN Number (Recommended)":
        console.log(
          panRegex.test(formData.idNumber),
          formData.idNumber,
          selectedOption.value,
        );
        if (!panRegex.test(formData.idNumber)) {
          errors.idNumber = "Please enter a valid pan number";
        } else {
          errors.idNumber = "";
        }
        break;
      case "Driving license":
        if (!formData.idNumber) {
          errors.idNumber = "Please enter a valid driving license";
        }

        break;
      case "Voter ID":
        if (!voterIdRegex.test(formData.idNumber)) {
          errors.idNumber = "Please enter a valid voter id";
        }
        break;
    }

    if (!dateRegex.test(formData.dob)) {
      errors.dob = "Please enter your date of birth in format DD-MM-YYYY";
    } else {
      errors.dob = "";
    }
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions.";
    } else {
      errors.termsAccepted = "";
    }
    return errors;
  };
  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData(prev => {
      return {
        ...prev,
        termsAccepted: !prev.termsAccepted,
      };
    });
    validateForm();
  };
  const handleSubmit = () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.values(errors).every(value => value === "")) {
      submitHandler();
    } else {
      console.log(errors, "form has some erroers");

      // Form has errors, handle them as needed
      // For example, display error messages or prevent submission
    }
  };

  // console.log(handleCheckboxChange, handleInputChange);
  return (
    <div className="relative">
      <CommonField handleKycState={handleKycState} />
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          We will fetch your credit score for free to verify your KYC
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Please provide one ID to fetch your credit score
        </span>
      </div>
      <div
        className={`${styles.formInputFirst}`}
        onClick={() => {
          setSelectedArr(idOptions);
        }}>
        <DropDown
          options={idOptions}
          setIsDDOpen={setIsDDOpen}
          selectedOption={selectedOption}
          isOpen={isDDOpen}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className={`${styles.formInputSecond}`}>
        <input
          type="text"
          name={"idNumber"}
          className={`${commonStyles.basicInputStyles}`}
          placeholder={`Enter ${selectedOption.label} Number`}
          onChange={e => {
            handleInputChange(e);
          }}
          // onBlur={e => {
          //   handleInputBlur(e);
          // }}
        />
      </div>
      {formErrors.idNumber && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.idNumber}
        </div>
      )}
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Date of Birth (DD-MM-YYYY)
        </span>
      </div>
      <div className={`${styles.formInputThird}`}>
        <input
          type="text"
          name="dob"
          className={`${commonStyles.basicInputStyles}`}
          placeholder="DD-MM-YYYY"
          value={formData.dob}
          onChange={e => {
            handleInputChange(e);
          }}
          // onBlur={e => {
          //   handleInputBlur(e);
          // }}
        />
      </div>
      {formErrors.dob && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.dob}
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
          <button
            className={`${commonStyles.termsTxt} ${commonStyles.conditionsTxt}`}
            onClick={() => {
              setDrawerOpen(true);
            }}>
            &nbsp;Terms and Conditions
          </button>
        </div>
      </div>
      {formErrors.termsAccepted && (
        <div className={`${commonStyles.basicErrorStyles} ${styles.errorTxt}`}>
          {formErrors.termsAccepted}
        </div>
      )}
      <div
        className={`${styles.btnGroupContainer} `}
        // style={isDDOpen ? { display: "none" } : {}}
      >
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            // disabled
            onClick={handleSubmit}
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Save & proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
      {!isMdScreen && (
        <SwipeableDrawer
          classes={{
            paper: commonStyles.bottomDrawer,
          }}
          anchor={isMdScreen ? "bottom" : "right"}
          className="m-8"
          open={drawerOpen}
          onClose={() => {
            // mobileCityDrawer && DrawerName !== "menu"
            //   ? toggleDrawer("bottom", true)
            //   : toggleDrawer("left", true);
          }}
          onOpen={() => {
            // mobileCityDrawer && DrawerName !== "menu"
            //   ? toggleDrawer("bottom", true)
            //   : toggleDrawer("left", true);
          }}>
          <div className={` ${commonStyles.termsContainer}  `}>
            <h2 className={` ${commonStyles.termsHeader}  `}>
              Terms and conditions
            </h2>
            <ul className={` ${commonStyles.termsUL}  `}>
              <li className={` ${commonStyles.termsLI}  `}>
                By continuing, you agree to allow Cityfurnish India Private
                Limited to fetch your credit report from CRIF High Mark for the
                purpose of KYC verification. This consent shall be valid for a
                period of 6 months.
              </li>
              <li className={` ${commonStyles.termsLI}  `}>
                By clicking the &apos;Proceed&apos; button, you agree to CRIF
                High Mark Credit Score Terms of Use.
              </li>
              <li className={` ${commonStyles.termsLI}  `}>
                You understand that you shall have the option to opt
                out/unsubscribe from the service by clicking here. Fetching
                report from the credit bureau will not impact your credit score.
              </li>
            </ul>
            <button
              className={` ${commonStyles.termsConfirmBtn}  `}
              onClick={() => {
                handleCheckboxChange();
                setDrawerOpen(false);
              }}>
              Okay, understood
            </button>
          </div>
          <div className={` ${commonStyles.termsCrossContainer}  `}>
            <button
              className={`${commonStyles.close_icon_btn}`}
              onClick={() => {
                setDrawerOpen(false);
              }}>
              <div className={`${commonStyles.close_icon}`}>
                <Close size={25} color={"#222222"} />
              </div>
            </button>
          </div>
        </SwipeableDrawer>
      )}

      {isMdScreen && (
        <Modal
          open={isDDOpen || drawerOpen}
          onClose={() => setIsDDOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableRestoreFocus
          disableEnforceFocus
          disableAutoFocus>
          <>
            {isDDOpen && (
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Please provide one ID to fetch your credit score
                </div>
                <ul
                  className={`${
                    isDDOpen ? commonStyles.optionsActive : commonStyles.options
                  } `}>
                  {selectedArr.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.value === selectedOption?.value
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClick(option)}>
                      <span>{option.label}</span>{" "}
                      <SelectionCircle
                        showInner={option?.value === selectedOption?.value}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  className={`${commonStyles.close_icon_btn}`}
                  onClick={() => {
                    setIsDDOpen(false);
                  }}>
                  <div className={`${commonStyles.close_icon}`}>
                    <Close size={25} color={"#222222"} />
                  </div>
                </button>
              </div>
            )}
            {drawerOpen && (
              <>
                <div
                  className={` ${commonStyles.dropdown_container}  ${styles.termsContainerMD} `}>
                  <h2 className={` ${styles.termsHeader}  `}>
                    Terms and conditions
                  </h2>
                  <ul className={` ${styles.termsUL}  `}>
                    <li className={` ${styles.termsLI}  `}>
                      By continuing, you agree to allow Cityfurnish India
                      Private Limited to fetch your credit report from CRIF High
                      Mark for the purpose of KYC verification. This consent
                      shall be valid for a period of 6 months.
                    </li>
                    <li className={` ${styles.termsLI}  `}>
                      By clicking the &apos;Proceed&apos; button, you agree to
                      CRIF High Mark Credit Score Terms of Use.
                    </li>
                    <li className={` ${styles.termsLI}  `}>
                      You understand that you shall have the option to opt
                      out/unsubscribe from the service by clicking here.
                      Fetching report from the credit bureau will not impact
                      your credit score.
                    </li>
                  </ul>
                  <button
                    className={` ${styles.termsConfirmBtn}  `}
                    onClick={() => {
                      handleCheckboxChange();
                      setDrawerOpen(false);
                    }}>
                    Okay, understood
                  </button>
                  <button
                    className={`${commonStyles.close_icon_btn}`}
                    onClick={() => {
                      setDrawerOpen(false);
                    }}>
                    <div className={`${commonStyles.close_icon}`}>
                      <Close size={25} color={"#222222"} />
                    </div>
                  </button>
                </div>
              </>
            )}
          </>
        </Modal>
      )}

      <Modal
        open={progressModal}
        onClose={() => setProgressModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableRestoreFocus
        disableEnforceFocus
        disableAutoFocus>
        <div className={styles.main_container}>
          <div>
            <Box display={"flex"} justifyContent={"space-between"}>
              <div>
                <Typography className={styles.delete_item_text}>
                  Your Progress will be Saved!
                </Typography>
                <Box>
                  <Typography className={styles.delete_confirmation_text}>
                    Just visit the &quot;KYC & Documentation&quot; page
                    <br />
                    whenever you&apos;re ready to pick up where you
                    <br />
                    left off.
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <button
                    className={styles.cancel_delete_btn}
                    onClick={() => setProgressModal(false)}>
                    Go back
                  </button>
                  <button
                    className={styles.confirm_delete_btn}
                    onClick={() => {
                      // remove();
                    }}>
                    Okay,&nbsp;proceed
                  </button>
                </Box>
              </div>
              <button
                className={`${styles.close_icon_btn}`}
                onClick={() => {
                  setProgressModal(false);
                }}>
                <div className={`${styles.close_icon}`}>
                  <Close size={25} color={"#222222"} />
                </div>
              </button>
            </Box>
          </div>
        </div>
      </Modal>
      <DocLoader
        height={"200px"}
        width={"200px"}
        open={submitting}
        setOpen={setSubmitting}
      />
    </div>
  );
};

export default KYCGetCivilScore;
