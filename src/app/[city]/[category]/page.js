"use client";

import React from "react";
import {useParams} from "next/navigation";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
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
const CustomerRating = loadable(() => import("@/components/Home/Rating"));
const HappySubscribers = loadable(() =>
  import("@/components/Home/HappySubscribers"),
);
const FrequentlyAskedQuestions = loadable(() =>
  import("@/components/Common/FrequentlyAskedQuestions"),
);
const Footer = loadable(() => import("@/components/Common/Footer"));
const CombineSection = loadable(() =>
  import("@/components/Home/CombineSection"),
);

export default function Page() {
  const queryClient = new QueryClient();
  const params = useParams();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="large_layout">
          <AnnouncementBar />
          <Header />
          <MenuList />
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
          <RentNowBanner />
          <TryCityMax />
          <CustomerRating />
          <MediaCoverage />
          <CombineSection />
          <HappySubscribers />
          <FrequentlyAskedQuestions />
          <Footer />
        </div>
      </Provider>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} position={"bottom-left"} /> */}
    </QueryClientProvider>
  );
}
