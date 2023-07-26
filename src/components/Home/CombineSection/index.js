import React from "react";
import PartnershipBanner from "../PartnershipBanner";
import FourSteps from "../FourSteps";
import ChatWithUs from "../ChatWithUs";

const CombineSection = () => {
  return (
    <>
      {/* for desktop */}
      <div className="hidden xl:flex py-20 px-[90px] relative macbook:px-[122px]">
        <PartnershipBanner />
        <div>
          <FourSteps />
          <ChatWithUs />
        </div>
      </div>

      {/* for mobile */}
      <div className="xl:hidden">
        <PartnershipBanner />
        <FourSteps />
        <ChatWithUs />
      </div>
    </>
  );
};

export default CombineSection;
