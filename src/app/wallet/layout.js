import React from "react";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata = {
  title: "My Wallet",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  alternates: {
    canonical: `https://cityfurnish.com/wallet`,
  },
  openGraph: {
    url: `https://cityfurnish.com/wallet`,
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="Title"
          content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
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
