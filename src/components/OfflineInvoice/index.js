import React, {useEffect} from "react";
import styles from "./styles.module.css";
import OrderSummary from "../Common/OrderSummary";
import {useParams, useRouter} from "next/navigation";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const OfflineInvoice = ({userIdCheck}) => {
  const params = useParams();
  const router = useRouter();
  const userId = decrypt(getLocalStorage("_ga"));
  useEffect(() => {
    if (userIdCheck) {
      if (userId !== params.userId) {
        router.push("/");
      }
    }
  }, []);

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
