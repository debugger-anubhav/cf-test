import React from "react";
import styles from "./style.module.css";

function OurOffices() {
  const data = [
    {
      icon: "icon",
      heading: "Gurgaon Office",
      subheading:
        "819 - P, 3rd Floor, Netaji Subhash MargSector 47, Gurugram, Haryana - 122018",
    },
    {
      icon: "icon",
      heading: "Bangalore Office",
      subheading:
        "2nd Floor, D, 310, 6th Cross Rd, 1st Block ,Koramangala Bengaluru, Karnataka - 560035",
    },
    {
      icon: "icon",
      heading: "Noida Office",
      subheading: "#72, Shahadra Sector-141,Noida, UP",
    },
    {
      icon: "icon",
      heading: "Pune Office",
      subheading:
        "Unit No. 11, Mulberry Gardens, Hadapsar, Pune,Maharashtra - 411028",
    },
    {
      icon: "icon",
      heading: "Mumbai Office",
      subheading: "Yadav Nagar, Chandivali, Powai Mumbai,Maharashtra - 400072",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading_container}>Our Offices</div>
      <div className={styles.box_wrraper}>
        {data?.map((item, index) => (
          <div key={index.toString()}>{item.heading}</div>
        ))}
      </div>
    </div>
  );
}

export default OurOffices;
