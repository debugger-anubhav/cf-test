import React from "react";
import PrivacyPolicy from "./SsrPrivacyPolicy";

export default async function PrivacyPolicyPage() {
  return (
    <>
      <meta name="Title" content="Privacy Policy" />
      <PrivacyPolicy />
    </>
  );
}

export async function generateMetadata() {
  const title = "Privacy Policy";
  const description = "Privacy Policy";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/privacy-policy`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/privacy-policy`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
