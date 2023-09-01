"use client";

import React, {useRef, useEffect} from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
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
import TextContent from "@/components/Common/TextContent";
import {useChatScript} from "../../../useChatScript";
import {setLocalStorage} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
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

export default function index() {
  const queryClient = new QueryClient();
  const myElementRef = useRef();
  if (typeof window !== "undefined") {
    setLocalStorage("cityId", 46);
  }

  useEffect(() => {
    const data = {
      userId: "",
      tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    };
    axios
      .post(baseURL + endPoints.sessionUserUrl, data)
      .then(res => {
        console.log(res?.data?.data?.tempUserId, "res?.data?.data?.tempUserId");
        if (typeof window !== "undefined") {
          setLocalStorage("tempUserID", res?.data?.data?.tempUserId);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
          <CustomerRating />
          <MediaCoverage />
          <CombineSection />
          <HappySubscribers params={"home-page"} />
          <FrequentlyAskedQuestions params={"home-page"} />
          <TextContent params={"home-page"} />
          <Footer />
        </div>
      </Provider>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} position={"bottom-left"} /> */}
    </QueryClientProvider>
  );
}
