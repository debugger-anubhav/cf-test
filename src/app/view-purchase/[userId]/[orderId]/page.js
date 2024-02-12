"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {AuthProvider} from "@/components/HOC/index";
import OfflineInvoice from "../../../../components/OfflineInvoice";

const offineInvoive = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <OfflineInvoice userIdCheck={true} />
    </div>
  );
};

export default AuthProvider(offineInvoive);
