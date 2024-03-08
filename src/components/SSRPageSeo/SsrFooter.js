"use client";
import React from "react";
import loadable from "@loadable/component";
import {FooterSkeleton} from "@/components/Common/Footer";

const Footer = loadable(() => import("@/components/Common/Footer"), {
  fallback: <FooterSkeleton />,
});

export default Footer;
