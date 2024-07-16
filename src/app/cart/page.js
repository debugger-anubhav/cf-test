import React from "react";
import CartComponents from "./SsrCart";

export default async function CartPage() {
  return (
    <>
      <meta name="Title" content="Conveniently Rent Furniture and Appliances" />
      <CartComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Conveniently Rent Furniture and Appliances";
  const description =
    "Rent furniture and appliances easily! Enjoy flexible plans, doorstep delivery, and smooth transactions. Start creating your dream home today!";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/cart`,
    },
    openGraph: {
      url: `https://cityfurnish.com/cart`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
