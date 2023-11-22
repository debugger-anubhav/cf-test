import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import styles from "./style.module.css";
import {Close, IconLink, InformationIcon} from "@/assets/icon";
import {getLocalStorage} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import CommonContainer from "./CommonContainer";

const MyOrders = () => {
  const containerRef = useRef(null);
  const [tab, setTab] = useState(0);
  const [selectedMenuOrder, setSelectedMenuOrder] = useState(0);
  const [selectedSubscriptionMenu, setSelectedSubscriptionMenu] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(5); // Initial number of visible images
  const [containerWidth, setContainerWidth] = useState(0);
  const [showSubscripNote, setShowSubscripNote] = useState(true);

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

  const MenuList1 = [
    {label: "All Subscriptions"},
    {label: "Active Subscriptions"},
    {label: "Inactive Subscriptions"},
  ];

  const MenuList = tab === 0 ? MenuList0 : MenuList1;
  const mapData = tab === 0 ? ordersData : [];

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

  // const func = () =>
  //   setTimeout(() => {
  //     if (containerRef.current) {
  //       console.log("9090");
  //       setContainerWidth(containerRef.current.offsetWidth);
  //     }
  //   }, 1000);
  // func();
  useLayoutEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        console.log("9090");
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, 500);
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
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <div className={styles.header_wrapper}>
          <h1
            onClick={() => setTab(0)}
            className={`${tab === 0 && styles.selected_tab} ${styles.header}`}>
            My orders
          </h1>
          <h1
            onClick={() => setTab(1)}
            className={`${
              tab === 1 ? styles.selected_tab : "!border-r-transparent"
            } ${styles.header}`}>
            My Subscriptions
          </h1>
          <div className={`w-full !border-r-0 ${styles.header}`}></div>
        </div>

        <div className="px-4 xl:px-6">
          <div className={styles.sub_container}>
            {MenuList.map((item, index) => (
              <div
                className={`${
                  (tab === 0 ? selectedMenuOrder : selectedSubscriptionMenu) ===
                  index
                    ? "text-5774AC border-b-9A9AA2"
                    : "text-45454A border-b-transparent"
                } ${styles.menu_wrapper}`}
                key={index}
                onClick={() => {
                  tab === 0
                    ? setSelectedMenuOrder(index)
                    : setSelectedSubscriptionMenu(index);
                  tab === 0 &&
                    fetchOrdersDetails(index !== 0 ? item.value : null);
                }}>
                <p
                  className={`
                   ${styles.menu_item}`}>
                  {item.label}
                </p>
                {tab === 0 && item.icon && (
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

          {tab === 1 && showSubscripNote && (
            <div className={styles.subscrip_note_wrapper}>
              <InformationIcon className={`mt-0.5 ${styles.subscrip_icon}`} />
              <p className={styles.subscrip_note_txt}>
                Once you order, Your order is automatically made into a
                subscription. You can extend your current subscription, cancel
                or renew your old subscription.
              </p>
              <div
                onClick={() => {
                  setShowSubscripNote(false);
                }}>
                <Close className={`cursor-pointer ${styles.subscrip_icon}`} />
              </div>
            </div>
          )}

          <div className={styles.orders_wrapper}>
            {mapData?.map((item, index) => {
              console.log(visibleImages, "visibleee");
              return (
                <div key={index}>
                  <CommonContainer
                    item={item}
                    index={index}
                    visibleImages={visibleImages}
                    tab={tab}
                    containerRef={containerRef}
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

export default MyOrders;
