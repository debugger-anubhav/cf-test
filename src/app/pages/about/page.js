"use client";
import React from "react";
import About from "@/components/About/About";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import RootLayout from "./layout";
const metadata = {
  title: "Furniture Rental - About Us",
  description: "Cityfurnish.com: About Us",
};
const AboutPage = () => {
  return (
    <RootLayout metadata={metadata}>
      <div className="large_layout">
        <AnnouncementBar />
        <About />
      </div>
    </RootLayout>
  );
};

export default AboutPage;
