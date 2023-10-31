"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import {CartPageSkeleton} from "@/components/Cart";
import loadable from "@loadable/component";

const CartSection = loadable(() => import("@/components/Cart"), {
  fallback: <CartPageSkeleton />,
});

const CartPage = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <CartSection />
      <Notifications />
    </div>
  );
};

export default CartPage;
