import React from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

function MainSectionHowWork() {
  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"How It Works"} />
      <div className={styles.main_heading}>How It Works</div>
      <div className={styles.sub_heading}>
        Following is the process of placing order on Cityfurnish. Alternatively
        you can also call our customer care to place an order.
      </div>
      <div className={styles.video_wrapper}>
        <iframe
          loading="lazy"
          src="https://www.youtube.com/embed/Tx50ddNJk9c"
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.iframe_wrapper}></iframe>
      </div>
    </div>
  );
}

export default MainSectionHowWork;
