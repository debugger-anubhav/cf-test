"use client";

import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import loadable from "@loadable/component";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import {FooterSkeleton} from "@/components/Common/Footer";
import CFCoins from "@/components/CFCoins";
import {AuthProvider} from "@/components/HOC/index";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

const Wallet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("CF coins"));
  }, []);
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <CFCoins />
      <Footer />
      <Notifications />
    </div>
  );
};

export default AuthProvider(Wallet);
