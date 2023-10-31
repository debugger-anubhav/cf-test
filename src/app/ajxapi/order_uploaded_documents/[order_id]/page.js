"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Footer from "@/components/Common/Footer";
import Document from "@/components/DocumentsPage/Document";
import Notifications from "@/components/Common/Notifications/Notification";

const Documentspage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <Document />
      <Footer />
      <Notifications />
    </div>
  );
};

export default Documentspage;
