import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import {ForwardArrow, CityMaxIcons} from "@/assets/icon";
import {TryCityMaxBannerMobile, TryCityMaxBannerWeb} from "@/assets/images";

const TryCityMax = () => {
  const benefitsOfCity = [
    {
      id: 1,
      img: CityMaxIcons.Icon1,
      title: "Quality products",
      paragraph:
        "Branded appliances and solid Sheesham Wood products in mint new condition",
    },
    {
      id: 2,
      img: CityMaxIcons.Icon2,
      title: "Free Swap",
      paragraph:
        "Swap any product or design anytime during the subscription period",
    },
    {
      id: 3,
      title: "Cancel anytime",
      img: CityMaxIcons.Icon3,
      paragraph:
        "We will deduct 1 month's extra rent as a penalty and refund rest of the amount instantly",
    },
    {
      id: 4,
      img: CityMaxIcons.Icon4,
      title: "Easy on Wallet",
      paragraph:
        "You can pay subscription fee in one go or opt for our no cost EMI plan",
    },
  ];
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.left_image_section}>
          <img
            src={TryCityMaxBannerWeb}
            alt="trycity"
            className={`hidden xl:flex ${styles.tryCity_image}`}
          />
          <img
            src={TryCityMaxBannerMobile}
            alt="trycity"
            className={`xl:hidden ${styles.tryCity_image}`}
            loading="lazy"
          />
        </div>
        <div className={styles.right_text_section}>
          <h1 className={styles.tryCity_heading}>
            Try <span className={styles.tryCity_headingMax}>CityMax.</span>
          </h1>
          <p className={styles.TryCity_paragraph}>
            Unlimited furniture and appliances for
            <br /> lifetime. Starting at just ₹2,999/month.
          </p>
          <button className={styles.check_button}>
            <p className={styles.check_button_paragraph}>Check our plans</p>
            <ForwardArrow
              size={20}
              color={"#222"}
              className={styles.forward_icon}
            />
          </button>
          <div className={styles.benefits_of_city_wrapper}>
            <h2 className={styles.benefits_text}>Benefits of CityMax</h2>
            <hr className={styles.line} />
            <div className={styles.benefits_content}>
              {benefitsOfCity?.map((item, index) => {
                return (
                  <div className={styles.card_wrapper} key={index}>
                    <Image src={item.img} className={styles.card_icon} />
                    <h3 className={styles.benefit_title}>{item?.title}</h3>
                    <p className={styles.benefit_paragraph}>
                      {item?.paragraph}
                    </p>
                  </div>
                );
              })}
            </div>
            <button className={styles.how_it_works_button}>
              <p className={styles.how_it_works_paragraph}>How it works</p>
              <ForwardArrow
                size={18}
                color={"#597492"}
                className={styles.forward_arrow}
              />
            </button>
            <hr className={styles.underline} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TryCityMax;
