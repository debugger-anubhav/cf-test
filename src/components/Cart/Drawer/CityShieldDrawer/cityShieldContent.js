import React from "react";
import styles from "./styles.module.css";
import {VerifyIcon} from "@/assets/icon";
import {ProductPageImages} from "@/assets/images";

const CityShieldContent = ({
  cityShieldCurrentPrice,
  cityShieldOriginalPrice,
  cityShieldDiscount,
  toggleDrawer,
  toggleCheckbox,
}) => {
  const benefits = [
    {img: ProductPageImages.sratches, label: "Scratches & dents"},
    {img: ProductPageImages.liquidSpill, label: "Liquid spills & stains"},
    {img: ProductPageImages.brokenFurni, label: "Broken furniture"},
    {img: ProductPageImages.cracksTears, label: "Cracks, tears & more"},
  ];

  const coveredPoints = [
    "Damages due to normal wear and tear",
    "Scratches and dents on the product(s)",
    "Liquid spills and food stains on the upholstery or product surfaces",
    "Cracks and tears to the product(s)",
    "Bugs and fungus damaging the product(s)",
    "And more",
  ];

  const uncoveredPoints = [
    " Damages voluntarily caused or worsened, with sharp objects, hand or power tools, cigarette butts, or other such abuse",
    "Burglary or theft of the product(s)",
  ];
  return (
    <div className="h-[100vh] overflow-scroll pb-[200px] md:pb-0">
      <p className={styles.value_added_txt}>Value added service</p>
      <div className={styles.flexx}>
        <VerifyIcon size={30} color={"#2D9469"} />
        <p className={`${styles.city_shield_head} `}>Cityshield </p>
      </div>

      {cityShieldCurrentPrice ? (
        <p className={styles.opt_for}>
          Opt for City Shield today and get covered for accidental damages at
          ONLY <span className={styles.rupeeIcon}>₹</span>
          {cityShieldCurrentPrice}
          /month!
        </p>
      ) : (
        <div className="h-4"></div>
      )}

      <p className={styles.protect}>
        Protect your appliances and furniture worth upto{" "}
        <span className={styles.rupeeIcon}>₹</span>70,000{" "}
      </p>

      {cityShieldOriginalPrice && (
        <div className={styles.cityshield_prices}>
          <p className={styles.currentPrice}>
            <span className={styles.rupeeIcon}>₹</span>
            {cityShieldCurrentPrice}/mo
          </p>
          <p className={styles.originalPrice}>
            <span className={styles.rupeeIcon}>₹</span>{" "}
            {cityShieldOriginalPrice} / mo
          </p>
          <div className={styles.discount}>-{cityShieldDiscount}% OFF</div>
        </div>
      )}

      <div className={styles.arr_wrapper}>
        {benefits.map((item, index) => (
          <div key={index} className={styles.arr_item}>
            <div className={styles.img_div}>
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="pointer-events-none"
              />
            </div>
            <p
              className={`${
                index === 0
                  ? "w-[55px] lg:w-[80px]"
                  : index === 1
                  ? "w-[65px] lg:w-[91px]"
                  : index === 2
                  ? "w-[50px] lg:w-[68px]"
                  : "w-[75px] lg:w-[104px]"
              } ${styles.benefits_label}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {toggleCheckbox && (
        <>
          <button
            className={styles.btn}
            onClick={() => {
              toggleDrawer();
              toggleCheckbox(true);
            }}>
            Continue with Cityshield
          </button>
          <p
            className={styles.risk_text}
            onClick={() => {
              toggleCheckbox(false);
              toggleDrawer();
            }}>
            No, I wanna risk damaging the furniture & Applicances
          </p>
        </>
      )}

      <div className={styles.points_wrappper}>
        <div>
          <p className={styles.cover_head}>What is covered?</p>
          {coveredPoints.map((item, index) => (
            <ul key={index} className={styles.list}>
              <div className={styles.dot}></div>
              <li className={styles.points_item}>{item}</li>
            </ul>
          ))}
        </div>

        <div className="mt-6">
          <p className={styles.cover_head}>What is not covered?</p>
          {uncoveredPoints.map((item, index) => (
            <ul key={index} className={styles.list}>
              <div className={styles.dot}></div>
              <li key={index} className={styles.points_item}>
                {item}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityShieldContent;
