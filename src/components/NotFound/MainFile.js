"use client";
import React from "react";
import NotFoundComponent from "./NotFoundComponent/index";
import AnnouncementBar from "../Common/AnnouncementBar";
import Header from "../Common/Header/index";
import MenuList from "../Common/MenuList";

export default function MainFile() {
  return (
    <div>
      <AnnouncementBar />

      <Header />
      <MenuList />
      <NotFoundComponent />
    </div>
  );
}
