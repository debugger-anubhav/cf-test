import React from "react";
import styles from "./style.module.css";
import {DownloadForMobileImg, DownloadForWeb} from "@/assets/images";

const DownloadForMobile = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.web_container}>
        <img
          src={DownloadForWeb}
          alt="download-image-for-web"
          className={styles.download_image}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={styles.mobile_container}>
        <img
          src={DownloadForMobileImg}
          alt="download-image-for-mobile"
          className={styles.download_image}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default DownloadForMobile;
