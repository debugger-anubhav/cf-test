"use client";
import React from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Footer from "@/components/Common/Footer";
import PaymentPage from "../../components/Payments";
import {AuthProvider} from "@/components/HOC/index";

const Payments = () => {
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

export default AuthProvider(Payments);
