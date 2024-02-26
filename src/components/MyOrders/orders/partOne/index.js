import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "./styles.module.css";
import {IconLink, SadEmoji} from "@/assets/icon";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import CommonContainer from "../../common/CommonContainer";
import Header from "../../common/Header";
import {Skeleton} from "@mui/material";

const AllOrders = ({setPart, getSingleOrderDetails, tab, setTab}) => {
  const containerRef = useRef(null);
  const [selectedMenuOrder, setSelectedMenuOrder] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(5); // Initial number of visible images
  const [containerWidth, setContainerWidth] = useState(0);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const MenuList0 = [
    {label: "All orders"},
    {
      label: "KYC Pending",
      value: "kyc_pending",
      iconActive: `${IconLink + "kyc-pending-warning-active.svg"}`,
      icon: `${IconLink + "kyc-pending-warning-normal.svg"}`,
    },
    // {label: "Delivered", value: "delivered"},
    {label: "KYC Under Review", value: "kyc_under_review"},
    {label: "Active Orders", value: "active_order"},
    {label: "Inactive Orders", value: "inactive_order"},

    // {label: "Cancelled/Returned", value: "cancelled"},
    {
      label: "Order Failed",
      value: "order_failed",
      iconActive: `${IconLink + "payment-failed-warning-active.svg"}`,
      icon: `${IconLink + "payment-failed-warning-normal.svg"}`,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const newVisibleImages = Math.floor((containerWidth - 200) / 92); // Adjust as needed
    newVisibleImages > 2
      ? setVisibleImages(newVisibleImages)
      : setVisibleImages(2);
  }, [containerWidth]);

  const userId = decrypt(getLocalStorage("_ga"));

  const fetchOrdersDetails = filter => {
    const body = {
      userId,
      filter,
    };
    baseInstance
      .post(endPoints.myOrdersPage.getAllOrders, body)
      .then(res => {
        setOrdersData(res?.data?.data);
        setSkeletonLoading(false);
      })
      .catch(err => {
        console.log(err);
        setSkeletonLoading(false);
      });
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
                  fetchOrdersDetails(item?.value);
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
                    alt="warning-icon"
                  />
                )}
              </div>
            ))}
          </div>
          {skeletonLoading ? (
            <div className="w-full gap-4">
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full mb-8"
              />
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full mb-8"
              />
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full mb-8"
              />
            </div>
          ) : (
            <div className={styles.orders_wrapper}>
              {ordersData.length > 0 ? (
                ordersData?.map((item, index) => {
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
                })
              ) : (
                <div className={styles.no_orders_div}>
                  <SadEmoji color={"#9A9AA2"} size={36} />
                  <p className={styles.no_order_desc}>
                    We are unable to find orders.{" "}
                    {selectedMenuOrder !== 0 &&
                      "Try going to a different category or go to"}{" "}
                    {selectedMenuOrder !== 0 && (
                      <span
                        onClick={() => {
                          setSelectedMenuOrder(0);
                          fetchOrdersDetails();
                        }}
                        className="text-5774AC cursor-pointer">
                        All orders.
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
