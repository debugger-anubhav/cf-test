import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "We are Hiring | Careers @ Cityfurnish",
  description:
    "We are Hiring | At Cityfurnish we are building an on-demand furniture and appliances rental startup",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="Title" content="We are Hiring | Careers @ Cityfurnish" />
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
