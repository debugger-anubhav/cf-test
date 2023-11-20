import React, {useEffect, useState} from "react";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import styles from "./style.module.css";
import {IconLink} from "@/assets/icon";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setOrderIdFromOrderPage} from "@/store/Slices";

const MyOrders = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [data, setData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(2); // Initial number of visible images
  const [containerWidth, setContainerWidth] = useState(0);
  const MenuList0 = [
    {label: "All orders"},
    {label: "KYC Pending", value: "kyc_pending"},
    {label: "Delivered", value: "delivered"},
    {label: "Active Orders", value: "active_order"},
    {label: "Cancelled/Returned", value: "cancelled"},
    {label: "Payment Failed", value: "payment_failed"},
  ];

  const MenuList1 = [
    {label: "All Subscriptions"},
    {label: "Active Subscriptions"},
    {label: "Inactive Subscriptions"},
  ];

  const MenuList = tab === 0 ? MenuList0 : MenuList1;

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("image-gallery-container");
      if (container) setContainerWidth(container.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const newVisibleImages = Math.floor((containerWidth - 200) / 92); // Adjust as needed
    newVisibleImages > 2
      ? setVisibleImages(newVisibleImages)
      : setVisibleImages(2);
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
        setData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchOrdersDetails();
  }, []);

  const statusToImageMap = {
    "Out for Delivery": "out-for-delivery.svg",
    "KYC In Progress": "kyc-pending.svg",
    "Delivery Scheduled": "dellivery-scheduled.svg",
    Delivered: "delivered.svg",
    Cancelled: "cancelled.svg",
    "Refund Processed": "returned.svg",
    "Payment Failed": "payment-failed.svg",
  };

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
                  fetchOrdersDetails(index !== 0 ? item.value : null);
                }}>
                <p
                  className={`
                   ${styles.menu_item}`}>
                  {item.label}
                </p>
                {(index === 1 || index === 5) && (
                  <img
                    className={styles.warning_icon}
                    src={
                      IconLink +
                      `${
                        index === 1
                          ? selectedMenu === index
                            ? "kyc-pending-warning-active.svg"
                            : "kyc-pending-warning-normal.svg"
                          : selectedMenu === index
                          ? "payment-failed-warning-active.svg"
                          : "payment-failed-warning-normal.svg"
                      }`
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.orders_wrapper}>
            {data?.map((item, index) => {
              return (
                <div key={index} className={styles.box}>
                  <div
                    className={`${
                      item.zoho_sub_status === "KYC In Progress" &&
                      styles.grad_bg
                    } ${styles.upperBox}`}>
                    <div className={styles.left_part}>
                      <img
                        src={
                          IconLink +
                          (statusToImageMap[item.zoho_sub_status] ||
                            "payment-failed.svg")
                        }
                      />
                      <div>
                        <p className={styles.status}>
                          {item.status === "Pending"
                            ? "Payment Failed"
                            : item.zoho_sub_status === "KYC In Progress"
                            ? "KYC Pending"
                            : item.zoho_sub_status === "Refund Processed"
                            ? "Returned"
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

                  <div
                    className={styles.lower_box}
                    id="image-gallery-container">
                    <div className="flex items-center gap-3 xl:gap-4">
                      {JSON.parse(item?.fc_paymentData)
                        ?.slice(0, visibleImages)
                        .map((product, index) => {
                          return (
                            <div key={index} className={styles.img_wrapper}>
                              <img
                                src={`${
                                  productPageImagesBaseUrl +
                                  "thumb/" +
                                  product?.product_image?.split(",")[0]
                                }`}
                                alt={product?.product_name}
                                className="w-full h-full"
                                loading="lazy"
                              />
                              <div className={styles.quantity_label}>
                                {product?.quantity}x
                              </div>
                            </div>
                          );
                        })}
                      {JSON.parse(item?.fc_paymentData)?.length >
                        visibleImages && (
                        <div className={styles.more_div}>
                          +
                          {JSON.parse(item?.fc_paymentData).length -
                            visibleImages}
                        </div>
                      )}
                    </div>
                    <div className={styles.arrow_wrapper}>
                      <i className={styles.for_arrow}></i>
                    </div>
                  </div>

                  {(item.zoho_sub_status === "KYC In Progress" ||
                    item.status === "Pending") && (
                    <div
                      className={styles.optional_div}
                      onClick={() => {
                        if (item.zoho_sub_status === "KYC In Progress") {
                          console.log("1");
                          dispatch(
                            setOrderIdFromOrderPage(item.dealCodeNumber),
                          );
                          console.log("2");
                          router.push(`/documentation`);
                        }
                      }}>
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
