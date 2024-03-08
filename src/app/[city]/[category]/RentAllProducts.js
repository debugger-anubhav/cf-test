"use client";
import React from "react";
import {SubproductSkeleton} from "@/components/AllProduct/SubProduct/Subproduct";
import loadable from "@loadable/component";

const Subproduct = loadable(
  () => import("@/components/AllProduct/SubProduct/Subproduct"),
  {
    fallback: <SubproductSkeleton />,
  },
);
export default Subproduct;
