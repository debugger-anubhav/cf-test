import React from "react";
import {Skeleton} from "@mui/material";
import styles from "./style.module.css";

export const ProductRowSkeleton = () => {
  return (
    <div className={styles.main_containor}>
      <Skeleton variant="text" className={styles.Skeleton_text} />
      <Skeleton variant="text" className={styles.Skeleton_sub_text} />
      <div className={styles.Skeleton_row}>
        {[1, 2, 3, 4]?.map((item, index) => (
          <div className={styles.Skeleton_wrapper} key={index.toString()}>
            <Skeleton variant="rectangular" className={styles.skeleton_main} />
          </div>
        ))}
      </div>
    </div>
  );
};
