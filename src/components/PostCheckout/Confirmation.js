import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";
import {useSearchParams, useRouter} from "next/navigation";
import {setOrderIdFromOrderPage} from "@/store/Slices";
import {useDispatch} from "react-redux";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";
import {baseInstance} from "@/network/axios";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

const PaymentConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));

  const oid = searchParams.get("oid");

  const [timer, setTimer] = useState(5);
  const [transactionId, setTransactionId] = useState(null);
  const [skeletonLoder, setSkeletonLoder] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer <= 1) {
      clearInterval(countdown); // Stop the countdown
      dispatch(setOrderIdFromOrderPage(oid));
      // router.replace("/documentation");
    }
    return () => clearInterval(countdown);
  }, [router, timer]);

  const getPaymentScript = () => {
    baseInstance
      .get(endPoints.addToCart.paymentSuccessScript(oid, userId))
      .then(res => {
        const scriptData = res?.data?.data;
        console.log(scriptData, "script_data_purchase");
        const eventItems = [];
        scriptData?.items?.forEach((product, index) => {
          const item = {
            productId: product.id,
            productName: product?.name,
            quantity: product?.quantity,
            price: product?.price,
            brand: product?.brand,
            list_position: index + 1,
          };
          eventItems.push(item);
        });
        // console.log("first_call_11111111111");
        // console.log(window?.gtag, "fdsf");
        window?.gtag("event", "purchase", {
          transaction_id: scriptData?.transaction_id,
          value: scriptData?.value,
          currency: scriptData?.currency,
          tax: scriptData?.tax,
          shipping: scriptData?.shipping,
          items: eventItems,
        });
        // console.log("second_call_2222222");

        window?.fbq("track", "Purchase", {
          currency: scriptData?.currency,
          value: scriptData?.value,
        });
        window?.lintrk("track", {conversion_id: 11504433});
        // console.log("third_call_3333333333");
      })
      .catch(err => console.log(err, "purchase_event_error"));
  };

  const getTransactionId = id => {
    baseInstance
      .get(endPoints.addToCart.getTransactionId(id))
      .then(res => {
        setTransactionId(res?.data?.data?.paypal_transaction_id);
        setSkeletonLoder(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setSkeletonLoder(false);
      });
  };
  useEffect(() => {
    getTransactionId(oid);
  }, []);
  useEffect(() => {
    getPaymentScript();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.success_icon_div}>
        <FaCheck color={"white"} className={styles.checkIcon} />
      </div>

      <h1 className={styles.head}>
        Congratulations! We have received your order.
      </h1>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Order ID</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>#{oid}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Transaction ID</p>
          <p className={styles.desc}>:</p>
          {skeletonLoder ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <p className={`font-medium ${styles.desc}`}>{transactionId}</p>
          )}
        </div>
      </div>

      <div className={styles.next_step_wrapper}>
        <p className={styles.next_steps_header}>
          For the next steps, you will be redirected to KYC & Documentation page
          in {timer} {timer === 1 ? "second." : "seconds."}
        </p>
        <ul className={styles.steps}>
          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Please verify your KYC within next 48 hours.
            </li>
          </div>

          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Once your KYC is verified, we will be delivering your order within
              72 hours.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
