"use client";

import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";

const RentNowBanner = () => {
  const router = useRouter();
  const [rentNowBanner, setRentNowBanner] = React.useState(null);

  const {refetch: getRentNowBanners} = useQuery(
    "rentNowBanners",
    endPoints.rentNowBanners,
  );
  useEffect(() => {
    getRentNowBanners()
      .then(res => {
        setRentNowBanner(res?.data?.data);
      })
      .catch(err => console.log(err));
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
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={styles.banner_card} ref={sliderRef}>
        {rentNowBanner?.map((item, index) => (
          <div className={styles.banner_wrapper} key={index.toString()}>
            <img
              src={`https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/${item?.image}`}
              alt={item?.image}
              className={styles.banner_img}
              onClick={() => router.push(item?.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentNowBanner;

export const RentNowBannersSkeleton = () => {
  return (
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={styles.banner_card}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div className={styles.banner_wrapper} key={index.toString()}>
            <Skeleton variant="rectangular" className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
