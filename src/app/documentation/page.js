"use client";
import React from "react";
import Header from "../../components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import DocMain from "@/components/Documentation/DocMain/DocMain";
// import DocumentaionInitialScreen from "@/components/Documentation/InitialScreen/Initialscreen";
const Documentaion = () => {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      {/* <DocumentaionInitialScreen /> */}
      <DocMain />
    </div>
  );
};

export default Documentaion;
