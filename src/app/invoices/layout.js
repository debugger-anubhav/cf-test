import React from "react";
import "../globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "My Account - My Invoices page",
  description:
    "Furniture rental made easy with CityFurnish. Rent home furniture online, including living room furniture, for as long as you need it. Available in major Indian cities like Noida, Delhi, Hyderabad, Mumbai, Gurgaon, Pune and Bangalore. Download our furniture rental app for convenience and flexibility.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
  alternates: {
    canonical: `https://cityfurnish.com/invoices`,
  },
  openGraph: {
    url: `https://cityfurnish.com/invoices`,
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
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
