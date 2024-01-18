import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish- Rental Process",
  description: "How Process of Rental Works",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="Title" content="Cityfurnish- Rental Process" />
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
