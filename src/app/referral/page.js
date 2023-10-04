"use client";
import Notifications from "@/components/Common/Notifications/Notification";
import ReferAFriend from "@/components/ReferAFriend/ReferAFriend";
import React from "react";

const ReferFriendPage = () => {
  return (
    <div className="large_layout">
      <ReferAFriend />
      <Notifications />
    </div>
  );
};

export default ReferFriendPage;
