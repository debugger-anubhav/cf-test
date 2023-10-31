"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import PaymentFailure from "@/components/PostCheckout/Failure";

const CartPage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <PaymentFailure />
      <Notifications />
    </div>
  );
};

export default CartPage;
