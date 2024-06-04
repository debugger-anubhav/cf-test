import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";

import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {format, parse} from "date-fns";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const ManageSchedule = ({isModalOpen, closeModal, orderId}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [slotData, setSlotdata] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [scheduledTime, setScheduledTime] = useState();

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
        const inputTime = res?.data?.data?.time;
        if (inputTime) {
          const parsedTime = parse(inputTime, "h:mm:ss a", new Date());
          setScheduledTime(format(parsedTime, "h:mm a"));
        }

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
        <p className={styles.desc}>
          Current scheduled date: {currentDate} at {scheduledTime}
        </p>
        <p className={styles.desc}>
          Select to change slot as per your preference
        </p>
      </div>

      <div className={styles.prefferd_wrapper}>
        <p className={styles.desc}>Preferred date:</p>
        <div className={styles.map_wrapper}>
          {slotData?.data?.data?.response?.map((item, index) => (
            <div
              key={index}
              className={styles.map_item_wrapper}
              onClick={() => {
                setSelectedDate(item.date);
              }}>
              <div className={styles.outer_circle}>
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

      <div className={styles.prefferd_wrapper}>
        <p className={styles.desc}>Preferred time:</p>
        <div className={styles.pref_time_wrapper}>
          <div className={styles.outer_circle}>
            <div className={styles.inner_circle}></div>
          </div>
          <p className={styles.time}>9:00 am to 5:00 pm</p>
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

export default ManageSchedule;
