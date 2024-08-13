import React from "react";
import SignIn from "../../../components/DocumentsPage/Signin";
import Notifications from "@/components/Common/Notifications/Notification";

export default function page() {
  return (
    <div className="w-screen bg-slate-300 h-screen">
      <SignIn />
      <Notifications />
    </div>
  );
}
