import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "../../orders/partOne/styles.module.css";
import {Close, InformationIcon} from "@/assets/icon";
import {getLocalStorage} from "@/constants/constant";
// import axios from "axios";
// import {baseURL} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import CommonContainer from "../../common/CommonContainer";
import Header from "../../common/Header";

const AllSubcriptions = ({getSingleOrderDetails, tab, setTab}) => {
  const containerRef = useRef(null);
  const [selectedSubscriptionMenu, setSelectedSubscriptionMenu] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [visibleImages, setVisibleImages] = useState(5);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showSubscripNote, setShowSubscripNote] = useState(true);

  const MenuList1 = [
    {label: "All Subscriptions"},
    {label: "Active Subscriptions"},
    {label: "Inactive Subscriptions"},
  ];

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

  useLayoutEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, 1000);
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

  const fetchSubscriptionDetails = filter => {
    setSubscriptionData([
      {
        id: 72705,
        subscriptionNumber: "280705685",
        created: "2023-10-09T18:25:17.000Z",
        zoho_sub_status: "Active",
        status: "Paid",
        attr_name: "12 Months",
        fc_paymentData:
          '[{"product_id": 3907, "quantity": "1", "product_name": "Bristol Sofa Set", "product_image": "bristol_sofa_set.webp,"}]',
      },
      {
        id: 72705,
        subscriptionNumber: "280705685",
        created: "2023-10-09T18:25:17.000Z",
        zoho_sub_status: "Active",
        status: "Paid",
        attr_name: "12 Months",
        fc_paymentData:
          '[{"product_id": 3907, "quantity": "1", "product_name": "Bristol Sofa Set", "product_image": "bristol_sofa_set.webp,"}]',
      },
      {
        id: 72705,
        subscriptionNumber: "280705685",
        created: "2023-10-09T18:25:17.000Z",
        zoho_sub_status: "Inactive",
        status: "Paid",
        attr_name: "12 Months",
        fc_paymentData:
          '[{"product_id": 3907, "quantity": "1", "product_name": "Bristol Sofa Set", "product_image": "bristol_sofa_set.webp,"}]',
      },
      {
        id: 72705,
        subscriptionNumber: "280705685",
        created: "2023-10-09T18:25:17.000Z",
        zoho_sub_status: "Inactive",
        status: "Paid",
        attr_name: "12 Months",
        fc_paymentData:
          '[{"product_id": 3907, "quantity": "1", "product_name": "Bristol Sofa Set", "product_image": "bristol_sofa_set.webp,"}]',
      },
    ]);

    // const body = {
    //   userId,
    //   filter,
    // };
    // axios
    //   .post(baseURL + endPoints.myOrdersPage.getAllOrders, body)
    //   .then(res => {
    //     console.log(res, "resss");
    //     setOrdersData(res?.data?.data);
    //   })
    //   .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

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

          <div className={styles.orders_wrapper}>
            {subscriptionData?.map((item, index) => {
              console.log(visibleImages, "visibleee");
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubcriptions;
