"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import TermsOfUseData from "@/components/TermOfUseData";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
export default function TermsOfUse() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <TermsOfUseData />
      <Footer />
    </div>
  );
}
