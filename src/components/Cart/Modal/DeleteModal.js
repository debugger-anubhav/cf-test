import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import axios from "axios";

const DeleteModal = ({
  isModalOpen,
  closeModal,
  productId,
  userId,
  updateArr,
  id,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);

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

  const handleDeleteItem = () => {
    console.log("ijdnjwej");
    updateArr(productId);
    axios
      .get(baseURL + endPoints.addToCart.deleteItem(id, userId))
      .then(res => console.log(res, "res in delete items"))
      .catch(err => console.log(err, "error"));

    closeModal();
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
          <h1 className={styles.head}>Delete item? </h1>
          <div className={styles.btn_wrapper}>
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={() => console.log("")}>
              Save to favorites
            </button>
            <div>
              <button
                className={`${styles.yellow_btn} ${styles.btn}`}
                onClick={handleDeleteItem}>
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
          <h1 className={styles.head}>Delete item? </h1>
          <div className={styles.btn_wrapper}>
            <button className={`${styles.white_btn} ${styles.btn}`}>
              Save to favorites
            </button>
            <button
              className={`${styles.yellow_btn} ${styles.btn}`}
              onClick={handleDeleteItem}>
              Yes, delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteModal;
