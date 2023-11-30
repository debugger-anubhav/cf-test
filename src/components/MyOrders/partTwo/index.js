import React, {useState} from "react";
import styles from "./styles.module.css";
import {BackIcon, IconLink} from "@/assets/icon";
import {statusToImageMap} from "../partOne/CommonContainer";
import {ImCheckmark} from "react-icons/im";
import OrderSummary from "../../Common/OrderSummary";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import {useRouter} from "next/navigation";
import {openScheduleModal, setOrderIdFromOrderPage} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import "react-responsive-modal/styles.css";
import ManageSchedule from "./ManageScheduleDrawer";
import ServiceDrawer from "./ServiceDrawer/ServiceDrawer";

const OrderDetails = ({setPart, data}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stepsCompleted = data?.stage;

  const modalStateFromRedux = useSelector(
    state => state.order.isScheduleModalOpen,
  );
  console.log(modalStateFromRedux);

  const [isModalopen, setIsModalopen] = useState(false);
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const drawerPerStepsCompleted = {
    0: "Retry Payment",
    1: "Complete KYC now",
    2: data?.allStages?.[1] === "Cancellation Processed" && "Reorder",
    3:
      data?.allStages?.[2] === "Refund Processed"
        ? "Reorder"
        : "Manage delivery slot",
  };

  const toggleModal = () => {
    setIsModalopen(!isModalopen);
    dispatch(openScheduleModal(!modalStateFromRedux));
  };

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
          <h1 className={styles.header}>Order no: #{data?.dealCodeNumber}</h1>
        </div>
        <div className={styles.headers_right_div}>
          <img
            src={
              IconLink +
              (statusToImageMap[data?.zoho_sub_status] || "payment-failed.svg")
            }
            className={styles.status_icon}
          />
          <p className={styles.status}>
            {" "}
            {data?.status === "Pending"
              ? "Payment Failed"
              : data?.zoho_sub_status === "KYC In Progress"
              ? "KYC Pending"
              : data?.zoho_sub_status === "Refund Processed"
              ? "Returned"
              : data?.zoho_sub_status}
          </p>
        </div>
      </div>

      <div className={styles.sub_container}>
        <div className={styles.progress_wrapper}>
          <div className={styles.upper_map}>
            {data?.allStages?.map((item, index) => (
              <div key={index} className={styles.progress_icon_wrapper}>
                {index !== stepsCompleted || index === 0 ? (
                  <div
                    className={`${
                      index < stepsCompleted
                        ? styles.active_status
                        : styles.inactive_status
                    } ${styles.progress_circle}`}>
                    {index < stepsCompleted ? (
                      <ImCheckmark className={styles.check_icon} />
                    ) : (
                      index + 1
                    )}
                  </div>
                ) : (
                  <div className={`w-[18px] h-[18px]`}>
                    <ChangingProgressProvider values={[0, 25, 50, 75, 100]}>
                      {percentage => (
                        <CircularProgressbar
                          value={percentage}
                          text={index + 1}
                          strokeWidth={10}
                          styles={{
                            path: {
                              stroke: "#2D9469",
                              transition: "stroke-dashoffset 1s ease-in-out",
                            },
                            trail: {
                              stroke: "#EDEDEE",
                            },
                            text: {
                              fill: "#2D9469",
                              fontSize: "60px",
                              fontWeight: 700,
                              fontFamily: "Poppins",
                            },
                          }}
                        />
                      )}
                    </ChangingProgressProvider>
                  </div>
                )}
                {index !== data.allStages.length - 1 && (
                  <div
                    className={`${
                      index < stepsCompleted
                        ? styles.active_status
                        : `!bg-EDEDEE ${styles.inactive_status}`
                    } ${styles.line}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.lower_map}>
            {data?.allStages?.map((item, index) => (
              <div key={index} className={styles.progress_icon_wrapper}>
                <p className={styles.progress_status}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sub_container_right_div}>
          {stepsCompleted < 4 && drawerPerStepsCompleted[stepsCompleted] && (
            <div
              className={styles.drawer_button}
              onClick={() => {
                if (
                  drawerPerStepsCompleted[stepsCompleted] === "Complete KYC now"
                ) {
                  dispatch(setOrderIdFromOrderPage(data?.dealCodeNumber));
                  router.push("/documentation");
                } else if (
                  drawerPerStepsCompleted[stepsCompleted] ===
                  "Manage delivery slot"
                ) {
                  toggleModal();
                } else {
                  router.push("/cart");
                }
              }}>
              {drawerPerStepsCompleted[stepsCompleted]}
            </div>
          )}
          {stepsCompleted > 0 && (
            <p onClick={toggleServiceDrawer} className={styles.need_help_txt}>
              Need Help with your order?
            </p>
          )}
        </div>
      </div>

      {isModalopen && (
        <ManageSchedule isModalOpen={isModalopen} closeModal={toggleModal} />
      )}

      {serviceDrawerOpen && (
        <ServiceDrawer
          open={serviceDrawerOpen}
          toggleDrawer={toggleServiceDrawer}
          orderId={data?.dealCodeNumber}
        />
      )}

      <div className="mt-8">
        <OrderSummary
          orderNumber={data?.dealCodeNumber}
          isDelivered={stepsCompleted === 5}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
