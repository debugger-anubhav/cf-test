import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useRouter} from "next/router";

const PrivacyPolicyData = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <a
              href={"/cityfurnish"}
              className={styles.route_text}
              onClick={() => {
                router.push("/cityfurnish");
              }}>
              Home
            </a>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={styles.list}>
            <p className={`${styles.route_text} !font-medium`}>
              Privacy Policy
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.heading_container}>Privacy Policy</div>

      {/* details  */}
      <div className={styles.details}>
        <div className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_1.firts_part}
          <span className={styles.privacy_policy_detail_link}>
            {string.privacy_policy.para_1.link_part}
          </span>
          {string.privacy_policy.para_1.last_part}
        </div>
      </div>

      <div>
        <div className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_2.firts_part}
          <span className={styles.privacy_policy_detail_link}>
            {string.privacy_policy.para_2.first_link}
          </span>
          {string.privacy_policy.para_2.second_part}
          <span className={styles.privacy_policy_detail_link}>
            {string.privacy_policy.para_2.second_link}
          </span>
          {string.privacy_policy.para_2.last_part}
        </div>
      </div>

      <div className={styles.details_principles}>
        <p className={styles.privacy_policy_detail_heading}>
          {string.privacy_policy.principles.heading}
        </p>
        {string.privacy_policy.principles.points?.map((item, index) => {
          return (
            <li
              className={styles.privacy_policy_detail_point}
              key={index.toString()}>
              {item}
            </li>
          );
        })}
      </div>

      <div className={styles.details_information_collection}>
        <p className={styles.privacy_policy_detail_heading}>
          {string.privacy_policy.information_collection.heading}
        </p>
        <p className={`${styles.privacy_policy_detail_text} lg:mt-4 mt-3`}>
          {string.privacy_policy.information_collection.subheading}
        </p>
        {string.privacy_policy.information_collection.points?.map(
          (item, index) => {
            return (
              <li
                key={index.toString()}
                className={styles.privacy_policy_detail_point}>
                {item}
              </li>
            );
          },
        )}
      </div>

      <div>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_3.firts_part}
        </p>
      </div>
      <div className={styles.details_fourth}>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_4.firts_part}
          <span className={styles.privacy_policy_detail_link}>
            {string.privacy_policy.para_2.first_link}
          </span>
        </p>
      </div>
      <div className={styles.last_details}>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_5.firts_part}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyData;
