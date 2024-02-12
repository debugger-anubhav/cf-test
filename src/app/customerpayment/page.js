"use client";
import React from "react";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import CustomerPayment from "@/components/CustomerPayment";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Notifications from "@/components/Common/Notifications/Notification";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

function CustomerPaymentPage() {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <CustomerPayment />
      <Footer />
      <Notifications />
    </div>
  );
}

export default CustomerPaymentPage;
