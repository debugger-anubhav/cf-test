import React from "react";
import "./globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import localFont from "@next/font/local";
import Head from "../components/Head";

export const metadata = {
  title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.png",
  },
  alternates: {
    canonical: `https://cityfurnish.com`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
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

const poppins = localFont({
  src: [
    {
      path: "./font/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "./font/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "./font/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "./font/Poppins-SemiBold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "./font/Inter-VariableFont_slnt,wght.ttf",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({children}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} font-sans`}>
      <Head />
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
