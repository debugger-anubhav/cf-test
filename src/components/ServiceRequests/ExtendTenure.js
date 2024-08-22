import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon} from "@/assets/icon";
import {useDispatch} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {useRouter} from "next/navigation";

function ExtendTenure({prevScreen, orderId, isHelpDrawer}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [count, setCount] = useState(5);
  const [recurringId, setRecurringId] = useState();

  const getRecurringId = async () => {
    try {
      const response = await baseInstance.get(
        endPoints.getRecurringIdFromOrderId(orderId),
      );
      setRecurringId(response?.data?.data?.recurring_zo_id);
    } catch (error) {
      console.log(error?.message || "some error");
    }
  };
  useEffect(() => {
    getRecurringId();
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  useEffect(() => {
    for (let i = 0; i <= 4; i++) {
      if (count > 1) {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      } else {
        if (isSmallScreen) {
          router.push(`/upfront_tenure_extension/${recurringId}`);
        } else {
          window?.open(
            `/upfront_tenure_extension/${recurringId}`,
            "_blank",
            "noopener noreferrer",
          );
        }
        dispatch(setServiceRequestDrawer(false));
      }
    }
  }, [count]);

  return (
    <div
      className={`${styles.content_wrapper} !pb-0 ${isHelpDrawer && "!p-0"}`}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Extend tenure
      </div>
      <div className={`${styles.buy_info} !mb-0`}>
        <p className={styles.desc}>
          {` Ready to extend your tenure? You'll be redirected to our Tenure
          Extension page. See you there!`}
        </p>
        <p className={styles.main_sub_heading}>
          Redirecting you to Tenure Extension page in <span>{count}</span>{" "}
          seconds.
        </p>
      </div>
    </div>
  );
}

export default ExtendTenure;
