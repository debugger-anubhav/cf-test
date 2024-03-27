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

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});
const RentFurnitureAndAppliances = loadable(
  () => pMinDelay(import("@/components/Home/RentFurnitureAndAppliances"), 5),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);
const RecentlyViewedProduct = loadable(
  () => pMinDelay(import("@/components/Home/RecentlyViewedProduct"), 10),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const TrendingProducts = loadable(
  () => pMinDelay(import("@/components/Home/TrendingProducts"), 15),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const OffersAndCoupons = loadable(
  () => pMinDelay(import("@/components/Home/OffersAndCoupons"), 20),
  {fallback: <OffersSkeleton />},
);
const NewlyLaunched = loadable(
  () => pMinDelay(import("@/components/Home/NewlyLaunched"), 25),
  {fallback: <NewlyLauncedSkeleton />},
);

const DownloadForMobile = loadable(() =>
  pMinDelay(import("@/components/Home/DownloadForMobile"), 30),
);
const PreDesignCombos = loadable(
  () => pMinDelay(import("@/components/Home/PredesignCombos"), 35),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const HasselFreeServicesCards = loadable(() =>
  pMinDelay(import("@/components/Home/HasselFreeServicesCards"), 40),
);
const LimetedPreiodDiscount = loadable(
  () => pMinDelay(import("@/components/Home/LimetedPreiodDiscount"), 45),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const RentNowBanner = loadable(
  () => pMinDelay(import("@/components/Home/RentNowBanner"), 50),
  {fallback: <RentNowBannersSkeleton />},
);
const TryCityMax = loadable(
  () => pMinDelay(import("@/components/Home/TryCityMax"), 55),
  {
    fallback: <TryCityMaxSkeleton />,
  },
);
const CustomerRating = loadable(
  () => pMinDelay(import("@/components/Home/Rating"), 60),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const MediaCoverage = loadable(() =>
  pMinDelay(import("@/components/Home/MediaCoverage"), 70),
);
const HappySubscribers = loadable(() =>
  pMinDelay(import("@/components/Home/HappySubscribers"), 75),
);
const FrequentlyAskedQuestions = loadable(
  () => pMinDelay(import("@/components/Common/FrequentlyAskedQuestions"), 80),
  {
    fallback: <FaqsSkeleton />,
  },
);
const Footer = loadable(
  () => pMinDelay(import("@/components/Common/Footer"), 85),
  {
    fallback: <FooterSkeleton />,
  },
);
const CombineSection = loadable(() =>
  import("@/components/Home/CombineSection"),
);

export default function Home() {
  const myElementRef = useRef();

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

  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <div ref={myElementRef} className="large_layout">
        {useChatScript()}
        <AnnouncementBar />
        <Header />
        <MenuList />
        <div className="lg:min-h-[385px] min-h-[150px]">
          <HeroBanner />
        </div>
        <RentFurnitureAndAppliances params={"home-page"} />
        <RecentlyViewedProduct />
        <TrendingProducts params={"home-page"} />
        <OffersAndCoupons />
        <NewlyLaunched />
        <DownloadForMobile />
        <PreDesignCombos />
        <HasselFreeServicesCards />
        <LimetedPreiodDiscount />
        <RentNowBanner params={"home-page"} />
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
