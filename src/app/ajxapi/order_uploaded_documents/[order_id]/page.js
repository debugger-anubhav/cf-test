"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import Document from "@/components/DocumentsPage/Document";
import React from "react";

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
