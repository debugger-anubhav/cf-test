"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Notifications from "@/components/Common/Notifications/Notification";
import PaymentConfirmation from "@/components/PostCheckout/Confirmation";
import RootLayoutSuccess from "./layout";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

const index = () => {
  const userId = decrypt(getLocalStorage("_ga"));

  return (
    <RootLayoutSuccess userId={userId}>
      <div className="large_layout">
        <AnnouncementBar />
        <Header />
        <MenuList />
        <PaymentConfirmation />
        <Notifications />
      </div>
    </RootLayoutSuccess>
  );
};

export default index;
