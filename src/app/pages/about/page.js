"use client";
import React from "react";
import About from "@/components/About/About";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
const AboutPage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <About />
    </div>
  );
};

export default AboutPage;
