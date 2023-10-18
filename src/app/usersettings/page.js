"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {AuthProvider} from "@/components/HOC/index";
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

export default AuthProvider(Usersettings);
