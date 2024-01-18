import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish- Furniture Renting Benefits",
  description:
    "Cityfurnish- Rent Furniture from Cityfurnish and get free delivery, upgrade, relocation, installation, damage waiver.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta name="Title" content="Cityfurnish- Furniture Renting Benefits" />
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
