import React, {useState} from "react";
import Link from "next/link";
import styles from "./docSidebar.module.css";
import cookie from "react-cookies";
import {useRouter} from "next/navigation";

const DocSidebar = ({isOverviewSelected = false}) => {
  const [isActive, setIsActive] = useState();
  const router = useRouter();

  const firstContainerArr = [
    {heading: "My orders", link: "https://test.rentofurniture.com/purchases"},
    {
      heading: "My Service Requests",
      link: "https://test.rentofurniture.com/service-requests",
    },
    {heading: "My Payments", link: "https://test.rentofurniture.com/payments"},
    {heading: "My Invoices", link: "https://test.rentofurniture.com/invoices"},
  ];
  const secondContainerArr = [
    {heading: "CF coins", link: "https://test.rentofurniture.com/wallet"},
    {
      heading: "Referral Code",
      link: "https://test.rentofurniture.com/referral",
    },
  ];
  const thirdContainerArr = [
    {
      heading: "KYC & Documentation",
      link: "https://test.rentofurniture.com/documentation",
    },
    {
      heading: "Profile Settings",
      link: "https://test.rentofurniture.com/usersettings",
    },
    {heading: "Your Addresses", link: "/"},
  ];

  const onLogout = () => {
    router.push("https://test.rentofurniture.com/logout");
    cookie.remove("ci_sessions");
    localStorage.removeItem("tempUserID");
    localStorage.removeItem("user_id");
    localStorage.removeItem("_ga");
    localStorage.removeItem("user_name");
    localStorage.removeItem("ci_session");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.sectionHeadings}>Your Account,</div>
        <div className={styles.userNameText}>
          {" "}
          Pratyush Verma Verma Verma Verma Verma
        </div>
        <h2
          className={`${isOverviewSelected ? "!text-5774AC" : "!text-45454A"} ${
            styles.sectionItems
          } !mt-10 !mb-0`}>
          Overview
        </h2>
      </div>
      <MenuComp
        list={firstContainerArr}
        heading={"Orders"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <MenuComp
        list={secondContainerArr}
        heading={"Benefits"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <MenuComp
        list={thirdContainerArr}
        heading={"Account"}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <div className={styles.logoutTxt} onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};

export default DocSidebar;

const MenuComp = ({list, heading, isActive, setIsActive}) => {
  return (
    <div
      className={`${heading === "Account" && styles.border_none} ${
        styles.secondContainer
      }`}>
      <h2 className={styles.sectionHeadings}>{heading}</h2>
      {list?.map(i => {
        return (
          <Link
            key={i?.heading}
            href={String(i?.link)}
            className={`${
              isActive === i.heading
                ? styles.sectionItemsActive
                : styles.sectionItems
            } block`}>
            <button
              value={i.heading}
              onClick={e => {
                e.preventDefault();
                console.log(e.target.value);
                setIsActive(e.target.value);
              }}>
              {i.heading}
            </button>
          </Link>
        );
      })}
    </div>
  );
};