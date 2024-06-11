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
  // const cityName = useSelector(state => state.homePagedata.cityName);
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
          {CityWiseBannerWebsite[
            CityNameToId[homePageReduxData?.cityName]
          ]?.map((item, index) => {
            return (
              <div key={index.toString()}>
                <div
                  className="flex cursor-pointer"
                  onClick={() => {
                    handleRedirection(item.redirectionLink);
                  }}>
                  <img
                    src={item.link}
                    alt={item.alternate}
                    className="cursor-pointer rounded-lg"
                    width={1920}
                    height={801}
                  />
                </div>
              </div>
            );
          })}
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
          {CityWiseBannerMobile[CityNameToId[homePageReduxData?.cityName]]?.map(
            (item, index) => {
              return (
                <div key={index.toString()}>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => {
                      handleRedirection(item.redirectionLink);
                    }}>
                    <img
                      src={item.link}
                      alt={item.alternate}
                      className="cursor-pointer rounded-lg"
                      width={430}
                      height={179}
                    />
                  </div>
                </div>
              );
            },
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
          {CityWiseBannerTablet[CityNameToId[homePageReduxData?.cityName]]?.map(
            (item, index) => {
              return (
                <div key={index.toString()}>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => {
                      handleRedirection(item.redirectionLink);
                    }}>
                    <img
                      src={item.link}
                      alt={item.alternate}
                      className="cursor-pointer rounded-lg"
                      width={1024}
                      height={427}
                    />
                  </div>
                </div>
              );
            },
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBanner;
