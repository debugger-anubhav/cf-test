import React from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

export default function TopSection() {
  return (
    <div className={styles.main_container}>
      <BreadCrumbsCommon currentPage={"Join Our Team"} />
      <div className={styles.heading_row}>
        <h1 className={styles.main_heading}>
          {` Don't Just Dream, Do it With Us `}
          <span className="lg:flex hidden ml-2"> 🤩</span>
        </h1>
        {/* <a href="#vacancies-section"> */}
        <button
          className={styles.join_us}
          onClick={() =>
            document.getElementById("vacancies-section").scrollIntoView({
              behavior: "smooth",
            })
          }>
          Join us
        </button>
        {/* </a> */}
      </div>
      <div className={styles.detailing_row}>
        <h3 className={styles.subheading}>We Believe in</h3>
        <h2 className={styles.heading}>Action. Community. Quality.</h2>
        <p className={styles.para}>
          {`At Cityfurnish, we're building an on-demand furniture and appliances
          startup that is delighting many customers across India with quality
          products and an obsession with keeping customer service levels
          ridiculously high. We offer you an exciting and challenging
          environment in which you can grow and thrive. We are offering you
          roles in which you will be fundamentally impacting the success of the
          company. At Cityfurnish, we are looking for people who are concerned
          about the customer at all times. We value creativity, hard work,
          initiative and radical ideas. If this sounds exciting to you, then
          come have a chat with us.`}
        </p>
      </div>
      <div className={styles.gallery_detail}>
        <p className={styles.subheading}>Life at Cityfurnish</p>
        <p className={styles.heading}>Fun. Family. Learning.</p>
        <p className={styles.para}>
          If an exciting challenge is what gets you up in the morning and keeps
          you up at night, we should talk. Our offices are filled with doers
          like you. Want coworkers who are as committed, curious, and
          enthusiastic as you? Join our team.
        </p>
      </div>
      <div className={styles.sticky_btn_wrapper}>
        <a href="#vacancies-section" className="w-full">
          <button className={styles.join_us_sticky}>Join us</button>
        </a>
      </div>
    </div>
  );
}
