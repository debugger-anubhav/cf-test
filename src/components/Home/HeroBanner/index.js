"use client";
import {HeroBannerImages} from "@/assets/images";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const HeroBanner = () => {
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const handleRedirection = () => {
    router.push(
      `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/rent`,
    );
  };
  return (
    <div>
      <div className={`${styles.hero_banner_main} landing_page_carousel`}>
        <Carousel showStatus={false} showArrows={false} showThumbs={false}>
          <div
            className={styles.hero_banner_cursor_pointer}
            onClick={() => {
              handleRedirection();
            }}>
            <img
              src={HeroBannerImages.HeroBannerImageOne}
              className={styles.carousel_images}
              alt="hero-banner-1"
            />
          </div>
          <div
            className={styles.hero_banner_cursor_pointer}
            onClick={() => {
              handleRedirection();
            }}>
            <img
              src={HeroBannerImages.HeroBannerImageTwo}
              className={styles.carousel_images}
              alt="hero-banner-2"
            />
          </div>
          <div className={styles.hero_banner_cursor_pointer}>
            <img
              src={HeroBannerImages.HeroBannerImageThree}
              className={styles.carousel_images}
              alt="hero-banner-3"
            />
          </div>
        </Carousel>
      </div>

      <div className={styles.hero_banner_wrapper}>
        <a
          href={`/${homePageReduxData?.cityName
            .toLowerCase()
            .replace(/\//g, "-")}/rent`}>
          <img
            src={
              "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/hero-banner-main.webp"
            }
            alt="hero-banner"
            width={"100%"}
            height={"100%"}
          />
        </a>
      </div>
    </div>
  );
};
export default HeroBanner;
