import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";

export default function TopSection() {
  return (
    <div className={styles.main_container}>
      <div className={styles.bread_crumbs}>
        <a href={"/cityFurnish"}>
          <p className={styles.bread_crumbs_text}>Home</p>
        </a>
        <ForwardArrow color={"#71717A"} size={12} />
        <a href={"/banglore/rent"}>
          <p className={`${styles.bread_crumbs_text} !font-medium`}>
            Join Our Team
          </p>
        </a>
      </div>
      <div className={styles.heading_row}>
        <div className={styles.main_heading}>
          {` Don't Just Dream, Do it With Us 🤩`}
        </div>
        <button className={styles.join_us}>Join us</button>
      </div>
      <div className={styles.detailing_row}>
        <p className={styles.subheading}>We Believe in</p>
        <p className={styles.heading}>Action. Community. Quality.</p>
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
    </div>
  );
}
