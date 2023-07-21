"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
// import CTA from "@/components/Common/CTA";
// import Footer from "@/components/Common/Footer";
// import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
// import BackedBy from "@/components/Home/BackedBy";
// import FurnishingGuaranteed from "@/components/Home/FurnishingGuaranteed";
// import HappySubscribers from "@/components/Home/HappySubscribers";
// // import HeroBanner from "@/components/Home/HeroBanner";
// import HowProductsLook from "@/components/Home/HowProductsLook";
import MediaCoverage from "@/components/Home/MediaCoverage";
import RentFurnitureAndAppliances from "@/components/Home/RentFurnitureAndAppliances";
import Card from "@/components/Common/HomePageCards/Card";
// import ThreeSteps from "@/components/Home/ThreeSteps";
// import TrendingProducts from "@/components/Home/TrendingProducts";
// import WhyCityfurnish from "@/components/Home/WhyCityfurnish";
import string from "@/constants/Constant.json";

export default function Home() {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <MenuList />
      {/* <HeroBanner /> */}
      <RentFurnitureAndAppliances />
      {/* <TrendingProducts /> */}
      {/* <WhyCityfurnish /> */}
      {/* <HowProductsLook /> */}
      <MediaCoverage />
      <div>
        <Card
          desc={string.landing_page.Common_card.desc}
          currentPrice={string.landing_page.Common_card.currentPrice}
          originalPrice={string.landing_page.Common_card.originalPrice}
          discount={string.landing_page.Common_card.discount}
        />
      </div>
      {/* <FurnishingGuaranteed /> */}
      {/* <BackedBy /> */}
      {/* <HappySubscribers /> */}
      {/* <ThreeSteps /> */}
      {/* <CTA /> */}
      {/* <FrequentlyAskedQuestions /> */}
      {/* <Footer /> */}
    </div>
  );
}
