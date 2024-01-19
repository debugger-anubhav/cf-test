import React from "react";
import "../globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Rent Premium Furniture and Home Appliances - Citymax",
  description:
    "Rent Furniture and Appliances on a Monthly Rental Subscription Plan from Citymax. We Provide Renting Services in Bangalore, Mumbai, Pune, Delhi, Gurgaon, Noida, Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Rent Premium Furniture and Home Appliances - Citymax"
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
