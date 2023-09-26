import React from "react";
import styles from "./style.module.css";
import {FaChevronRight} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import cookie from "react-cookies";
// import {getLocalStorage} from "@/constants/constant";

export default function UserSettings() {
  const router = useRouter();
  const Servicesdata = [
    {head: "My orders", desc: "See all orders & stay updated on their status."},
    {
      head: "My Service Requests",
      desc: "Need help with your order or have a request?",
    },
    {head: "My Payments", desc: "Track your payment & download statement."},
    {head: "CF coins", desc: "Check CF coins. Use them when ordering."},
    {head: "My Invoices", desc: "View and pay invoice."},
    {head: "Referral Code", desc: "Refer a friend and earn 500 CF Coins!"},
    {
      head: "KYC & Documentation",
      desc: "Upload your KYC documents for verification.",
    },
    {head: "Profile Settings", desc: "Modify name, email or phone number."},
    {head: "Your Addresses", desc: "Add or Modify Your Addresses."},
  ];

  // const userName = getLocalStorage("user_name") ?? "";

  return (
    <>
      {/* for mobile view */}
      <div className={styles.main_container_mobile}>
        <p className={styles.user_account}>
          Your Account,
          <span className={styles.main_text}>
            {/* {userName || "Hello User"} */}
            Hello User
          </span>
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
          <p
            className={styles.lgout}
            onClick={() => {
              cookie.remove("ci_sessions");
              localStorage.removeItem("tempUserID");
              localStorage.removeItem("user_id");
              localStorage.removeItem("_ga");
              localStorage.removeItem("user_name");
              localStorage.removeItem("ci_session");
              router.push("https://test.rentofurniture.com/logout");
            }}>
            Logout
          </p>
        </div>
      </div>

      {/* for web view */}
      <div className={styles.main_container_web}>
        <div className="border border-black min-w-[171px] h-[800px]"></div>
        <div>
          <h1 className={styles.web_head}>Overview</h1>
          <div className={styles.line_web}></div>
          <div className={styles.card_wrapper}>
            {Servicesdata?.map((item, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.card_first_row}>
                  <img src="" className={styles.card_icon} />
                  <p className={styles.card_head}>{item.head}</p>
                </div>
                <p className={styles.card_desc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// export default UserSettings;
