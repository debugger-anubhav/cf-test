import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "../../orders/partOne/styles.module.css";
import {Close, InformationIcon, SadEmoji} from "@/assets/icon";
import CommonContainer from "../../common/CommonContainer";
import Header from "../../common/Header";
import {Skeleton} from "@mui/material";

const AllSubcriptions = ({
  setPart,
  tab,
  setTab,
  data,
  getSingleOrderDetails,
  getAllSubscriptionDetails,
  skeletonLoading,
}) => {
  const containerRef = useRef(null);
  const [selectedSubscriptionMenu, setSelectedSubscriptionMenu] = useState(0);

  const [visibleImages, setVisibleImages] = useState(5);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showSubscripNote, setShowSubscripNote] = useState(true);

  const MenuList1 = [
    {label: "All Subscriptions"},
    {label: "Active Subscriptions", value: "active"},
    {label: "Inactive Subscriptions", value: "inactive"},
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

  return (
    <div className={styles.main_container}>
      <div className={styles.right_div}>
        <Header tab={tab} setTab={setTab} />
        <div className="px-4 xl:px-6">
          <div className={styles.sub_container}>
            {MenuList1.map((item, index) => (
              <div
                className={`${
                  selectedSubscriptionMenu === index
                    ? "text-5774AC border-b-9A9AA2"
                    : "text-45454A border-b-transparent"
                } ${styles.menu_wrapper}`}
                key={index}
                onClick={() => {
                  setSelectedSubscriptionMenu(index);
                  getAllSubscriptionDetails(item?.value);
                }}>
                <p
                  className={`
                   ${styles.menu_item}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {showSubscripNote && (
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
          {skeletonLoading ? (
            <div className="w-full gap-4">
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full my-8"
              />
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full mb-8"
              />
              <Skeleton
                variant="rectangular"
                height={"120px"}
                className="h-full"
              />
            </div>
          ) : (
            <div className={styles.orders_wrapper}>
              {data?.length > 0 ? (
                data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <CommonContainer
                        item={item}
                        index={index}
                        visibleImages={visibleImages}
                        tab={1}
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
                    We are unable to find subscriptions.{" "}
                    {selectedSubscriptionMenu !== 0 &&
                      "Try going to a different category or go to"}{" "}
                    {selectedSubscriptionMenu !== 0 && (
                      <span
                        onClick={() => {
                          setSelectedSubscriptionMenu(0);
                          getAllSubscriptionDetails();
                        }}
                        className="text-5774AC cursor-pointer">
                        All subscriptions.
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

export default AllSubcriptions;
