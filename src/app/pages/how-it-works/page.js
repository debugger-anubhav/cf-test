import React from "react";
import HowItWorkComponents from "./SsrHowItWorks";

export default async function HowItWorksPage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish- Rental Process" />
      <HowItWorkComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish- Rental Process";
  const description = "How Process of Rental Works";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/how-it-works`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/how-it-works`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
