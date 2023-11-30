"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Footer from "@/components/Common/Footer";
// import {AuthProvider} from "@/components/HOC/index";
import ServiceRequests from "@/components/ServiceRequests/index";

const ServiceRequestPage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <ServiceRequests />
      <Footer />
    </div>
  );
};

export default ServiceRequestPage;
