"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Footer from "@/components/Common/Footer";
import loadable from "@loadable/component";
import {SearchListSkeleton} from "@/components/Search/SearchList/SearchList";
import Notifications from "@/components/Common/Notifications/Notification";

const SearchList = loadable(
  () => import("@/components/Search/SearchList/SearchList"),
  {
    fallback: <SearchListSkeleton />,
  },
);
export default function SearchPage() {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <MenuList />
      <SearchList />
      <Footer />
      <Notifications />
    </div>
  );
}
