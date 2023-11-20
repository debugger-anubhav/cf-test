import React, {useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "@/components/Documentation/Sidebar/DocSidebar";
import DebitTransactions from "./DebitTransactions";
import CreditTransactions from "./CreditTransactions";

export default function CFCoins() {
  const cfCoinIcon =
    "https://d3juy0zp6vqec8.cloudfront.net/images/icons/cf-coins.svg";
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  console.log(setLoadingSkeleton);
  const rows = [
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Payment Due",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Payment Due",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
  ];

  const Cards = [
    {
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/instant-checkout-icon.svg",
      heading: "Instant checkout",
      subheading: "One-click, easy and fast checkout",
    },
    {
      icon: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/much-more-benefits-icon.svg",
      heading: "Much more benefits",
      subheading: "Benefits and offers using CF coins",
    },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <p className={styles.header}>Cityfurnish Coins</p>
        <div className="w-full flex gap-8 lg:flex-row flex-col justify-between">
          <div className="lg:w-[60%] w-full">
            <div className="flex items-center gap-3 mt-8">
              <div>
                <img src={cfCoinIcon} />
              </div>
              <div>
                <p className={styles.current_bal_heading}>Current balance</p>
                <p className={styles.current_bal_subheading}>300</p>
              </div>
            </div>

            <p className={styles.desc}>
              Cityfurnish Coins can be redeemed while making invoice payment or
              while placing order.
            </p>
          </div>
          <div className="lg:w-[40%] w-full flex gap-6 lg:justify-end">
            {Cards?.map((item, index) => {
              return (
                <div key={index.toString()} className={styles.card}>
                  <img src={item.icon} className={styles.card_icon} />
                  <p className={styles.card_heading}>{item.heading}</p>
                  <p className={styles.card_subheading}>{item.subheading}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <DebitTransactions rows={rows} loadingSkeleton={loadingSkeleton} />
          <CreditTransactions rows={rows} loadingSkeleton={loadingSkeleton} />
        </div>
      </div>
    </div>
  );
}
