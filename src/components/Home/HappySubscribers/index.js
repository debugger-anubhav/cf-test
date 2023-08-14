"use client";

import React, {useRef} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {HappySubscriber} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";

const HappySubscribers = () => {
  const str = string.landing_page.HappySubscriber;
  const videoRef = useRef(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const scrollRef = useHorizontalScroll();
  const tabBox = document.querySelector("#videoslider");
  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }
  document.addEventListener("mouseup", dragStop);

  return (
    <div className={styles.happy_subscribers_wrapper}>
      <h2 className={styles.label}>{str.label}</h2>
      <h2 className={styles.head}>{str.head}</h2>
      <p className={styles.desc}>{str.desc}</p>
      <div className={styles.cards_wrapper} ref={scrollRef} id="videoslider">
        {HappySubscriber?.map((item, index) => (
          <div className={styles.card_div} key={index.toString()}>
            <div className={styles.video}>
              <video className={styles.video_player} ref={videoRef}>
                <source src={item?.videoUrl} type="video/mp4" />
                {/* Add more <source> elements for different video formats (WebM, Ogg, etc.) */}
                Your browser does not support the video tag.
              </video>
              <div
                className={styles.play_button_container}
                onClick={() => handlePlayButtonClick()}></div>
            </div>
            <h3 className={styles.video_name}>{item?.name}</h3>
            <p className={styles.video_desc}>{item?.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HappySubscribers;
