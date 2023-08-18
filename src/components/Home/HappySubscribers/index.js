"use client";

import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {HappySubscriber} from "@/constants/constant";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
import {useDispatch, useSelector} from "react-redux";
import {getSubscribersVideos} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";

const HappySubscribers = ({page}) => {
  const dispatch = useDispatch();
  const productPageSubscribersVideos = useSelector(
    state => state.productPageData.happySubscribersVideos,
  );

  const getVideosForProductPage = () => {
    axios
      .get(baseURL + endPoints.productPage.happySubscribers)
      .then(res => {
        dispatch(getSubscribersVideos(res?.data?.data));
        console.log(res, "hhwijwoijeijwoijeiji");
      })
      .catch(err => {
        console.log(err);
        dispatch(getSubscribersVideos([]));
      });
  };

  useEffect(() => {
    getVideosForProductPage();
  }, []);

  const str = string.landing_page.HappySubscriber;
  // const videoRef = useRef(null);

  // const handlePlayButtonClick = ({data}) => {
  //   window.location.href = data;
  //   // videoRef.current.play();
  // };

  const scrollRef = useHorizontalScroll();
  // const tabBox = document.querySelector("#videoslider");
  const tabBox =
    typeof document !== "undefined"
      ? document.querySelector("#videoslider")
      : null;
  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    // tabBox.scrollLeft -= e.movementX;
    if (tabBox) tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }
  useEffect(() => {
    document.addEventListener("mouseup", dragStop);
  }, []);

  const HappySubscriberVideosArray =
    page === "product" ? productPageSubscribersVideos : HappySubscriber;

  console.log(HappySubscriberVideosArray, "HappySubscriberVideosArray");

  return (
    <div className={styles.happy_subscribers_wrapper}>
      <h2 className={styles.label}>{str.label}</h2>
      <h2 className={styles.head}>{str.head}</h2>
      <p className={styles.desc}>{str.desc}</p>
      <div className={styles.cards_wrapper} ref={scrollRef} id="videoslider">
        {HappySubscriber?.map((item, index) => (
          <div className={styles.card_div} key={index.toString()}>
            <div className={styles.video}>
              {/* <video className={styles.video_player} ref={videoRef}>
                <source src={item.file_name} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <iframe
                width="256"
                height="152"
                src="https://www.youtube.com/embed/KAc3AEpQNSs?list=PLRheCL1cXHrtUJKNwE4Ksn6JEpOx5W_ye"
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
              {/* <div
                className={styles.play_button_container}
                onClick={() => handlePlayButtonClick(item.file_name)}></div> */}
            </div>
            <h3 className={styles.video_name}>{item?.title}</h3>
            <p className={styles.video_desc}>{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HappySubscribers;
