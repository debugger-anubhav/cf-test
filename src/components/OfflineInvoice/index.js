import React from "react";
import styles from "./styles.module.css";
import OrderSummary from "../Common/OrderSummary";
import {useParams} from "next/navigation";

const OfflineInvoice = () => {
  const params = useParams();
  return (
    <div className={styles.main_container}>
      <h1 className={styles.header}>Order no: #{params.orderId}</h1>
      <OrderSummary
        isOfflineInvoice
        orderNumber={params.orderId}
        paramUserId={params.userId}
      />
    </div>
  );
};

export default OfflineInvoice;
