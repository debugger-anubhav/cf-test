import React from "react";
import "../../globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish.com | Terms of Use",
  description: "Check CityfurnishTerms of Using Website",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="Cityfurnish.com | Terms of Use" />
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
