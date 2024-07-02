"use client";
import React, {Fragment, useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
// import {useRouter} from "next/navigation";
// import {
//   CityWiseBannerWebsite,
//   CityNameToId,
//   CityWiseBannerMobile,
//   CityWiseBannerTablet,
// } from "@/constants/constant";
// import Image from "@/components/Image";
import {CldImage} from "next-cloudinary";
import Head from "next/head";

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
  // const router = useRouter();
  const {cityName} = useSelector(state => state.homePagedata) || {};
  // const [showLinkForRentPage, setShowLinkForRentPage] =
  //   useState(showAllRentLink);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleRedirection = link => {
  //   if (showLinkForRentPage && !link.includes("citymax")) {
  //     router.push(`/${cityName.replace(/\//g, "-")?.toLowerCase()}${link}`);
  //   } else {
  //     router.push(`${link}`);
  //   }
  // };

  // useEffect(() => {
  //   setShowLinkForRentPage(showAllRentLink);
  // }, [showAllRentLink]);

  // const banners = [
  //   {
  //     data: CityWiseBannerWebsite[CityNameToId[cityName]],
  //     width: "100%",
  //     imgWidth: 1920,
  //     imgHeight: 801,
  //     className: "lg:flex hidden",
  //   },
  //   {
  //     data: CityWiseBannerTablet[CityNameToId[cityName]],
  //     width: "100%",
  //     imgWidth: 1024,
  //     imgHeight: 427,
  //     className: "hidden md:flex lg:hidden",
  //   },
  //   {
  //     data: CityWiseBannerMobile[CityNameToId[cityName]],
  //     width: "100%",
  //     imgWidth: 430,
  //     imgHeight: 179,
  //     className: "flex md:hidden",
  //   },
  // ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex(prevIndex => (prevIndex + 1) % banners[0]?.data?.length);
  //   }, 3000); // Change the interval time as needed

  //   return () => clearInterval(interval);
  // }, [banners]);

  const banners = [
    getCityPrimaryBanner(cityName),
    "new_rt_banner_12_j4kmxj",
    "new_rt_banner_2_yfcaa6",
    "new_rt_banner_13_duh0dl",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners?.length);
    }, 3000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, []);

  if (!cityName) {
    return null;
  } else {
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
          {banners.map(link => {
            const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1920,h_800/${link}`;
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
                <CldImage
                  src={link}
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
                />
              </Fragment>
            );
          })}
        </Carousel>
      </div>
    );
  }
};

export default HeroBanner;
