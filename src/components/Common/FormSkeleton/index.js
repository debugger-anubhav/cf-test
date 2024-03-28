import React from "react";
import styles from "./style.module.css";
import {Skeleton} from "@mui/material";

export default function FormSkeleton() {
  return (
    <div className={styles.skeleton_wrapper}>
      <div className="mt-8">
        {[1, 2, 3, 4]?.map(item => {
          return (
            <div className={styles.skeleton_form_field} key={item.toString()}>
              <div className={styles.field_heading}>
                <Skeleton
                  variant="text"
                  className={styles.skeleton_full}
                  height={12}
                />
              </div>
              <div className={styles.field_input}>
                <Skeleton
                  variant="text"
                  className={styles.skeleton_full}
                  height={56}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.skeleton_submit_btn}>
        <Skeleton variant="rectangular" className={styles.skeleton_full} />
      </div>
    </div>
  );
}
