import React from "react";
import styles from "./style.module.css";
import {TbMailFilled} from "react-icons/tb";
import {BiSolidMessage} from "react-icons/bi";

const ChatWithUs = () => {
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.sub_container}>
          <p className={styles.sub_paragraph}>Have a query? Need help?</p>
          <h1 className={styles.sub_heading}>Chat with us</h1>
        </div>
        <div className={styles.mid_section}>
          <p className={styles.sub_paragraph_details}>
            Write to us at hello@cityfurnish.com or talk to our customer care
            representative at 080-66084700 (9 AM - 9 PM)
          </p>
          <div className={styles.write_to_us_wrapper}>
            <TbMailFilled className={styles.tbMail_icon} />
            <span className={styles.write_to_us_text}>Write to us</span>
          </div>
          <div className={styles.chat_now_wrapper}>
            <BiSolidMessage className={styles.message_icon} />
            <span className={styles.chat_now_text}>Chat now</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatWithUs;
