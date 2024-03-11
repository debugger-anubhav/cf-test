"use client";
import React, {useEffect} from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";
import {AuthProvider} from "@/components/HOC/index";
import UserSettings from "@/components/UserSettings/UserSettings";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const UsersettingsComponents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("Overview"));
  }, []);
  return (
    <div className="large_layout">
      <AnnouncementBar />
      <Header />
      <MenuList />
      <UserSettings />
    </div>
  );
};

export default AuthProvider(UsersettingsComponents);
