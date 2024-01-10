"use client";
import React, {useEffect} from "react";
import Header from "../../components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import DocMain from "@/components/Documentation/DocMain/DocMain";
import Notifications from "@/components/Common/Notifications/Notification";
import {AuthProvider} from "@/components/HOC/index";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const Documentaion = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("KYC & Documentation"));
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

export default AuthProvider(Documentaion);
