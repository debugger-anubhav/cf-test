"use client";
// import {HeroBannerText} from "@/constants/constant";
import {HeroBannerImages, HeroFrame} from "@/assets/images";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";
const HeroBanner = () => {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.hero_banner_main} landing_page_carousel`}>
        <Carousel showStatus={false} showArrows={false} showThumbs={false}>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageOne}
              className={styles.carousel_images}
              alt="hero-banner-1"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageTwo}
              className={styles.carousel_images}
              alt="hero-banner-2"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageThree}
              className={styles.carousel_images}
              alt="hero-banner-3"
            />
          </div>
        </Carousel>
      </div>

      <div className={styles.hero_banner_wrapper}>
        <img src={HeroFrame} alt="hero-banner" className="w-full" />
      </div>
    </>
  );
};
export default HeroBanner;
