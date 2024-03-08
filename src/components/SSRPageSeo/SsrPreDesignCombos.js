"use client";
import React from "react";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

import loadable from "@loadable/component";
const PreDesignCombos = loadable(
  () => import("@/components/Home/PredesignCombos"),
  {
    fallback: <ProductRowSkeleton />,
  },
);
export default PreDesignCombos;
