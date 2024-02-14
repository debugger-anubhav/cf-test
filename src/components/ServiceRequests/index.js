import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {Close, ForwardArrowWithLine} from "@/assets/icon";
import PastRequests from "./PastRequests";
import {Drawer} from "@mui/material";
import CreateNewRequest from "./CreateNewRequest";

import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";
import PastRequestAccordian from "./PastRequestAccordian";

function ServiceRequets() {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const openDrawerValue = useSelector(
    state => state.homePagedata.serviceRequestDrawer,
  );
  const [openDrawer, setOpenDrawer] = useState(openDrawerValue);
  const [pastRequestData, setPastRequestData] = useState(null);
  const [createRequestData, setCreateRequestData] = useState(null);
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const openModal = () => {
    setOpenDrawer(true);
  };

  const closeModal = () => {
    setOpenDrawer(false);
  };

  const getServiceRequestData = () => {
    baseInstance
      .get(endPoints.serviceRequestPage.getServiceRequestData(userIdToUse))
      .then(res => {
        setPastRequestData(res?.data?.data?.serviceRequestData);
        setCreateRequestData(res?.data?.data?.paymentData);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingSkeleton(false);
      });
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
    if (!openDrawerValue) {
      getServiceRequestData();
    }
  }, [openDrawerValue]);

  useEffect(() => {
    if (openDrawerValue === false) {
      setOpenDrawer(false);
    }
  }, [openDrawerValue]);

  useEffect(() => {
    dispatch(setServiceRequestDrawer(openDrawer));
  }, [openDrawer]);

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar} style={{height: "initial"}}>
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
        <div className={styles.web}>
          <PastRequests
            pastRequestData={pastRequestData}
            loadingSkeleton={loadingSkeleton}
          />
        </div>
        <div>
          {pastRequestData?.length > 0 ? (
            <div className={styles.mobile}>
              <PastRequestAccordian pastRequestData={pastRequestData} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ServiceRequets;
