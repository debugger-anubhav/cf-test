import Drawer from "@mui/material/Drawer";
import React, {useState} from "react";
import styles from "./style.module.css";
import {Close, VerifyIcon} from "@/assets/icon";
import {ProductPageImages} from "@/assets/images";

const CityshieldDrawer = ({
  toggleDrawer,
  open,
  cityShieldOriginalPrice,
  cityShieldCurrentPrice,
  cityShieldDiscount,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const arr = [
    {img: ProductPageImages.sratches, label: "Scratches & dents"},
    {img: ProductPageImages.liquidSpill, label: "Liquid spills & stains"},
    {img: ProductPageImages.brokenFurni, label: "Broken furniture"},
    {img: ProductPageImages.cracksTears, label: "Cracks, tears & more"},
  ];

  return (
    <div>
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        transitionDuration={600}
        classes={{paper: styles.customDrawer}}>
        <div className={styles.main_container}>
          <div
            className={styles.close_icon}
            onClick={() => {
              toggleDrawer();
            }}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>

          <p className={styles.value_added_txt}>Value added service</p>
          <div className={styles.flexx}>
            <VerifyIcon size={30} color={"#2D9469"} />
            <p className={styles.city_shield_head}>City Shield </p>
          </div>

          <p className={styles.opt_for}>
            Opt for City Shield today and get covered for accidental damages at
            ONLY <span className={styles.rupeeIcon}>₹</span>
            {cityShieldCurrentPrice}
            /month!
          </p>
          <p className={styles.protect}>
            Protect your appliances and furniture worth upto{" "}
            <span className={styles.rupeeIcon}>₹</span>70,000{" "}
          </p>

          <p className={styles.option_text}>
            Option to opt for City Shield is available at the time of checkout.
          </p>

          <div className={styles.cityshield_prices}>
            <p className={styles.currentPrice}>
              <span className={styles.rupeeIcon}>₹</span>
              {cityShieldCurrentPrice}/mo
            </p>
            <p className={styles.originalPrice}>
              <span className={styles.rupeeIcon}>₹</span>
              {cityShieldOriginalPrice} / mo
            </p>
            <div className={styles.discount}>-{cityShieldDiscount}% OFF</div>
          </div>

          <div className={styles.arr_wrapper}>
            {arr.map((item, index) => (
              <div key={index} className={styles.arr_item}>
                <div className={styles.img_div}>
                  <img src={item.img} />
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

          <button className={styles.btn} onClick={toggleDrawer}>
            Okay, understood
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default CityshieldDrawer;
