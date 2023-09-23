import React from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
import MenuList from "../Common/MenuList";
import HeroSection from "./HeroSection/HeroSection";
import CompanyGoal from "./ComapanyGoal/CompanyGoal";
import CityFurnish from "./cityFurnishLife/CityFurnishLife";
import InverstorAndMedia from "./inverstorsAndMedia/InvestorsAndMedia";

const Footer = loadable(() => import("@/components/Common/Footer"));

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
