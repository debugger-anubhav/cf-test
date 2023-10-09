"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";

import UserSettings from "@/components/UserSettings/UserSettings";

const Usersettings = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <UserSettings />
    </div>
  );
};

export default Usersettings;
