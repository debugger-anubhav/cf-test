import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish Offers and Discount Coupons",
  description: "Cityfurnish Offers and Discount Coupons",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="Title" content="Cityfurnish Offers and Discount Coupons" />
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
