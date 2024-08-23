import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";

const TermsAndConditionsDrawer = ({toggleDrawer, open, isCivilScorePage}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const addressProofTandC = [
    "Order fulfillment is subject to approval of documents submitted. ",
    "Cityfurnish reserves right to cancel order in case of documents rejection.",
    "It will take 24 hrs to verify your documents after submission.",
  ];

  const creditScoreTandC = [
    "By continuing, you agree to allow Cityfurnish India Private Limited to fetch your credit report from CRIF High Mark for the purpose of KYC verification. This consent shall be valid for a period of 6 months. ",
    "By clicking the 'Proceed' button, you agree to CRIF High Mark Credit Score",
    "You understand that you shall have the option to opt out/unsubscribe from the service by clicking here. Fetching report from the credit bureau will not impact your credit score.",
  ];

  const termsAndConditions = isCivilScorePage
    ? creditScoreTandC
    : addressProofTandC;

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={() => toggleDrawer(false)}
      classes={{paper: styles.customDrawer}}>
      <div className={styles.main_container}>
        <div className={styles.close_icon} onClick={() => toggleDrawer(false)}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>

        <div className="">
          <h2 className={styles.header}>Terms and conditions</h2>
          <ul className={styles.map_wrapper}>
            {termsAndConditions?.map((item, index) => (
              <div key={index} className={styles.point_wrapper}>
                <div className={styles.dot}></div>
                {termsAndConditions === creditScoreTandC && index === 1 ? (
                  <li className={styles.list_item}>
                    {item}{" "}
                    <a
                      href="/pages/crif-terms-of-use"
                      target="_blank"
                      className="!text-5774AC underline">
                      Terms of Use{" "}
                    </a>
                    .
                  </li>
                ) : (
                  <li className={styles.list_item}>{item}</li>
                )}
              </div>
            ))}
          </ul>

          <button
            className={`${styles.list_item} ${styles.btn}`}
            onClick={() => toggleDrawer(false)}>
            Okay, understood
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default TermsAndConditionsDrawer;
