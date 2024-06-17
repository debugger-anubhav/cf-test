"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {
  CityWiseBannerWebsite,
  CityNameToId,
  CityWiseBannerMobile,
  CityWiseBannerTablet,
} from "@/constants/constant";

const HeroBanner = () => {
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [showLinkForRentPage, setShowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );

  const handleRedirection = link => {
    if (showLinkForRentPage && !link.includes("citymax")) {
      router.push(
        `/${homePageReduxData?.cityName
          .replace(/\//g, "-")
          ?.toLowerCase()}${link}`,
      );
    } else {
      router.push(`${link}`);
    }
  };

  useEffect(() => {
    setShowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);

  const banners = [
    {
      data: CityWiseBannerWebsite[CityNameToId[homePageReduxData?.cityName]],
      width: "100%",
      imgWidth: 1920,
      imgHeight: 801,
      className: "lg:flex hidden",
    },

    {
      data: CityWiseBannerTablet[CityNameToId[homePageReduxData?.cityName]],
      width: "100%",
      imgWidth: 1024,
      imgHeight: 427,
      className: "hidden md:flex lg:hidden",
    },
    {
      data: CityWiseBannerMobile[CityNameToId[homePageReduxData?.cityName]],
      width: "100%",
      imgWidth: 430,
      imgHeight: 179,
      className: "flex md:hidden",
    },
  ];

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      {banners?.map((banner, index) => (
        <div
          key={index}
          className={`landing_page_carousel 
          ${banner.className}
        `}>
          <Carousel
            showStatus={false}
            showArrows={true}
            showThumbs={false}
            autoPlay
            infiniteLoop
            width={banner.width}
            swipeable>
            {banner?.data?.map((item, i) => (
              <div key={i.toString()}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    handleRedirection(item.redirectionLink);
                  }}>
                  <img
                    src={item.link}
                    alt={item.alternate}
                    className="cursor-pointer rounded-lg"
                    width={banner.imgWidth}
                    height={banner.imgHeight}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default HeroBanner;
