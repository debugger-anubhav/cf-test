"use client";
import React from "react";
import loadable from "@loadable/component";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
const FrequentlyAskedQuestions = loadable(
  () => import("@/components/Common/FrequentlyAskedQuestions"),
  {
    fallback: <FaqsSkeleton />,
  },
);
export default FrequentlyAskedQuestions;
