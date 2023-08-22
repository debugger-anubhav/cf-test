"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {endPoints} from "@/network/endPoints";
import {addHappySubscriber} from "@/store/Slices/categorySlice";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";

const HappySubscribers = () => {
  const str = string.landing_page.HappySubscriber;
  const videoRef = useRef(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const {refetch: getHappySubscriber} = useQuery(
    "happy-subscriber",
    endPoints.categoryHappySubscriber,
    // `?parentCategoryId=${homePageReduxData?.productName?.rootID}`,
    `?parentCategoryId=14`,
  );
  const text = "placeholder placeholder placeholder";
  const nameText = "Name | Profession";

  useEffect(() => {
    getHappySubscriber()
      .then(res => {
        dispatch(addHappySubscriber(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  const data = categoryPageReduxData?.happySucbscriber;

  return (
    <div className={styles.happy_subscribers_wrapper}>
      <h2 className={styles.label}>{str.label}</h2>
      <h2 className={styles.head}>{str.head}</h2>
      <p className={styles.desc}>{str.desc}</p>
      <div className={styles.cards_wrapper}>
        {/* {HappySubscriber?.map((item, index) => { */}
        {data?.map((item, index) => {
          // console.log(item, "itemsss")
          return (
            <div className={styles.card_div} key={index.toString()}>
              <div className={styles.video}>
                <video className={styles.video_player} ref={videoRef}>
                  <source src={item?.file_name} type="video/mp4" />
                  {/* Add more <source> elements for different video formats (WebM, Ogg, etc.) */}
                  Your browser does not support the video tag.
                </video>
                <div
                  className={styles.play_button_container}
                  onClick={() => handlePlayButtonClick()}></div>
              </div>
              {/* <h3 className={styles.video_name}>{item?.name}</h3> */}
              <h3 className={styles.video_name}>{nameText}</h3>
              {/* <p className={styles.video_desc}>{item?.desc}</p> */}
              <p className={styles.video_desc}>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HappySubscribers;
