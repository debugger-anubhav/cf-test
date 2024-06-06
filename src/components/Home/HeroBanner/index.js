"use client";
import React, {memo} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
// import {useSelector} from "react-redux";
// import {useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";
import {useSelector} from "react-redux";
import Image from "@/components/Image/Image";
// import {
//   CityWiseBannerWebsite,CityNameToId
// } from "@/constants/constant";

const HeroBanner = () => {
  const {
    contentful: {banners},
  } = useSelector(state => state);

  // const router = useRouter();

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      <div className="landing_page_carousel">
        <Carousel
          showStatus={false}
          showArrows
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {banners?.map(
            ({altText, identifier, mediaData: {url}, order, redirectUrl}) => (
              <Image src={url} alt={altText} key={altText} />
            ),
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBanner;

export const HeroBannerSkeleton = memo(() => {
  return (
    <div className="lg:h-[600px] md:h-[350px] ms:h-[250px] h-[150px] w-full">
      <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
    </div>
  );
});
