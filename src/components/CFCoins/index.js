import React from "react";
import styles from "./style.module.css";
import DocSidebar from "@/components/Documentation/Sidebar/DocSidebar";

export default function CFCoins() {
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <p className={styles.header}>Cityfurnish Coins</p>
        {/* <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
          Access your complete payment history on one page. Additionally, you
          have the option to download statement for offline use, providing
          flexibility in monitoring your financial records.
        </p> */}

        <div className="w-full flex">
          <div className="w-[60%]">
            <p className={styles.desc}>
              Cityfurnish Coins can be redeemed while making invoice payment or
              while placing order.
            </p>
          </div>
          <div className="w-[40%]">right</div>
        </div>
      </div>
    </div>
  );
}
