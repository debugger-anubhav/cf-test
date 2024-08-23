"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import CrifTermsOfUseData from "@/components/CrifTermOfUse";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
export default function CrifTermsOfUse() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <CrifTermsOfUseData />
      <Footer />
    </div>
  );
}
