"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import PrivacyPolicyData from "../../../components/PrivacyPolicy";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

function PrivacyPolicy() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <PrivacyPolicyData />
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
