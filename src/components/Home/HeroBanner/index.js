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

  console.log("nbanners", banners);
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
              <div>
                <Image src={url} alt={altText} />
              </div>
            ),
          )}
          {/* {CityWiseBannerWebsite[CityNameToId[cityName] | 0].map((item, index) => ( */}

          {/* {new Array(homepageDesktopBanners.length).fill(0).map((e, index) => (
            <div
              key={index.toString()}
              className="cursor-pointer"
              onClick={() => {
                if (homepageDesktopBanners[index].altText === "citymax") {
                  router.push(homepageDesktopBanners[index].link);
                } else {
                  router.push(
                    homePageReduxData?.cityName
                      .replace(/\//g, "-")
                      ?.toLowerCase() + homepageDesktopBanners[index].link,
                  );
                }
              }}>
              <picture>
                <source
                  media="(min-width:1850px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}`}
                />
                <source
                  media="(min-width:1660px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}?w=1850&q=60`}
                />
                <source
                  media="(min-width:1530px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}?w=1660&q=60`}
                />
                <source
                  media="(min-width:1440px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}?w=1530&q=60`}
                />
                <source
                  media="(min-width:1280px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}?w=1440&q=60`}
                />
                <source
                  media="(min-width:1023px)"
                  srcSet={`https:${homepageDesktopBanners[index].url}?w=1280&q=60`}
                />
                <source
                  media="(min-width:767px)"
                  srcSet={`https:${homepageTabBanners[index].url}?q=60`}
                />
                <source
                  media="(min-width:360px)"
                  srcSet={`https:${homepageMobileBanners[index].url}?q=60`}
                />
                <img
                  src={`https:${homepageDesktopBanners[index].url}`}
                  alt={homepageDesktopBanners[index].altText}
                  className="rounded-lg"
                />
              </picture>
            </div>
          ))} */}
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

// Website
// https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp => Home Furniture
// https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp => Appliance
// https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp => Citymax
// https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp => Discount Deals

// Mobile
// https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_1.webp => Home Furniture
// https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_2.webp => Appliance
// https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_3.webp => Citymax
// https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_4.webp => Discount Deals

// Tablet

// https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_1.webp  => Home Furniture
// https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_2.webp => Appliance
// https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_3.webp => Citymax
// https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_4.webp => Discount Deals
