"use client";
import React, {useEffect} from "react";
import Notifications from "@/components/Common/Notifications/Notification";
import ReferAFriend from "@/components/ReferAFriend/ReferAFriend";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import {useDispatch} from "react-redux";
import {setDocSidebarActiveItem} from "@/store/Slices";

const ReferFriendPage = () => {
  const router = useRouter();
  const isLoogedIn = decrypt(getLocalStorage("_ga"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDocSidebarActiveItem("Referral Code"));
  }, []);

  useEffect(() => {
    if (!isLoogedIn) router.push("/pages/refer-a-friend");
  }, []);

  return (
    <div className="large_layout">
      <AnnouncementBar />
      <ReferAFriend login />
      <Notifications />
    </div>
  );
};

export default ReferFriendPage;
