"use client";
import React from "react";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import MainSection from "@/components/BenefitsPage/MainSection";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
function BenefitPage() {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <MainSection />
      <Footer />
    </div>
  );
}

export default BenefitPage;
