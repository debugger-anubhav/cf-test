import React from "react";
import Link from "next/link";
import styles from "./docSidebar.module.css";

const DocSidebar = () => {
  const firstHeadingArr = [{heading: "ssss", link: "ww.com.com"}];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.fisrtContainer}>
        <div className={styles.accountText}>Your Account,</div>
        <div>Pratyush Verma</div>
        <div>Overview</div>
      </div>
      <MenuComp list={firstHeadingArr} heading={""} />
    </div>
  );
};

export default DocSidebar;

const MenuComp = ({list, heading}) => {
  return (
    <>
      <h2>{heading}</h2>
      {list?.map(i => {
        return (
          <Link
            key={i.heading}
            href={String(i.link)}
            className={styles.headingLinks}
          />
        );
      })}
    </>
  );
};
