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
  "Out for Delivery": "out-for-delivery.svg",
  "KYC In Progress": "kyc-pending.svg",
  "Delivery Scheduled": "dellivery-scheduled.svg",
  Delivered: "delivered.svg",
  Cancelled: "cancelled.svg",
  "Refund Processed": "returned.svg",
  "Payment Failed": "payment-failed.svg",
  Active: "active-subscription.svg",
  Inactive: "inactive-subscription.svg",
};
const CommonContainer = ({
  index,
  item,
  visibleImages,
  tab,
  containerRef,
  getSingleOrderDetails,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);

  const toggleServiceDrawer = () => {
    setServiceDrawerOpen(!serviceDrawerOpen);
  };

  return (
    <div>
      <div key={index} className={styles.box}>
        <div
          className={`${
            item.zoho_sub_status === "KYC In Progress" && styles.grad_bg
          } ${styles.upperBox}`}>
          <div className={styles.left_part}>
            <img
              src={
                IconLink +
                (statusToImageMap[item.zoho_sub_status] || "payment-failed.svg")
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
                {tab === 0 ? "Ordered placed" : "Subscription confirmed"} on{" "}
                {`${format(new Date(item.created), "d LLL, yyyy")}`}
              </p>
            </div>
          </div>
          <div className={styles.dotted_line}></div>
          <div className={styles.status_wrapper}>
            <p className={styles.status}>
              {tab === 0
                ? `Order no: #${item.dealCodeNumber}`
                : `Subscription no: #${item.subscriptionNumber}`}
            </p>
            {item.status !== "Pending" && (
              <p onClick={toggleServiceDrawer} className={styles.help_txt}>
                Need Help?
              </p>
            )}
          </div>
        </div>

        {serviceDrawerOpen && (
          <ServiceDrawer
            open={serviceDrawerOpen}
            toggleDrawer={toggleServiceDrawer}
            orderId={item.dealCodeNumber}
          />
        )}

        <div
          className={styles.lower_box}
          id="image-gallery-container"
          onClick={() => {
            getSingleOrderDetails(item.dealCodeNumber);
          }}
          ref={containerRef}>
          <div className="flex items-center gap-3 xl:gap-4">
            {JSON.parse(item?.fc_paymentData)
              ?.slice(0, visibleImages)
              .map((product, index) => {
                return (
                  <div key={index.toString()} className={styles.img_wrapper}>
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
            {JSON.parse(item?.fc_paymentData)?.length > visibleImages && (
              <div className={styles.more_div}>
                +{JSON.parse(item?.fc_paymentData).length - visibleImages}
              </div>
            )}
          </div>
          <div className={styles.arrow_wrapper}>
            <i className={styles.for_arrow}></i>
          </div>
        </div>

        {tab === 0 &&
          (item.zoho_sub_status === "KYC In Progress" ||
            item.status === "Pending") && (
            <div
              className={styles.optional_div}
              onClick={() => {
                if (item.zoho_sub_status === "KYC In Progress") {
                  dispatch(setOrderIdFromOrderPage(item.dealCodeNumber));
                  router.push(`/documentation`);
                } else router.push(`/cart`);
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
    </div>
  );
};

export default CommonContainer;
