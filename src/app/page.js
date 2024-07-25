"use client";

import React, { useEffect, useRef } from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";

import loadable from "@loadable/component";
import { ProductRowSkeleton } from "@/components/Common/ProductRowSkeleton";
import { RentFurnitureSkeleton } from "@/components/Home/RentFurnitureAndAppliances";
import { OffersSkeleton } from "@/components/Home/OffersAndCoupons";
import { NewlyLauncedSkeleton } from "@/components/Home/NewlyLaunched";
import { RentNowBannersSkeleton } from "@/components/Home/RentNowBanner";
import { TryCityMaxSkeleton } from "@/components/Home/TryCityMax";
import { FaqsSkeleton } from "@/components/Common/FrequentlyAskedQuestions";
import { ContentSkeleton } from "@/components/Common/ContentSkeleton";
import Notifications from "@/components/Common/Notifications/Notification";
import MenuList from "@/components/Common/MenuList";
import { FooterSkeleton } from "@/components/Common/Footer";
import { getLocalStorage } from "@/constants/constant";
import { DownloadForMobileSkeleton } from "@/components/Home/DownloadForMobile";
import { MediaCoverageSkeleton } from "@/components/Home/MediaCoverage";
import { CombineSectionSkeleton } from "@/components/Home/CombineSection";
import { setHomepageCardWorker } from "@/store/Slices";
import Worker from "worker-loader!../constants/commonWorkers/homepageCardsWorker.js";
import { useDispatch } from "react-redux";
import KycPending from "@/components/Home/KycPending";

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});

const RentFurnitureAndAppliances = loadable(
  () => import("@/components/Home/RentFurnitureAndAppliances"),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);

const RecentlyViewedProduct = loadable(
  () => import("@/components/Home/RecentlyViewedProduct"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

const TrendingProducts = loadable(
  () => import("@/components/Home/TrendingProducts"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

const OffersAndCoupons = loadable(
  () => import("@/components/Home/OffersAndCoupons"),
  { fallback: <OffersSkeleton /> },
);

const NewlyLaunched = loadable(
  () => import("@/components/Home/NewlyLaunched"),
  { fallback: <NewlyLauncedSkeleton /> },
);

const DownloadForMobile = loadable(
  () => import("@/components/Home/DownloadForMobile"),
  { fallback: <DownloadForMobileSkeleton /> },
);

const PreDesignCombos = loadable(
  () => import("@/components/Home/PredesignCombos"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

const HassleFreeServicesCards = loadable(
  () => import("@/components/Home/HassleFreeServicesCards"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

const LimetedPreiodDiscount = loadable(
  () => import("@/components/Home/LimetedPreiodDiscount"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

const RentNowBanner = loadable(
  () => import("@/components/Home/RentNowBanner"),
  { fallback: <RentNowBannersSkeleton /> },
);

const TryCityMax = loadable(() => import("@/components/Home/TryCityMax"), {
  fallback: <TryCityMaxSkeleton />,
});

const CustomerRating = loadable(() => import("@/components/Home/Rating"), {
  fallback: <ProductRowSkeleton />,
});

const MediaCoverage = loadable(
  () => import("@/components/Home/MediaCoverage"),
  { fallback: <MediaCoverageSkeleton /> },
);

const HappySubscribers = loadable(
  () => import("@/components/Home/HappySubscribers"),
);

const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const CombineSection = loadable(
  () => import("@/components/Home/CombineSection"),
  { fallback: <CombineSectionSkeleton /> },
);

export default function Home() {
  const myElementRef = useRef();
  const userId = getLocalStorage("_ga");

  const dispatch = useDispatch();

  useEffect(() => {
    const worker = new Worker();
    dispatch(setHomepageCardWorker(worker));
    const handleTouchStart = event => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      worker?.terminate();
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  useEffect(() => {
    if (userId !== "") {
      if (process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION") {
        window?.gtag?.("config", "G-05PLBRM6KD", {
          user_id: userId,
        });
      }
    }
  }, [userId]);



  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <div ref={myElementRef} className="large_layout">
        {/* {useChatScript()} */}
        <AnnouncementBar />
        <Header />
        <MenuList />
        <HeroBanner />

        {userId && <KycPending />}

        <RentFurnitureAndAppliances params={"home-page"} />
        <RecentlyViewedProduct />
        <TrendingProducts params={"home-page"} />

        <OffersAndCoupons />
        <RentNowBanner params={"home-page"} />
        <DownloadForMobile />
        <PreDesignCombos />
        <HassleFreeServicesCards />
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
