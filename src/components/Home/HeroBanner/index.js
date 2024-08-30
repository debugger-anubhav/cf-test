"use client";
import React, {Fragment, useEffect, useMemo, useRef, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {CldImage} from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
// import {CityNameToId, getLocalStorage} from "@/constants/constant";

// const getCityPrimaryBanner = city => {
//   switch (city) {
//     case "Bangalore":
//       return "freedom_sale_banner_gnirlr.webp";

//     case "Delhi":
//     case "Gurgaon":
//     case "Faridabad":
//       return "freedom_sale_banner_gnirlr.webp";

//     case "Ghaziabad/Noida":
//       return "freedom_sale_ghz_noida_banner_dzomhm.webp";

//     case "Pune":
//       return "freedom_sale_banner_gnirlr.webp";

//     case "Mumbai":
//       return "freedom_sale_banner_gnirlr.webp";

//     case "Hyderabad":
//       return "freedom_sale_banner_gnirlr.webp";
//   }
// };

const banners = [
  {
    // url: "appliance_banner_llwnir.webp",
    url: {
      mobile: "banner1_mobile",
      tab: "banner1_tab",
      desktop: "banner1",
    },
    link: "/home-appliances-rental",
  },
  {
    // url: "citymax_banner_os9nbn.webp",
    url: {
      mobile: "banner2_mobile",
      tab: "banner2_tab",
      desktop: "banner2",
    },
    link: "/citymax",
  },
  {
    // url: "discount_deals_banner_q7vjac.webp",
    url: {
      mobile: "banner3_mobile",
      tab: "banner3_tab",
      desktop: "banner3",
    },
    link: "/discount-deals",
  },
];

const HeroBanner = () => {
  // const city = CityNameToId[getLocalStorage("cityId")];

  const {cityName, showAllRentLink} =
    useSelector(state => state.homePagedata) || {};

  const [showLinkForRentPage, setShowLinkForRentPage] =
    useState(showAllRentLink);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false,
  );
  const [isTab, setIsTab] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 600 && window.innerWidth <= 1024
      : false,
  );

  const timerId = useRef(undefined);

  const handleResize = e => {
    const {innerWidth} = e.target;
    setIsMobile(innerWidth < 600);
    setIsTab(innerWidth > 600 && innerWidth <= 1024);
    console.log(innerWidth > 600 && innerWidth <= 1024);
  };

  const completeBanners = useMemo(() => {
    if (cityName) {
      return [
        {
          // url: getCityPrimaryBanner(city),
          url: {
            mobile: "banner4_mobile",
            tab: "banner4_tab",
            desktop: "banner4",
          },
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
      setCurrentIndex(1);
    }

    return () => clearInterval(timerId.current);
  }, [completeBanners]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
            {completeBanners.map(
              ({url: {mobile, tab, desktop}, link}, index) => {
                const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_improve:50/c_scale,w_${isMobile ? 400 : isTab ? 600 : 1920},h_${isMobile ? 150 : isTab ? 260 : 800}/f_auto/q_auto:best${isMobile ? mobile : isTab ? tab : desktop}`;

                return (
                  <Fragment key={link}>
                    {index === 0 && (
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
                        src={isMobile ? mobile : isTab ? tab : desktop}
                        alt={""}
                        // sizes="(max-width: 640px) 100vw,
                        //  (max-width: 768px) 75vw,
                        //  (max-width: 1024px) 50vw,
                        //  1920px"
                        width={isMobile ? 400 : isTab ? 600 : 1920}
                        improve={"50"}
                        height={isMobile ? 150 : isTab ? 260 : 800}
                        // crop="scale"
                        quality="auto:best"
                        priority
                        className="cursor-pointer rounded-lg"
                        style={{pointerEvents: "all"}}
                      />
                    </Link>
                  </Fragment>
                );
              },
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
