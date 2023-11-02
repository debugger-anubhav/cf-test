"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Notifications from "@/components/Common/Notifications/Notification";
import PaymentConfirmation from "@/components/PostCheckout/Confirmation";
// import PaymentFailure from "@/components/PostCheckout/Failure";

const index = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <PaymentConfirmation />
      {/* <PaymentFailure /> */}
      <Notifications />
    </div>
  );
};

export default index;
