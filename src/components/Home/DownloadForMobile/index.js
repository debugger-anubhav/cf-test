import React, {memo} from "react";
import styles from "./style.module.css";
import {DownloadForMobileImg, DownloadForWeb} from "@/assets/images";
import Image from "@/components/Image";
import {Skeleton} from "@mui/material";
import Link from "next/link";

const DownloadForMobile = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.web_container}>
        <Image
          loader={({src}) => src}
          src={DownloadForWeb}
          alt="download-image-for-web"
          className={styles.download_image}
          width={2854}
          height={1104}
        />
      </div>
      <div className={styles.mobile_container}>
        <Link
          href={"https://cityfurnish.com/v1/get-app-on-devices/getAppOnDevice"}
          className="w-full">
          <Image
            src={DownloadForMobileImg}
            alt="download-image-for-mobile"
            className={styles.download_image}
            width={720}
            height={1227}
          />
        </Link>
      </div>
    </div>
  );
};

export default memo(DownloadForMobile);

export const DownloadForMobileSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={"100%"} height={380} />
    </div>
  );
};
