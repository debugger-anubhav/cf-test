import React from "react";
// import partner from "../../../assets/partnership.svg";
// import Image from "next/image";
import styles from "./style.module.css";

const PartnershipBanner = () => {
  return (
    <div className={styles.partnership_banner}>
      <img
        alt="our-reputation"
        src={
          "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/our-reputation.webp"
        }
        loading="lazy"
        className="w-full h-full pointer-events-none"
      />
      {/* <Image
        src={partner}
        alt="partnership"
        layout="fill"
        objectFit="cover"
        className="w-full h-full hidden xl:flex"
      /> */}
    </div>
  );
};

export default PartnershipBanner;
