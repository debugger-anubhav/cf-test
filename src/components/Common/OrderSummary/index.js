import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {
  getLocalStorage,
  productImageBaseUrl,
  productPageImagesBaseUrl,
} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {ForwardArrowWithLine, PersonIcon} from "@/assets/icon";
import TotalBreakup from "@/components/Cart/Drawer/TotalBreakupDrawer";
import {useDispatch} from "react-redux";
import {getBillDetails, setMonthlyUpfrontLoader} from "@/store/Slices";
import {format} from "date-fns";
import ReviewDrawer from "./reviewDrawer";
import BillContent from "@/components/Cart/Drawer/TotalBreakupDrawer/content";
import {useRouter} from "next/navigation";
import {baseInstance} from "@/network/axios";

const OrderSummary = ({
  orderNumber,
  isDelivered,
  isOfflineInvoice,
  isSubscriptionPage,
  subscriptionData,
  isOrderFailed,
  paramUserId,
}) => {
  const router = useRouter();
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [reviewDrawer, setReviewDrawer] = useState(false);
  const [data, setData] = useState();
  const [isCitymaxBill, setIsCitymaxBill] = useState(false);
  const [indexForProp, setIndexForProp] = useState(0);
  const userId = decrypt(getLocalStorage("_ga"));
  const cityId = parseInt(getLocalStorage("cityId"));
  const [alreadyFilledReview, setAlreadyFilledReview] = useState(null);
  const dispatch = useDispatch();
  const getOrderSummary = () => {
    if (isSubscriptionPage) {
      setData(subscriptionData);
      dispatch(getBillDetails(subscriptionData?.bill));
      dispatch(setMonthlyUpfrontLoader(false));
      setIsCitymaxBill(false);
    } else {
      baseInstance
        .get(
          endPoints.myOrdersPage.getOrderSummary(
            orderNumber,
            isOfflineInvoice ? paramUserId : userId,
          ),
        )
        .then(res => {
          setData(res?.data?.data);
          if (res?.data?.data?.productsList?.length === 0) router.push("/");
          else {
            dispatch(getBillDetails(res?.data?.data?.bill));
            dispatch(setMonthlyUpfrontLoader(false));
            setIsCitymaxBill(res?.data?.data?.productsList[0]?.is_frp === "1");
          }
        })
        .catch(err => console.log(err?.message || "some error"));
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
    <div className={`${styles.main_container}`}>
      <div className={styles.products_wrapper}>
        {data && (
          <div className={styles.order_date_wrapper}>
            <p>
              Order placed on{" "}
              <span className={styles.bold_txt}>
                {" "}
                {subscriptionData
                  ? data?.start_date &&
                    `${format(new Date(data?.start_date), "d LLL, yyyy")}`
                  : data?.orderDate &&
                    `${format(new Date(data?.orderDate), "d LLL, yyyy")}`}
              </span>{" "}
              {!isSubscriptionPage && (
                <>
                  at{" "}
                  <span className={styles.bold_txt}>
                    {data?.orderDate &&
                      `${format(new Date(data?.orderDate), "h:mm a")}`}
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
                key={index + index}
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
                    loading="lazy"
                    alt={item.product_name}
                  />
                  <div className={styles.quantity_label}>{item?.quantity}x</div>
                </div>
                <div className="w-full">
                  <p className={styles.prod_name}>{item.product_name}</p>

                  {isOfflineInvoice ? (
                    <div className="mt-2">
                      <p className={styles.tenure}>
                        Quantity: {item?.quantity}
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
                          ? `${data?.tenure}`
                          : item.subproduct_attr_name}
                      </p>
                      {isDelivered && (
                        <p
                          onClick={() => {
                            setIndexForProp(index);
                            const headers = {
                              user_id: userId,
                              product_id: item?.product_id,
                              city_id: cityId,
                            };
                            baseInstance
                              .post("fc-payments/getProductReview", headers)
                              .then(res => {
                                setAlreadyFilledReview(res?.data?.data);
                              });
                            toggleReviewDrawer();
                          }}
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
                        loading="lazy"
                        alt={p?.fc_product?.product_name}
                      />
                      <p className={styles.prod_name}>
                        {p?.fc_product?.product_name}
                      </p>
                    </div>
                  ))}
                </>
              )}
              {indexForProp === index && (
                <ReviewDrawer
                  toggleDrawer={toggleReviewDrawer}
                  open={reviewDrawer}
                  productImage={item?.product_image?.split(",")[0]}
                  productName={item?.product_name}
                  item={item}
                  productId={data?.productsList[indexForProp]?.product_id}
                  alreadyFilledReview={alreadyFilledReview}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          className={`${
            isOfflineInvoice && "!w-full xs:!w-[408px] xl:!w-[424px]"
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

        {!isOrderFailed && (
          <div
            className={`${
              !isOfflineInvoice && "hover:border-5774AC cursor-pointer"
            } ${isOfflineInvoice && " !w-full xs:!w-[408px] xl:!w-[424px]"} ${
              styles.box
            }`}
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
                    {data?.bill?.mode?.toLowerCase() === "offline"
                      ? "Paid offline"
                      : `Paid using ${data?.bill?.mode}`}
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
        )}

        <TotalBreakup toggleDrawer={toggleDrawerBreakup} open={breakupDrawer} />
      </div>
    </div>
  );
};

export default OrderSummary;
