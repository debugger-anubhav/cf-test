"use client";
import {HeroBannerImages} from "@/assets/images";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Image from "next/image";

const HeroBanner = () => {
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [setshowLinkForRentPage, setSetshowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );
  const handleRedirection = () => {
    if (setshowLinkForRentPage) {
      router.push(
        `/${homePageReduxData?.cityName
          .replace(/\//g, "-")
          .toLowerCase()}/rent`,
      );
    }
  };

  useEffect(() => {
    setSetshowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);

  return (
    <div>
      <div className={`${styles.hero_banner_main} landing_page_carousel`}>
        <Carousel showStatus={false} showArrows={false} showThumbs={false}>
          <div
            className={styles.hero_banner_cursor_pointer}
            onClick={() => {
              handleRedirection();
            }}>
            <Image
              src={HeroBannerImages.HeroBannerImageOne}
              width={656}
              height={298}
              loading="eager"
              className={styles.carousel_images}
              alt="hero-banner-1"
            />
          </div>
          <div
            className={styles.hero_banner_cursor_pointer}
            onClick={() => {
              handleRedirection();
            }}>
            <Image
              src={HeroBannerImages.HeroBannerImageTwo}
              width={656}
              height={298}
              loading="eager"
              className={styles.carousel_images}
              alt="hero-banner-2"
            />
          </div>
          <div className={styles.hero_banner_cursor_pointer}>
            <Image
              src={HeroBannerImages.HeroBannerImageThree}
              className={styles.carousel_images}
              width={656}
              height={298}
              loading="eager"
              alt="hero-banner-3"
            />
          </div>
        </Carousel>
      </div>

      <div className={styles.hero_banner_wrapper}>
        <a
          href={
            setshowLinkForRentPage
              ? `/${homePageReduxData?.cityName
                  .toLowerCase()
                  .replace(/\//g, "-")}/rent`
              : "/"
          }>
          <Image
            src={
              "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/hero-banner-main.webp"
            }
            alt="hero-banner"
            width={1788}
            height={746}
            loading="eager"
          />
        </a>
      </div>
    </div>
  );
};
export default HeroBanner;
