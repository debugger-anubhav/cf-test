import React, {useEffect, useState} from "react";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import styles from "./style.module.css";
import {DeliveryTruck, WarningIcon} from "@/assets/icon";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {format} from "date-fns";

const MyOrders = () => {
  const [tab, setTab] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [data, setData] = useState([]);
  const MenuList = [
    "All orders",
    "KYC Pending",
    "Delivered",
    "Active Orders",
    "Cancelled/Returned",
    "Payment Failed",
  ];

  const userId = decrypt(getLocalStorage("_ga"));
  console.log(userId);

  const fetchOrdersDetails = filter => {
    const body = {
      userId,
    };
    const body1 = {
      userId,
      filter,
    };
    axios
      .post(
        baseURL + endPoints.myOrdersPage.getAllOrders,
        filter ? body : body1,
      )
      .then(res => {
        console.log(res, "resss");
        setData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <div className={styles.header_wrapper}>
          <h1
            onClick={() => setTab(0)}
            className={`min-w-fit ${
              tab === 0 ? styles.selected_tab : styles.not_selected_tab
            } ${styles.header}`}>
            My orders
          </h1>
          <h1
            onClick={() => setTab(1)}
            className={`w-full ${
              tab === 1 ? styles.selected_tab : styles.not_selected_tab
            } ${styles.header}`}>
            My Subscriptions
          </h1>
        </div>

        <div className="px-4 xl:px-6">
          <div className={styles.sub_container}>
            {MenuList.map((item, index) => (
              <div
                className={`${
                  selectedMenu === index
                    ? "text-5774AC border-b-9A9AA2"
                    : "text-45454A border-b-transparent"
                } ${styles.menu_wrapper}`}
                key={index}
                onClick={() => {
                  setSelectedMenu(index);
                  fetchOrdersDetails();
                }}>
                <p
                  className={`
                   ${styles.menu_item}`}>
                  {item}
                </p>
                {(index === 1 || index === 5) && (
                  <WarningIcon
                    color={index === 1 ? "#F6B704" : "#D96060"}
                    className={`${selectedMenu === index && "!opacity-100"} ${
                      styles.warning_icon
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.orders_wrapper}>
            {data?.map((item, index) => (
              <div key={index} className={styles.box}>
                <div
                  className={`${
                    item.zoho_sub_status === "KYC In Progress" && styles.grad_bg
                  } ${styles.upperBox}`}>
                  <div className={styles.left_part}>
                    <DeliveryTruck size={40} />
                    <div>
                      <p className={styles.status}>
                        {item.status === "Pending"
                          ? "Payment Failed"
                          : item.zoho_sub_status === "KYC In Progress"
                          ? "KYC Pending"
                          : item.zoho_sub_status}
                      </p>
                      <p className={styles.date}>
                        Ordered placed on{" "}
                        {`${format(new Date(item.created), "d LLL, yyyy")}`}
                      </p>
                    </div>
                  </div>
                  <div className={styles.dotted_line}></div>
                  <div className={styles.status_wrapper}>
                    <p className={styles.status}>
                      Order no: #{item.dealCodeNumber}
                    </p>
                    <p className={styles.help_txt}>Need Help?</p>
                  </div>
                </div>

                <div className={styles.lower_box}>
                  <div className="flex items-center gap-3 xl:gap-4">
                    {JSON.parse(item.fc_paymentData).map((product, index) => {
                      return (
                        <div key={index} className={styles.img_wrapper}>
                          <img
                            src={`${
                              productPageImagesBaseUrl +
                              "thumb/" +
                              product.product_image.split(",")[0]
                            }`}
                            alt={item.product_name}
                            className="w-full h-full"
                            loading="lazy"
                          />
                          <div className={styles.quantity_label}>
                            {product.quantity}x
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.arrow_wrapper}>
                    <i className={styles.for_arrow}></i>
                  </div>
                </div>

                {(item.zoho_sub_status === "KYC In Progress" ||
                  item.status === "Pending") && (
                  <div className={styles.optional_div}>
                    <p className={styles.optional_txt}>
                      <span className={styles.highlighted_txt}>
                        {item.status === "Pending"
                          ? "Retry Payment"
                          : "Complete KYC now"}
                      </span>{" "}
                      to proceed with your order
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
