import React, {useEffect, useState} from "react";
import styles from "./style.module.css";

const CustomToast = ({timer, onClose}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Hide the toast after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.custom_toast} ${visible ? "show" : "hide"}`}>
      <p className={styles.msg}>Redirecting to {timer} seconds</p>
    </div>
  );
};

export default CustomToast;
