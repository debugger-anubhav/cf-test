"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import TopSection from "@/components/Careers/TopSection";
import WeValue from "@/components/Careers/WeValue";
import OurLocation from "@/components/Careers/OurLocations";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

export default function Career() {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <TopSection />
      <WeValue />
      <OurLocation />
      <Footer />
    </div>
  );
}
