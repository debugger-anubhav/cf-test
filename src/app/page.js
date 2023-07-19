"use client";

import React from "react";
import PrimaryButton from "@/components/Common/PrimaryButton";
// import dynamic from "next/dynamic";

// const PrimaryButton = dynamic(
//   () => import("@/components/Common/PrimaryButton"),
//   {ssr: false},
// );

export default function Home() {
  return (
    <div>
      <div className="m-8">
        <PrimaryButton
          desc={"Explore all products"}
          onClick={() => console.log("egywguy")}
        />
      </div>
    </div>
  );
}
