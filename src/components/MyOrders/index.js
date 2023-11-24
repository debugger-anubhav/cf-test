import React, {useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import AllOrders from "./partOne/index";
import OrderDetails from "./partTwo/index";

const index = () => {
  const [part, setPart] = useState(2);
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className="w-full">
        {part === 1 ? (
          <AllOrders setPart={setPart} />
        ) : (
          <OrderDetails setPart={setPart} />
        )}
      </div>
    </div>
  );
};

export default index;
