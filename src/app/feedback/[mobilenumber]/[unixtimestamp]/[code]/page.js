"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import MainSection from "@/components/Feedback/MainSection";
import Notifications from "@/components/Common/Notifications/Notification";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
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
      <Notifications />
    </div>
  );
}
