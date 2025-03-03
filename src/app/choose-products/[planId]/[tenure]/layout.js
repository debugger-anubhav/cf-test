import React from "react";
import "../../../globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.png",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="title"
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
