"use client";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import React from "react";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import loadable from "@loadable/component";
import MainSection from "@/components/Feedback/MainSection";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

export default function Feedback() {
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
