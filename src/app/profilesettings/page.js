"use client";
import React, {useEffect} from "react";
import {Formik} from "formik";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import Notifications from "@/components/Common/Notifications/Notification";
import ProfileSettings from "@/components/ProfileSettings";
import {AuthProvider} from "@/components/HOC/index";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const Profilesettings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("Profile Settings"));
  }, []);
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
