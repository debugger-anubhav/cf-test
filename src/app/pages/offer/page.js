"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import OfferPage from "../../../components/Offer";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const Offer = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <OfferPage />
      <Footer />
    </div>
  );
};

export default Offer;
