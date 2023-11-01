import React from "react";
import styles from "./style.module.css";
import Cards, {MonthlyCard} from "./Cards";
import {useParams} from "next/navigation";

function TenureExtension() {
  const params = useParams();
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_heading}>Tenure Extension</div>
      <div className={styles.order_row}>
        Your Order ID{" "}
        <span className="ml-14 font-medium">: #{params?.orderId}</span>
      </div>
      <div className="my-8 flex flex-wrap gap-8 md:justify-start justify-center">
        {[1, 2, 3]?.map(item => {
          return (
            <div key={item.toString()}>
              <Cards />
            </div>
          );
        })}
        <MonthlyCard />
      </div>
    </div>
  );
}

export default TenureExtension;
