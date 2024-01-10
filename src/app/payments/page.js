"use client";
import React, {useEffect} from "react";

import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Footer from "@/components/Common/Footer";
import PaymentPage from "../../components/Payments";
import {AuthProvider} from "@/components/HOC/index";
import {setDocSidebarActiveItem} from "@/store/Slices";
import {useDispatch} from "react-redux";

const Payments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("My Payments"));
  }, []);
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <PaymentPage />
      <Footer />
    </div>
  );
};

export default AuthProvider(Payments);
