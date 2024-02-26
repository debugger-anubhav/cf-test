import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import {ImCross} from "react-icons/im";
import {ArrowForw, EmailIcon, WhatsappIcon} from "@/assets/icon";
import {useRouter} from "next/navigation";
import {
  showToastNotification,
  updateToastNotification,
} from "../Common/Notifications/toastUtils";

const PaymentFailure = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);

      if (timer === 3)
        showToastNotification(
          `Redirecting to Cart page in ${timer} seconds`,
          2,
        );
      if (timer < 3 && timer > 0) {
        updateToastNotification(
          `Redirecting to Cart page in ${timer} ${
            timer === 1 ? "second" : "seconds"
          }`,
        );
      }
    }, 1000);

    if (timer < 1) {
      clearInterval(countdown);
      router.push("/cart");
    }
    return () => clearInterval(countdown);
  }, [router, timer]);

  return (
    <div className={styles.main_container}>
      <div className={styles.failure_icon_div}>
        <ImCross color={"white"} className={styles.checkIcon} />
      </div>

      <p className={styles.head}>
        Oops! Your payment couldn’t be processed. Please try again.
      </p>

      <div className={styles.fail_desc}>
        <p className={styles.desc}>
          If any amount has been deducted from your account, it will be refunded
          back within 7<br />
          business days. Please note that, your money will be safely refunded.
        </p>
      </div>

      <button onClick={() => router.push("/cart")} className={styles.yellowbtn}>
        Try again
        <ArrowForw size={20} />
      </button>

      <div>
        <p className={styles.need_help_txt}>Need help with your order?</p>
        <p className={styles.desc}>
          You can contact us at{" "}
          <a
            className={styles.phone_link}
            href={`tel:080-66084700`}
            target="_self"
            rel="noopener  noreferrer"
            aria-label="080-66084700">
            080-66084700
          </a>
          . Alternatively, you can:
        </p>
        <div className={styles.btn_wrapper}>
          <a
            href="mailto:hello@cityfurnish.com"
            target="_blank"
            rel="noopener  noreferrer"
            aria-label="Write to us">
            <button className={styles.btn}>
              <EmailIcon color={"#71717A"} size={20} />
              Write to us
            </button>
          </a>
          <a
            href={"https://wa.me/919205006188"}
            target="_blank"
            rel="noopener  noreferrer"
            aria-label="Talk to an agent">
            <button className={styles.btn}>
              <WhatsappIcon color={"#71717A"} size={20} />
              Talk to an agent
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
