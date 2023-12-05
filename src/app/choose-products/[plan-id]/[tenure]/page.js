"use client";
import CitymaxHeader from "@/components/Citymax/Header";
import React from "react";
import Footer from "@/components/Common/Footer";
import CitymaxPlanDetail from "../../../../components/Citymax/PlanDetails";

const CitymaxPage = () => {
  return (
    <div className="large_layout">
      <CitymaxHeader />
      <CitymaxPlanDetail />
      <Footer />
    </div>
  );
};

export default CitymaxPage;
