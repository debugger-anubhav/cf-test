import React from "react";
import styles from "./style.module.css";
import {Mail, Message} from "@/assets/icon";

const ChatWithUs = () => {
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.sub_container}>
          <h2 className={styles.sub_paragraph}>Have a query? Need help?</h2>
          <h3 className={styles.sub_heading}>Chat with us</h3>
        </div>
        <div className={styles.mid_section}>
          <p className={styles.sub_paragraph_details}>
            Write to us at
            <span className={styles.mail_address}> hello@cityfurnish.com </span>
            or talk to our customer care representative at
            <span className={styles.mail_address}> 080-66084700 </span> (9 AM -
            9 PM)
          </p>
          <button className={styles.write_to_us_wrapper}>
            {/* <TbMailFilled className={styles.tbMail_icon} /> */}
            <Mail size={20} color={"#71717A"} className={styles.tbMail_icon} />
            <p className={styles.write_to_us_text}>Write to us</p>
          </button>
          <div className={styles.chat_now_wrapper}>
            {/* <BiSolidMessage className={styles.message_icon} /> */}
            <Message size={20} color={"#222"} className={styles.message_icon} />
            <button className={styles.chat_now_text}>Chat now</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatWithUs;
