"use client";
import React, {useEffect} from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import TenureExtension from "@/components/TenureExtension";
import {setAnnouncementBar} from "@/store/Slices";
import {useDispatch} from "react-redux";
const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});
function TenureExtensionPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAnnouncementBar(true));
  }, []);
  return (
    <div className="large_layout">
      <Header />
      <MenuList />
      <TenureExtension />
      <Footer />
    </div>
  );
}

export default TenureExtensionPage;
