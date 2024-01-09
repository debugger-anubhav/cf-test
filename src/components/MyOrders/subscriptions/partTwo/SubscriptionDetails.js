import React, {useEffect, useState} from "react";
import {BackIcon, IconLink} from "@/assets/icon";
import OrderSummary from "@/components/Common/OrderSummary";
import {statusToImageMap} from "../../common/CommonContainer";
import styles from "../../orders/partTwo/styles.module.css";
import ServiceDrawer from "../../orders/partTwo/ServiceDrawer/ServiceDrawer";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const SubscriptionDetails = ({setPart, subscriptionData}) => {
  const router = useRouter();
  const subsciptionNumber = useSelector(state => state.order.subscriptionId);
  const [singleSubscriptionData, setSingleSubscriptionData] = useState();

  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const toggleServiceDrawer = () => {
    setServiceDrawerOpen(!serviceDrawerOpen);
  };

  const getSingleOrderDetails = () => {
    const filteredData = subscriptionData.filter(
      t => parseInt(t.dealCodeNumber) === parseInt(subsciptionNumber),
    );
    setSingleSubscriptionData(filteredData[0]);
  };

  useEffect(() => {
    getSingleOrderDetails();
  }, []);

  console.log(singleSubscriptionData, "singleSubscriptionData");

  let expiryDate;
  if (singleSubscriptionData) {
    expiryDate = format(
      new Date(singleSubscriptionData?.end_date),
      "d LLL, yyyy",
    );
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.header_wrapper}>
        <div onClick={() => setPart(1)} className={styles.headers_left_div}>
          <div>
            <BackIcon className={styles.backArrow} />
          </div>
          <h1 className={styles.header}>
            Subscription no: #{singleSubscriptionData?.dealCodeNumber}
          </h1>
        </div>
        <div className={styles.headers_right_div}>
          <img
            src={
              IconLink +
              statusToImageMap[singleSubscriptionData?.status.toLowerCase()]
            }
            className={styles.status_icon}
          />
          <p className={styles.status}>{singleSubscriptionData?.status}</p>
        </div>
      </div>

      <div className={styles.sub_container}>
        <div>
          <p className="text-71717A text-14 xl:text-16 tracking-desc xl:tracking-0.3">
            Your Subscription expired on {expiryDate}
          </p>
        </div>

        <div className={styles.sub_container_right_div}>
          <div
            className={styles.drawer_button}
            onClick={() => {
              if (singleSubscriptionData?.status.toLowerCase() === "active")
                router.push(
                  `/upfront_tenure_extension/${singleSubscriptionData?.dealCodeNumber}`,
                );
              else router.push(`/cart`);
            }}>
            {singleSubscriptionData?.status.toLowerCase() === "active"
              ? "Extend"
              : "Renew"}{" "}
            Subscription
          </div>

          {
            singleSubscriptionData?.status.toLowerCase() === "active" && (
              <p onClick={toggleServiceDrawer} className={styles.need_help_txt}>
                Need Help with your order?
              </p>
            )
            //  : (
            //   <div className={styles.drawer_button}>Download invoice</div>
            // )
          }
        </div>
      </div>

      {serviceDrawerOpen && (
        <ServiceDrawer
          open={serviceDrawerOpen}
          toggleDrawer={toggleServiceDrawer}
          orderId={singleSubscriptionData?.dealCodeNumber}
        />
      )}

      <div className="mt-8">
        <OrderSummary
          subscriptionData={singleSubscriptionData}
          orderNumber={singleSubscriptionData?.dealCodeNumber}
          isSubscriptionPage={true}
        />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
