"use client";
import React from "react";

import loadable from "@loadable/component";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

const TrendingProducts = loadable(
  () => import("@/components/Home/TrendingProducts"),
  {
    fallback: <ProductRowSkeleton />,
  },
);

export default TrendingProducts;
