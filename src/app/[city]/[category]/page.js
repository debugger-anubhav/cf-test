"use client";

import React from "react";
import {useParams} from "next/navigation";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";

import loadable from "@loadable/component";
import MenuList from "@/components/Common/MenuList";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import TextContent from "@/components/Common/TextContent";
import Subproduct from "@/components/AllProduct/SubProduct/Subproduct";
import SubHeaderSkeleton from "@/components/Category/SubHeader/Subheader/SubHeaderSkeleton";

const SubHeader = loadable(
  () => import("@/components/Category/SubHeader/Subheader/SubHeader"),
  {
    fallback: <SubHeaderSkeleton />,
  },
);
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

export default function Page() {
  const params = useParams();

  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      {params.category === "appliances-rental" ||
      params.category === "furniture-rental" ? (
        <div>
          <HeroBanner />
          <RentFurnitureAndAppliances params={params} />
          <RecentlyViewedProduct />
          <TrendingProducts params={params} />
          <OffersAndCoupons />
          <NewlyLaunched />
          <DownloadForMobile />
          <PreDesignCombos />
          <HasselFreeServicesCards />
          <LimetedPreiodDiscount />
          <RentNowBanner params={params} />
          <TryCityMax />
          <CustomerRating />
          <MediaCoverage />
          <CombineSection />
          <HappySubscribers params={params} page={params.category} />
          <FrequentlyAskedQuestions params={params} />
          <TextContent params={params} />
          <Footer />
        </div>
      ) : params.category === "rent" ? (
        <div>
          <Subproduct />
        </div>
      ) : (
        <div>
          <SubHeader params={params} />
        </div>
      )}
    </div>
  );
}
