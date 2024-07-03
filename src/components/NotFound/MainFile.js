"use client";
import React from "react";
import AnnouncementBar from "../Common/AnnouncementBar/index";
import Header from "../Common/Header/index";
import NotFoundComponent from "./NotFoundComponent/index";

export default function MainFile() {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <NotFoundComponent />
    </div>
  );
}
