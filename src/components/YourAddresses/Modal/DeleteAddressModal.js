import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import axios from "axios";
// import {useSelector} from "react-redux";

import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

const DeleteAddressModal = ({
  isModalOpen,
  closeModal,
  productId,
  userId,
  updateArr,
  id,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);

  //   const dispatch = useDispatch();

  //   const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  //   const cityId = parseInt(getLocalStorage("cityId"));

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const handleDeleteItem = async (showToast = true) => {
    updateArr(productId);
    try {
      await axios.get(baseURL + endPoints.addToCart.deleteItem(id, userId));
      closeModal();
      showToast && showToastNotification("Item deleted from the cart", 3);
    } catch (error) {
      console.log(error);
    }
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
              onClick={closeModal}>
              Cancel
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
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={closeModal}>
              Cancel
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

export default DeleteAddressModal;
