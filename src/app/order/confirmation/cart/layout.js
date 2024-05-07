import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <script
            defer
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-05PLBRM6KD"
          />
        )}
        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
             
            `,
            }}
          />
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
RootLayout.propTypes = {
  children: PropTypes.element,
};
