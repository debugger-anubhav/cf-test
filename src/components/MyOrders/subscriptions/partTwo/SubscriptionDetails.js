import React, {useState} from "react";
import {BackIcon, IconLink} from "@/assets/icon";
import OrderSummary from "@/components/Common/OrderSummary";
import {statusToImageMap} from "../../common/CommonContainer";
import styles from "../../orders/partTwo/styles.module.css";
import ServiceDrawer from "../../orders/partTwo/ServiceDrawer/ServiceDrawer";
import {useRouter} from "next/navigation";

const SubscriptionDetails = ({setPart}) => {
  const router = useRouter();
  //   const dispatch = useDispatch();

  const data = {
    subsciptionNumber: "43093421",
    zoho_sub_status: "Active",
  };

  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const toggleServiceDrawer = () => {
    setServiceDrawerOpen(!serviceDrawerOpen);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_wrapper}>
        <div onClick={() => setPart(1)} className={styles.headers_left_div}>
          <div>
            <BackIcon className={styles.backArrow} />
          </div>
          <h1 className={styles.header}>
            Subscription no: #{data?.subsciptionNumber}
          </h1>
        </div>
        <div className={styles.headers_right_div}>
          <img
            src={IconLink + statusToImageMap[data?.zoho_sub_status]}
            className={styles.status_icon}
          />
          <p className={styles.status}> {data?.zoho_sub_status}</p>
        </div>
      </div>

      <div className={styles.sub_container}>
        <div>
          <p className="text-71717A text-14 xl:text-16 tracking-desc xl:tracking-0.3">
            Your Subscription expired on 3rd Jun, 2023 at 6:04 pm
          </p>
        </div>

        <div className={styles.sub_container_right_div}>
          <div
            className={styles.drawer_button}
            onClick={() => {
              if (data?.zoho_sub_status === "Active")
                router.push(
                  `/upfront_tenure_extension/${data?.subsciptionNumber}`,
                );
              else router.push(`/cart`);
            }}>
            {data?.zoho_sub_status === "Active" ? "Extend" : "Renew"}{" "}
            Subscription
          </div>

          {data?.zoho_sub_status === "Active" ? (
            <p onClick={toggleServiceDrawer} className={styles.need_help_txt}>
              Need Help with your order?
            </p>
          ) : (
            <div className={styles.drawer_button}>Download invoice</div>
          )}
        </div>
      </div>

      {serviceDrawerOpen && (
        <ServiceDrawer
          open={serviceDrawerOpen}
          toggleDrawer={toggleServiceDrawer}
          orderId={619694057}
        />
      )}

      <div className="mt-8">
        <OrderSummary orderNumber={619694057} />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
