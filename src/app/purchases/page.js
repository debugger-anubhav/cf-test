"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import MyOrders from "@/components/MyOrders";
import {AuthProvider} from "@/components/HOC/index";

const index = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <MyOrders />
      <Notifications />
    </div>
  );
};

export default AuthProvider(index);
