import React from "react";
import styles from "./style.module.css";
import {DownloadForWeb} from "@/assets/images";

const DownloadForMobile = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.web_container}>
        <img
          src={DownloadForWeb}
          alt="download-image-for-web"
          className={styles.download_image}
        />
      </div>
      <div className={styles.mobile_container}>
        <img
          src={DownloadForMobile}
          alt="download-image-for-mobile"
          className={styles.download_image}
        />
      </div>
      {/* <div className={styles.destop_heading_container}>
        <p className={styles.heading}>{content.download}</p>
        <p className={styles.sub_heading}>{content.rent}</p>
        <div>
          <p className={styles.get_free_text}>{content.getFreeApp}</p>
          <div className={styles.btn_container}>
            <div>
              <button className={styles.btn_style}>
                <Image src={downloadBannersImages.appleIcon} />
                <p className={styles.btn_text}> {content.ios}</p>
              </button>
            </div>
            <div className={styles.bar_code}>
              <button className={styles.btn_style}>
                <Image src={downloadBannersImages.androidIcon} />
                <p className={styles.btn_text}>{content.android}</p>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.qr_code}>
          <Image src={downloadBannersImages.QrCode} width={120} height={120} />
        </div>
      </div>
      <div className={styles.bakgroungimage}>
        <Image
          src={downloadBannersImages.DownloadBackgroundImage}
          width={416}
          height={380}
          className="!w-[416px] !h-[388px]"
        />
        <div className={styles.bannerimage}>
          <Image
            src={downloadBannersImages.downloadBanner}
            // widht={416}
            // height={380}
          />
        </div>
      </div>
      <div className={styles.bakgroungimage_desktop}>
        <Image
          src={downloadBannersImages.backgroungImageDesk}
          width={514}
          height={648}
          className="!w-[514px] !h-full !float-right"
        />
        <div className={styles.bannerimageDesktop}>
          <Image
            src={downloadBannersImages.mobileDesktop}
            widht={557}
            height={600}
          />
        </div>
      </div>

      <div className={styles.headingContainer}>
        <p className={styles.heading}>{content.download}</p>
        <p className={styles.sub_heading}>{content.rent}</p>
        <div>
          <p className={styles.get_free_text}>{content.getFreeApp}</p>
          <div className={styles.btn_container}>
            <div>
              <button className={styles.btn_style}>
                <Image src={downloadBannersImages.appleIcon} />
                <p className={styles.btn_text}> {content.ios}</p>
              </button>
            </div>
            <div>
              <button className={styles.btn_style}>
                <Image src={downloadBannersImages.androidIcon} />
                <p className={styles.btn_text}>{content.android}</p>
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DownloadForMobile;
