import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {emptyCart, selectedCityId, selectedCityName} from "@/store/Slices";
import {useDispatch} from "react-redux";
import {setLocalStorage} from "@/constants/constant";
import {useParams, useRouter} from "next/navigation";

const EmptyCartModal = ({isModalOpen, closeModal, userId, city}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
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

  const handleCityChange = () => {
    dispatch(selectedCityId(city?.id));
    dispatch(selectedCityName(city?.list_value));

    if (typeof window !== "undefined") {
      setLocalStorage("cityId", city?.id);
    }
    const newUrl = window?.location.pathname.split("/");
    newUrl[1] = city.list_value.replace(/\//g, "-")?.toLowerCase();
    const p = newUrl.join("/");
    params.city ? router.push(p) : window?.location.reload();
  };

  const handleEmptyCart = async () => {
    try {
      await baseInstance.get(endPoints.cityMaxPage.deleteCartItems(userId));
      dispatch(emptyCart());
      handleCityChange();
    } catch (err) {
      console.log(err?.message || "some error");
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
          <h1 className={styles.head}>Empty cart? </h1>
          <p className={styles.desc}>
            Your cart will be emptied if you change your city. Do you want to
            proceed?
          </p>
          <div className={styles.btn_wrapper}>
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={closeModal}>
              Cancel
            </button>
            <div>
              <button
                className={`${styles.yellow_btn} ${styles.btn}`}
                onClick={handleEmptyCart}>
                Yes, Proceed
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
          <h1 className={styles.head}>Empty cart? </h1>
          <p className={styles.desc}>
            Your cart will be emptied if you change your city. Do you want to
            proceed?
          </p>
          <div className={styles.btn_wrapper}>
            <button
              className={`${styles.white_btn} ${styles.btn}`}
              onClick={closeModal}>
              Cancel
            </button>
            <div>
              <button
                className={`${styles.yellow_btn} ${styles.btn}`}
                onClick={handleEmptyCart}>
                Yes, Proceed
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmptyCartModal;
