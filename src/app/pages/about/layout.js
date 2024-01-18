import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

const metadata = {
  title: "Furniture Rental - About Us",
  description: "Cityfurnish.com: About Us",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
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
