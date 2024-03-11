import React from "react";
import ReferFriendComponents from "./SsrRefer";

export default async function ReferAFriendPage() {
  return (
    <>
      <meta
        name="Title"
        content="Cityfurnish- Refer a friend and get extra benefits"
      />
      <ReferFriendComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Cityfurnish- Refer a friend and get extra benefits";
  const description = "Cityfurnish Friends Referral Program";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/pages/refer-a-friend`,
    },
    openGraph: {
      url: `https://cityfurnish.com/pages/refer-a-friend`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
