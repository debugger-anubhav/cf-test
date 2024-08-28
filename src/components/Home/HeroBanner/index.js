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
    case "Delhi":
    case "Gurgaon":
    case "Faridabad":
    case "Pune":
    case "Mumbai":
    case "Hyderabad":
      return "freedom_sale_banner_gnirlr.webp";
    case "Ghaziabad/Noida":
      return "freedom_sale_ghz_noida_banner_dzomhm.webp";
    default:
      return null;
  }
};

const banners = [
  {
    url: "appliance_banner_llwnir.webp",
    link: "/home-appliances-rental",
  },
  {
    url: "citymax_banner_os9nbn.webp",
    link: "/citymax",
  },
  {
    url: "discount_deals_banner_q7vjac.webp",
    link: "/discount-deals",
  },
];

const HeroBanner = () => {
  const city = CityNameToId[getLocalStorage("cityId")];

  const {cityName, showAllRentLink} = useSelector(state => state.homePagedata);

  const [showLinkForRentPage, setShowLinkForRentPage] =
    useState(showAllRentLink);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerId = useRef(undefined);

  const dynamicBanner = useMemo(() => {
    return cityName
      ? {
          url: getCityPrimaryBanner(city),
          link: "/home-furniture-rental",
        }
      : null;
  }, [cityName]);

  const completeBanners = useMemo(() => {
    return dynamicBanner ? [dynamicBanner, ...banners] : [...banners];
  }, [dynamicBanner]);

  useEffect(() => {
    setShowLinkForRentPage(showAllRentLink);
  }, [showAllRentLink]);

  useEffect(() => {
    setCurrentIndex(0);

    if (completeBanners.length > 1) {
      timerId.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % completeBanners.length);
      }, 3000);
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
            {completeBanners.map(({url, link}, index) => {
              const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1920,h_800/${url}`;
              const isFirst = index === 0;

              return (
                <Fragment key={link}>
                  {isFirst && (
                    <Head>
                      <link
                        rel="preload"
                        href={cloudinaryUrl}
                        as="image"
                        type="image/webp"
                      />
                    </Head>
                  )}
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
                      //   sizes="(max-width: 640px) 100vw,
                      //  (max-width: 768px) 75vw,
                      //  (max-width: 1024px) 50vw,
                      //  1920px"
                      width={1920}
                      height={800}
                      crop="scale"
                      quality={
                        typeof window !== "undefined"
                          ? window.innerWidth <= 768
                            ? "auto:low"
                            : "auto:best"
                          : "auto:best"
                      }
                      priority={isFirst}
                      loading={isFirst ? "eager" : "lazy"}
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
