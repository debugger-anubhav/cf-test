"use client";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import Notifications from "@/components/Common/Notifications/Notification";
import ReferAFriend from "@/components/ReferAFriend/ReferAFriend";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import AnnouncementBar from "@/components/Common/AnnouncementBar";

const ReferFriendPage = () => {
  const router = useRouter();
  const isLoogedIn = decrypt(getLocalStorage("_ga"));

  useEffect(() => {
    if (isLoogedIn) router.push("/referral");
  }, []);

  return (
    <div className="large_layout">
      <AnnouncementBar />
      <ReferAFriend login={false} />
      <Notifications />
    </div>
  );
};

export default ReferFriendPage;
