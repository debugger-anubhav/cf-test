import React from "react";
import PurchasesComponents from "./SsrPurchases";

export default async function PurchasesPage() {
  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <PurchasesComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Purchases";
  const description =
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/purchases`,
    },
    openGraph: {
      url: `https://cityfurnish.com/purchases`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
