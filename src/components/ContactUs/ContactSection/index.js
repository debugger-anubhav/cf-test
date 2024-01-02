import React from "react";
import styles from "./style.module.css";
import {ForwardArrow, Mail} from "@/assets/icon";
import {FaHeadset, FaPhone} from "react-icons/fa6";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";

function ContactSection() {
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
      <BreadCrumbsCommon currentPage={"Contact Us"} />

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
                  <p className={styles.box_heading}>
                    {item.heading}
                    <ForwardArrow size={19.2} color={"#222"} />
                  </p>
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
