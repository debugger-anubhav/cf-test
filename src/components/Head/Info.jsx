import Script from "next/script";
import React from "react";

const Info = () => {
  return (
    <Script
      type="application/ld+json"
      async
      defer
      dangerouslySetInnerHTML={{
        __html: ` {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Cityfurnish",
            "image": "https://d3juy0zp6vqec8.cloudfront.net/images/icons/final-logo.png",
            "description": "Discover comfort and style with Cityfurnish, India's premier furniture rental brand. We've curated a diverse selection of furniture and furnishings to enhance the style and convenience of your home. Our pieces draw inspiration from the way people live in Indian cities, blending elements from different eras for a unique living experience. Experience the simplicity of renting furniture with Cityfurnish – we provide affordable packages and convenient payment options, ensuring your home is both stylish and hassle-free.",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.4",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "1895"
            }}`,
      }}
    />
  );
};

export default Info;
