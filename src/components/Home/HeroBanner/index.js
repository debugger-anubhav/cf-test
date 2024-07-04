"use client";
import React, {Fragment, useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {CldImage} from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";

const getCityPrimaryBanner = city => {
  switch (city) {
    case "Bangalore":
      return "new_wb_banner_bangalore_fqfx3d";

    case "Delhi":
    case "Gurgaon":
    case "Ghaziabad/Noida":
    case "Faridabad":
      return "new_wb_banner_delhi_mit6xx";

    case "Pune":
      return "new_wb_banner_pune_ihwjzy";

    case "Mumbai":
      return "new_wb_banner_mumbai_gdna1p";

    case "Hyderabad":
      return "new_wb_banner_hyderabad_kvnyyv";
  }
};

const HeroBanner = () => {
  const {cityName, showAllRentLink} =
    useSelector(state => state.homePagedata) || {};

  const [showLinkForRentPage, setShowLinkForRentPage] =
    useState(showAllRentLink);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([
    {
      url: "new_rt_banner_12_j4kmxj",
      link: "/home-appliances-rental",
    },
    {
      url: "new_rt_banner_2_yfcaa6",
      link: "/citymax",
    },
    {
      url: "new_rt_banner_13_duh0dl",
      link: "/discount-deals",
    },
  ]);

  useEffect(() => {
    setShowLinkForRentPage(showAllRentLink);
  }, [showAllRentLink]);

  useEffect(() => {
    if (cityName) {
      setBanners([
        {
          url: getCityPrimaryBanner(cityName),
          link: "/home-furniture-rental",
        },
        ...banners,
      ]);
    }
  }, [cityName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      <Carousel
        showStatus={false}
        showArrows
        showThumbs={false}
        selectedItem={currentIndex}
        onChange={index => setCurrentIndex(index)}
        swipeable
        width={"100%"}>
        {banners.map(({url, link}) => {
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
                    ? `${cityName.replace(/\//g, "-")?.toLowerCase()}${link}`
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
                  height={800}
                  crop="scale"
                  quality="auto"
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
  );
};

export default HeroBanner;
