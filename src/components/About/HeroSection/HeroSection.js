import React from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {AboutUs} from "@/assets/images";
const data = {
  hightlight:
    "Cityfurnish is a leading Furniture and Appliances Rental Brand in India.",
  about_first:
    "With a team of experienced artisans, the brand creates beautiful and durable pieces that blend traditional and modern styles. Our furniture is inspired by the Indian urban user and how they live in their homes.",
  about_second:
    "We gather bits and pieces from different eras to rent furniture and furnishing at affordable packages through convenient payment methods.",
  blocks_data: [
    {
      head: "100K+",
      desc: "We are trusted by more than 100K Indians",
    },
    {
      head: "12K+",
      desc: "12K+ furnitures and appliances are rented every month",
    },
  ],
  founding_team_first: "Founded by a dynamic team of visionaries –  ",
  founding_highlight: "Saurabh Gupta, Neerav Jain, and Vinit Jain",
  founding_team_last:
    " – we embarked on a journey to redefine the way people furnish their living spaces. Fuelled by passion and a commitment to innovation, CityFurnish has emerged as the go-to destination for hassle-free, stylish, and flexible furniture solutions. We empower our team to deliver an extraordinary customer experience, every time.",
  founding_images: [
    {
      name: "Saurabh Gupta",
      link: `${AboutUs}/saurabh-gupta.webp`,
    },
    {
      name: "Neerav Jain",
      link: `${AboutUs}/neerav-jain.webp`,
    },
    {
      name: "Vinit Jain",
      link: `${AboutUs}/vinit-jain.webp`,
    },
  ],
};

const HeroSection = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.bread_crumbs}>
        <a href={"/cityFurnish"}>
          <p className={styles.bread_crumbs_text}>Home</p>
        </a>
        <ForwardArrow color={"#71717A"} size={12} />
        <a href={"/banglore/rent"}>
          <p className={`${styles.bread_crumbs_text} !font-medium`}>
            All Products
          </p>
        </a>
      </div>
      <h1 className={styles.heading}>About us</h1>
      <div className={styles.content_wrapper}>
        <div className={styles.section1_wrapper}>
          <p className={styles.about_desc}>
            <span className="font-medium">{data.hightlight}</span>
            {data.about_first}
          </p>
          <p className={styles.about_desc}>{data.about_second}</p>
        </div>
        <div className={styles.section2_wrapper}>
          {data.blocks_data.map((ele, index) => {
            return (
              <div className={styles.block} key={index.toString()}>
                <p className={styles.block_head}>{ele.head}</p>
                <p className={styles.block_desc}>{ele.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className={styles.heading2}>Founding team</h2>
      <div className={styles.team_wrapper}>
        <div className={styles.image_wrapper}>
          {data.founding_images.map((ele, index) => {
            return (
              <div className={styles.image_card} key={index.toString()}>
                <div className={styles.images_container}>
                  <img
                    className="w-[78px] mobile:w-[96px] rounded-full border-[2px] border-[#71717A]"
                    src={ele.link}
                    alt={ele.name}
                    loading="lazy"
                  />
                </div>
                <p className={styles.image_text}>{ele.name}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.team_content_wrapper}>
          <p className={styles.team_content}>
            {data.founding_team_first}
            <span className="font-medium">{data.founding_highlight}</span>
            {data.founding_team_last}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
