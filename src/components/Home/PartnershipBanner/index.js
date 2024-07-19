import React, {memo} from "react";
import Image from "@/components/Image";
import styles from "./style.module.css";

const PartnershipBanner = () => {
  return (
    <div className={styles.partnership_banner}>
      <Image
        alt="our-reputation-static"
        src={
          "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/our-reputation.webp"
        }
        width={328}
        height={488}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default memo(PartnershipBanner);
