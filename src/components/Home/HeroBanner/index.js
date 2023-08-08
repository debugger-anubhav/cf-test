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
      <div className="w-[95%] mx-auto lg:hidden landing_page_carousel">
        <Carousel showStatus={false} showArrows={false} showThumbs={false}>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageOne}
              className="w-full rounded-md"
              alt="hero-banner-1"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageTwo}
              className="w-full rounded-md"
              alt="hero-banner-2"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("https://cityfurnish.com/<city>/rent")}>
            <img
              src={HeroBannerImages.HeroBannerImageThree}
              className="w-full rounded-md"
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
