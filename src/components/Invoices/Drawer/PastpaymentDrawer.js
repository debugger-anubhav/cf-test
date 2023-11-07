import React, {useState} from "react";
import styles from "./styles.module.css";
import {Close, ForwardArrowWithLine, ToggleOff, ToggleOn} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {useRouter} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const PastpaymentDrawer = ({
  toggleDrawer,
  open,
  amountDue,
  availbal,
  isCoinApplied,
  setIsCoinApplied,
  invoiceNumber,
}) => {
  const router = useRouter();
  const userId = decrypt(getLocalStorage("_ga"));

  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  // const [isCoinApplied, setIsCoinApplied] = useState(false);

  const handleRedirectToPayment = async () => {
    try {
      const response = await axios.get(
        baseURL + endPoints.profileSettingPage.getUserDetails(userId),
      );

      const queryParams = {
        email: response?.data?.data?.email,
        name: response?.data?.data?.full_name,
        customer_id: response?.data?.data.cf_customer_id || "CF-126402",
        amount: `Rs.${amountDue}`,
      };
      if (invoiceNumber !== null) {
        queryParams.invoice_number = invoiceNumber;
      }
      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join("&");

      const url = `/customerpayment?${queryString}`;
      router.push(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);
  return (
    <div>
      {" "}
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        classes={{paper: styles.customDrawer}}>
        <div className={styles.main_container}>
          <div
            className={styles.close_icon}
            onClick={() => {
              toggleDrawer();
            }}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>

          <p className={styles.head}>Make Payment</p>
          <div className="mt-8 md:pr-8">
            <p className={styles.total_txt}>Total Amount Due</p>
            <input
              className={styles.input}
              value={
                isCoinApplied
                  ? amountDue - availbal > 0
                    ? amountDue - availbal
                    : 0
                  : amountDue
              }
            />

            <div className={styles.toggle_wrapper}>
              <div className="cursor-pointer ">
                {isCoinApplied ? (
                  <ToggleOn
                    size={29}
                    color={"#5774AC"}
                    onClick={() => setIsCoinApplied(false)}
                  />
                ) : (
                  <ToggleOff
                    color={"#E3E1DC"}
                    size={29}
                    onClick={() => setIsCoinApplied(true)}
                  />
                )}
              </div>
              <p className={styles.total_txt}>
                Use Cityfurnish coins (Available balance:{" "}
                {isCoinApplied ? Math.abs(amountDue - availbal) : availbal})
              </p>
            </div>

            <button
              className={styles.btn}
              onClick={() => handleRedirectToPayment()}>
              Proceed and pay
              <ForwardArrowWithLine className={styles.proceed_icon} />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PastpaymentDrawer;
