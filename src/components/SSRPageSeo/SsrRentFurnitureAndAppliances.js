"use client";
import React from "react";

import loadable from "@loadable/component";
import {RentFurnitureSkeleton} from "@/components/Home/RentFurnitureAndAppliances";

const RentFurnitureAndAppliances = loadable(
  () => import("@/components/Home/RentFurnitureAndAppliances"),
  {
    fallback: <RentFurnitureSkeleton />,
  },
);

export default RentFurnitureAndAppliances;
