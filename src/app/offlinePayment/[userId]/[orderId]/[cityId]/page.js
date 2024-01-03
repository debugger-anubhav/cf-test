"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import OfflinePayment from "../../../../../components/OfflineCustomerPaymentScreen";
import Footer from "@/components/Common/Footer";

const Success = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <OfflinePayment />
      <Footer />
      {/* <Notifications /> */}
    </div>
  );
};

export default Success;
