"use client";
import BulkOrderMain from "@/components/BulkOrder/BulkOrder";
import Notifications from "@/components/Common/Notifications/Notification";
import React from "react";

const BulkOrder = () => {
  return (
    <div className="large_layout">
      <BulkOrderMain />
      <Notifications />
    </div>
  );
};

export default BulkOrder;
