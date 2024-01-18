import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish Customer Support | Contact Us - cityfurnish.com",
  description:
    "Contact Cityfurnish Customer Support at hello@cityfurnish.com for your inquiries or suggestions. We will be happy to help you.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Cityfurnish Customer Support | Contact Us - cityfurnish.com"
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
