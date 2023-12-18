import React from "react";
import styles from "./style.module.css";
import {ForwardArrow, Mail} from "@/assets/icon";
import {useRouter} from "next/navigation";
import {FaHeadset, FaPhone} from "react-icons/fa6";

function ContactSection() {
  const router = useRouter();
  const data = [
    {
      icon: <FaPhone size={30} className={styles.icon_contact} />,
      heading: "Call 080-66084700",
      subheading: "(09AM to 09PM)",
      link: "tel:080-66084700 ",
    },
    {
      icon: <Mail size={30} className={styles.icon_contact} />,
      heading: "Mail",
      subheading: "hello@cityfurnish.com",
      link: "mailto:hello@cityfurnish.com",
    },
    {
      icon: <FaHeadset size={30} className={styles.icon_contact} />,
      heading: "Raise a service request",
      subheading: "Your requests for orders related help",
      link: "/service-requests",
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
              className={`${
                index !== data.length - 1 && styles.box_wrapper
              } flex flex-col `}>
              <a href={item?.link} className={styles.link_tag}>
                <div className={styles.box_img}>{item.icon}</div>
                <div className={styles.detail_wrapper}>
                  <div className={styles.box_heading}>
                    {item.heading}
                    <ForwardArrow size={19.2} color={"#222"} />
                  </div>
                  <div className={styles.box_subheading}>{item.subheading}</div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactSection;
