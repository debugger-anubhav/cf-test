"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";
import {CityWiseBannerWebsite, CityNameToId} from "@/constants/constant";

const HeroBanner = () => {
  const router = useRouter();
  const cityName = useSelector(state => state.homePagedata.cityName);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [showLinkForRentPage, setShowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );

  const handleRedirection = link => {
    if (showLinkForRentPage) {
      router.push(link);
    }
  };

  useEffect(() => {
    setShowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      {/* web  */}
      <div className="hidden lg:flex landing_page_carousel">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {CityWiseBannerWebsite[CityNameToId[cityName] | 0].map(
            (item, index) => (
              <div key={index}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    handleRedirection(item.redirectionLink);
                  }}>
                  {console.log(item.link)}
                  <img
                    src={item.link}
                    alt={item.alternate}
                    className="cursor-pointer rounded-lg"
                    width={1920}
                    height={801}
                  />
                </div>
              </div>
            ),
          )}
        </Carousel>
      </div>

      {/* mobile  */}
      <div className="w-full md:hidden landing_page_carousel">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {CityWiseBannerWebsite[CityNameToId[cityName] | 0].map(
            (item, index) => (
              <div key={index}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    handleRedirection(item.redirectionLink);
                  }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="cursor-pointer rounded-lg"
                    width={430}
                    height={179}
                  />
                </div>
              </div>
            ),
          )}
        </Carousel>
      </div>

      {/* tablet  */}
      <div className="w-full hidden md:flex lg:hidden landing_page_carousel">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {CityWiseBannerWebsite[CityNameToId[cityName] | 0].map(
            (item, index) => (
              <div key={index}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    handleRedirection(item.redirectionLink);
                  }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="cursor-pointer rounded-lg"
                    width={1024}
                    height={427}
                  />
                </div>
              </div>
            ),
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBanner;

export const HeroBannerSkeleton = () => {
  return (
    <div className="lg:h-[600px] md:h-[350px] ms:h-[250px] h-[150px] w-full">
      <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
    </div>
  );
};

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
