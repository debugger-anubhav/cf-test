import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {Close, ForwardArrowWithLine} from "@/assets/icon";
import PastRequests from "./PastRequests";
import {Drawer} from "@mui/material";
import CreateNewRequest from "./CreateNewRequest";
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

function ServiceRequets() {
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [pastRequestData, setPastRequestData] = useState(null);
  const [createRequestData, setCreateRequestData] = useState(null);
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const openModal = () => {
    setOpenDrawer(true);
  };

  const closeModal = () => {
    setOpenDrawer(false);
  };

  const getServiceRequestData = () => {
    axios
      .get(
        baseURL +
          endPoints.serviceRequestPage.getServiceRequestData(userIdToUse),
      )
      .then(res => {
        setPastRequestData(res?.data?.data?.serviceRequestData);
        setCreateRequestData(res?.data?.data?.paymentData);
      })
      .catch(err => console.log(err));
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

  useEffect(() => {
    getServiceRequestData();
  }, []);

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
              anchor={isBottomDrawer ? "bottom" : "right"}
              open={openModal}
              onClose={() => {
                closeModal();
                setOpenDrawer(false);
                // setStartCountdown(false);
              }}
              classes={{paper: styles.rightDrawer}}
              transitionDuration={{enter: 400, exit: 200}}>
              <div className="flex w-full md:gap-8">
                <CreateNewRequest
                  createRequestData={createRequestData}
                  setOpenDrawer={setOpenDrawer}
                />
                <div className={`md:flex hidden`} onClick={closeModal}>
                  <Close
                    color={"#45454A"}
                    size={24}
                    className="cursor-pointer"
                  />
                </div>
                <div className={styles.mobile_close_icon} onClick={closeModal}>
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
        {pastRequestData?.length > 0 ? (
          <div>
            <PastRequests pastRequestData={pastRequestData} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ServiceRequets;
