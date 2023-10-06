"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";

import Notifications from "@/components/Common/Notifications/Notification";
import YourAddressesSection from "@/components/YourAddresses";
// import YourAddressesSection from "@/components/YourAddresses";

const YourAddresses = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <YourAddressesSection />
      <Notifications />
    </div>
  );
};

export default YourAddresses;
