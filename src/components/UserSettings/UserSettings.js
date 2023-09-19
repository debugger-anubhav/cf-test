import React from "react";
import styles from "./style.module.css";
import {FaChevronRight} from "react-icons/fa6";
import {getLocalStorage} from "@/constants/constant";

const Servicesdata = [
  {head: "My orders", desc: "See all orders & stay updated on their status."},
  {
    head: "My Service Requests",
    desc: "Need help with your order or have a request?",
  },
  {head: "My Payments", desc: "Track your payment & download statement."},
  {head: "CF coins", desc: "Check CF coins. Use them when ordering."},
  {head: "My Invoices", desc: "View and pay invoice."},
  {
    head: "KYC & Documentation",
    desc: "Upload your KYC documents for verification.",
  },
  {head: "Profile Settings", desc: "Modify name, email or phone number."},
];

const userName = getLocalStorage("userName");
const UserSettings = () => {
  return (
    <div className={styles.main_container}>
      <p className={styles.user_account}>
        Your Account,
        <span className={styles.main_text}>{userName}</span>
      </p>
      <div className={styles.services_wrapper}>
        {Servicesdata?.map((ele, index) => {
          return (
            <div key={index.toString()} className="cursor-pointer">
              <div className={styles.head_row}>
                <p className={styles.head_row_text}>{ele.head}</p>
                <div className={styles.chevron_right_icon}>
                  <FaChevronRight />
                </div>
              </div>
              <div className={styles.desc_row}>{ele.desc}</div>
              <div className={styles.line_sepration}> </div>
            </div>
          );
        })}
        <p className={styles.lgout}>Logout</p>
      </div>
    </div>
  );
};

export default UserSettings;
