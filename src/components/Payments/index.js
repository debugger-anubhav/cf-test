import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import Invoices from "./invoices";
import Payment from "./payments";
import CreditNotes from "./creditNotes";
import Refunds from "./refunds";
import RetainerInvoice from "./retainerInvoice/index";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {Skeleton} from "@mui/material";

const PaymentPage = () => {
  const userId = decrypt(getLocalStorage("_ga"));
  // const userId = 85777;

  const [paymentDetails, setPaymentDetails] = useState();
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const fetchMyPayments = () => {
    axios
      .get(baseURL + endPoints.myPaymentsPage.getMyPayments(userId))
      .then(res => {
        console.log(res?.data?.data);
        setPaymentDetails(res?.data?.data);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingSkeleton(false);
      });
  };

  useEffect(() => {
    fetchMyPayments();
  }, []);

  console.log(paymentDetails, "paymentdetailss");
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar} style={{height: "initial"}}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <h1 className={styles.header}>My Payments</h1>
        <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
          Access your complete payment history on one page. Additionally, you
          have the option to download statement for offline use, providing
          flexibility in monitoring your financial records.
        </p>

        <div className={styles.amount_wrapper}>
          <p className={styles.desc}>
            Total invoices: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.toBePaid
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <p className={styles.desc}>
            Total payment: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.toBePaid - paymentDetails?.balance
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <p className={styles.desc}>
            Balance: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.balance
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <button className={styles.pay_all_btn}>Download statement</button>
        </div>

        <div>
          <Invoices
            rows={paymentDetails?.invoices}
            loadingSkeleton={loadingSkeleton}
          />
          <Payment
            rows={paymentDetails?.payments}
            loadingSkeleton={loadingSkeleton}
          />
          <CreditNotes rows={paymentDetails?.creditNotes} />
          {paymentDetails?.retainer && (
            <RetainerInvoice rows={paymentDetails?.retainer} />
          )}
          {paymentDetails?.refund && <Refunds rows={paymentDetails.refund} />}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
