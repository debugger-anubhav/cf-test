import React from "react";
import BenefitsComponents from "./SsrBenefits";

export default async function BenefitsPage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish- Furniture Renting Benefits" />
      <BenefitsComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish- Furniture Renting Benefits";
  const description =
    "Cityfurnish- Rent Furniture from Cityfurnish and get free delivery, upgrade, relocation, installation, damage waiver.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/benefits`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/benefits`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
