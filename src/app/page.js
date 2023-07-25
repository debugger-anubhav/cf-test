"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import HeroBanner from "@/components/Home/HeroBanner";
// import CTA from "@/components/Common/CTA";
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
import FourSteps from "@/components/Home/FourSteps";
import ChatWithUs from "@/components/Home/ChatWithUs";
import HappySubscribers from "@/components/Home/HappySubscribers";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Footer from "@/components/Common/Footer";
// import MenuList from "@/components/Common/MenuList";
// import FurnishingGuaranteed from "@/components/Home/FurnishingGuaranteed";
// import HowProductsLook from "@/components/Home/HowProductsLook";

export default function Home() {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      {/* <MenuList /> */}
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
      {/* <WhyCityfurnish /> */}
      {/* <HowProductsLook /> */}
      <MediaCoverage />
      <CustomerRating />
      {/* <FurnishingGuaranteed /> */}
      {/* <BackedBy /> */}
      <FourSteps />
      <ChatWithUs />
      <HappySubscribers />
      <FrequentlyAskedQuestions />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
