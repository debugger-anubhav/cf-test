"use client";
import React from "react";

import loadable from "@loadable/component";
import {NewlyLauncedSkeleton} from "@/components/Home/NewlyLaunched";

const NewlyLaunched = loadable(
  () => import("@/components/Home/NewlyLaunched"),
  {fallback: <NewlyLauncedSkeleton />},
);
export default NewlyLaunched;
