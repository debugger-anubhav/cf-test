import React from "react";
import Career from "./SsrCareers";

export default async function AboutPage() {
  return (
    <>
      <meta name="Title" content="We are Hiring | Careers @ Cityfurnish" />
      <Career />
    </>
  );
}

export async function generateMetadata() {
  const title = "We are Hiring | Careers @ Cityfurnish";
  const description =
    "We are Hiring | At Cityfurnish we are building an on-demand furniture and appliances rental startup";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/careers`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/careers`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
