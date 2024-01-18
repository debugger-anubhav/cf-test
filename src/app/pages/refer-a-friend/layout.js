import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish- Refer a friend and get extra benefits",
  description: "Cityfurnish Friends Referral Program",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Cityfurnish- Refer a friend and get extra benefits"
        />
      </head>
      <body>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
RootLayout.propTypes = {
  children: PropTypes.element,
};
