import React from "react";
import About from "./SsrAbout";
import CatAnnouncement from "../../[city]/[category]/CatAnnouncement";

export default async function AboutPage() {
  return (
    <>
      <meta name="Title" content="Furniture Rental - About Us" />
      <div className="large_layout">
        <CatAnnouncement />
        <About />
      </div>
    </>
  );
}

export async function generateMetadata() {
  const Title = "Furniture Rental - About Us";
  const Description = "Cityfurnish.com: About Us";
  return {
    title: Title,
    description: Description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/about`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/about`,
      title: Title,
      description: Description,
      siteName: "Cityfurnish",
    },
  };
}
