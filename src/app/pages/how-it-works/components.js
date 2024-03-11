"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import MainSection from "../../../components/BenefitsPage/MainSection";
import MainSectionHowWork from "../../../components/HowItWork";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const HowItWorkComponents = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <MainSectionHowWork />
      <div className=" px-4  md:px-[70px] xl:px-[90px] macbook:px-[122px] 3xl:px-[160px]">
        {" "}
        <h2
          className={
            "flex font-Poppins text-45454A lg:text-24 text-20 font-medium leading-8 tracking-[-0.48px]"
          }>
          Benefits
        </h2>
      </div>
      <MainSection />
      <Footer />
    </div>
  );
};

export default HowItWorkComponents;
