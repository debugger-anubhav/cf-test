import {Skeleton} from "@mui/material";
import React from "react";
import styles from "./subHeaderSkeleton.module.css";

export default function SubHeaderSkeleton() {
  return (
    <div className={styles.main_containor}>
      <Skeleton variant="text" className={`w-[30%]`} />
      <div className={styles.Skeleton_row}>
        {[1, 2, 3, 4]?.map((item, index) => (
          <div className="w-full h-[120px] flex mr-4" key={index.toString()}>
            <Skeleton variant="rectangular" className={`w-[170px] flex `} />
          </div>
        ))}
      </div>
    </div>
  );
}
