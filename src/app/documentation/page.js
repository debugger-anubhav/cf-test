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

  // useEffect(() => {
  //   dispatch(setDocSidebarActiveItem("KYC & Documentation"));
  //   const script = document?.createElement("script");
  //   script.src =
  //     "https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com/hyperverge-web-sdk@8.6.2/src/sdk.min.js";
  //   script.async = true;

  //   document?.body?.appendChild(script);

  //   return () => {
  //     document?.body?.removeChild(script);
  //   };
  // }, [dispatch]);

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
