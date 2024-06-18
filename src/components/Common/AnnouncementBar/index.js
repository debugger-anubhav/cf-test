// "use client"
import React from "react";
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
              src="https://d3juy0zp6vqec8.cloudfront.net/images/beach.webp"
              alt="beach"
              className={styles.icons_style}
            />
            <span className=" px-1 text-222">
              {string.landing_page.announcement_bar}
            </span>
            <span className="px-1 text-[#2581F7]">
              {string.landing_page.coupon_code}
            </span>
            <img
              src="https://d3juy0zp6vqec8.cloudfront.net/images/sun.webp"
              alt="sun"
              className={styles.icons_style}
            />
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

export default AnnouncementBar;
