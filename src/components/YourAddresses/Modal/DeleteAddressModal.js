import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {baseInstance} from "@/network/axios";

const DeleteAddressModal = ({
  isModalOpen,
  closeModal,
  id,
  getAllSavedAddresses,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const handleDelete = async () => {
    try {
      await baseInstance.delete(endPoints.yourAddressPage.deleteAddress(id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    closeModal();
    getAllSavedAddresses();
    showToastNotification("Address deleted", 1);
  };

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={closeModal}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <h1 className={styles.head}>Delete address? </h1>
          <div className={styles.btn_wrapper}>
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={closeModal}>
              Cancel
            </button>
            <div>
              <button
                className={`${styles.yellow_btn} ${styles.btn}`}
                onClick={handleDelete}>
                Yes, delete
              </button>
            </div>
          </div>
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
          <h1 className={styles.head}>Delete address? </h1>
          <div className={styles.btn_wrapper}>
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={closeModal}>
              Cancel
            </button>
            <button
              className={`${styles.yellow_btn} ${styles.btn}`}
              onClick={handleDelete}>
              Yes, delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteAddressModal;
