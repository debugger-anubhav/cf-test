import React from "react";
import PartnershipBanner from "../PartnershipBanner";
import FourSteps from "../FourSteps";
import ChatWithUs from "../ChatWithUs";

const CombineSection = () => {
  return (
    <>
      {/* for desktop */}
      <div className="hidden lg:flex pb-20 pt-12 px-[70px] xl:px-[90px] relative macbook:px-[122px] 3xl:px-[160px] mt-10 gap-4 xl:gap-7 macbook:gap-[33px] 2xl:gap-12 3xl:gap-20 4xl:gap-10">
        <PartnershipBanner />
        <div>
          <FourSteps />
          <ChatWithUs />
        </div>
      </div>

      {/* for mobile */}
      <div className="lg:hidden">
        <PartnershipBanner />
        <FourSteps />
        <ChatWithUs />
      </div>
    </>
  );
};

export default CombineSection;
