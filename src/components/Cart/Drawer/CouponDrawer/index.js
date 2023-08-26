import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close, CopyIcon} from "@/assets/icon";
import {useSelector} from "react-redux";

const CouponDrawer = ({toggleDrawer, open}) => {
  const pageData = useSelector(state => state.homePagedata.offerCoupons);

  const [isCopied, setIsCopied] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopyClick = textToCopy => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "isCopied" after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(tempTextArea);
  };

  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

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
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      {" "}
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        <h1 className={styles.header}>Offers & coupons</h1>
        <div className={styles.input_div}>
          <input className={styles.input} placeholder="Enter Coupon code" />
          <p className={styles.apply_text}>Apply</p>
        </div>

        <div className={styles.coupons_wrapper}>
          {pageData?.map((item, index) => (
            <div
              key={index.toString()}
              className={styles.card}
              onClick={() => {
                console.log("click");
                setCopiedIndex(index);
                handleCopyClick(item.coupon_code);
              }}>
              <div className={`${styles.ellipse} ${styles.left}`}></div>
              <div className={`${styles.ellipse} ${styles.right}`}></div>
              <div className="xl:w-full">
                <p className={styles.desc}>{`${item?.price_text} ${
                  item?.max_discount !== "0"
                    ? `(up to Rs ${item?.max_discount})*`
                    : ""
                } `}</p>
                {item?.price_below_text && (
                  <p className={styles.desc}>
                    {item?.price_below_text.split(" ").slice(0, 7).join(" ")}
                  </p>
                )}
                <p className={styles.code}>Use Code {item?.coupon_code}</p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.copy_div}>
                <button id="copy-button" className="text-[#222] flex ">
                  {isCopied && copiedIndex === index ? (
                    "Copied!"
                  ) : (
                    <>
                      <CopyIcon size={20} color={"black"} className={"mr-1"} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CouponDrawer;
