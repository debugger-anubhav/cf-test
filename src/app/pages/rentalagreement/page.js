import React from "react";
import Rentalagreement from "./SsrRentalAgreement";

export default async function RentalAgreementPage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish Sample Rental Agreement" />
      <Rentalagreement />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish Sample Rental Agreement";
  const description =
    "Check Our Sample Rental Agreement - A Customer Friendly Approach.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/rentalagreement`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/rentalagreement`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
