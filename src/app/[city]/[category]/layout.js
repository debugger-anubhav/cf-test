import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import "../../globals.css";

let pageDescription = "";
export const metadata = {
  title: "",
  description: "",
};
export default function CategoryPageLayout({children, cityName}) {
  const pageTitle = `Furniture on Rent in ${cityName} - Cityfurnish`;
  pageDescription = `Get home furniture on rent in ${cityName}. Check our rental furniture range for bedroom, living room, dining room and rent furniture from the comfort of your home.`;
  return (
    <html lang="en">
      <head>
        {cityName && (
          <>
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
          </>
        )}
      </head>
      <body>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
CategoryPageLayout.propTypes = {
  children: PropTypes.element,
  productName: PropTypes.string.isRequired,
};
