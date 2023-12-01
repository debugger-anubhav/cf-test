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
      classes={{paper: styles.customDrawer}}>
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

          // <>
          //   <h1 className={styles.head}>Cart Breakup:</h1>
          //   <div className={styles.breakup_wrapper}>
          //     <div className={styles.row}>
          //       <div
          //         className={styles.left_div}
          //         onClick={() =>
          //           setShowTotalPriceBreakdown(!showTotalPriceBreakdown)
          //         }>
          //         <p className={styles.sub_total_text}>
          //           Cart Subtotal {isBottomDrawer && "(view details)"}
          //         </p>

          //         {!isBottomDrawer &&
          //           (showTotalPriceBreakdown ? (
          //             <PopUpArrow color={"#5774AC"} size={20} />
          //           ) : (
          //             <DownPopUpArrow color={"#5774AC"} size={20} />
          //           ))}
          //       </div>

          //       <p className={styles.total_amount}>
          //         <span className={styles.rupeeIcon}>₹</span>
          //         {billBreakup?.cartSubTotal}
          //       </p>
          //     </div>

          //     {showTotalPriceBreakdown && (
          //       <>
          //         <div className={styles.dropdown_wrapper}>
          //           {billBreakup?.cartSubTotalList?.map((item, index) => (
          //             <div key={index} className={styles.dropdown_row}>
          //               <p
          //                 className={`min-w-[190px] w-[190px] ${styles.prod_name}`}>
          //                 {item.name}
          //               </p>
          //               <p className={`min-w-fit ${styles.prod_name}`}>
          //                 {item.tenure}
          //               </p>
          //               <p className={styles.total_amount}>
          //                 <span className={styles.rupeeIcon}>₹</span>

          //                 {item.price}
          //               </p>
          //             </div>
          //           ))}
          //         </div>
          //       </>
          //     )}

          //     <div className={styles.line}></div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>Items discount</p>
          //       </div>
          //       <p className={styles.total_amount} style={{color: "#2D9469"}}>
          //         <span className={styles.rupeeIcon}>-₹</span>
          //         {billBreakup?.itemDiscount}
          //       </p>
          //     </div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>
          //           Coupon discount {isCouponApplied && code}
          //         </p>
          //       </div>
          //       <p className={styles.total_amount} style={{color: "#2D9469"}}>
          //         <span className={styles.rupeeIcon}>-₹</span>
          //         {billBreakup?.couponDiscount}
          //       </p>
          //     </div>

          //     <div className={styles.line}></div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>
          //           Refundable Security Deposit
          //         </p>
          //       </div>
          //       <p className={styles.total_amount} style={{color: "#2D9469"}}>
          //         <span className={styles.rupeeIcon}>₹</span>
          //         {billBreakup?.refundableDeposite}
          //       </p>
          //     </div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>
          //           Delivery & Installation fee
          //         </p>
          //       </div>
          //       <p className={styles.total_amount} style={{color: "#2D9469"}}>
          //         <span className={styles.rupeeIcon}>₹</span>
          //         {billBreakup?.deliveryAndInstallation}
          //       </p>
          //     </div>

          //     <div className={styles.line}></div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>GST (18%)</p>
          //       </div>
          //       <p className={styles.total_amount}>
          //         <span className={styles.rupeeIcon}>₹</span>
          //         {billBreakup?.gst}
          //       </p>
          //     </div>

          //     <div className={styles.line}></div>

          //     <div className={styles.row}>
          //       <div>
          //         <p className={styles.price_label}>Cityfurnish coins used</p>
          //       </div>
          //       <p className={styles.total_amount} style={{color: "#2D9469"}}>
          //         <span className={styles.rupeeIcon}>-₹</span>
          //         {billBreakup?.coinsUsed}
          //       </p>
          //     </div>

          //     <div className={styles.line}></div>

          //     <div className={styles.row}>
          //       <p className={styles.total_txt}>Total</p>
          //       <p className={styles.total_amount}>
          //         <span className={styles.rupeeIcon}>₹</span>
          //         {billBreakup?.finalTotalPrice?.toFixed(2)}
          //       </p>
          //     </div>
          //   </div>
          // </>
        )}
      </div>
      ;
    </Drawer>
  );
};

export default TotalBreakup;
