// import {HeroBannerText} from "@/constants/constant";
import {HeroBannerImages} from "@/assets/images";
import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";

const HeroBanner = () => {
  return (
    <>
      <div className="w-[95%] mx-auto lg:hidden">
        <Carousel showStatus={false} showArrows={false}>
          <div>
            <Image
              src={HeroBannerImages.HeroBannerImageOne}
              className="w-full rounded-md"
            />
          </div>
          <div>
            <Image
              src={HeroBannerImages.HeroBannerImageTwo}
              className="w-full rounded-md"
            />
          </div>
          <div>
            <Image
              src={HeroBannerImages.HeroBannerImageThree}
              className="w-full rounded-md"
            />
          </div>
        </Carousel>
      </div>

      <div className={styles.hero_banner_wrapper}>
        <Image
          src={HeroBannerImages.HeroFrame}
          alt="hero-banner"
          className="w-full"
        />
      </div>
    </>
  );
};
export default HeroBanner;
