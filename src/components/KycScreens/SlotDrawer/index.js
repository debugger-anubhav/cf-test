import React, {useEffect, useState} from "react";
import styles from "../../MyOrders/orders/partTwo/ManageScheduleDrawer/styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";

import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {format} from "date-fns";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const SlotDrawer = ({isModalOpen, closeModal, orderId}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [slotData, setSlotdata] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [currentDate, setCurrentDate] = useState();

  const userId = decrypt(getLocalStorage("_ga"));
  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };
  React.useEffect(() => {
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
        res?.data?.data?.tmpDateMatch &&
          setCurrentDate(
            format(new Date(res?.data?.data?.tmpDateMatch), "do MMM, yyyy"),
          );
      });
  };

  const updateSlot = async () => {
    const body = {
      slot: `${selectedDate} 09:00:00`,
      orderId,
      zohoCaseId: slotData?.zohoCaseId,
    };
    try {
      await baseInstance.post(endPoints.myOrdersPage.updateSlot, body);
      closeModal();
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  useEffect(() => {
    getDeliverySlots();
  }, []);

  const ModalContent = () => (
    <>
      <h1 className={styles.modal_head}>Manage delivery slot</h1>
      <div className={styles.desc_wrapper}>
        <p className={styles.desc}>Current scheduled date 🚚: {currentDate}</p>
      </div>

      <div className={styles.prefferd_wrapper}>
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
          disabled={!selectedDate}
          onClick={() => updateSlot()}
          className={`${!selectedDate && "!bg-[#FFDF85]"} ${
            styles.modify_btn
          }`}>
          Modify
        </button>
      </div>
    </>
  );

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 200, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <ModalContent />
        </Drawer>
      ) : (
        <Modal
          styles={{}}
          open={isModalOpen}
          onClose={closeModal}
          // center={true}
          classNames={{
            modal: styles.customModal,
            overlay: styles.customOverlay,
            closeButton: styles.customCloseButton,
          }}>
          <ModalContent />
        </Modal>
      )}
    </div>
  );
};

export default SlotDrawer;
