"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
// import {HappySubscriber} from "@/constants/constant";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
import {useDispatch} from "react-redux";
import {getSubscribersVideos} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";

const HappySubscribers = ({page, params}) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const [isDumy] = React.useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.scrollLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = e => {
    if (!isDragging) return;

    const x = e.pageX - containerRef.current.getBoundingClientRect().left;
    const distance = x - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const getVideosForProductPage = () => {
    axios
      .get(baseURL + endPoints.productPage.happySubscribers(params.productId))
      .then(res => {
        dispatch(getSubscribersVideos(res?.data?.data));
        setData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
        dispatch(getSubscribersVideos([]));
      });
  };
  const getVideosForHomePage = () => {
    axios
      .get(baseURL + endPoints.homePageHappySubscriber)
      .then(res => {
        setData(res?.data?.data);
        // console.log("home")
      })
      .catch(err => {
        console.log(err);
        dispatch(getSubscribersVideos([]));
      });
  };
  const getVideosForSeoAppliancesPage = () => {
    axios
      .get(baseURL + endPoints.seoApplianceHappyCustomer)
      .then(res => {
        setData(res?.data?.data);
        // console.log("appliances-rental")
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getVideosForSeoFurniturePage = () => {
    axios
      .get(baseURL + endPoints.seoFurnitureHappyCustomer)
      .then(res => {
        setData(res?.data?.data);
        // console.log("furniture-rental")
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getVideosForCategoryPage = () => {
    axios
      .get(baseURL + endPoints.categoryHappySubscriber(params))
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (page === "home-page") {
      getVideosForHomePage();
    } else if (page === "product") {
      getVideosForProductPage();
    } else if (page === "appliances-rental") {
      getVideosForSeoAppliancesPage();
    } else if (page === "category") {
      getVideosForCategoryPage();
    } else if (page === "furniture-rental") {
      getVideosForSeoFurniturePage();
    } else {
      getVideosForHomePage();
    }
  }, []);

  const str = string.landing_page.HappySubscriber;

  if (data?.length > 0) {
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}>
          {data?.map((item, index) => (
            <div
              className={`${styles.card_div}  ${
                index === data?.length - 1 && "mr-[16px]"
              } ${isDumy && "pointer-events-none"}`}
              key={index.toString()}>
              <div className={styles.video}>
                {/* <video className={styles.video_player} ref={videoRef}>
                <source src={item.file_name} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
                <iframe
                  width="256"
                  height="152"
                  // src="https://www.youtube.com/embed/KAc3AEpQNSs?list=PLRheCL1cXHrtUJKNwE4Ksn6JEpOx5W_ye"
                  src={item.file_name}
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
                {/* <div
                className={styles.play_button_container}
                onClick={() => handlePlayButtonClick(item.file_name)}></div> */}
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
  }
};
export default HappySubscribers;
