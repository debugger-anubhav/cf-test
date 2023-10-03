import React from "react";
import styles from "./SelectionCircle.module.css";
const SelectionCircle = ({showInner = false}) => {
  return (
    <div className={`${styles.outerCircle}`}>
      <div
        className={`${styles.innerCircle}`}
        style={showInner ? {} : {display: "none"}}></div>
    </div>
  );
};

export default SelectionCircle;
