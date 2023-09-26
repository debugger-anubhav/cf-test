"use client";
import React from "react";
import Header from "../../components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import DocMain from "@/components/Documentation/DocMain/DocMain";
const Documentaion = () => {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <DocMain />
    </div>
  );
};

export default Documentaion;
