import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useRouter} from "next/navigation";

export default function TermsOfUseData() {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <a
              href={"/"}
              className={styles.route_text}
              onClick={() => {
                router.push("/");
              }}>
              Home
            </a>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={styles.list}>
            <p className={`${styles.route_text} !font-medium`}>Terms Of Use</p>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading_container}>Terms Of Use</h1>
      <div className={styles.terms_of_use_detail_text}>
        <a
          href="https://www.cityfurnish.com"
          target="_self"
          className={styles.terms_of_use_links}>
          https://www.cityfurnish.com
        </a>
        {string.terms_of_use.first_para}
      </div>
      <div className={styles.general_wrapper}>
        <div className={styles.terms_of_use_general}>
          <h2 className={styles.general_heading}>General</h2>
          {string.terms_of_use.general?.map((item, index) => {
            return (
              <div
                className={`${styles.general_point} ${
                  index === index.length - 1 ? "mb-0" : "lg:mb-4 mb-3"
                }`}
                key={index.toString()}>
                {index === 0 ? (
                  <p>
                    {`You agree to the terms and conditions outlined in this Terms
                    of Use ("Terms of Use") with respect to `}
                    <span className="break-words">
                      <a
                        href="https://www.cityfurnish.com"
                        target="_self"
                        className={`${styles.terms_of_use_links} !no-underline !text-71717A mr-2 `}>
                        https://www.cityfurnish.com
                      </a>
                      ("Cityfurnish"/"Website").{item}
                    </span>
                  </p>
                ) : (
                  <>{item}</>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.terms_of_use_general}>
          <h2 className={styles.general_heading}>Grievances :</h2>
          <p className={styles.general_point}>
            If you have any complaints, concerns, or feedback regarding our
            services, please reach out to us at{" "}
            <a
              href="mailto:grievance@cityfurnish.com"
              target="_self"
              className={`${styles.terms_of_use_links}`}>
              grievance@cityfurnish.com.
            </a>{" "}
            Our dedicated team is here to address and resolve your issues
            promptly and effectively. Your satisfaction is our priority.
          </p>
        </div>
      </div>
    </div>
  );
}
