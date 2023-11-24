import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {ForwardArrowWithLine, PersonIcon} from "@/assets/icon";

const OrderSummary = ({orderNumber}) => {
  const [data, setData] = useState();
  const userId = decrypt(getLocalStorage("_ga"));
  const getOrderSummary = () => {
    axios
      .get(
        baseURL + endPoints.myOrdersPage.getOrderSummary(orderNumber, userId),
      )
      .then(res => {
        console.log(res, "resss");
        setData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getOrderSummary();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.products_wrapper}>
        <div className={styles.order_date_wrapper}>
          <p>
            Order placed on{" "}
            <span className={styles.bold_txt}>3rd Jun, 2023</span> at{" "}
            <span className={styles.bold_txt}>6:04 pm</span>
          </p>
        </div>

        <div>
          {data?.productsList?.map((item, index) => (
            <div className={styles.single_order_wrapper} key={index}>
              <div className={styles.img_wrapper}>
                <img
                  className="w-full h-full"
                  src={`${
                    productPageImagesBaseUrl +
                    "thumb/" +
                    item?.product_image?.split(",")[0]
                  }`}
                />
                <div className={styles.quantity_label}>{item?.quantity}x</div>
              </div>
              <div>
                <p className={styles.prod_name}>{item.product_name}</p>
                <p className={styles.tenure}>{item.subproduct_attr_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className={styles.box}>
          <p className={styles.box_header}>Payment details:</p>
          <div className={styles.amount_div}>
            <p>Paid using ni ptaaa</p>
            <p>
              <span className={styles.rupeeIcon}>₹</span>
              {data?.bill?.finalTotalPrice?.toFixed(2)}
            </p>
          </div>
          <div className={styles.flex_div}>
            <p className={styles.view_breakup_txt}>View cart breakup</p>
            <ForwardArrowWithLine className={styles.forward_icon} />
          </div>
        </div>
        <div className="h-6"></div>
        <div className={styles.box}>
          <p className={styles.box_header}>Address:</p>
          <div className={styles.name_div}>
            <PersonIcon color={"#2D9469"} className={"w-5 h-5"} />
            <p className={styles.saved_name}>
              {"full_name"}, {"99009988789"}
            </p>
          </div>
          <p className={styles.address}>
            {data?.address?.address1}
            {data?.address?.state}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
