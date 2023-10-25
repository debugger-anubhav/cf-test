"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import CityShieldPage from "@/components/CityShield";

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
