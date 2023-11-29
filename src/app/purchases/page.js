"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import MyOrders from "@/components/MyOrders";
import {useSelector} from "react-redux";

const index = () => {
  const modalStateFromRedux = useSelector(
    state => state.order.isScheduleModalOpen,
  );
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header zIndex={modalStateFromRedux} />
      <MenuList />
      <MyOrders />
      <Notifications />
    </div>
  );
};

export default index;
