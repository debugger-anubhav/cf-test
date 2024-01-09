"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import TenureExtension from "@/components/TenureExtension";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

function TenureExtensionPage() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <TenureExtension />
      <Footer />
    </div>
  );
}

export default TenureExtensionPage;
