import React from "react";
import "./globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import Script from "./script";

export const metadata = {
  title: "Cityfurnish",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Cityfurnish",
    description:
      "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad",
    siteName: "Cityfurnish",
    images: {
      url: "https://d3juy0zp6vqec8.cloudfront.net/images/cityfurnish-og-image.webp",
      width: 800,
      height: 600,
    },
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="5qetjkn16z0nh00u71i0iw25oljz0h"
        />
        <meta
          name="google-site-verification"
          content="-7HYCsHFSLsnVIKsDD6-2sAPS280EgG3x8SB6Imvk34"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Cityfunrish",
                "image": "https://d3juy0zp6vqec8.cloudfront.net/images/icons/final-logo.png",
                "description": "Discover comfort and style with Cityfurnish, India's premier furniture rental brand. We've curated a diverse selection of furniture and furnishings to enhance the style and convenience of your home. Our pieces draw inspiration from the way people live in Indian cities, blending elements from different eras for a unique living experience. Experience the simplicity of renting furniture with Cityfurnish – we provide affordable packages and convenient payment options, ensuring your home is both stylish and hassle-free.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.4",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "1895"
                }
              }
            `,
          }}
        />
        <Script />
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
