"use client";
import React from "react";
import Header from "../Common/Header";
import MenuList from "../Common/MenuList";
import Footer from "../Common/Footer";
import MainWrapper from "./mainWrapper";
import AnnouncementBar from "../Common/AnnouncementBar";

const BulkOrderMain = () => {
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

export default BulkOrderMain;
