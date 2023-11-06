"use client";
import React from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Footer from "@/components/Common/Footer";
import PaymentPage from "../../components/Payments";

const Invoices = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <PaymentPage />
      <Footer />
    </div>
  );
};

export default Invoices;
