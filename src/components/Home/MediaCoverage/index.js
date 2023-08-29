import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";

const MediaCoverage = () => {
  const str = string.landing_page.Media_coverage;
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 1000, // Adjust the time interval for the automatic slide
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    pauseOnHover: false,
  };

  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h1 className={styles.heading}>{str.desc}</h1>
      <Slider {...settings} className={styles.carousel}>
        {MediaCoverageImages.map((imageUrl, index) => (
          <div key={index} className={styles.slide}>
            <img src={imageUrl.img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MediaCoverage;
