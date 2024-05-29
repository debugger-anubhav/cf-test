"use client";
import React from "react";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import CityShieldPage from "@/components/CityShield";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
// import {AuthProvider} from "@/components/HOC/index";
import AnnouncementBar from "@/components/Common/AnnouncementBar";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const Cityshield = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <CityShieldPage />
      <Footer />
    </div>
  );
};
export default Cityshield;
