import React from "react";
import styles from "./style.module.css";
import {Mail} from "@/assets/icon";
// import { useChatScript } from "../../../../useChatScript";

export default function ChatWithUs() {
  const handleButtonClick = () => {};

  return (
    <>
      <div className={styles.main_container}>
        {/* {showChat && useChatScript() } */}
        <div className={styles.sub_container}>
          <h2 className={styles.sub_paragraph}>Have a query? Need help?</h2>
          <h3 className={styles.sub_heading}>Chat with us</h3>
        </div>
        <div className={styles.mid_section}>
          <p className={styles.sub_paragraph_details}>
            Write to us at
            <span className={styles.mail_address}>
              <a
                href="mailto:hello@cityfurnish.com"
                className="text-[#48678B] underline">
                hello@cityfurnish.com{" "}
              </a>
            </span>
            or talk to our customer care representative at
            <span className={styles.mail_address}>
              {" "}
              <a
                href={`tel:080-66084700 `}
                target="_self"
                className="text-[#48678B] underline">
                080-66084700
              </a>
            </span>{" "}
            (9 AM - 9 PM)
          </p>
          <div className={styles.btn_wrapper}>
            <a href="mailto:hello@cityfurnish.com" className="text-[#48678B]">
              <button
                className={styles.write_to_us_wrapper}
                onClick={() => {
                  handleButtonClick();
                }}>
                <Mail
                  size={20}
                  color={"#71717A"}
                  className={styles.tbMail_icon}
                />
                <p className={styles.write_to_us_text}>Write to us</p>
              </button>
            </a>
            {/* <div className={styles.chat_now_wrapper}>
              <Message
                size={20}
                color={"#222"}
                className={styles.message_icon}
              />
              <p className={styles.chat_now_text}>Chat now</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
