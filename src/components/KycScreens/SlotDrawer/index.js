import React, {useEffect, useState} from "react";
import styles from "../../MyOrders/orders/partTwo/ManageScheduleDrawer/styles.module.css";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";

import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {format} from "date-fns";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import LoaderComponent from "../../Common/Loader/LoaderComponent";

const SlotDrawer = ({
  isModalOpen,
  closeModal,
  orderId,
  getDashboardDetails,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [slotData, setSlotdata] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [loader, setLoader] = useState(false);
  const [formatedSelectedDate, setFormatedSelectedDate] = useState(null);

  const userId = decrypt(getLocalStorage("_ga"));
  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };
  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const getDeliverySlots = () => {
    const body = {
      deal_id: orderId,
      user_id: userId,
    };
    baseInstance
      .post(endPoints.myOrdersPage.getDeliverySlots, body)
      .then(res => {
        setSlotdata(res?.data?.data);
        setSelectedDate(res?.data?.data?.tmpDateMatch);
        res?.data?.data?.tmpDateMatch &&
          setCurrentDate(
            format(new Date(res?.data?.data?.tmpDateMatch), "do MMM, yyyy"),
          );
      });
  };

  const updateSlot = async () => {
    if (currentDate !== formatedSelectedDate) {
      setLoader(true);
      const body = {
        slot: `${selectedDate} 09:00:00`,
        orderId,
        zohoCaseId: slotData?.zohoCaseId,
      };
      try {
        await baseInstance.post(endPoints.myOrdersPage.updateSlot, body);
        closeModal();
        getDashboardDetails();
      } catch (err) {
        console.log(err?.message || "some error");
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const temp = format(new Date(selectedDate), "do MMM, yyyy");
      setFormatedSelectedDate(temp);
    }
  }, [selectedDate]);

  useEffect(() => {
    getDeliverySlots();
  }, []);

  const ModalContent = () => (
    <>
      <div className={styles.desc_wrapper}>
        <p className={styles.desc}>Current scheduled date 🚚: {currentDate}</p>
      </div>

      <div className={`${styles.prefferd_wrapper} mb-[120px] md:mb-0`}>
        <p className={styles.desc}>Change to:</p>
        <div className={styles.map_wrapper}>
          {slotData?.data?.data?.response?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col w-[72px] justify-start items-start p-2 border rounded-xl ${
                selectedDate === item.date
                  ? "border-[#597492]"
                  : "border-DDDDDF"
              }
              ${
                item.is_holiday
                  ? "cursor-not-allowed bg-[#FCFBFA]"
                  : "cursor-pointer"
              }
              `}
              onClick={() => {
                if (!item.is_holiday) {
                  setSelectedDate(item.date);
                }
              }}>
              <div
                className={`${styles.outer_circle} ${
                  item.is_holiday && "!border-DDDDDF !cursor-not-allowed"
                }`}>
                <div
                  className={`${
                    selectedDate === item.date ? styles.inner_circle : ""
                  }`}></div>
              </div>
              <p className={styles.date}>
                {format(new Date(item?.date), "do")}
              </p>
              <p className={styles.day}>{item.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btn_wrapper}>
        <button className={styles.cancel_btn} onClick={closeModal}>
          Cancel
        </button>
        <button
          disabled={!selectedDate || currentDate === formatedSelectedDate}
          onClick={() => updateSlot()}
          className={`${!selectedDate && "!bg-[#FFDF85]"} ${styles.modify_btn}
          ${
            currentDate === formatedSelectedDate &&
            "!bg-[#FFDF85] !cursor-not-allowed"
          }`}>
          Modify
        </button>
      </div>
    </>
  );

  return (
    <div>
      <Drawer
        anchor={isBottomShareDrawer ? "bottom" : "right"}
        open={isModalOpen}
        onClose={closeModal}>
        <div className={styles.drawer_content_wrapper}>
          <div className={`${styles.heading}`}>
            Manage delivery slot
            <span
              onClick={event => {
                event.stopPropagation();
                closeModal();
              }}>
              <Close size={25} className={"cursor-pointer relative z-20"} />
            </span>
          </div>
          <ModalContent />
          {loader && <LoaderComponent loading={loader} />}
        </div>
      </Drawer>
    </div>
  );
};

export default SlotDrawer;
