import React from "react";
import styles from "./style.module.css";
import {DownloadForMobileImg, DownloadForWeb} from "@/assets/images";

const DownloadForMobile = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.web_container}>
        {/* <a href="http://3.109.156.217/api/get-app-on-devices/getAppOnDevice"> */}
        <img
          src={DownloadForWeb}
          alt="download-image-for-web"
          className={styles.download_image}
          loading="lazy"
        />
        {/* </a> */}
      </div>
      <div className={styles.mobile_container}>
        {/* <a href="http://3.109.156.217/api/get-app-on-devices/getAppOnDevice"> */}
        <img
          src={DownloadForMobileImg}
          alt="download-image-for-mobile"
          className={styles.download_image}
          loading="lazy"
        />
        {/* </a> */}
      </div>
    </div>
  );
};

export default DownloadForMobile;
