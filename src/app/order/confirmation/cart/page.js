"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Notifications from "@/components/Common/Notifications/Notification";
import dynamic from "next/dynamic";
const DynamicPaymentConfirmation = dynamic(
  () => import("@/components/PostCheckout/Confirmation"),
  {ssr: false},
);

const index = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <DynamicPaymentConfirmation />
      <Notifications />
    </div>
  );
};

export default index;
