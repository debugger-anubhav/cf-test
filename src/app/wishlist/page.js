"use client";

import React from "react";
import {useParams} from "next/navigation";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import loadable from "@loadable/component";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import {FooterSkeleton} from "@/components/Common/Footer";
import {WishListSkeleton} from "@/components/Wishlist/ProductList/ProductList";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
const ProductList = loadable(
  () => import("@/components/Wishlist/ProductList/ProductList"),
  {
    fallback: <WishListSkeleton />,
  },
);

export default function Wishlist() {
  const params = useParams();

  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <ProductList params={params} />
      <Footer />
      <Notifications />
    </div>
  );
}
