"use client";
import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import PaymentFailure from "@/components/PostCheckout/Failure";

const CartPageFailure = () => {
  useEffect(() => {
    console.log("failure screen");
  }, []);
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

export default CartPageFailure;
