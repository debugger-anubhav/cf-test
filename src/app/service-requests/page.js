"use client";
import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Footer from "@/components/Common/Footer";
import {AuthProvider} from "@/components/HOC/index";
import ServiceRequests from "@/components/ServiceRequests/index";
import Notifications from "@/components/Common/Notifications/Notification";
import {setDocSidebarActiveItem} from "@/store/Slices";
import {useDispatch} from "react-redux";

const ServiceRequestPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("My Service Requests"));
  }, []);
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <ServiceRequests />
      <Footer />
      <Notifications />
    </div>
  );
};

export default AuthProvider(ServiceRequestPage);
