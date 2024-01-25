import React, {useState} from "react";
import {Drawer} from "@mui/material";
import {BackIcon, Close, DownPopUpArrow, PopUpArrow} from "@/assets/icon";
import styles from "./styles.module.css";
import commonStyles from "@/components/Cart/Drawer/TotalBreakupDrawer/styles.module.css";

const BreakdownDrawer = ({toggleDrawer, open, billBreakup}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [showTotalPriceBreakdown, setShowTotalPriceBreakdown] = useState(false);

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

  const MonthlyRentOfAllProducts = () => (
    <>
      <h1 className={styles.head}>Monthly rent of all the product(s): </h1>
      <div className={commonStyles.dropdown_wrapper}>
        {billBreakup?.cartSubTotalList?.map((item, index) => (
          <div key={index} className={commonStyles.dropdown_row}>
            <p className={`min-w-[190px] w-[190px] ${commonStyles.prod_name}`}>
              {item.productName}
            </p>
            <p className={`min-w-fit ${commonStyles.prod_name}`}>
              {item.tenure}
            </p>
            <p className={commonStyles.total_amount}>
              {item?.price && <span className={commonStyles.rupeeIcon}>₹</span>}
              {item?.price}
            </p>
          </div>
        ))}
      </div>
      <button
        className={styles.back_to_breakdown_btn}
        onClick={() => setShowTotalPriceBreakdown(false)}>
        <BackIcon className={styles.backIcon} />
        Go back to Breakdown
      </button>
    </>
  );

  return (
    <>
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
              <MonthlyRentOfAllProducts />
            </>
          ) : (
            <>
              <h1 className={styles.head}>Breakdown of Payment Amount: </h1>

              <div className={commonStyles.breakup_wrapper}>
                <div className={commonStyles.row}>
                  <div
                    className={commonStyles.left_div}
                    onClick={() =>
                      setShowTotalPriceBreakdown(!showTotalPriceBreakdown)
                    }>
                    <p className={commonStyles.sub_total_text}>
                      Monthly rent of all the product(s)
                    </p>
                    {!isBottomDrawer &&
                      (showTotalPriceBreakdown ? (
                        <PopUpArrow color={"#5774AC"} size={20} />
                      ) : (
                        <DownPopUpArrow color={"#5774AC"} size={20} />
                      ))}
                  </div>

                  <p className={commonStyles.total_amount}>
                    {billBreakup?.cartSubTotal && (
                      <span className={commonStyles.rupeeIcon}>₹</span>
                    )}
                    {billBreakup?.cartSubTotal}
                  </p>
                </div>

                {showTotalPriceBreakdown && (
                  <>
                    <div className={commonStyles.dropdown_wrapper}>
                      {billBreakup?.cartSubTotalList?.map((item, index) => (
                        <div key={index} className={commonStyles.dropdown_row}>
                          <p
                            className={`min-w-[190px] w-[190px] ${commonStyles.prod_name}`}>
                            {item.productName}
                          </p>
                          <p className={`min-w-fit ${commonStyles.prod_name}`}>
                            {item.tenure}
                          </p>
                          <p className={commonStyles.total_amount}>
                            {item?.price && (
                              <span className={commonStyles.rupeeIcon}>₹</span>
                            )}
                            {item?.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className={commonStyles.line}></div>

                <div className={commonStyles.row}>
                  <div>
                    <p className={commonStyles.price_label}>Total tenure</p>
                  </div>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.totalTenureMonths} months or{" "}
                    {billBreakup?.totalTenureDays} days
                  </p>
                </div>

                <div className={commonStyles.row}>
                  <div>
                    <p className={commonStyles.price_label}>Tenure/day</p>
                  </div>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.perDayPrice && (
                      <span className={commonStyles.rupeeIcon}>₹</span>
                    )}
                    {billBreakup?.perDayPrice}
                  </p>
                </div>

                <div className={commonStyles.row}>
                  <div>
                    <p className={commonStyles.price_label}>Tenure remaining</p>
                  </div>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.remainingTenure} days{" "}
                  </p>
                </div>

                <div className={commonStyles.line}></div>

                <div className={commonStyles.row}>
                  <div>
                    <p className={commonStyles.price_label}>
                      Remaining Cityshield amount (1.56 x 182)
                    </p>
                  </div>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.remainingCityShieldAmount && (
                      <span className={commonStyles.rupeeIcon}>₹</span>
                    )}
                    {billBreakup?.remainingCityShieldAmount}
                  </p>
                </div>

                <div className={commonStyles.line}></div>

                <div className={commonStyles.row}>
                  <div>
                    <p className={commonStyles.price_label}>GST (18%)</p>
                  </div>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.gst && (
                      <span className={commonStyles.rupeeIcon}>₹</span>
                    )}
                    {billBreakup?.gst}
                  </p>
                </div>

                <div className={commonStyles.line}></div>

                <div className={commonStyles.row}>
                  <p className={commonStyles.total_txt}>Total</p>
                  <p className={commonStyles.total_amount}>
                    {billBreakup?.finalTotalPrice && (
                      <span className={commonStyles.rupeeIcon}>₹</span>
                    )}
                    {parseInt(billBreakup?.finalTotalPrice)?.toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default BreakdownDrawer;
