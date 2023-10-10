"use client";
import Notifications from "@/components/Common/Notifications/Notification";
import ReferAFriend from "@/components/ReferAFriend/ReferAFriend";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

const ReferFriendPage = () => {
  const router = useRouter();
  const isLoogedIn = decrypt(getLocalStorage("_ga"));

  useEffect(() => {
    if (!isLoogedIn) router.push("/pages/refer-a-friend");
  }, []);

  return (
    <div className="large_layout">
      <ReferAFriend login />
      <Notifications />
    </div>
  );
};

export default ReferFriendPage;
