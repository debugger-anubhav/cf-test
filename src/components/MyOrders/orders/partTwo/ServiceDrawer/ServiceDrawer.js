import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import ServiceRequestType from "@/components/ServiceRequests/ServiceRequestType";

const ServiceDrawer = ({
  toggleDrawer,
  open,
  orderId,
  invoiceUrl,
  isSubscription,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <div>
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        classes={{paper: styles.customDrawer}}
        transitionDuration={{enter: 400, exit: 200}}>
        <div className="flex w-full gap-8 h-full overflow-scroll ">
          <ServiceRequestType
            orderId={orderId}
            isHelpDrawer
            title="Need help with..."
            invoiceUrl={invoiceUrl}
            isSubscription={isSubscription}
          />
          <div onClick={toggleDrawer} className={styles.close_icon}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ServiceDrawer;
