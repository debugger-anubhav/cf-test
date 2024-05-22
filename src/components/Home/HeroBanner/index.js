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
      // web
      images: [
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp",
          alt: "bed-room",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-furniture-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp",
          alt: "appliances",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-appliances-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp",
          alt: "citymax",
          redirectionLink: "/citymax",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp",
          alt: "discount-deals",
          redirectionLink: `/${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/discount-deals`,
        },
      ],
    },
    // mobile
    {
      images: [
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_1.webp",
          alt: "bed-room",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-furniture-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_2.webp ",
          alt: "appliances",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-appliances-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_3.webp",
          alt: "citymax",
          redirectionLink: "/citymax",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_4.webp",
          alt: "discount-deals",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/discount-deals`,
        },
      ],
    },
    // tablet
    {
      images: [
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_1.webp ",
          alt: "bed-room",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-furniture-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_2.webp ",
          alt: "appliances",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/home-appliances-rental`,
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_3.webp",
          alt: "citymax",
          redirectionLink: "/citymax",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_tab_banner_4.webp",
          alt: "discount-deals",
          redirectionLink: `${homePageReduxData?.cityName
            .replace(/\//g, "-")
            ?.toLowerCase()}/discount-deals`,
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
      <div className="w-full hidden lg:flex">
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
                <img
                  src={item.src}
                  alt={item.alt}
                  className="cursor-pointer rounded-lg"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full md:hidden">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {bannersData[1].images.map((item, index) => (
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
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full hidden md:flex lg:hidden">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {bannersData[2].images.map((item, index) => (
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
                />
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
