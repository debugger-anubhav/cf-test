"use client";
import React from "react";

import loadable from "@loadable/component";
import {OffersSkeleton} from "@/components/Home/OffersAndCoupons";

const OffersAndCoupons = loadable(
  () => import("@/components/Home/OffersAndCoupons"),
  {fallback: <OffersSkeleton />},
);
export default OffersAndCoupons;
