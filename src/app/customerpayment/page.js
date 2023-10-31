"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import CustomerPayment from "@/components/CustomerPayment";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

function CustomerPaymentPage() {
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <CustomerPayment />
      <Footer />
    </div>
  );
}

export default CustomerPaymentPage;
