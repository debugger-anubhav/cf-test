import React, {useState} from "react";
import Link from "next/link";
import styles from "./docSidebar.module.css";

const DocSidebar = ({isOverviewSelected = false}) => {
  const [isActive, setIsActive] = useState();

  const firstContainerArr = [
    {heading: "My orders", link: "ww.com.com"},
    {heading: "My Service Requests", link: "ww.com.com"},
    {heading: "My Payments", link: "ww.com.com"},
    {heading: "My Invoices", link: "ww.com.com"},
  ];
  const secondContainerArr = [
    {heading: "CF coins", link: "ww.com.com"},
    {heading: "Referral Code", link: "ww.com.com"},
  ];
  const thirdContainerArr = [
    {heading: "KYC & Documentation", link: "ww.com.com"},
    {heading: "Profile Settings", link: "ww.com.com"},
    {heading: "Your Addresses", link: "ww.com.com"},
  ];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.sectionHeadings}>Your Account,</div>
        <div className={styles.userNameText}> Pratyush Verma</div>
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
      <div className={styles.logoutTxt}>Logout</div>
    </div>
  );
};

export default DocSidebar;

const MenuComp = ({list, heading, isActive, setIsActive}) => {
  return (
    <div className={styles.secondContainer}>
      <h2 className={styles.sectionHeadings}>{heading}</h2>
      {list?.map(i => {
        return (
          <Link
            key={i.heading}
            href={String(i.link)}
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
