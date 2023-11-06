"use client";
import React from "react";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import MainSection from "@/components/BenefitsPage/MainSection";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
function BenefitPage() {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <div className="px-4  md:px-[70px] xl:px-[90px] macbook:px-[122px] 3xl:px-[160px]">
        <BreadCrumbsCommon currentPage={"Benefits"} />
        <div
          className={
            "flex font-Poppins text-45454A lg:text-24 text-20 font-medium leading-8"
          }>
          Benefits
        </div>
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}

export default BenefitPage;
