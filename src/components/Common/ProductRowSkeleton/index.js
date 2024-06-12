import React from "react";
import {Skeleton} from "@mui/material";
import styles from "./style.module.css";

export const ProductRowSkeleton = ({isUnshifted}) => {
  return (
    <div
      className={`${styles.main_containor} ${
        !isUnshifted ? styles.container_shifted : ""
      }`.trim()}>
      {!isUnshifted ? (
        <>
          <Skeleton variant="text" className={styles.Skeleton_text} />
          <Skeleton variant="text" className={styles.Skeleton_sub_text} />
        </>
      ) : null}
      <div
        className={`${styles.Skeleton_row} ${
          !isUnshifted ? styles.skeleton_row_shifted : ""
        }`.trim()}>
        {[1, 2, 3, 4]?.map((item, index) => (
          <div className={styles.Skeleton_wrapper} key={index.toString()}>
            <Skeleton
              variant="rectangular"
              className={styles.skeleton_main}
              height={"100%"}
              width={"100%"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
