"use client";
import React from "react";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

import loadable from "@loadable/component";
const LimetedPreiodDiscount = loadable(
  () => import("@/components/Home/LimetedPreiodDiscount"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
export default LimetedPreiodDiscount;
