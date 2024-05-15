import React from "react";
import styles from "./style.module.css";
import {DownloadForMobileImg, DownloadForWeb} from "@/assets/images";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";
// import {domain} from "../../../../appConfig";

const DownloadForMobile = () => {
  const router = useRouter();
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
        <Image
          loader={({src}) => src}
          src={DownloadForMobileImg}
          alt="download-image-for-mobile"
          className={styles.download_image}
          width={720}
          height={1227}
          onClick={() => {
            router.push(
              `https://cityfurnish.com/v1/get-app-on-devices/getAppOnDevice`,
            );
            // router.push(`${domain}/v1/get-app-on-devices/getAppOnDevice`);
          }}
        />
      </div>
    </div>
  );
};

export default DownloadForMobile;

export const DownloadForMobileSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={"100%"} height={380} />
    </div>
  );
};
