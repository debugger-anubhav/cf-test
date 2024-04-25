import React from "react";
import BulkOrderMain from "./SsrBulkorder";

export default async function BulkOrderPage() {
  return (
    <>
      <meta
        name="Title"
        content="Furniture on Rent for Home and Business | Cityfurnish"
      />
      <BulkOrderMain />
    </>
  );
}

export async function generateMetadata() {
  const title = "Furniture on Rent for Home and Business | Cityfurnish";
  const description =
    "Cityfurnish offers turnkey services for bulk furniture orders for both homes and businesses. Rent furniture online and enjoy hassle-free services!";
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
