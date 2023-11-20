import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import DocSidebar from "@/components/Documentation/Sidebar/DocSidebar";
import DebitTransactions from "./DebitTransactions";
import CreditTransactions from "./CreditTransactions";
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";

export default function CFCoins() {
  const cfCoinIcon =
    "https://d3juy0zp6vqec8.cloudfront.net/images/icons/cf-coins.svg";
  //   const userId = decrypt(getLocalStorage("_ga"));
  // const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  // const userIdToUse = userId || tempUserId;
  const userIdToUse = 85757;
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [debitRows, setDebitRows] = useState(null);
  const [creditRows, setCreditRows] = useState(null);
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
  const getTransactions = () => {
    axios
      .get(baseURL + endPoints.cfCoinsGetTransactions(userIdToUse))
      .then(res => {
        const temp = res?.data?.data;
        setDebitRows(
          temp.filter(i => i.mode === "debit" && i.order_id != null),
        );
        setCreditRows(temp.filter(i => i.mode === "credit"));
        setLoadingSkeleton(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <p className={styles.header}>Cityfurnish Coins</p>
        <div className={styles.cf_info_div}>
          <div className={styles.cf_info_left}>
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
          <div className={styles.cf_info_right}>
            {Cards?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={styles.card}
                  style={{
                    backgroundImage: `URL('https://d3juy0zp6vqec8.cloudfront.net/images/icons/bg.webp')`,
                  }}>
                  <img src={item.icon} className={styles.card_icon} />
                  <p className={styles.card_heading}>{item.heading}</p>
                  <p className={styles.card_subheading}>{item.subheading}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <DebitTransactions
            rows={debitRows}
            loadingSkeleton={loadingSkeleton}
          />
          <CreditTransactions
            rows={creditRows}
            loadingSkeleton={loadingSkeleton}
          />
        </div>
      </div>
    </div>
  );
}
