import React, {useState} from "react";
import styles from "./styles.module.css";
import CityShieldContent from "@/components/Cart/Drawer/CityShieldDrawer/cityShieldContent";
import {ArrowForw, InformationIcon, OpenIcon} from "@/assets/icon";
import formStyles from "@/components/Cart/AddressSection/styles.module.css";
import BreakdownDrawer from "./breakdownDrawer";
import Breadcrump from "./breadcrump";

const CityShieldPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div className={styles.main_container}>
      <Breadcrump />

      <h1 className={styles.head}>Secure Your Coverage with City Shield</h1>

      <div className={styles.wrapper}>
        <div>
          <div>
            <div className={formStyles.form_field}>
              <p className={formStyles.form_label}>Full name</p>
              <input
                value={"Rupali Thakur"}
                type="text"
                name="fullName"
                className={styles.form_input}
                readOnly
              />
            </div>

            <div className={formStyles.form_field}>
              <p className={formStyles.form_label}>Email</p>
              <input
                name="email"
                className={styles.form_input}
                value={"cfh@gmail.com"}
                readOnly
              />
            </div>

            <div className={formStyles.form_field}>
              <p className={formStyles.form_label}>Order ID</p>
              <input
                value={"#1234567890"}
                name="orderId"
                className={styles.form_input}
                readOnly
              />
            </div>

            <a
              href={"https://test.rentofurniture.com/purchases"}
              target="_blank"
              rel="noreferrer"
              onClick={e => {
                e.preventDefault();
              }}>
              <div className={styles.orderid_info_div}>
                <p className={styles.orderid_txt}>Order Date : May 19, 2023</p>
                <OpenIcon color={"#5774AC"} className={styles.open_icon} />
              </div>
            </a>

            <div className={formStyles.form_field}>
              <p className={formStyles.form_label}>Amount (in Rs.)</p>
              <input
                value={199}
                name="amount"
                className={styles.form_input}
                readOnly
              />
            </div>

            <div className={styles.info_wrapper} onClick={toggleDrawer}>
              <InformationIcon className={styles.info_icon} />
              <p className={styles.see_how_text}>
                See how this amount is calculated.
              </p>
            </div>
          </div>
          <div className={styles.btn_wrapper}>
            <button className={styles.btn}>
              Pay now
              <ArrowForw className={styles.forw_arrow} />
            </button>
          </div>
        </div>

        <div className={styles.right_div}>
          <CityShieldContent />
        </div>

        {drawerOpen && (
          <BreakdownDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
        )}
      </div>
    </div>
  );
};

export default CityShieldPage;
