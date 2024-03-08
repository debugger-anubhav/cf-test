"use client";
import React from "react";
import SubHeaderSkeleton from "@/components/Category/SubHeader/Subheader/SubHeaderSkeleton";
import loadable from "@loadable/component";

const SubHeader = loadable(
  () => import("@/components/Category/SubHeader/Subheader/SubHeader"),
  {
    fallback: <SubHeaderSkeleton />,
  },
);
export default SubHeader;
