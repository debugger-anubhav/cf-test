import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useRouter} from "next/navigation";

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
          <a
            className={styles.privacy_policy_detail_link}
            href={string.privacy_policy.para_1.link_part}>
            {string.privacy_policy.para_1.link_part}
          </a>
          {string.privacy_policy.para_1.last_part}
        </div>
      </div>

      <div>
        <div className={styles.privacy_policy_detail_text}>
          {/* {string.privacy_policy.para_2.firts_part} */}
          This Privacy Policy covers the information for Cityfurnish India
          Private Limited("Cityfurnish" and/or "We") collects from the user(s)
          ("User(s)" and/or "You") of
          <a
            className={styles.privacy_policy_detail_link}
            href={string.privacy_policy.para_2.first_link}>
            {string.privacy_policy.para_2.first_link}
          </a>
          <span className="px-1">("website")</span>
          {string.privacy_policy.para_2.second_part}
          <a
            className={styles.privacy_policy_detail_link}
            href={string.privacy_policy.para_2.second_link}>
            {string.privacy_policy.para_2.second_link}
          </a>
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
              <div key={index.toString()} className={styles.list_point}>
                <div className={` mt-2 mr-2`}>
                  <p className={styles.dot}></p>
                </div>
                <div
                  key={index.toString()}
                  className={styles.privacy_policy_detail_text}>
                  {item}
                </div>
              </div>
            );
          },
        )}
      </div>

      <div>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_3.firts_part}
          ("Cityfurnish Entities") and its joint ventures.
        </p>
      </div>
      <div className={styles.details_fourth}>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_4.firts_part}
          <a
            className={styles.privacy_policy_detail_link}
            href={string.privacy_policy.para_2.first_link}>
            {string.privacy_policy.para_2.first_link}
          </a>
        </p>
      </div>
      <div className={styles.last_details}>
        <p className={styles.privacy_policy_detail_text}>
          {string.privacy_policy.para_5.firts_part}
          ("Platform")
          {string.privacy_policy.para_5.second_part}
          ("Delivery"),
          {string.privacy_policy.para_5.third_part}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyData;
