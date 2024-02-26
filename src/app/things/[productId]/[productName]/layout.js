import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

let pageDescription = "";
// export const metadata = {
//   title: "",
//   description: "",
// };
export default function SpecificPageLayout({children, productName}) {
  const pageTitle = `Rent Furniture Online - ${productName}`;
  pageDescription = `Furniture Rental - Rent ${productName} Online in India - by Cityfurnish. Door Step Delivery, High-Quality Products, Easy Terms.`;
  return (
    <html lang="en">
      <head>
        {productName && (
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
SpecificPageLayout.propTypes = {
  children: PropTypes.element,
  productName: PropTypes.string.isRequired,
};
