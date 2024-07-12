"use client";
import React, {Fragment, useEffect, useMemo, useRef, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {CldImage} from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
import {CityNameToId, getLocalStorage} from "@/constants/constant";

const getCityPrimaryBanner = city => {
  switch (city) {
    case "Bangalore":
      return "bangalore_summer_sale_banner_lzwcwn";

    case "Delhi":
    case "Gurgaon":
    case "Ghaziabad/Noida":
    case "Faridabad":
      return "delhi_summer_sale_banner_gsg9kc";

    case "Pune":
      return "pune_summer_sale_banner_xao8d9";

    case "Mumbai":
      return "mumbai_summer_sale_banner_waoik6";

    case "Hyderabad":
      return "hyderabad_summer_sale_banner_chv8bp";
  }
};

const banners = [
  {
    url: "appliance_banner_llwnir",
    link: "/home-appliances-rental",
  },
  {
    url: "citymax_banner_os9nbn",
    link: "/citymax",
  },
  {
    url: "discount_deals_banner_q7vjac",
    link: "/discount-deals",
  },
];

const HeroBanner = () => {
  const city = CityNameToId[getLocalStorage("cityId")];

  const {cityName, showAllRentLink} =
    useSelector(state => state.homePagedata) || {};

  const [showLinkForRentPage, setShowLinkForRentPage] =
    useState(showAllRentLink);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerId = useRef(undefined);

  const completeBanners = useMemo(() => {
    if (cityName) {
      return [
        {
          url: getCityPrimaryBanner(city),
          link: "/home-furniture-rental",
        },
        ...banners,
      ];
    } else {
      return [...banners];
    }
  }, [cityName]);

  useEffect(() => {
    setShowLinkForRentPage(showAllRentLink);
  }, [showAllRentLink]);

  useEffect(() => {
    if (completeBanners.length !== banners.length) {
      setCurrentIndex(0);
      timerId.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % completeBanners.length);
      }, 3000);
    } else {
      console.log("i can start timer");
      setCurrentIndex(1);
    }

    return () => clearInterval(timerId.current);
  }, [completeBanners]);

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      {completeBanners && (
        <div className="landing_page_carousel">
          <Carousel
            showStatus={false}
            showArrows
            showThumbs={false}
            selectedItem={currentIndex}
            onChange={index => setCurrentIndex(index)}
            swipeable
            width={"100%"}>
            {completeBanners.map(({url, link}) => {
              const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1920,h_800/${url}`;
              return (
                <Fragment key={link}>
                  <Head>
                    <link
                      rel="preload"
                      href={cloudinaryUrl}
                      as="image"
                      type="image/webp"
                    />
                  </Head>
                  <Link
                    href={
                      showLinkForRentPage && !link.includes("citymax")
                        ? `${cityName
                            .replace(/\//g, "-")
                            ?.toLowerCase()}${link}`
                        : link
                    }>
                    <CldImage
                      src={url}
                      alt={""}
                      sizes="(max-width: 640px) 100vw,
                     (max-width: 768px) 75vw,
                     (max-width: 1024px) 50vw,
                     1920px"
                      width={1920}
                      improve={"50"}
                      height={800}
                      crop="scale"
                      quality="auto:best"
                      priority
                      className="cursor-pointer rounded-lg"
                      style={{pointerEvents: "all"}}
                    />
                  </Link>
                </Fragment>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
