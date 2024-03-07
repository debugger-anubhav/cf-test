"use client";
import React from "react";

import loadable from "@loadable/component";
import {RentNowBannersSkeleton} from "@/components/Home/RentNowBanner";

const RentNowBanner = loadable(
  () => import("@/components/Home/RentNowBanner"),
  {fallback: <RentNowBannersSkeleton />},
);

export default RentNowBanner;
