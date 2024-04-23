"use client";
import loadable from "@loadable/component";
const HasselFreeServicesCards = loadable(
  () => import("@/components/Home/HasselFreeServicesCards"),
);
export default HasselFreeServicesCards;
