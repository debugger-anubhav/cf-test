import React from "react";
import styles from "./styles.module.css";

const Breadcrump = () => {
  const arr = [{name: "Home", link: "/"}, {name: "Customer Payment"}];
  return (
    <div className={styles.bread_crumps}>
      {arr?.map((item, index) => (
        <div key={index} className={styles.flexx}>
          <a
            href={index !== 1 && `${item?.link}`}
            target="_self"
            rel="noopener">
            <p
              className={` ${
                index === arr.length - 1 ? "font-medium" : "font-normal"
              } ${styles.crumpItem}`}>
              {item.name}
            </p>
          </a>
          <p
            className={`${index === arr.length - 1 ? "hidden" : "flex"} ${
              styles.crumpItem
            }`}>{`>`}</p>
        </div>
      ))}
    </div>
  );
};

export default Breadcrump;
