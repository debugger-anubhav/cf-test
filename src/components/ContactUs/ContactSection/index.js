import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {useRouter} from "next/navigation";

function ContactSection() {
  const router = useRouter();
  const data = [
    {icon: "icon", heading: "Call 080-66084700", subheading: "(09AM to 09PM)"},
    {icon: "icon", heading: "Mail", subheading: "hello@cityfurnish.com"},
    {
      icon: "icon",
      heading: "Raise a service request",
      subheading: "Your requests for orders related help",
    },
  ];
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
            <p className={`${styles.route_text} !font-medium`}>Contact Us</p>
          </li>
        </ul>
      </div>
      <div className={styles.heading_container}>Contact Us</div>
      <div className={styles.contact_wrapper}>
        {data?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={`${index !== data.length - 1 && styles.box_wrapper}`}>
              <div className={styles.box_img}>{item.icon}</div>
              <div className={styles.box_heading}>
                {item.heading}
                <ForwardArrow size={19.2} color={"#222"} />
              </div>
              <div className={styles.box_subheading}>{item.subheading}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactSection;
