// import React from "react";
// import PropTypes from "prop-types";
// import ReduxProvider from "@/store/provider";
// import QueryProvider from "@/components/QueryProvider/QueryProvider";

// export const metadata = {
//   title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
//   description:
//     "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
// };

// export default function RootLayout({children}) {
//   return (
//     <html lang="en">
//       <head>
//         <meta
//           name="Title"
//           content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>
//         <ReduxProvider>
//           <QueryProvider>{children}</QueryProvider>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }
// RootLayout.propTypes = {
//   children: PropTypes.element,
// };

import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

let pageDescription = "";
// const metadata = {
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
