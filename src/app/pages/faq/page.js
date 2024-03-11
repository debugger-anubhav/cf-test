import React from "react";
import FAQMain from "./SsrFaq";

export default async function FAQ() {
  return (
    <>
      <meta
        name="Title"
        content="Furniture Rental - Frequently Asked Questions"
      />
      <FAQMain />
    </>
  );
}

export async function generateMetadata() {
  const title = "Furniture Rental - Frequently Asked Questions";
  const description =
    "Cityfurnish.com: Answers of Frequently Asked Quetions for Furniture Rental";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/faq`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/faq`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
