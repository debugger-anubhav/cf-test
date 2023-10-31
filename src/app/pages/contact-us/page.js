"use client";

import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import ContactSection from "@/components/ContactUs/ContactSection";
import OurOffices from "@/components/ContactUs/OurOffices";
import HaveQueries from "@/components/ContactUs/HaveQueries";
import {FooterSkeleton} from "@/components/Common/Footer";
import loadable from "@loadable/component";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const ContactUs = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <ContactSection />
      <OurOffices />
      <HaveQueries />
      <Footer />
    </div>
  );
};

export default ContactUs;
