import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish | Bulk Order",
  description:
    "Place Bulk Order. Office Furniture, Hotel Furniture, Restaurant Furniture",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="Title" content="Cityfurnish | Bulk Order" />
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
