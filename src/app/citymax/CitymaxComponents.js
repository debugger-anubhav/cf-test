"use client";
import CitymaxHeader from "@/components/Citymax/Header";
import CitymaxHome from "@/components/Citymax/Home";
import React from "react";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Footer from "@/components/Common/Footer";

const CitymaxComponents = () => {
  return (
    <div className="large_layout">
      <CitymaxHeader />
      <CitymaxHome />
      <FrequentlyAskedQuestions isCitymax params={"citymax"} />
      <Footer />
    </div>
  );
};

export default CitymaxComponents;
