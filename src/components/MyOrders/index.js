import React, {useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import OrderPage from "./orders";
import SubscriptionPage from "./subscriptions";

const index = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className="w-full">
        <div>
          {tab === 0 ? (
            <OrderPage tab={tab} setTab={setTab} />
          ) : (
            <SubscriptionPage tab={tab} setTab={setTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
