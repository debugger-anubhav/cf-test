import React from "react";
import styles from "../TermOfUseData/style.module.css";
import {ForwardArrow} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useRouter} from "next/navigation";

export default function CrifTermsOfUseData() {
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
            <p className={`${styles.route_text} !font-medium`}>
              Crif Terms Of Use
            </p>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading_container}>Crif Terms Of Use</h1>
      <div className={styles.terms_of_use_detail_text}>
        <p className={styles.general_heading}>
          Consumer Consent for accessing Consumer Credit Information Report
          (CIR)
        </p>
        <p className="mb-4">{string.crif_terms_of_use.first_para}</p>
        <p className="mb-4">{string.crif_terms_of_use.second_para}</p>
        <p className="mb-4">{string.crif_terms_of_use.third_para}</p>
        <p className="mb-4">{string.crif_terms_of_use.fourth_para}</p>
        <p className="mb-4">{string.crif_terms_of_use.fifth_para}</p>
        <p className="mb-4">
          I also consent to the CRIF High Mark Credit Score Terms of Use.
        </p>
        <p>{string.crif_terms_of_use.sixth_para}</p>
      </div>
      <div className={styles.general_wrapper}>
        <div className={`${styles.terms_of_use_general} !mb-8 !mt-8`}>
          {string.crif_terms_of_use.general?.map((item, index) => {
            return (
              <div
                className={`${styles.general_point} ${
                  index === index.length - 1 ? "mb-0" : "lg:mb-4 mb-3"
                }`}
                key={index.toString()}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
