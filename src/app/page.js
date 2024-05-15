"use client";

import React, {useEffect, useRef} from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";
// import {HeroBannerSkeleton} from "@/components/Home/HeroBanner";

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
// import pMinDelay from "p-min-delay";
import {getLocalStorage} from "@/constants/constant";
import {DownloadForMobileSkeleton} from "@/components/Home/DownloadForMobile";
import {MediaCoverageSkeleton} from "@/components/Home/MediaCoverage";
import {CombineSectionSkeleton} from "@/components/Home/CombineSection";

const TextContent = loadable(() => import("@/components/Common/TextContent"), {
  fallback: <ContentSkeleton />,
});

// const RentFurnitureAndAppliances = loadable(
//   () => pMinDelay(import("@/components/Home/RentFurnitureAndAppliances"), 20),
//   {
//     fallback: <RentFurnitureSkeleton />,
//   },
// );
const RentFurnitureAndAppliances = loadable(
  () => import("@/components/Home/RentFurnitureAndAppliances"),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);

// const RecentlyViewedProduct = loadable(
//   () => pMinDelay(import("@/components/Home/RecentlyViewedProduct"), 30),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const RecentlyViewedProduct = loadable(
  () => import("@/components/Home/RecentlyViewedProduct"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

// const TrendingProducts = loadable(
//   () => pMinDelay(import("@/components/Home/TrendingProducts"), 60),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const TrendingProducts = loadable(
  () => import("@/components/Home/TrendingProducts"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

// const OffersAndCoupons = loadable(
//   () => pMinDelay(import("@/components/Home/OffersAndCoupons"), 80),
//   {fallback: <OffersSkeleton />},
// );
const OffersAndCoupons = loadable(
  () => import("@/components/Home/OffersAndCoupons"),
  {fallback: <OffersSkeleton />},
);

// const NewlyLaunched = loadable(
//   () => pMinDelay(import("@/components/Home/NewlyLaunched"), 100),
//   {fallback: <NewlyLauncedSkeleton />},
// );
const NewlyLaunched = loadable(
  () => import("@/components/Home/NewlyLaunched"),
  {fallback: <NewlyLauncedSkeleton />},
);

// const DownloadForMobile = loadable(
//   () => pMinDelay(import("@/components/Home/DownloadForMobile"), 120),
//   {fallback: <DownloadForMobileSkeleton />},
// );
const DownloadForMobile = loadable(
  () => import("@/components/Home/DownloadForMobile"),
  {fallback: <DownloadForMobileSkeleton />},
);

// const PreDesignCombos = loadable(
//   () => pMinDelay(import("@/components/Home/PredesignCombos"), 140),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const PreDesignCombos = loadable(
  () => import("@/components/Home/PredesignCombos"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

// const HasselFreeServicesCards = loadable(
//   () => pMinDelay(import("@/components/Home/HasselFreeServicesCards"), 160),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const HasselFreeServicesCards = loadable(
  () => import("@/components/Home/HasselFreeServicesCards"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

// const LimetedPreiodDiscount = loadable(
//   () => pMinDelay(import("@/components/Home/LimetedPreiodDiscount"), 180),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const LimetedPreiodDiscount = loadable(
  () => import("@/components/Home/LimetedPreiodDiscount"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

// const RentNowBanner = loadable(
//   () => pMinDelay(import("@/components/Home/RentNowBanner"), 200),
//   {fallback: <RentNowBannersSkeleton />},
// );
const RentNowBanner = loadable(
  () => import("@/components/Home/RentNowBanner"),
  {fallback: <RentNowBannersSkeleton />},
);

// const TryCityMax = loadable(
//   () => pMinDelay(import("@/components/Home/TryCityMax"), 220),
//   {
//     fallback: <TryCityMaxSkeleton />,
//   },
// );
const TryCityMax = loadable(() => import("@/components/Home/TryCityMax"), {
  fallback: <TryCityMaxSkeleton />,
});

// const CustomerRating = loadable(
//   () => pMinDelay(import("@/components/Home/Rating"), 240),
//   {
//     fallback: <ProductRowSkeleton />,
//   },
// );
const CustomerRating = loadable(() => import("@/components/Home/Rating"), {
  fallback: <ProductRowSkeleton />,
});

// const MediaCoverage = loadable(
//   () => pMinDelay(import("@/components/Home/MediaCoverage"), 260),
//   {fallback: <MediaCoverageSkeleton />},
// );
const MediaCoverage = loadable(
  () => import("@/components/Home/MediaCoverage"),
  {fallback: <MediaCoverageSkeleton />},
);

// const HappySubscribers = loadable(() =>
//   pMinDelay(import("@/components/Home/HappySubscribers"), 280),
// );
const HappySubscribers = loadable(() =>
  import("@/components/Home/HappySubscribers"),
);

// const FrequentlyAskedQuestions = loadable(
//   () => pMinDelay(import("@/components/Common/FrequentlyAskedQuestions"), 300),
//   {
//     fallback: <FaqsSkeleton />,
//   },
// );
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);

// const Footer = loadable(
//   () => pMinDelay(import("@/components/Common/Footer"), 320),
//   {
//     fallback: <FooterSkeleton />,
//   },
// );
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

// const CombineSection = loadable(
//   () => import("@/components/Home/CombineSection"),
//   {fallback: <CombineSectionSkeleton />},
// );
const CombineSection = loadable(
  () => import("@/components/Home/CombineSection"),
  {fallback: <CombineSectionSkeleton />},
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
    if (userId !== "") {
      window?.gtag("js", new Date());
      window?.gtag("config", "G-05PLBRM6KD", {
        user_id: userId,
      });
    } else {
      window?.gtag("config", "G-05PLBRM6KD");
    }
  }, [userId]);

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
