"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import InvoicePage from "@/components/Invoices/index";
import Footer from "@/components/Common/Footer";
import {AuthProvider} from "@/components/HOC/index";

const Invoices = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <InvoicePage />
      <Footer />
    </div>
  );
};

export default AuthProvider(Invoices);
