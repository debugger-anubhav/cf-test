import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "./styles.module.css";
import {IconLink} from "@/assets/icon";
import {getLocalStorage} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import CommonContainer from "../../common/CommonContainer";
import Header from "../../common/Header";

const AllOrders = ({setPart, getSingleOrderDetails, tab, setTab}) => {
  const containerRef = useRef(null);
  const [selectedMenuOrder, setSelectedMenuOrder] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(5); // Initial number of visible images
  const [containerWidth, setContainerWidth] = useState(0);

  const MenuList0 = [
    {label: "All orders"},
    {
      label: "KYC Pending",
      value: "kyc_pending",
      iconActive: `${IconLink + "kyc-pending-warning-active.svg"}`,
      icon: `${IconLink + "kyc-pending-warning-normal.svg"}`,
    },
    {label: "Delivered", value: "delivered"},
    {label: "Active Orders", value: "active_order"},
    {label: "Cancelled/Returned", value: "cancelled"},
    {
      label: "Payment Failed",
      value: "payment_failed",
      iconActive: `${IconLink + "payment-failed-warning-active.svg"}`,
      icon: `${IconLink + "payment-failed-warning-normal.svg"}`,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      console.log("in handle resize");
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    console.log("in useeffect 1");
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        console.log("9090");
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("in useeffect 2");
    const newVisibleImages = Math.floor((containerWidth - 200) / 92); // Adjust as needed
    newVisibleImages > 2
      ? setVisibleImages(newVisibleImages)
      : setVisibleImages(2);
    console.log(containerWidth, "containerrr");
  }, [containerWidth]);

  const userId = decrypt(getLocalStorage("_ga"));
  console.log(userId);

  const fetchOrdersDetails = filter => {
    const body = {
      userId,
      filter,
    };
    axios
      .post(baseURL + endPoints.myOrdersPage.getAllOrders, body)
      .then(res => {
        console.log(res, "resss");
        setOrdersData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.right_div}>
        <Header tab={tab} setTab={val => setTab(val)} />

        <div className="px-4 xl:px-6">
          <div className={styles.sub_container}>
            {MenuList0.map((item, index) => (
              <div
                className={`${
                  selectedMenuOrder === index
                    ? "text-5774AC border-b-9A9AA2"
                    : "text-45454A border-b-transparent"
                } ${styles.menu_wrapper}`}
                key={index}
                onClick={() => {
                  setSelectedMenuOrder(index);
                  fetchOrdersDetails(index !== 0 ? item.value : null);
                }}>
                <p
                  className={`
                   ${styles.menu_item}`}>
                  {item.label}
                </p>
                {item.icon && (
                  <img
                    className={styles.warning_icon}
                    src={
                      selectedMenuOrder === index ? item.iconActive : item.icon
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.orders_wrapper}>
            {ordersData?.map((item, index) => {
              console.log(visibleImages, "visibleee");
              return (
                <div key={index}>
                  <CommonContainer
                    item={item}
                    index={index}
                    visibleImages={visibleImages}
                    tab={0}
                    containerRef={containerRef}
                    getSingleOrderDetails={getSingleOrderDetails}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
