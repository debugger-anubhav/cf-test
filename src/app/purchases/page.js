"use client";
import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import MyOrders from "@/components/MyOrders";
import {AuthProvider} from "@/components/HOC/index";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("My Orders"));
  }, []);
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
