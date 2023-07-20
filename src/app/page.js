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
// import ThreeSteps from "@/components/Home/ThreeSteps";
// import TrendingProducts from "@/components/Home/TrendingProducts";
// import WhyCityfurnish from "@/components/Home/WhyCityfurnish";

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
