"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";

const HeroBanner = () => {
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [showLinkForRentPage, setShowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );
  const bannersData = [
    {
      images: [
        {
          srcWeb:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp",
          alt: "bed-room",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-furniture-rental`,
          srcMob:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_1.webp",
          srcTab:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_1.webp ",
        },
        {
          srcWeb:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp",
          alt: "appliances",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-appliances-rental`,
          srcMob:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_2.webp ",
          srcTab:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_2.webp ",
        },
        {
          srcWeb:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp",
          alt: "citymax",
          redirectionLink: "/citymax",
          srcMob:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_3.webp",
          srcTab:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_3.webp",
        },
        {
          srcWeb:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp",
          alt: "discount-deals",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/discount-deals`,
          srcMob:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_4.webp",
          srcTab:
            "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_4.webp",
        },
      ],
    },
  ];

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
      <div className="landing_page_carousel">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {bannersData[0].images.map((item, index) => (
            <div key={index}>
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  handleRedirection(item.redirectionLink);
                }}>
                <picture>
                  <source media="(min-width:1024px)" srcSet={item.srcWeb} />
                  <source media="(min-width:460px)" srcSet={item.srcTab} />
                  <source media="(min-width:260px)" srcSet={item.srcMob} />
                  <img
                    src={item.srcMob}
                    alt={item.alt}
                    className="w-full rounded-lg cursor-pointer"
                  />
                </picture>
              </div>
            </div>
          ))}
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
