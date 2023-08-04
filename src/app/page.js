"use client";

import React from "react";
import {store} from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";
import RentFurnitureAndAppliances from "@/components/Home/RentFurnitureAndAppliances";
import RecentlyViewedProduct from "@/components/Home/RecentlyViewedProduct";
import TrendingProducts from "@/components/Home/TrendingProducts";
import OffersAndCoupons from "@/components/Home/OffersAndCoupons";
import NewlyLaunched from "@/components/Home/NewlyLaunched";
import DownloadForMobile from "@/components/Home/DownloadForMobile";
import PreDesignCombos from "@/components/Home/PredesignCombos";
import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
import LimetedPreiodDiscount from "@/components/Home/LimetedPreiodDiscount";
import RentNowBanner from "@/components/Home/RentNowBanner";
import TryCityMax from "@/components/Home/TryCityMax";
import MediaCoverage from "@/components/Home/MediaCoverage";
import CustomerRating from "@/components/Home/Rating";
import HappySubscribers from "@/components/Home/HappySubscribers";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Footer from "@/components/Common/Footer";
import CombineSection from "@/components/Home/CombineSection";
import MenuList from "@/components/Common/MenuList";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="last-screen:w-[2000px] mx-auto">
          <AnnouncementBar />
          <Header />
          <MenuList />
          <HeroBanner />
          <RentFurnitureAndAppliances />
          <RecentlyViewedProduct />
          <TrendingProducts />
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
