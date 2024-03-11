import React from "react";
import ContactUs from "./SsrContact";

export default async function AboutPage() {
  return (
    <>
      <meta
        name="Title"
        content="Cityfurnish Customer Support | Contact Us - cityfurnish.com"
      />
      <ContactUs />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Cityfurnish Customer Support | Contact Us - cityfurnish.com",
    description:
      "Contact Cityfurnish Customer Support at hello@cityfurnish.com for your inquiries or suggestions. We will be happy to help you.",
    alternates: {
      canonical: `https://cityfurnish.com/pages/contact-us`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/contact-us`,
      title: "Cityfurnish Customer Support | Contact Us - cityfurnish.com",
      description:
        "Contact Cityfurnish Customer Support at hello@cityfurnish.com for your inquiries or suggestions. We will be happy to help you.",
      siteName: "Cityfurnish",
    },
  };
}
