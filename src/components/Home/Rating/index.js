import React from "react";
import styles from "./style.module.css";
import {GoogleIcon, RatingStar} from "@/assets/icon";
import Image from "next/image";
import {HomePageImages} from "@/assets/images";
import {CustomerRatingsCard} from "@/constants/constant";

// h2 h3 h3 h3 p

const CustomerRating = () => {
  const sectionHeading = "See what people are saying";
  const subhead = "from 1968 customers";
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.head}>{sectionHeading}</h2>
        <div className={styles.upper_div}>
          <h3 className={styles.rating_div}>
            4.4{" "}
            <span className={styles.star}>
              <RatingStar color={"#FFCB45"} size={24} />
            </span>
            rating
          </h3>
          <Image
            src={HomePageImages.editIcon}
            alt="editIcon"
            className={styles.editIcon}
          />
        </div>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>

      <div className={styles.card_wrapper}>
        {CustomerRatingsCard.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.row}>
              <Image src={item.img} alt="" className={styles.img} />
              <div className="ml-3 mr-7">
                <h3 className={styles.name}>{item.name}</h3>
                <div className="flex gap-2">
                  {[{}, {}, {}, {}, {}].map((item, index) => (
                    <div key={index}>
                      <RatingStar size={16} color={"#FFCB45"} />
                    </div>
                  ))}
                </div>
              </div>
              <GoogleIcon color={"#5391F7"} size={30} />
            </div>

            <div className={styles.content}>
              <p className={styles.contentP}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRating;
