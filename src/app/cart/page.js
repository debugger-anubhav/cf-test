"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import React from "react";

// import CartSection from "@/components/Cart";
import Notifications from "@/components/Common/Notifications/Notification";
import loadable from "@loadable/component";
import {CartPageSkeleton} from "@/components/Cart";
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
