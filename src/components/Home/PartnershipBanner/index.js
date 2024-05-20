import React from "react";
import partner from "../../../assets/our-reputation.webp";
import Image from "next/image";
import styles from "./style.module.css";

const PartnershipBanner = () => {
  return (
    <div className={styles.partnership_banner}>
      <Image
        alt="our-reputation-static"
        src={partner}
        // src={
        //   "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/our-reputation.webp"
        // }
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default PartnershipBanner;
