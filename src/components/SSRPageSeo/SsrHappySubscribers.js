"use client";

import loadable from "@loadable/component";
const HappySubscribers = loadable(() =>
  import("@/components/Home/HappySubscribers"),
);
export default HappySubscribers;
