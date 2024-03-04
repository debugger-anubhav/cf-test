"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import TextContent from "@/components/Common/TextContent";
import SubHeaderSkeleton from "@/components/Category/SubHeader/Subheader/SubHeaderSkeleton";

import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import {SubproductSkeleton} from "@/components/AllProduct/SubProduct/Subproduct";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import CategoryPageLayout from "./layout";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const Subproduct = loadable(
  () => import("@/components/AllProduct/SubProduct/Subproduct"),
  {
    fallback: <SubproductSkeleton />,
  },
);
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
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
const CombineSection = loadable(() =>
  import("@/components/Home/CombineSection"),
);

export default function Page() {
  const params = useParams();
  const nameOfCity =
    (params?.city).charAt(0).toUpperCase() + (params?.city).slice(1);
  const [metaApiData, setMetaApiData] = useState(null);
  const getMetaData = () => {
    baseInstance
      .post(endPoints.categoryMetaData, {
        cityName: nameOfCity.toLowerCase(),
        seourl: params?.category,
      })
      .then(res => setMetaApiData(res?.data?.data[0]))
      .catch(err => console.log(err, "metadata"));
  };
  useEffect(() => {
    getMetaData();
  }, []);
  return (
    <CategoryPageLayout cityName={nameOfCity} metaData={metaApiData}>
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
        <Notifications />
      </div>
    </CategoryPageLayout>
  );
}
