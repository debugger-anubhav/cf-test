"use client";

import React, {useEffect, useRef} from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";

import loadable from "@loadable/component";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import {useChatScript} from "../../useChatScript";
import {ContentSkeleton} from "@/components/Common/ContentSkeleton";
import Notifications from "@/components/Common/Notifications/Notification";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import pMinDelay from "p-min-delay";
import {getLocalStorage} from "@/constants/constant";

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});
const RentFurnitureAndAppliances = loadable(
  () => pMinDelay(import("@/components/Home/RentFurnitureAndAppliances"), 20),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);
const RecentlyViewedProduct = loadable(
  () => pMinDelay(import("@/components/Home/RecentlyViewedProduct"), 30),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const TrendingProducts = loadable(
  () => pMinDelay(import("@/components/Home/TrendingProducts"), 60),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const OffersAndCoupons = loadable(
  () => pMinDelay(import("@/components/Home/OffersAndCoupons"), 80),
  {fallback: <OffersSkeleton />},
);
const NewlyLaunched = loadable(
  () => pMinDelay(import("@/components/Home/NewlyLaunched"), 100),
  {fallback: <NewlyLauncedSkeleton />},
);

const DownloadForMobile = loadable(() =>
  pMinDelay(import("@/components/Home/DownloadForMobile"), 120),
);
const PreDesignCombos = loadable(
  () => pMinDelay(import("@/components/Home/PredesignCombos"), 140),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const HasselFreeServicesCards = loadable(() =>
  pMinDelay(import("@/components/Home/HasselFreeServicesCards"), 160),
);
const LimetedPreiodDiscount = loadable(
  () => pMinDelay(import("@/components/Home/LimetedPreiodDiscount"), 180),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const RentNowBanner = loadable(
  () => pMinDelay(import("@/components/Home/RentNowBanner"), 200),
  {fallback: <RentNowBannersSkeleton />},
);
const TryCityMax = loadable(
  () => pMinDelay(import("@/components/Home/TryCityMax"), 220),
  {
    fallback: <TryCityMaxSkeleton />,
  },
);
const CustomerRating = loadable(
  () => pMinDelay(import("@/components/Home/Rating"), 240),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const MediaCoverage = loadable(() =>
  pMinDelay(import("@/components/Home/MediaCoverage"), 260),
);
const HappySubscribers = loadable(() =>
  pMinDelay(import("@/components/Home/HappySubscribers"), 280),
);
const FrequentlyAskedQuestions = loadable(
  () => pMinDelay(import("@/components/Common/FrequentlyAskedQuestions"), 300),
  {
    fallback: <FaqsSkeleton />,
  },
);
const Footer = loadable(
  () => pMinDelay(import("@/components/Common/Footer"), 320),
  {
    fallback: <FooterSkeleton />,
  },
);
const CombineSection = loadable(() =>
  import("@/components/Home/CombineSection"),
);

export default function Home() {
  const myElementRef = useRef();
  const userId = getLocalStorage("_ga");
  // added
  useEffect(() => {
    const handleTouchStart = event => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  useEffect(() => {
    console.log(window?.gtag, "homeeee");
    window?.gtag("js", new Date());
    window?.gtag("config", "G-05PLBRM6KD", {
      user_id: userId,
    });
    // if (userId !== "") {

    // } else {
    //   window?.gtag("config", "G-05PLBRM6KD");
    // }
  }, [userId]);

  return (
    <>
      {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
        <script
          defer
          async
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              
            `,
          }}
        />
      )}

      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <div ref={myElementRef} className="large_layout">
        {useChatScript()}
        <AnnouncementBar />
        <Header />
        <MenuList />
        <div className="lg:min-h-[385px] min-h-[125px]">
          <HeroBanner />
        </div>
        <RentFurnitureAndAppliances params={"home-page"} />
        <RecentlyViewedProduct />
        <TrendingProducts params={"home-page"} />
        <OffersAndCoupons />
        {/* <NewlyLaunched /> */}
        <RentNowBanner params={"home-page"} />
        <DownloadForMobile />
        <PreDesignCombos />
        <HasselFreeServicesCards />
        <LimetedPreiodDiscount />
        <NewlyLaunched />

        <TryCityMax />
        <div className="xl:hidden block">
          <MediaCoverage />
        </div>
        <CustomerRating />
        <div className="hidden xl:block">
          <MediaCoverage />
        </div>
        <CombineSection />
        <HappySubscribers params={"home-page"} />
        <FrequentlyAskedQuestions params={"home-page"} />
        <TextContent params={"home-page"} />
        <Footer />
        <Notifications />
      </div>
    </>
  );
}
