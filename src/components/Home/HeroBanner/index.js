// import {HeroBannerText} from "@/constants/constant";
import {HeroBannerImages} from "@/assets/images";
import styles from "./style.module.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const HeroBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    // customPaging: function (i) {
    //   return (
    //     <div>{i}</div>
    //   )
    // }
  };
  return (
    <div className={styles.slick_container}>
      <Slider {...settings}>
        <div>
          <Image
            src={HeroBannerImages.HeroBannerImageOne}
            width={328}
            height={150}
          />
        </div>
        <div>
          <Image
            src={HeroBannerImages.HeroBannerImageTwo}
            width={328}
            height={150}
          />
        </div>
        <div>
          <Image
            src={HeroBannerImages.HeroBannerImageThree}
            width={328}
            height={150}
          />
        </div>
      </Slider>
    </div>
  );
};
export default HeroBanner;
