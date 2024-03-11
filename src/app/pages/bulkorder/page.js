import React from "react";
import BulkOrderMain from "./SsrBulkorder";

export default async function BulkOrderPage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish | Bulk Order" />
      <BulkOrderMain />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish | Bulk Order";
  const description =
    "Place Bulk Order. Office Furniture, Hotel Furniture, Restaurant Furniture";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/bulkorder`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/bulkorder`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
