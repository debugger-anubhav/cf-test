"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import SearchList from "@/components/Search/SearchList/SearchList";
import Footer from "@/components/Common/Footer";

export default function SearchPage() {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <MenuList />
      <SearchList />
      <Footer />
    </div>
  );
}
