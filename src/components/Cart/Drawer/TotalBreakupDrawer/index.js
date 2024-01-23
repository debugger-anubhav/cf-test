import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {BackIcon, Close} from "@/assets/icon";
import {useSelector} from "react-redux";
import BillContent from "./content";

const TotalBreakup = ({toggleDrawer, open, isCouponApplied}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [showTotalPriceBreakdown, setShowTotalPriceBreakdown] = useState(false);
  // const code = useSelector(state => state.cartPageData.couponCodeUsed);
  const billBreakup = useSelector(state => state.cartPageData.billBreakout);
  console.log(billBreakup, "ue");

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

  const CartSubtotalContent = () => (
    <>
      <h1 className={styles.head}>Cart Subtotal: </h1>
      <div className={styles.dropdown_wrapper}>
        {billBreakup?.cartSubTotalList?.map((item, index) => (
          <div key={index} className={styles.dropdown_row}>
            <p className={`min-w-[190px] w-[190px] ${styles.prod_name}`}>
              {item.name}
            </p>
            <p className={`min-w-fit ${styles.prod_name}`}>{item.tenure}</p>
            <p className={styles.total_amount}>
              <span className={styles.rupeeIcon}>₹</span>

              {item.price}
            </p>
          </div>
        ))}
      </div>
      <button
        className={styles.back_to_breakdown_btn}
        onClick={() => setShowTotalPriceBreakdown(false)}>
        <BackIcon className={styles.backIcon} />
        Go back to Bill Breakup
      </button>
    </>
  );

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}
      transitionDuration={{enter: 400, exit: 200}}>
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        {showTotalPriceBreakdown && isBottomDrawer ? (
          <>
            <CartSubtotalContent />
          </>
        ) : (
          <>
            <h1 className={styles.head}>Cart Breakup:</h1>
            <BillContent
              isBottomDrawer={isBottomDrawer}
              isCouponApplied={isCouponApplied}
              showTotalPriceBreakdown={showTotalPriceBreakdown}
              setShowTotalPriceBreakdown={setShowTotalPriceBreakdown}
            />
          </>
        )}
      </div>
    </Drawer>
  );
};

export default TotalBreakup;
