import React from "react";
// import partner from "../../../assets/our-reputation.webp";
import styles from "./style.module.css";
import Image from "@/components/Image/Image";

const PartnershipBanner = ({bannerUrl}) => {
  return (
    // <div className={styles.partnership_banner}>
    //   <Image
    //     alt="our-reputation-static"
    //     loader={({src}) => src}
    //     src={
    //       "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/our-reputation.webp"
    //     }
    //     width={328}
    //     height={488}
    //     className="w-full h-full pointer-events-none"
    //   />
    // </div>
    <div className={styles.partnership_banner}>
      <Image
        alt="our-reputation-static"
        src={bannerUrl}
        className="w-full lg:!h-full"
      />
    </div>
  );
};

export default PartnershipBanner;
