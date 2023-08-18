"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {HappySubscriber} from "@/constants/constant";

const HappySubscribers = () => {
  const str = string.landing_page.HappySubscriber;
  const videoRef = useRef(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = function () {
      mouseDown = false;
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
  }, []);

  return (
    <div className={styles.happy_subscribers_wrapper}>
      <h2 className={styles.label}>{str.label}</h2>
      <h2 className={styles.head}>{str.head}</h2>
      <p className={styles.desc}>{str.desc}</p>
      <div className={styles.cards_wrapper} ref={sliderRef}>
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
