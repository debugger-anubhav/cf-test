import React from "react";
import styles from "./style.module.css";
import SubCategorySection from "../section/SubCategorySection";
import {ForwardArrow} from "@/assets/icon";
import HasselFreeServicesCards from "@/components/Home/HasselFreeServicesCards";
import Footer from "@/components/Common/Footer";
import CategoryContent from "@/components/Category/categoryContent/categoryContent";
import {useRouter} from "next/navigation";

const Subproduct = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <ul className={styles.listings}>
            <li className={styles.list}>
              <p
                className={styles.route_text}
                onClick={() => {
                  router.push("/");
                }}>
                Home
              </p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>All Product</p>
            </li>
          </ul>
        </div>
        <div className={styles.product_wrapper}>
          <SubCategorySection />
        </div>
      </div>
      <HasselFreeServicesCards />
      <CategoryContent />
      <Footer />
    </>
  );
};

export default Subproduct;
