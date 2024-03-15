import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";
import {format} from "date-fns";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

const PaymentSuccess = () => {
  const currentDateTime = new Date();
  const formattedDateTime = format(currentDateTime, "MMMM d, yyyy, h:mm a");
  const router = useRouter();
  const details = useSelector(state => state.successPayment);

  const userId = decrypt(getLocalStorage("_ga"));

  const getPaymentScript = () => {
    baseInstance
      .get(
        endPoints.addToCart.paymentSuccessScript(
          details?.TransactionReferenceNumber,
          userId,
        ),
      )
      .then(res => {
        console.log(res, "ressssss");

        const scriptData = res?.data?.data;

        const eventItems = [];
        res?.data?.data?.forEach((product, index) => {
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
        console.log(eventItems, "eventItems");

        window?.Northbeam.firePurchaseEvent({
          id: scriptData?.transaction_id,
          totalPrice: scriptData?.value,
          shippingPrice: scriptData?.shipping,
          taxPrice: scriptData?.tax,
          coupons: "WELCOME10",
          currency: scriptData?.currency,
          customerId: "CF-11011",
          lineItems: eventItems,
        });

        window?.gtag("event", "purchase", {
          transaction_id: scriptData?.transaction_id,
          value: scriptData?.value,
          currency: scriptData?.currency,
          tax: scriptData?.tax,
          shipping: scriptData?.shipping,
          items: eventItems,
        });
        window?.fbq("track", "Purchase", {
          currency: scriptData?.currency,
          value: scriptData?.value,
        });
        window?.lintrk("track", {conversion_id: 11504433});
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPaymentScript();
    if (details.TransactionReferenceNumber === "") router.push("/");
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.success_icon_div}>
        <FaCheck color={"white"} className={styles.checkIcon} />
      </div>

      <h1 className={styles.head}>
        Congratulations! Your transaction is successful.
      </h1>
      <div className="mt-6 xl:mt-8">
        <p className={styles.desc}>
          You can note down the following details for future reference.
        </p>
      </div>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Transaction reference number
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details?.TransactionReferenceNumber}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Transaction date
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>{formattedDateTime}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            PG Transaction ID
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details?.PGTransactionID}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>Amount</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details.amountPaid} INR
          </p>
        </div>
      </div>

      <div onClick={() => router.push("/")} className={styles.yellowbtn}>
        Return to home page
      </div>
    </div>
  );
};

export default PaymentSuccess;
