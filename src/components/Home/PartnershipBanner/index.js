import React from "react";
import partner from "../../../assets/partnership.svg";
import Image from "next/image";
import styles from "./style.module.css";

const PartnershipBanner = () => {
  return (
    <div className={styles.partnership_banner}>
      <Image
        src={partner}
        alt="partnership"
        className="w-full h-full xl:hidden"
      />
      <Image
        src={partner}
        alt="partnership"
        layout="fill"
        objectFit="cover"
        className="w-full h-full hidden xl:flex"
      />
    </div>
  );
};

export default PartnershipBanner;
