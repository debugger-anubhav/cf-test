import React from "react";
import styles from "./style.module.css";
import {DownloadForMobileImg, DownloadForWeb} from "@/assets/images";
import Image from "next/image";

const DownloadForMobile = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.web_container}>
        <Image
          src={DownloadForWeb}
          alt="download-image-for-web"
          className={styles.download_image}
          width={2854}
          height={1104}
        />
      </div>
      <div className={styles.mobile_container}>
        <Image
          src={DownloadForMobileImg}
          alt="download-image-for-mobile"
          className={styles.download_image}
          width={720}
          height={1227}
        />
      </div>
    </div>
  );
};

export default DownloadForMobile;
