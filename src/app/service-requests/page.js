import React from "react";
import ServiceRequestComponents from "./SsrServiceRequests";

export default async function ServiceReuestsPage() {
  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <ServiceRequestComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Service Request";
  const description =
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/service-requests`,
    },
    openGraph: {
      url: `https://cityfurnish.com/service-requests`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
