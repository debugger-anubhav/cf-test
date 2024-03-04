import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import "../../globals.css";

let pageDescription = "";
// export const metadata = {
//   title: "",
//   description: "",
// };
export default function CategoryPageLayout({children, cityName, metaData}) {
  // const pageTitle = `Rent Premium Furniture & Home Appliances in ${cityName} - Cityfurnish`;
  pageDescription = `Make your home with us. Rent furniture and home appliances online from  ${cityName}'s leading furniture rental company. Free home delivery and installation.`;
  console.log(metaData, "metadataaaaaaaaaaaaaaaaaa");
  return (
    <html lang="en">
      <head>
        {cityName && (
          <>
            <title>{metaData && metaData?.cat_meta_title}</title>
            <meta name="title" content={metaData?.cat_meta_title} />
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
