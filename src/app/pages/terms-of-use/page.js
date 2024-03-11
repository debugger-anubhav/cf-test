import React from "react";
import TermsOfUse from "./SsrTermUse";

export default async function TermUsePage() {
  return (
    <>
      <meta name="Title" content="Cityfurnish.com | Terms of Use" />
      <TermsOfUse />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish.com | Terms of Use";
  const description = "Check CityfurnishTerms of Using Website";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/terms-of-use`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/terms-of-use`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
