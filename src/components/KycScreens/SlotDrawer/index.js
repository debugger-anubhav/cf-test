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
import commonStyle from "../KycCommonDrawer/styles.module.css";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

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
        showToastNotification(
          "Your delivery slot has been updated successfully.",
          1,
        );
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
        <p className={styles.desc}>
          Current scheduled date 🚚:{" "}
          <span className="font-medium text-222">{currentDate}.</span>
        </p>
      </div>

      <div className={`${styles.prefferd_wrapper} mb-[120px] md:mb-0`}>
        <p className={styles.desc}>Change to:</p>
        <div className={styles.map_wrapper}>
          {slotData?.data?.data?.response?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col w-fit min-w-[72px] justify-start items-start p-4 border rounded-xl ${
                selectedDate === item.date
                  ? "border-[#597492]"
                  : "border-DDDDDF"
              }
              ${
                item.is_holiday && item?.slots?.[0]?.delivery_available
                  ? "cursor-not-allowed bg-[#FCFBFA]"
                  : "cursor-pointer"
              }
              `}
              onClick={() => {
                if (!item.is_holiday && item?.slots?.[0]?.delivery_available) {
                  setSelectedDate(item.date);
                }
              }}>
              <div
                className={`${styles.outer_circle} ${
                  item.is_holiday &&
                  item?.slots?.[0]?.delivery_available &&
                  "!border-DDDDDF !cursor-not-allowed"
                }`}>
                <div
                  className={`${
                    selectedDate === item.date ? styles.inner_circle : ""
                  }`}></div>
              </div>

              <p className={`${styles.day} !text-14`}>{item.day}</p>
              <p className={`${styles.date} !mt-1 whitespace-nowrap`}>
                {format(new Date(item?.date), "do MMM")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 mt-8">
        <button
          disabled={!selectedDate || currentDate === formatedSelectedDate}
          onClick={() => updateSlot()}
          className={`${!selectedDate && "!bg-[#FFDF85]"} ${styles.modify_btn}
          ${
            currentDate === formatedSelectedDate &&
            "!bg-[#FFDF85] !cursor-not-allowed"
          } !w-full`}>
          Schedule
        </button>

        <button className={`${styles.cancel_btn} !w-full`} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <div>
      <Drawer
        anchor={isBottomShareDrawer ? "bottom" : "right"}
        open={isModalOpen}
        onClose={closeModal}
        classes={{paper: commonStyle.rightDrawer}}
        transitionDuration={{enter: 400, exit: 200}}>
        {/* <div className="flex flex-col w-full">
            <div className={`${styles.heading} !flex-row`}>
              Manage delivery slot
            </div>
            <ModalContent />
            {loader && <LoaderComponent loading={loader} />}
          </div>
          <div className="flex w-fit ml-4">
            <span
              onClick={event => {
                event.stopPropagation();
                closeModal();
              }}>
              <Close size={25} className={"cursor-pointer relative z-20"} />
            </span>
          </div> */}
        <div className={commonStyle.common_drawer_wrapper}>
          <div className="w-full">
            <div className={commonStyle.mobile_close_icon}>
              <div
                onClick={event => {
                  event.stopPropagation();
                  closeModal();
                }}
                className="h-[24px]">
                <Close color={"#45454A"} size={24} className="cursor-pointer" />
              </div>
            </div>
            <div className={commonStyle.content_wrapper}>
              <div className={`${commonStyle.heading} items-baseline`}>
                Manage delivery slot
              </div>
              {loader && <LoaderComponent loading={loader} />}
              <ModalContent />
            </div>
          </div>
          <div className={`md:flex hidden `}>
            <div
              onClick={event => {
                event.stopPropagation();
                closeModal();
              }}
              className={commonStyle.web_close_icon_wrapper}>
              <Close color={"#45454A"} size={24} className="cursor-pointer " />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SlotDrawer;
