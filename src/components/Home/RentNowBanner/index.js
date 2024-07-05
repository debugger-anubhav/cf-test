"use client";

import React, {memo, useEffect, useRef} from "react";
import styles from "./style.module.css";
import {Skeleton} from "@mui/material";
import RentNowCard from "@/components/Common/RentNowCards";
import Worker from "worker-loader!./rentNowBannerWorker.js";

const RentNowBanner = ({params}) => {
  const [rentNowBanner, setRentNowBanner] = React.useState([]);
  const [isDumy, setIsDumy] = React.useState(false);

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = function ({data: {rentNowBanners}}) {
      setRentNowBanner(rentNowBanners);
    };

    worker.postMessage({params});

    return () => {
      worker.terminate();
    };
  }, []);

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
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
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
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  return (
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={styles.banner_card} ref={sliderRef}>
        {rentNowBanner?.map(({image, url}, index) => (
          <div
            className={`${
              index === rentNowBanner?.length - 1 ? "mr-[16px]" : ""
            } ${isDumy ? "pointer-events-none" : ""}`.trim()}
            key={index.toString()}>
            <RentNowCard
              cardImage={`https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/${image}`}
              url={url}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentNowBanner;

export const RentNowBannersSkeleton = memo(() => {
  return (
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={`${styles.banner_card_skeleton} `}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            className={styles.banner_wrapper_skeleton}
            key={index.toString()}>
            <Skeleton
              variant="rectangular"
              className={styles.skeleton_box}
              width={"100%"}
              height={"100%"}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
