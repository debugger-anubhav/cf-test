"use client";
import loadable from "@loadable/component";
const DownloadForMobile = loadable(
  () => import("@/components/Home/DownloadForMobile"),
);
export default DownloadForMobile;
