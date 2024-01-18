import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Furniture Rental - Frequently Asked Questions",
  description:
    "Cityfurnish.com: Answers of Frequently Asked Quetions for Furniture Rental",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Furniture Rental - Frequently Asked Questions"
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
