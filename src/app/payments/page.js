import React from "react";
import PaymentsComponents from "./SsrPayments";

export default async function PaymentsPage() {
  return (
    <>
      <meta
        name="Title"
        content="Rent Premium Furniture & Home Appliances Online - Cityfurnish"
      />
      <PaymentsComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "My Account - Payments";
  const description =
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/payments`,
    },
    openGraph: {
      url: `https://cityfurnish.com/payments`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
