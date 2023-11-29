import React, {useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {Close, ForwardArrowWithLine} from "@/assets/icon";
import PastRequests from "./PastRequests";
// import CreateNewRequest from "./CreateNewRequest";
import {Drawer} from "@mui/material";
// import ServiceRequestType from "./ServiceRequestType";
// import Transferownership from "./Transferownership";
// import CencelOrder from "./CencelOrder";
// import Buy from "./Buy";
// import Repair from "./Repair";
// import ChangeBillCycle from "./ChangeBillCycle";
// import SwapProduct from "./SwapProduct";
import ExtendTenure from "./ExtendTenure";

function ServiceRequets() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const openModal = () => {
    setOpenDrawer(true);
  };

  const closeModal = () => {
    setOpenDrawer(false);
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.detail_div}>
        <h1 className={styles.header}>My Service Requests</h1>
        <div className={styles.des_wrapper}>
          <p className={`  ${styles.desc}`}>
            Looking for help with your order or have a specific request? This is
            the place to get the help and support you need.
          </p>
          <button
            className={styles.createRequestBtn}
            onClick={() => setOpenDrawer(true)}>
            Create a new request
            <ForwardArrowWithLine />
          </button>
          {openDrawer && (
            <Drawer
              anchor={"right"}
              open={openModal}
              onClose={() => {
                closeModal();
                setOpenDrawer(false);
                // setStartCountdown(false);
              }}
              classes={{paper: styles.rightDrawer}}
              transitionDuration={{enter: 400, exit: 200}}>
              <div className="flex w-full gap-8">
                {/* <CreateNewRequest /> */}
                {/* <ServiceRequestType /> */}
                {/* <CencelOrder /> */}
                {/* <Buy heading="Buy"/> */}
                {/* <Repair /> */}
                {/* <ChangeBillCycle /> */}
                {/* <SwapProduct /> */}
                {/* <Transferownership /> */}
                <ExtendTenure />
                <div className={styles.close_icon} onClick={closeModal}>
                  <Close
                    color={"#45454A"}
                    size={24}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </Drawer>
          )}
        </div>
        <div>
          <PastRequests />
        </div>
      </div>
    </div>
  );
}

export default ServiceRequets;
