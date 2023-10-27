"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import MainSection from "@/components/BenefitsPage/MainSection";
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
