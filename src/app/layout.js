import React from "react";
import "./globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "Cityfurnish",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="Title" content="Cityfurnish" /> */}
        <meta
          name="facebook-domain-verification"
          content="5qetjkn16z0nh00u71i0iw25oljz0h"
        />
        <meta
          name="google-site-verification"
          content="-7HYCsHFSLsnVIKsDD6-2sAPS280EgG3x8SB6Imvk34"
        />
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta
          name="google-signin-client_id"
          content="1065795218106-s2m2k3s28ch432hn8gp669pjjn7esr7d.apps.googleusercontent.com"></meta>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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
