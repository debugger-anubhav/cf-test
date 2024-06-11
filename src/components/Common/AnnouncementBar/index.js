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
            <span className="font-bold pl-1" style={{color: "black"}}>
              {string.landing_page.announcement_bar}
            </span>
            <span className="font-bold pl-1" style={{color: "#2581F7"}}>
              &apos;{string.landing_page.coupon_code}&apos;
            </span>
          </div>
          <div
            className={styles.announcement_close_icon}
            onClick={() => dispatch(setAnnouncementBar(true))}>
            <Close size={20} color={"#fff"} className="cursor-pointer" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AnnouncementBar;
