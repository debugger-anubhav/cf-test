import React from "react";
import Header from "../Common/Header";
import loadable from "@loadable/component";
const About = () => {
  const Footer = loadable(() => import("@/components/Common/Footer"));

  return (
    <div>
      <Header />
      ghjkl
      <Footer />
    </div>
  );
};

export default About;
