import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {
  getLocalStorage,
  productImageBaseUrl,
  productPageImagesBaseUrl,
} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {ForwardArrowWithLine, PersonIcon} from "@/assets/icon";
import TotalBreakup from "@/components/Cart/Drawer/TotalBreakupDrawer";
import {useDispatch} from "react-redux";
import {getBillDetails} from "@/store/Slices";
import {format} from "date-fns";
import ReviewDrawer from "./reviewDrawer";
import BillContent from "@/components/Cart/Drawer/TotalBreakupDrawer/content";

const OrderSummary = ({
  orderNumber,
  isDelivered,
  isOfflineInvoice,
  isSubscriptionPage,
  subscriptionData,
}) => {
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [reviewDrawer, setReviewDrawer] = useState(false);
  const [data, setData] = useState();
  const [isCitymaxBill, setIsCitymaxBill] = useState(false);
  const userId = decrypt(getLocalStorage("_ga"));

  console.log(subscriptionData, "subscriptionData");

  const dispatch = useDispatch();
  const getOrderSummary = () => {
    if (isSubscriptionPage) {
      setData(subscriptionData);
      dispatch(getBillDetails(subscriptionData?.bill));
      setIsCitymaxBill(false);
    } else {
      axios
        .get(
          baseURL + endPoints.myOrdersPage.getOrderSummary(orderNumber, userId),
        )
        .then(res => {
          console.log(res, "resss");
          setData(res?.data?.data);
          dispatch(getBillDetails(res?.data?.data?.bill));
          setIsCitymaxBill(res?.data?.data?.productsList[0]?.is_frp === "1");
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getOrderSummary();
  }, [subscriptionData]);

  const toggleDrawerBreakup = () => {
    setBreakupDrawer(!breakupDrawer);
  };

  const toggleReviewDrawer = () => {
    setReviewDrawer(!reviewDrawer);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.products_wrapper}>
        {data && (
          <div className={styles.order_date_wrapper}>
            <p>
              Order placed on{" "}
              <span className={styles.bold_txt}>
                {" "}
                {subscriptionData
                  ? `${format(new Date(data?.start_date), "d LLL, yyyy")}`
                  : `${format(new Date(data.orderDate), "d LLL, yyyy")}`}
              </span>{" "}
              {!isSubscriptionPage && (
                <>
                  at{" "}
                  <span className={styles.bold_txt}>
                    {`${format(new Date(data?.orderDate), "h:mm a")}`}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        <div>
          {data?.productsList?.map((item, index) => (
            <div key={index}>
              <div
                className={`${isOfflineInvoice && "!items-start"} ${
                  styles.single_order_wrapper
                }`}>
                <div
                  className={`${
                    isOfflineInvoice && "xl:!h-[90px] xl:!min-w-[120px]"
                  } ${styles.img_wrapper}`}>
                  <img
                    className="w-full h-full"
                    src={`${
                      isSubscriptionPage
                        ? productPageImagesBaseUrl +
                          "thumb/" +
                          item?.image?.split(",")[0]
                        : productPageImagesBaseUrl +
                          "thumb/" +
                          item?.product_image?.split(",")[0]
                    }`}
                  />
                  <div className={styles.quantity_label}>{item?.quantity}x</div>
                </div>
                <div className="w-full">
                  <p className={styles.prod_name}>{item.product_name}</p>

                  {isOfflineInvoice ? (
                    <div className="mt-2">
                      <p className={styles.tenure}>
                        Quantity: <span className={styles.rupeeIcon}>₹</span>
                        {item?.quantity}
                      </p>
                      <p className={styles.tenure}>
                        Refundable deposit:{" "}
                        <span className={styles.rupeeIcon}>₹</span>
                        {item?.product_shipping_cost}
                      </p>
                      <p className={styles.tenure}>
                        Monthly Rent:{" "}
                        <span className={styles.rupeeIcon}>₹</span>
                        {item?.price}
                      </p>
                    </div>
                  ) : (
                    <div className={styles.tenure_div}>
                      <p className={styles.tenure}>
                        Tenure:{" "}
                        {subscriptionData
                          ? `${data?.tenure} months`
                          : item.subproduct_attr_name}
                      </p>
                      {isDelivered && (
                        <p
                          onClick={toggleReviewDrawer}
                          className={`${styles.review} ${styles.view_breakup_txt}`}>
                          Write Review
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {item?.includedProducts && (
                <>
                  <p className={styles.plan_contain_txt}>
                    This plan contains {item?.includedProducts?.length} items
                  </p>
                  {item?.includedProducts?.map((p, i) => (
                    <div key={i} className={styles.included_item_wrapper}>
                      <img
                        className={styles.included_prod_img}
                        src={
                          productImageBaseUrl +
                          p?.fc_product?.image?.split(",")?.[0]
                        }
                      />
                      <p className={styles.prod_name}>
                        {p?.fc_product?.product_name}
                      </p>
                    </div>
                  ))}
                </>
              )}
              {reviewDrawer && (
                <ReviewDrawer
                  toggleDrawer={toggleReviewDrawer}
                  open={reviewDrawer}
                  productImage={item?.product_image?.split(",")[0]}
                  productName={item?.product_name}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          className={`${
            isOfflineInvoice && "!w-full xs:!w-[408px] xl:!min-w-max"
          } ${styles.box}`}>
          <p className={styles.box_header}>Address:</p>
          <div className={styles.name_div}>
            <PersonIcon color={"#2D9469"} className={styles.person_icon} />
            <p className={styles.saved_name}>
              {data?.address?.fullName}, {data?.address?.phone}
            </p>
          </div>
          <p className={styles.address}>
            {data?.address?.address1}
            {""} {data?.address?.city} {""}
            {data?.address?.state}
          </p>
        </div>
        <div className="h-4 xl:h-6"></div>

        <div
          className={`hover:border-5774AC cursor-pointer ${
            isOfflineInvoice && "!w-full xs:!w-[408px] xl:!min-w-max"
          } ${styles.box}`}
          onClick={() => {
            isOfflineInvoice ? console.log("not") : setBreakupDrawer(true);
          }}>
          <p className={styles.box_header}>Payment details:</p>
          {isOfflineInvoice ? (
            <BillContent
              isOfflineInvoice={isOfflineInvoice}
              isCitymaxBill={isCitymaxBill}
            />
          ) : (
            <>
              <div className={styles.amount_div}>
                <p className={`!text-71717A ${styles.saved_name}`}>
                  Paid using {data?.bill?.mode}
                </p>
                <p className={styles.amount}>
                  <span className={styles.rupeeIcon}>₹</span>
                  {parseInt(data?.bill?.finalTotalPrice).toFixed(2)}
                </p>
              </div>
              <div className={styles.flex_div}>
                <p className={styles.view_breakup_txt}>View cart breakup</p>
                <ForwardArrowWithLine className={styles.forward_icon} />
              </div>
            </>
          )}
        </div>

        {breakupDrawer && (
          <TotalBreakup
            toggleDrawer={toggleDrawerBreakup}
            open={breakupDrawer}
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
