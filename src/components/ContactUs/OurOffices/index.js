import React from "react";
import styles from "./style.module.css";
import {LocationIcon} from "@/assets/icon";

function OurOffices() {
  const data = [
    {
      heading: "Gurgaon Office",
      subheading:
        "819 - P, 3rd Floor, Netaji Subhash MargSector 47, Gurugram, Haryana - 122018",
    },
    {
      heading: "Bangalore Office",
      subheading:
        "2nd Floor, D, 310, 6th Cross Rd, 1st Block ,Koramangala Bengaluru, Karnataka - 560035",
    },
    {
      heading: "Noida Office",
      subheading: "#72, Shahadra Sector-141,Noida, UP",
    },
    {
      heading: "Pune Office",
      subheading:
        "Unit No. 11, Mulberry Gardens, Hadapsar, Pune,Maharashtra - 411028",
    },
    {
      heading: "Mumbai Office",
      subheading: "Yadav Nagar, Chandivali, Powai Mumbai,Maharashtra - 400072",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading_container}>Our Offices</div>
      <div className={styles.box_wrraper}>
        {data?.map((item, index) => (
          <div key={index.toString()} className={styles.box_detail_container}>
            <div>
              <LocationIcon size={20} color={"#71717A"} className={"mr-2"} />
            </div>
            <div>
              <div className={styles.box_heading}>{item.heading}</div>
              <div className={styles.box_subheading}>{item.subheading}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurOffices;
