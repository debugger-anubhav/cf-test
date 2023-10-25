import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import Breadcrump from "../breadcrump";
import {FaInfoCircle} from "react-icons/fa";

const BreakdownDrawer = () => {
  return (
    <div className={commonStyles.main_container}>
      <Breadcrump />

      <div>
        <FaInfoCircle className={styles.icon} />
        <p className={commonStyles.head}>
          Looks like City Shield is already active for your order.
        </p>
        <p className={styles.desc}>
          If you have any confusion or want more assistance, you can contact us
          at 080-66084700.
        </p>
        <button className={styles.btn}>Return to home page</button>
      </div>
    </div>
  );
};

export default BreakdownDrawer;
