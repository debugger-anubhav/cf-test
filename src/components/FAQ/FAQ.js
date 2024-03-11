"use client";
import React from "react";
import Header from "../Common/Header";
import MenuList from "../Common/MenuList";
import MainWrapper from "./MainWrapper";
import Footer from "../Common/Footer";
import AnnouncementBar from "../Common/AnnouncementBar";

const FAQMain = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <MainWrapper />
      <Footer />
    </div>
  );
};

export default FAQMain;
