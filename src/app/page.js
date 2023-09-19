"use client";

import React, {useRef} from "react";

// import   { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";

import loadable from "@loadable/component";
// const MenuList = loadable(() => import("@/components/Common/MenuList"));
import MenuList from "@/components/Common/MenuList";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import {useChatScript} from "../../useChatScript";
import {ContentSkeleton} from "@/components/Common/ContentSkeleton";

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
  {fallback: <OffersSkeleton />},
);
const NewlyLaunched = loadable(
  () => import("@/components/Home/NewlyLaunched"),
  {fallback: <NewlyLauncedSkeleton />},
);

const DownloadForMobile = loadable(() =>
  import("@/components/Home/DownloadForMobile"),
);
const PreDesignCombos = loadable(
  () => import("@/components/Home/PredesignCombos"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const HasselFreeServicesCards = loadable(() =>
  import("@/components/Home/HasselFreeServicesCards"),
);
const LimetedPreiodDiscount = loadable(
  () => import("@/components/Home/LimetedPreiodDiscount"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
const RentNowBanner = loadable(
  () => import("@/components/Home/RentNowBanner"),
  {fallback: <RentNowBannersSkeleton />},
);
const TryCityMax = loadable(() => import("@/components/Home/TryCityMax"), {
  fallback: <TryCityMaxSkeleton />,
});
const MediaCoverage = loadable(() => import("@/components/Home/MediaCoverage"));
const CustomerRating = loadable(() => import("@/components/Home/Rating"), {
  fallback: <ProductRowSkeleton />,
});
const HappySubscribers = loadable(() =>
  import("@/components/Home/HappySubscribers"),
);
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);
const Footer = loadable(() => import("@/components/Common/Footer"));
const CombineSection = loadable(() =>
  import("@/components/Home/CombineSection"),
);

export default function Home() {
  // const router = useRouter();

  const myElementRef = useRef();
  // if (typeof window !== "undefined") {
  //   setLocalStorage("cityId", 46);
  // }

  return (
    <div ref={myElementRef} className="large_layout">
      {useChatScript()}
      <AnnouncementBar />
      <Header />
      <MenuList />
      <HeroBanner />
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
    </div>
  );
}
