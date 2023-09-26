import React from "react";
import styles from "./KYC10.module.css";
import commonStyles from "../common.module.css";
import DropDown from "../DropDown/DropDown";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";
import Image from "next/image";
import {Box, Modal, Typography} from "@mui/material";
import {Close} from "@/assets/icon";

// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// let src;
// if (typeof window !== "undefined") {
//   src = window.screen.availWidth;
// } else {
//   src = 767;
// }
const KYC10 = () => {
  const [deleteIconClick, setDeleteIconClick] = React.useState(true);
  // const [windowWidth, setWindowWidth] = useState(src);
  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("resize", () => {
  //       setWindowWidth(window.screen.availWidth);
  //     });
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("resize", () => {
  //         console.log("Removed Event ");
  //       });
  //     }
  //   };
  // }, []);

  // const toggleDrawer = (anchor, open) => event => {
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setState({...state, [anchor]: open});
  // };

  return (
    <div>
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
      <div className={`${styles.formInputFirst}`}>
        <DropDown options={[]} />
      </div>
      <div className={`${styles.formInputSecond}`}>
        <input
          type="text"
          className={`${commonStyles.basicInputStyles}`}
          placeholder="Enter PAN number"
        />
      </div>
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Date of Birth (DD-MM-YYYY)
        </span>
      </div>
      <div className={`${styles.formInputThird}`}>
        <input
          type="text"
          className={`${commonStyles.basicInputStyles}`}
          placeholder="DD-MM-YYYY"
        />
      </div>
      <div>
        <div className={`${styles.formTermsSection}`}>
          <input type="checkbox" className={`${commonStyles.basicCheckBox}`} />
          <span className={`${commonStyles.termsTxt}`}>
            &nbsp;I accept &nbsp;
          </span>
          <span className={`${commonStyles.termsTxt} text-[#5774AC] underline`}>
            &nbsp;Terms and Conditions
          </span>
        </div>
      </div>
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            disabled
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Save & proceed</span>
            <Image src={forwardArrow} alt="Forward Arrow Icon" />
          </button>
        </div>
      </div>
      {/* <SwipeableDrawer
        // classes={{
        //   paper:
        //     mobileCityDrawer && DrawerName !== "menu" && styles.bottomDrawer,
        // }}
        anchor={windowWidth < 767 ? "bottom" : "right"}
        className=""
        open={true}
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
        <div>Hola</div>
      </SwipeableDrawer> */}
      <Modal
        open={deleteIconClick}
        onClose={() => setDeleteIconClick(false)}
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
                    onClick={() => setDeleteIconClick(false)}>
                    Cancel
                  </button>
                  <button
                    className={styles.confirm_delete_btn}
                    onClick={() => {
                      // remove();
                    }}>
                    Yes, Delete
                  </button>
                </Box>
              </div>
              <button
                className={`${styles.close_icon_btn}`}
                onClick={() => {
                  setDeleteIconClick(false);
                }}>
                <div className={`${styles.close_icon}`}>
                  <Close size={25} color={"#222222"} />
                </div>
              </button>
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KYC10;
