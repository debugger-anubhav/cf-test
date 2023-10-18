"use client";
import React from "react";
import Header from "../Common/Header";
import MenuList from "../Common/MenuList";
import Footer from "../Common/Footer";
import MainWrapper from "./mainWrapper";

const BulkOrderMain = () => {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <MainWrapper />
      <Footer />
    </div>
  );
};

export default BulkOrderMain;
