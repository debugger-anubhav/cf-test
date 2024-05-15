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
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default PartnershipBanner;
