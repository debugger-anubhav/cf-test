import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {FaChevronRight} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import cookie from "react-cookies";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import Cookies from "universal-cookie";
import {setShoppingCartTab} from "@/store/Slices";
import {useDispatch} from "react-redux";
import {getLocalStorage} from "@/constants/constant";

export default function UserSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authCookies = new Cookies();
  const [userName, setUserName] = useState(null);

  const userNameFromLocalStorage = getLocalStorage("user_name");

  useEffect(() => {
    const user = userNameFromLocalStorage || "Hello User";
    setUserName(user);
  }, [userNameFromLocalStorage]);

  const url = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";
  const Servicesdata = [
    {
      head: "My Orders",
      desc: "See all orders & stay updated on their status.",
      link: "/purchases",
      img: `${url}my-orders.svg`,
    },
    {
      head: "My Service Requests",
      desc: "Need help with your order or have a request?",
      link: "/service-requests",
      img: `${url}my-service-requests.svg`,
    },
    {
      head: "My Payments",
      desc: "Track your payment & download statement.",
      link: "/payments",
      img: `${url}my-payments.svg`,
    },
    {
      head: "CF Coins",
      desc: "Check CF coins. Use them when ordering.",
      link: "/wallet",
      img: `${url}cf-coins-b-w.svg`,
    },
    {
      head: "My Invoices",
      desc: "View and pay invoice.",
      link: "/invoices",
      img: `${url}my-invoices.svg`,
    },
    {
      head: "Referral Code",
      desc: "Refer a friend and earn 500 CF Coins!",
      link: "/referral",
      img: `${url}referral-code.svg`,
    },
    {
      head: "KYC & Documentation",
      desc: "Upload your KYC documents for verification.",
      link: "/documentation",
      img: `${url}kyc-and-documentation.svg`,
    },
    {
      head: "Profile Settings",
      desc: "Modify name, email or phone number.",
      img: `${url}profile-settings.svg`,
      link: "/profilesettings",
    },
    {
      head: "Your Addresses",
      desc: "Add or Modify Your Addresses.",
      img: `${url}your-addresses.svg`,
      link: "/usersettings/youraddresses",
    },
  ];

  return (
    <>
      <div className={styles.main_container_mobile}>
        <p className={styles.user_account}>
          Your Account,
          <span className={`${styles.main_text} ml-[4px]`}>
            {userName || "Hello User"}
          </span>
        </p>
        <div className={styles.services_wrapper}>
          {Servicesdata?.map((ele, index) => {
            return (
              <a
                href={ele?.link}
                target="_blank"
                rel="noreferrer"
                key={index.toString()}
                onClick={e => {
                  e.preventDefault();
                }}>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(ele?.link)}>
                  <div className={styles.head_row}>
                    <p className={styles.head_row_text}>{ele.head}</p>
                    <div className={styles.chevron_right_icon}>
                      <FaChevronRight />
                    </div>
                  </div>
                  <div className={styles.desc_row}>{ele.desc}</div>
                  <div className={styles.line_sepration}> </div>
                </div>
              </a>
            );
          })}
          <p
            className={styles.lgout}
            onClick={() => {
              if (typeof window !== "undefined") {
                cookie.remove("ci_sessions");
                authCookies.remove("authToken", {path: "/"});
                authCookies.remove("userId", {path: "/"});
                localStorage.removeItem("tempUserID");
                localStorage.removeItem("user_id");
                localStorage.removeItem("_ga");
                localStorage.removeItem("user_name");
                localStorage.removeItem("ci_session");
                dispatch(setShoppingCartTab(0));
              }
              router.push("/");
            }}>
            Logout
          </p>
        </div>
      </div>

      <div className={styles.main_container_web}>
        <div className="min-w-fit" style={{height: "initial"}}>
          <DocSidebar isOverviewSelected={true} />
        </div>
        <div className="w-full">
          <h1 className={styles.web_head}>Overview</h1>
          <div className={styles.line_web}></div>
          <div className={styles.card_wrapper}>
            {Servicesdata?.map((item, index) => (
              <a
                href={item?.link}
                target="_blank"
                rel="noreferrer"
                key={index.toString()}
                onClick={e => {
                  e.preventDefault();
                }}>
                <div
                  className={styles.card}
                  onClick={() => {
                    router.push(item?.link);
                  }}>
                  <div className={styles.card_first_row}>
                    <img
                      src={item?.img}
                      alt={item?.head}
                      className={styles.card_icon}
                      loading="lazy"
                    />
                    <p className={styles.card_head}>{item.head}</p>
                  </div>
                  <p className={styles.card_desc}>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// export default UserSettings;
