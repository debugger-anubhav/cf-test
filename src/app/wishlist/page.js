import React from "react";
import Wishlist from "./SsrWishlist";

export default async function WishlistPage() {
  return (
    <>
      <meta name="Title" content="Product Listing" />
      <Wishlist />
    </>
  );
}

export async function generateMetadata() {
  const title = "Product Listing";
  const description =
    "Rent Premium Furniture & Home Appliances Online - Cityfurnish";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/wishlist`,
    },
    openGraph: {
      url: `https://cityfurnish.com/wishlist`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
