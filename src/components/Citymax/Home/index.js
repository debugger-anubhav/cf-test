import React from "react";
import styles from "./styles.module.css";
import HeroSection from "./HeroSection/index";
import WhyCitymax from "./WhyCitymax/index";

const CitymaxHome = () => {
  return (
    <div className={styles.main_wrapper}>
      <HeroSection />
      <WhyCitymax />
    </div>
  );
};

export default CitymaxHome;
