import React from "react";
import YourAddressesComponents from "./SsrYourAddresses";

export default async function YourAddressesPage() {
  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <YourAddressesComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Shipping Address";
  const description =
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/settings/shipping`,
    },
    openGraph: {
      url: `https://cityfurnish.com/settings/shipping`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
