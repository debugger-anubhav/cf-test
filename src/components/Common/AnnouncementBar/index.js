// "use client"
import React, {memo} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useDispatch, useSelector} from "react-redux";
import {setAnnouncementBar} from "@/store/Slices";
const AnnouncementBar = () => {
  const dispatch = useDispatch();
  const closeBar = useSelector(state => state.homePagedata.announcementBar);

  return (
    <>
      {!closeBar ? (
        <div className={styles.announcement_bar_wrapper}>
          <div className={styles.announcement_bar_text}>
            <img
              src="https://d3juy0zp6vqec8.cloudfront.net/images/icn-indian-flag.webp"
              // src="https://d3juy0zp6vqec8.cloudfront.net/images/sun.webp"
              alt="sun"
              className={"xs:w-[22px] xs:h-[22px] w-[16px] h-[16px]"}
              loading="lazy"
            />
            <span className=" px-1 flex">
              {string.landing_page.announcement_bar}
              <span>
                <img
                  // src="https://d3juy0zp6vqec8.cloudfront.net/images/beach.webp"
                  src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                  alt="beach"
                  className={`${styles.icons_style} mx-1`}
                  loading="lazy"
                />
              </span>
              Code:
            </span>
            <span className="px-[2px] text-[#000080] font-Poppins font-medium">
              {/* <span className="px-[2px] text-[#103DB2]"> */}
              {string.landing_page.coupon_code}
            </span>
          </div>
          <div
            className={styles.announcement_close_icon}
            onClick={() => dispatch(setAnnouncementBar(true))}>
            <Close size={20} color={"#000"} className="cursor-pointer" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(AnnouncementBar);
