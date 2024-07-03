import React from "react";
import MainFile from "../components/NotFound/SSRNotFound";
import RootLayout from "./layout";

export default async function NotFound() {
  return (
    <RootLayout>
      <MainFile />
    </RootLayout>
  );
}
