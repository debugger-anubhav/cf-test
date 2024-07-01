"use client";

import React from "react";
import Header from "@/components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import NotFoundComponent from "@/components/NotFoundComponent";

export default function NotFound() {
  // notFound();
  return (
    <>
      <AnnouncementBar />
      <Header />
      <NotFoundComponent />
    </>
  );
}
