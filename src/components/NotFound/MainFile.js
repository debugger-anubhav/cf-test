"use client";
import React from "react";
import NotFoundComponent from "./NotFoundComponent/index";
import AnnouncementBar from "../Common/AnnouncementBar";
// import Header from "../Common/Header/index";

export default function MainFile() {
  return (
    <div>
      <AnnouncementBar />
      {/* <Header /> */}
      <NotFoundComponent />
    </div>
  );
}
