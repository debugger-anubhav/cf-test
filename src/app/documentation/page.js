"use client";
import React, {useEffect} from "react";
import Header from "../../components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import DocMain from "@/components/Documentation/DocMain/DocMain";
import Notifications from "@/components/Common/Notifications/Notification";
import {AuthProvider} from "@/components/HOC/index";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const Documentation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Only run this code in the browser environment
      dispatch(setDocSidebarActiveItem("KYC & Documentation"));
    }
  }, []);

  return (
    <div>
      <AnnouncementBar />
      <Header />
      <DocMain />
      <Notifications />
    </div>
  );
};

export default AuthProvider(Documentation);
