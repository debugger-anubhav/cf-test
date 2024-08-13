import React, {memo} from "react";
import styles from "../style.module.css";
import {BackIcon, ForwardArrow, InformationIcon} from "@/assets/icon";

const ModalContentForAdditionalSupport = ({problemType, setModalCategory}) => {
  return (
    <div>
      <div className={styles.header_wrapper}>
        <div onClick={() => setModalCategory("resendOtp")}>
          <BackIcon className={styles.back_arrow} />
        </div>
        <h1 className={styles.head}>Want additional support?</h1>
      </div>
      <div>
        {problemType === 1 ? (
          <div className={styles.info_div}>
            <InformationIcon color={"#71717A"} className={styles.info_icon} />
            <p className={styles.info_txt}>
              Sometimes the OTP message may get filtered into your{" "}
              <span className={styles.info_bold}>spam</span> or{" "}
              <span className={styles.info_bold}>junk</span> folder. Please take
              a moment to check those folders.
            </p>
          </div>
        ) : (
          <div className="h-2 w-full"></div>
        )}

        <div className="mt-6">
          <div
            className={styles.flex_prop}
            onClick={() => setModalCategory("changeNumber")}>
            <p className={styles.blue_txt}>Change number</p>
            <ForwardArrow size={24} className={styles.icon} />
          </div>

          <div className={styles.line}></div>

          <div>
            <p className={styles.blue_txt}>Contact Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalContentForAdditionalSupport);
