import React from "react";
import Offers from "./SsrOffers";

export default async function OffersPage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish Offers and Discount Coupons" />
      <Offers />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish Offers and Discount Coupons";
  const description = "Cityfurnish Offers and Discount Coupons";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/offers`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/offers`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
