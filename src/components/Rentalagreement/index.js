"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import MainSection from "./MainSection";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
function Rentalagreement() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <MainSection />
      <Footer />
    </div>
  );
}

export default Rentalagreement;
