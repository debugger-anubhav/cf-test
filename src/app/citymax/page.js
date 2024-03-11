import React from "react";
import CitymaxComponents from "./SsrCitymax";

export default async function CitymaxPage() {
  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture and Home Appliances - Citymax"
      />
      <CitymaxComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Rent Premium Furniture and Home Appliances - Citymax";
  const description =
    "Rent Furniture and Appliances on a Monthly Rental Subscription Plan from Citymax. We Provide Renting Services in Bangalore, Mumbai, Pune, Delhi, Gurgaon, Noida, Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/citymax`,
    },
    openGraph: {
      url: `https://cityfurnish.com/citymax`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
