import React, {useState} from "react";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

import styles from "./style.module.css";
import {
  ForwardArrowWithLine,
  OpenIcon,
  ToggleOff,
  ToggleOn,
} from "@/assets/icon";

function CustomerPayment() {
  const [useCityfurnishCoins, setUseCityfurnishCoins] = useState(false);
  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"Customer Payment"} />
      <div className={styles.main_heading}> Pay Your Dues</div>
      <form>
        <div className={styles.form_field}>
          <p className={styles.form_label}>Full name</p>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            className={styles.form_input}
          />
        </div>
        <div className={styles.form_field}>
          <p className={styles.form_label}>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={styles.form_input}
          />
        </div>
        <div className={styles.form_field}>
          <p className={styles.form_label}>Invoice Number (Optional)</p>
          <input
            type="number"
            name="invoice"
            placeholder="Please provide the invoice number for payment."
            className={styles.form_input}
          />
          <div className={styles.all_invoices}>
            <p className={styles.all_invoice_text}>See my all invoices</p>
            <OpenIcon
              color={"#5774AC"}
              size={25}
              className={"cursor-pointer"}
            />
          </div>
        </div>

        <div className={styles.form_field}>
          <p className={styles.form_label}>Enter amount (in ₹)</p>
          <input
            type="number"
            name="amount"
            placeholder="Enter the amount to be paid"
            className={styles.form_input}
          />
          <div className={styles.toggleRow}>
            {useCityfurnishCoins ? (
              <ToggleOn
                size={30}
                color={"#5774AC"}
                onClick={() => setUseCityfurnishCoins(false)}
                className={"cursor-pointer"}
              />
            ) : (
              <ToggleOff
                color={"#E3E1DC"}
                size={30}
                onClick={() => setUseCityfurnishCoins(true)}
                className={"cursor-pointer"}
              />
            )}
            <span className={styles.toggle_text}>
              Use Cityfurnish coins (Available balance: 300)
            </span>
          </div>
        </div>

        <div className={styles.form_field}>
          <p className={styles.form_label}>Notes (Optional)</p>
          <input
            type="text"
            name="notes"
            placeholder="Enter if you have any notes"
            className={styles.form_input}
          />
        </div>

        <div>
          <button className={styles.pay_now_btn}>
            Pay now
            <ForwardArrowWithLine size={20} color={"#222222"} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerPayment;
