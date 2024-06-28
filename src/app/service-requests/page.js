import React from "react";
import ServiceRequestComponents from "./SsrServiceRequests";

export default async function ServiceReuestsPage() {
  return (
    <>
      <meta
        name="Title"
        content="Let us know what you are expecting, we will be happy to help."
      />
      <ServiceRequestComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Raise a service request - Cityfurnish";
  const description =
    "Let us know what you are expecting, we will be happy to help.";
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
