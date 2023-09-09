import React from "react";
import {Skeleton} from "@mui/material";
import styles from "./styles.module.css";

export const ContentSkeleton = () => {
  return (
    <div className={styles.main_containor}>
      {[1, 2, 3, 4, 5]?.map((item, index) => (
        <div className={styles.wrapper} key={index.toString()}>
          <div className={styles.Skeleton_text}>
            <Skeleton variant="text" className="w-full h-full" />
          </div>
          <div className={styles.Skeleton_sub_text}>
            <Skeleton variant="text" className="w-full h-full" />
          </div>
          <div className={`${styles.Skeleton_sub_text_second} `}>
            <Skeleton variant="text" className="w-full h-full" />
          </div>
          <div className={`${styles.Skeleton_sub_text_less} !w-[80%]`}>
            <Skeleton variant="text" className="w-full h-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
