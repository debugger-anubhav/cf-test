import React, {useState} from "react";
import styles from "./styles.module.css";
import {BackIcon, IconLink} from "@/assets/icon";
import {ImCheckmark} from "react-icons/im";
import "react-circular-progressbar/dist/styles.css";
import {useRouter} from "next/navigation";
import {reduxSetModalState, setOrderIdFromOrderPage} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import "react-responsive-modal/styles.css";
import ManageSchedule from "./ManageScheduleDrawer";
import ServiceDrawer from "./ServiceDrawer/ServiceDrawer";
import OrderSummary from "@/components/Common/OrderSummary";
import {statusLabels, statusToImageMap} from "../../common/CommonContainer";

const OrderDetails = ({setPart, data}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stepsCompleted = data?.stagesData?.length;
  const orderStatus = data?.stagesData?.[stepsCompleted - 1]?.zoho_sub_status;

  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);

  const [isModalopen, setIsModalopen] = useState(false);
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const drawerPerStepsCompleted = {
    "order failed": "Retry Payment",
    "kyc in progress": "Complete KYC now",
    "delivery scheduled": "Change delivery slot",
  };

  const toggleModal = () => {
    setIsModalopen(!isModalopen);
    dispatch(reduxSetModalState(!modalStateFromRedux));
  };

  const toggleServiceDrawer = () => {
    setServiceDrawerOpen(!serviceDrawerOpen);
  };

  const isUnhappyCustomeFlow = data?.stagesData?.some(
    item => item.zoho_sub_status === "Cancelled",
  );

  const checkStatus = isUnhappyCustomeFlow
    ? data?.stagesData[stepsCompleted - 3]?.zoho_sub_status.toLowerCase()
    : orderStatus?.toLowerCase();

  const handleOpenChatBot = () => {
    console.log("chatt");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_wrapper}>
        <div onClick={() => setPart(1)} className={styles.headers_left_div}>
          <div>
            <BackIcon className={styles.backArrow} />
          </div>
          <h1 className={styles.header}>Order no: #{data?.order_id}</h1>
        </div>
        <div className={styles.headers_right_div}>
          <img
            src={IconLink + statusToImageMap[orderStatus?.toLowerCase()]}
            className={styles.status_icon}
          />
          <p className={styles.status}>
            {statusLabels[orderStatus?.toLowerCase()] || orderStatus}
          </p>
        </div>
      </div>

      <div className={`${styles.sub_container}`}>
        <div className={styles.upper_map}>
          {data?.stagesData?.map((item, index) => {
            return (
              <div key={index} className={styles.progress_map_item}>
                <div
                  className={`${
                    index < stepsCompleted - 1
                      ? styles.active_status
                      : styles.inactive_status
                  } ${styles.progress_circle}`}>
                  {index < stepsCompleted - 1 ? (
                    <ImCheckmark className={styles.check_icon} />
                  ) : (
                    <div className={styles.inner_circle}></div>
                  )}
                </div>
                {index !== data?.stagesData.length - 1 && (
                  <div
                    className={`${
                      drawerPerStepsCompleted[checkStatus] &&
                      (isUnhappyCustomeFlow
                        ? index === data?.stagesData?.length - 3
                        : index === data?.stagesData?.length - 1) &&
                      (checkStatus === "delivery scheduled"
                        ? "!h-[94px] -mt-[64px] md:-mt-0"
                        : "!h-[144px] -mt-[112px] md:-mt-0")
                    } ${styles.line} `}></div>
                )}
                {index === data?.stagesData.length - 1 &&
                  drawerPerStepsCompleted[checkStatus] &&
                  (isUnhappyCustomeFlow
                    ? index === data?.stagesData?.length - 3
                    : index === data?.stagesData?.length - 1) && (
                    <div
                      className={`md:!hidden ${
                        checkStatus === "delivery scheduled"
                          ? "!h-[65px] -mt-[62px]"
                          : "!h-[117px] -mt-[112px]"
                      } ${styles.line}`}></div>
                  )}
                <div>
                  <p className={styles.progress_status}>
                    {" "}
                    {statusLabels[item.zoho_sub_status.toLowerCase()] ||
                      item.zoho_sub_status}
                  </p>
                  {(isUnhappyCustomeFlow
                    ? index === data?.stagesData?.length - 3
                    : index === data?.stagesData?.length - 1) &&
                    drawerPerStepsCompleted[checkStatus] && (
                      <div className="md:!hidden">
                        {(checkStatus === "kyc in progress" ||
                          checkStatus === "order failed") && (
                          <p className={`mt-[30px] ${styles.progress_status}`}>
                            {checkStatus === "kyc in progress"
                              ? "KYC documentation required"
                              : "Payment required"}
                          </p>
                        )}
                        <button
                          disabled={isUnhappyCustomeFlow}
                          className={`mt-4 ${
                            isUnhappyCustomeFlow &&
                            styles.drawer_disabled_button
                          } ${styles.drawer_button}`}
                          onClick={() => {
                            if (checkStatus === "kyc in progress") {
                              dispatch(setOrderIdFromOrderPage(data?.order_id));
                              router.push("/documentation");
                            } else if (checkStatus === "delivery scheduled") {
                              toggleModal();
                            } else {
                              router.push("/cart");
                            }
                          }}>
                          {drawerPerStepsCompleted[checkStatus]}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.sub_container_right_div}>
          <div className="hidden md:block">
            {drawerPerStepsCompleted[checkStatus] && (
              <button
                disabled={isUnhappyCustomeFlow}
                className={`${
                  isUnhappyCustomeFlow && styles.drawer_disabled_button
                } ${styles.drawer_button}`}
                onClick={() => {
                  if (checkStatus === "complete kyc now") {
                    dispatch(setOrderIdFromOrderPage(data?.order_id));
                    router.push("/documentation");
                  } else if (checkStatus === "delivery scheduled") {
                    toggleModal();
                  } else {
                    router.push("/cart");
                  }
                }}>
                {drawerPerStepsCompleted[checkStatus]}
              </button>
            )}
          </div>
          {stepsCompleted > 0 &&
          orderStatus?.toLowerCase() === "order failed" ? (
            <p onClick={handleOpenChatBot} className={styles.need_help_txt}>
              Chat with us
            </p>
          ) : (
            <p onClick={toggleServiceDrawer} className={styles.need_help_txt}>
              Need Help with your order?
            </p>
          )}
        </div>
      </div>

      <ManageSchedule
        isModalOpen={isModalopen}
        closeModal={toggleModal}
        orderId={data?.order_id}
      />

      <ServiceDrawer
        open={serviceDrawerOpen}
        toggleDrawer={toggleServiceDrawer}
        orderId={data?.order_id}
        invoiceUrl=""
      />

      <div className="mt-8">
        <OrderSummary
          orderNumber={data?.order_id}
          isDelivered={stepsCompleted === 5}
          isOrderFailed={orderStatus?.toLowerCase() === "order failed"}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
