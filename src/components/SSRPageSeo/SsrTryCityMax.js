"use client";
import React from "react";

import loadable from "@loadable/component";
import {TryCityMaxSkeleton} from "@/components/Home/TryCityMax";

const TryCityMax = loadable(() => import("@/components/Home/TryCityMax"), {
  fallback: <TryCityMaxSkeleton />,
});
export default TryCityMax;
