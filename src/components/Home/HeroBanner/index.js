"use client";
// import {HeroBannerText} from "@/constants/constant";
import {HeroBannerImages, HeroFrame} from "@/assets/images";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
const HeroBanner = () => {
  const homePageReduxData = useSelector(state => state.homePagedata);
  return (
    <>
      <div className={`${styles.hero_banner_main} landing_page_carousel`}>
        <Carousel showStatus={false} showArrows={false} showThumbs={false}>
          <div className={styles.hero_banner_cursor_pointer}>
            <a
              href={`/${homePageReduxData?.cityName
                .replace(/\//g, "-")
                .toLowerCase()}/rent`}>
              <img
                src={HeroBannerImages.HeroBannerImageOne}
                className={styles.carousel_images}
                alt="hero-banner-1"
              />
            </a>
          </div>
          <div className={styles.hero_banner_cursor_pointer}>
            <a
              href={`/${homePageReduxData?.cityName
                .replace(/\//g, "-")
                .toLowerCase()}/rent`}>
              <img
                src={HeroBannerImages.HeroBannerImageTwo}
                className={styles.carousel_images}
                alt="hero-banner-2"
              />
            </a>
          </div>
          <div className={styles.hero_banner_cursor_pointer}>
            <a
              href={`/${homePageReduxData?.cityName
                .toLowerCase()
                .replace(/\//g, "-")
                .toLowerCase()}/rent`}>
              <img
                src={HeroBannerImages.HeroBannerImageThree}
                className={styles.carousel_images}
                alt="hero-banner-3"
              />
            </a>
          </div>
        </Carousel>
      </div>

      <div className={styles.hero_banner_wrapper}>
        <a
          href={`/${homePageReduxData?.cityName
            .toLowerCase()
            .replace(/\//g, "-")}/rent`}>
          <img
            src={HeroFrame}
            alt="hero-banner"
            className="w-full"
            loading="lazy"
          />
        </a>
      </div>
    </>
  );
};
export default HeroBanner;
