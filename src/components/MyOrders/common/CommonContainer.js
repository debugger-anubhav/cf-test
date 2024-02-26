import {productPageImagesBaseUrl} from "@/constants/constant";
import {setOrderIdFromOrderPage} from "@/store/Slices";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./styles.module.css";
import {IconLink} from "@/assets/icon";
import ServiceDrawer from "../orders/partTwo/ServiceDrawer/ServiceDrawer";

export const statusToImageMap = {
  "out for delivery": "out-for-delivery.svg",
  "kyc in progress": "kyc-pending.svg",
  "delivery scheduled": "dellivery-scheduled.svg",
  delivered: "delivered.svg",
  "delivered - partial": "delivered.svg",
  cancelled: "cancelled.svg",
  "refund processed": "returned.svg",
  "refund requested": "returned.svg",
  "order failed": "payment-failed.svg",
  "kyc docs under review": "kyc-under-review.svg",
  "kyc rejected": "kyc-rejected.svg",
  "kyc appproved": "kyc-approved.svg",
  active: "active-subscription.svg",
  inactive: "inactive-subscription.svg",
};

export const statusLabels = {
  "kyc in progress": "KYC Pending",
  "refund processed": "Refunded",
  "refund requested": "Refunded",
  cancelled: "Cancellation Requested",
  "delivered - partial": "Partial Delivered",
  "kyc docs under review": "KYC Under Review",
  "kyc completed": "KYC Approved",
  "out for delivery": "Out for Delivery",
};

const CommonContainer = ({
  index,
  item,
  visibleImages,
  tab,
  containerRef,
  getSingleOrderDetails,
  offlineCustomer,
  offlineUserId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);

  const toggleServiceDrawer = () => {
    setServiceDrawerOpen(!serviceDrawerOpen);
  };

  const productDetails =
    tab === 0 ? JSON.parse(item?.fc_paymentData) : item?.productsList;

  return (
    <div>
      <div key={index} className={styles.box}>
        <div
          className={`${
            item.zoho_sub_status === "KYC In Progress" && styles.grad_bg
          } ${styles.upperBox}`}>
          <div className={styles.left_part}>
            <img
              className="w-10 h-10"
              src={
                tab === 0
                  ? IconLink +
                    (statusToImageMap[item?.zoho_sub_status?.toLowerCase()] ||
                      "payment-failed.svg")
                  : IconLink + statusToImageMap[item?.status?.toLowerCase()]
              }
              loading="lazy"
            />
            <div>
              <p className={styles.status}>
                {tab === 0
                  ? item.status === "Pending"
                    ? item.is_offline_placed === "1"
                      ? "Amount Pending"
                      : "Order Failed"
                    : statusLabels[item.zoho_sub_status.toLowerCase()] ||
                      item.zoho_sub_status
                  : item.status.toLowerCase()}
              </p>
              <p className={styles.date}>
                {tab === 0 ? "Ordered placed" : "Subscription confirmed"} on{" "}
                {`${format(
                  new Date(tab === 0 ? item.created : item.start_date),
                  "d LLL, yyyy",
                )}`}
              </p>
            </div>
          </div>
          <div className={styles.dotted_line}></div>
          <div className={styles.status_wrapper}>
            <p className={styles.status}>
              {tab === 0
                ? `Order no: #${item.dealCodeNumber}`
                : `Subscription no: #${item.dealCodeNumber}`}
            </p>
            {item.status.toLowerCase() === "pending" ? (
              <a
                href={"https://wa.me/919205006188"}
                target="_blank"
                rel="noopener  noreferrer"
                aria-label="Talk to an agent">
                <p className={styles.help_txt}>Chat with us</p>
              </a>
            ) : (
              item.status.toLowerCase() !== "inactive" && (
                <p onClick={toggleServiceDrawer} className={styles.help_txt}>
                  Need Help?
                </p>
              )
            )}
          </div>
        </div>

        <ServiceDrawer
          open={serviceDrawerOpen}
          toggleDrawer={toggleServiceDrawer}
          orderId={item.dealCodeNumber}
          invoiceUrl={item?.url}
          isSubscription={tab === 1}
        />

        <div
          className={`${styles.lower_box} `}
          id="image-gallery-container"
          onClick={() => {
            if (offlineCustomer) {
              router.push(
                `view-purchase-offline/${offlineUserId}/${item.dealCodeNumber}`,
              );
            } else getSingleOrderDetails(item.dealCodeNumber);
          }}
          ref={containerRef}>
          <div className="flex items-center gap-3 xl:gap-4">
            {productDetails?.slice(0, visibleImages).map((product, index) => {
              return (
                <div key={index} className={styles.img_wrapper}>
                  <img
                    src={`${
                      tab === 0
                        ? productPageImagesBaseUrl +
                          "thumb/" +
                          product?.product_image?.split(",")[0]
                        : productPageImagesBaseUrl +
                          "thumb/" +
                          product?.image?.split(",")[0]
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
            {productDetails?.length > visibleImages && (
              <div className={styles.more_div}>
                +{productDetails.length - visibleImages}
              </div>
            )}
          </div>
          <div className={styles.arrow_wrapper}>
            <i className={styles.for_arrow}></i>
          </div>
        </div>

        {tab === 0 &&
          (item.zoho_sub_status === "KYC In Progress" ||
            item.status === "Pending" ||
            item.zoho_sub_status === "KYC Rejected") && (
            <div
              className={styles.optional_div}
              onClick={() => {
                if (item.status === "Pending") router.push(`/cart`);
                else {
                  dispatch(setOrderIdFromOrderPage(item.dealCodeNumber));
                  router.push(`/documentation`);
                }
              }}>
              <p className={styles.optional_txt}>
                <span className={styles.highlighted_txt}>
                  {item.status === "Pending"
                    ? "Retry Payment"
                    : item.zoho_sub_status === "KYC In Progress"
                    ? "Complete KYC now"
                    : "Re-upload document(s)"}
                </span>{" "}
                to proceed with your order
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default CommonContainer;
