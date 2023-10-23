"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import ProfileSettings from "@/components/ProfileSettings";
import {Formik} from "formik";
import React from "react";

const Profilesettings = () => {
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <Formik>
        <ProfileSettings />
      </Formik>
      <Notifications />
    </div>
  );
};

export default Profilesettings;
