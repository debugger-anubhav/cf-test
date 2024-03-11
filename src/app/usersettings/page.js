import React from "react";
import UsersettingsComponents from "./SsrUserSettings";

export default async function UserSettingsPage() {
  return (
    <>
      <meta name="Title" content="Settings" />
      <UsersettingsComponents />
    </>
  );
}

export async function generateMetadata() {
  const title = "Settings";
  const description =
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://cityfurnish.com/usersettings`,
    },
    openGraph: {
      url: `https://cityfurnish.com/usersettings`,
      title,
      description,
      siteName: "Cityfurnish",
    },
  };
}
