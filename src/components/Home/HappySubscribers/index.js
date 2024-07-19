"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {useDispatch} from "react-redux";
import {getSubscribersVideos} from "@/store/Slices";
import Worker from "worker-loader!./happySubscribersWorker.js";

const str = string.landing_page.HappySubscriber;

const HappySubscribers = ({page, params}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isDumy, setIsDumy] = useState(false);

  useEffect(() => {
    const worker = new Worker();

    worker.onmessage = function ({data: {data, type}}) {
      setData(data);
      if (type && type === "product") {
        dispatch(getSubscribersVideos(data));
      }
    };

    worker.postMessage({page, params});

    return () => {
      worker.terminate();
    };
  }, []);

  const containerRef = useRef(null);

  const handleScrolling = () => {
    const slider = containerRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsDragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
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
    slider.addEventListener("mousemove", toggleIsDragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsDragging);
    };
  };

  if (data && data.length > 0) {
    return (
      <div
        className={`${page === "product" ? "mt-8 xl:mt-[88px]" : ""} ${
          styles.happy_subscribers_wrapper
        }`}>
        <h2 className={styles.label}>{str.label}</h2>
        <h2 className={styles.head}>{str.head}</h2>
        <p className={styles.desc}>{str.desc}</p>

        <div
          className={styles.cards_wrapper}
          ref={containerRef}
          onMouseOver={handleScrolling}>
          {data.map((item, index) => (
            <div
              className={`${styles.card_div}  ${
                index === data?.length - 1 && "mr-[16px]"
              } ${isDumy ? "pointer-events-none" : ""}`.trim()}
              key={index.toString()}>
              <div className={styles.video}>
                <iframe
                  loading="lazy"
                  width="256"
                  height="152"
                  src={item.file_name}
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
              </div>
              <h3 className={styles.video_name}>{item?.title}</h3>
              <p className={styles.video_desc}>
                {item?.description.replace(/<[^>]*>/g, "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default memo(HappySubscribers);
