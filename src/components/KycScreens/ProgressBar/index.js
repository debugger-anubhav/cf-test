import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export default function ProgressSection({progress}) {
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.progressBar} style={{width: `${progress}%`}}></div>

      <div className={styles.wrapper}>
        <div className={styles.text}>
          KYC done
          <span>
            <Image
              loader={({src}) => src}
              src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
              alt="paty_icon"
              className="ml-2 inline-block"
              loading="lazy"
              width={18}
              height={18}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
