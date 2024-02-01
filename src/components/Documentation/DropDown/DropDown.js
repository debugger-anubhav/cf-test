import React from "react";
import styles from "./DropDown.module.css";
import {Close, DownPopUpArrow, PopUpArrow} from "@/assets/icon";
import {Modal, createTheme, useMediaQuery} from "@mui/material";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import commonStyles from "../common.module.css";

const DropDown = ({
  handleSelectChange,
  selectedOption,
  style,
  useDefaultStyle,
  options,
  setIsDDOpen,
  setSelectedOption,
  isOpen,
  maxWidth,
  optionsActive,
  isInitialScreen = false,
  handleKycState,
  setPerAddModal,
  setCurrAddModal,
  perAddModal,
  currAddModal,
  selectedOptionPer,
  setSelectedOptionPer,
  docsData,
  handleOptionClickCur,
  selectedOptionCur,
  handleOptionClickPer,
  orderIdsModal,
  setOrderIdsModal,
  addressScreen,
}) => {
  const handleOptionClick = option => {
    console.log(option, "optionnnn");
    if (addressScreen) {
      perAddModal ? handleOptionClickPer(option) : handleOptionClickCur(option);
    } else {
      setSelectedOption(option);
      setIsDDOpen(false);
    }
    isInitialScreen && handleKycState(option);
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        md: 768, // Set the 'md' breakpoint to 768 pixels
      },
    },
  });
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const permanentAddOptions = docsData?.[1]?.supported_docs
    ?.split(",")
    ?.map(i => ({label: i, value: i}));
  const currentAddressOptions = docsData?.[0]?.supported_docs
    ?.split(",")
    ?.map(i => ({label: i, value: i}));
  return (
    <>
      {isMdScreen && (
        <Modal
          open={currAddModal || perAddModal || orderIdsModal}
          onClose={() => {
            if (isInitialScreen) setOrderIdsModal(false);
            else {
              setPerAddModal(false);
              setCurrAddModal(false);
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableRestoreFocus
          disableEnforceFocus
          disableAutoFocus>
          <>
            {perAddModal && (
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Select any permanent address proof
                </div>
                <ul
                  className={`${
                    perAddModal
                      ? commonStyles.optionsActive
                      : commonStyles.options
                  } `}>
                  {permanentAddOptions?.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.label === selectedOptionPer?.lebel
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClickPer(option)}>
                      <span>{option?.label}</span>{" "}
                      <SelectionCircle
                        showInner={option?.label === selectedOptionPer?.label}
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
            )}
            {currAddModal && (
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Select any current address proof
                </div>
                <ul
                  className={`${
                    currAddModal
                      ? commonStyles.optionsActive
                      : commonStyles.options
                  } `}>
                  {currentAddressOptions?.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.label === selectedOptionCur?.label
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClickCur(option)}>
                      <span>{option?.label}</span>{" "}
                      <SelectionCircle
                        showInner={option?.label === selectedOptionCur?.label}
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
            )}
            {orderIdsModal && (
              <div className={`${commonStyles.dropdown_container} `}>
                <div className={`${commonStyles.dropdown_heading} `}>
                  Select order
                </div>
                <ul
                  className={`${
                    orderIdsModal
                      ? commonStyles.optionsActive
                      : commonStyles.options
                  } `}>
                  {options?.map((option, index) => (
                    <li
                      className={`${commonStyles.option} ${
                        option?.dealCodeNumber ===
                        selectedOption?.dealCodeNumber
                          ? "bg-[#EFF5FF]"
                          : ""
                      } `}
                      key={index}
                      onClick={() => handleOptionClick(option)}>
                      <span>{option.dealCodeNumber}</span>{" "}
                      <SelectionCircle
                        showInner={
                          option?.dealCodeNumber ===
                          selectedOption?.dealCodeNumber
                        }
                      />
                    </li>
                  ))}
                </ul>
                <button
                  className={`${commonStyles.close_icon_btn}`}
                  onClick={() => {
                    setOrderIdsModal(false);
                  }}>
                  <div className={`${commonStyles.close_icon}`}>
                    <Close size={25} color={"#222222"} />
                  </div>
                </button>
              </div>
            )}
          </>
        </Modal>
      )}

      <div
        className={`${styles["custom-select"]} ${
          isOpen && !isMdScreen
            ? "md:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            : ""
        }`}
        style={{
          maxWidth,
        }}>
        <div
          className={`mt-1 rounded-xl border-[#DDDDDF] ${
            styles["selected-option"]
          } ${isOpen && !isMdScreen ? "!rounded-b-none" : ""}`}
          onClick={() => {
            setIsDDOpen(prev => !prev);
            isInitialScreen && isMdScreen && setOrderIdsModal(!orderIdsModal);
            // setCurrAddModal(prev => !prev);
            // setPerAddModal(prev => !prev);
          }}>
          <span
            className={` ${styles.selected_txt} ${
              selectedOption?.value || selectedOption?.dealCodeNumber
                ? "text-black"
                : "text-[#71717A]"
            }`}>
            {isInitialScreen
              ? selectedOption?.dealCodeNumber || "Select order"
              : selectedOption?.label || "Select an option"}
          </span>
          <div className={`${styles.ddArrow}`}>
            {isOpen && !isMdScreen ? (
              <PopUpArrow size={25} className={`${styles.pointer}`} />
            ) : (
              <DownPopUpArrow size={25} className={`${styles.pointer}`} />
            )}
          </div>
        </div>

        <ul
          className={`${isInitialScreen && styles.dropdown} ${
            isOpen ? styles.optionsActive : styles.options
          } max-h-[260px] overflow-y-scroll `}>
          {options?.map((option, index) => (
            <li
              className={`${styles.option} ${
                index === options.length - 1 ? "rounded-b-xl border-none" : ""
              } ${index === 0 ? "border-t" : ""}`}
              key={index}
              onClick={() => handleOptionClick(option)}>
              {isInitialScreen ? option?.dealCodeNumber : option?.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
