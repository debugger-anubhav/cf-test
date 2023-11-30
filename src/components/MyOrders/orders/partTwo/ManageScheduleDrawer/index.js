import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {format} from "date-fns";

const ManageSchedule = ({isModalOpen, closeModal, orderId}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [prefTime, setPrefTime] = useState(true);
  const [scheduleDates, setScheduleDates] = useState();
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

  // const scheduleDates = [
  //   {
  //     date: "12th",
  //     day: "Thu",
  //   },
  //   {
  //     date: "13th",
  //     day: "Fri",
  //   },
  //   {
  //     date: "14th",
  //     day: "Sat",
  //   },
  //   {
  //     date: "15th",
  //     day: "Sun",
  //   },
  //   {
  //     date: "16th",
  //     day: "Mon",
  //   },
  //   {
  //     date: "17th",
  //     day: "Tue",
  //   },
  // ];

  const getDeliverySlots = () => {
    const body = {
      deal_id: 994778442,
      zoho_case_id: 74375,
    };
    axios
      .post(baseURL + endPoints.myOrdersPage.getDeliverySlots, body)
      .then(res => {
        console.log(res, "yguywgy");
        setScheduleDates(res?.data?.data?.data?.data);
      });
  };

  useEffect(() => {
    getDeliverySlots();
  }, []);

  const handleDateClick = clickedDate => {
    // Check if the clicked date is already in the selectedDates array
    if (selectedDates.includes(clickedDate)) {
      // If it is, remove it from the array
      setSelectedDates(prevSelectedDates =>
        prevSelectedDates.filter(date => date !== clickedDate),
      );
    } else {
      // If it's not, add it to the array
      setSelectedDates(prevSelectedDates => [
        ...prevSelectedDates,
        clickedDate,
      ]);
    }
  };

  const ModalContent = () => (
    <>
      <h1 className={styles.modal_head}>Manage delivery slot</h1>
      <div className={styles.desc_wrapper}>
        <p className={styles.desc}>
          Current scheduled date: 13rd Oct, 2023 at 9:00 am
        </p>
        <p className={styles.desc}>
          Select to change slot as per your preference
        </p>
      </div>

      <div className={styles.prefferd_wrapper}>
        <p className={styles.desc}>Preferred date:</p>
        <div className={styles.map_wrapper}>
          {scheduleDates?.map((item, index) => (
            <div
              key={index}
              className={styles.map_item_wrapper}
              onClick={() => handleDateClick(item.date)}>
              <div className={styles.outer_circle}>
                <div
                  className={`${
                    selectedDates.includes(item.date) ? styles.inner_circle : ""
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
          <div
            className={styles.outer_circle}
            onClick={() => setPrefTime(!prefTime)}>
            <div className={`${prefTime ? styles.inner_circle : ""}`}></div>
          </div>
          <p className={styles.time}>9:00 am to 5:00 pm</p>
        </div>
      </div>

      <div className={styles.btn_wrapper}>
        <button className={styles.cancel_btn} onClick={closeModal}>
          Cancel
        </button>
        <button className={styles.modify_btn}>Modify</button>
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
          // transitionDuration={{enter: 200, exit: 200}}
        >
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
