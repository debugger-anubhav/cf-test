import {Skeleton} from "@mui/material";
import React from "react";
import styles from "./subHeaderSkeleton.module.css";

export default function SubHeaderSkeleton() {
  return (
    <div className={styles.main_containor}>
      <Skeleton variant="text" className={`w-[30%]`} />
      <div className={styles.Skeleton_row}>
        {[1, 2, 3, 4]?.map((item, index) => (
          <div className="w-[150px] h-[120px] flex mr-4" key={index.toString()}>
            <Skeleton
              variant="rectangular"
              className={`w-[170px] h-full flex `}
              height={100}
            />
          </div>
        ))}
      </div>
      <div className={styles.filter_row}>
        <Skeleton
          variant="rectangular"
          className={`w-[170px] h-full flex `}
          height={50}
        />
        <Skeleton
          variant="rectangular"
          className={`w-[170px] h-full flex `}
          height={50}
        />
      </div>
      <div className={styles.horizontal_line}></div>
    </div>
  );
}
