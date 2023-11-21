"use client";
import React from "react";
import {Formik} from "formik";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import ProfileSettings from "@/components/ProfileSettings";
import {AuthProvider} from "@/components/HOC/index";

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

export default AuthProvider(Profilesettings);
