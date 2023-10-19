import React from "react";
import styles from "./style.module.css";
import {Skeleton} from "@mui/material";

export default function FormSkeleton() {
  return (
    <div className={styles.skeleton_wrapper}>
      {/* form  */}

      <div className={styles.skeleton_heading}>
        <Skeleton variant="text" className={styles.skeleton_full} />
      </div>

      <div className={styles.skeleton_form_field}>
        <div className={styles.field_heading}>
          <Skeleton variant="text" className={styles.skeleton_full} />
        </div>
        <div className={styles.field_input}>
          <Skeleton variant="text" className={styles.skeleton_full} />
        </div>
      </div>
    </div>
  );
}
