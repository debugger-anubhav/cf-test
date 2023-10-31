"use client";
import React from "react";
import BulkOrderMain from "@/components/BulkOrder/BulkOrder";
import Notifications from "@/components/Common/Notifications/Notification";

const BulkOrder = () => {
  return (
    <div className="large_layout">
      <BulkOrderMain />
      <Notifications />
    </div>
  );
};

export default BulkOrder;
