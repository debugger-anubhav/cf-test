"use client";
import React from "react";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import Header from "@/components/Common/Header";
import MenuList from "@/components/Common/MenuList";

import Notifications from "@/components/Common/Notifications/Notification";
import PaymentConfirmation from "@/components/PostCheckout/Confirmation";

const index = () => {
  return (
    <>
      <head>
        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <script
            defer
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-05PLBRM6KD"
          />
        )}
        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
             
            `,
            }}
          />
        )}
      </head>
      <div className="large_layout">
        <AnnouncementBar />
        <Header />
        <MenuList />
        <PaymentConfirmation />
        <Notifications />
      </div>
    </>
  );
};

export default index;
