import React from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
import MenuList from "../Common/MenuList";
import HeroSection from "./HeroSection/HeroSection";
import CompanyGoal from "./ComapanyGoal/CompanyGoal";
import CityFurnish from "./cityFurnishLife/CityFurnishLife";
import InverstorAndMedia from "./inverstorsAndMedia/InvestorsAndMedia";
import {FooterSkeleton} from "@/components/Common/Footer";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const About = () => {
  return (
    <div>
      <Header />
      <MenuList />
      <HeroSection />
      <CompanyGoal />
      <CityFurnish />
      <InverstorAndMedia />
      <Footer />
    </div>
  );
};

export default About;
