"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import MainSection from "../../../components/BenefitsPage/MainSection";
import MainSectionHowWork from "../../../components/HowItWork";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const HowItWorkPage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <MainSectionHowWork />
      <MainSection />
      <Footer />
    </div>
  );
};

export default HowItWorkPage;
