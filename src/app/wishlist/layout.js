import React from "react";
import "../globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "",
  description:
    "Furniture rental made easy with CityFurnish. Rent home furniture online, including living room furniture, for as long as you need it. Available in major Indian cities like Noida, Delhi, Hyderabad, Mumbai, Gurgaon, Pune and Bangalore. Download our furniture rental app for convenience and flexibility.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
};

export default function RootLayout({children}) {
  const data = {
    ...metadata,
    title: `Rent Premium Furniture & Home Appliances Online - Cityfurnish`,
  };
  const titleContent = data?.title.replace(/&/g, "&amp;");
  return (
    <html lang="en">
      <head>
        <title dangerouslySetInnerHTML={{__html: data?.title}} />
        <meta name="Title" content={titleContent} />
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
