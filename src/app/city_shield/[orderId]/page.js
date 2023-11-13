"use client";
import React from "react";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import CityShieldPage from "@/components/CityShield";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

export default function Cityshield() {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <CityShieldPage />
      <Footer />
    </div>
  );
}
