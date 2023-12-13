import {Drawer} from "@mui/material";
import React, {useState} from "react";
import styles from "./styles.module.css";
import {Close} from "@/assets/icon";
import Modal from "react-responsive-modal";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {deleteItems} from "@/store/Slices";
import {useDispatch} from "react-redux";
// import axios from "axios";
// import {baseURL} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";

const ProceedModal = ({
  isModalOpen,
  closeModal,
  // isSomeSlotsMissed,
  handleAddToCart,
  modalCategory,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const params = useParams();
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  console.log(modalCategory, "isSomeSlotsMissed");

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
    // setStartCountdown(false);
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  // const handleModalCategory = val => {
  //   setModalCategory(2);
  // };

  const handleEmptyCart = async () => {
    try {
      const response = await axios.get(
        baseURL + endPoints.cityMaxPage.deleteCartItems(userId),
      );
      console.log(response);
      dispatch(deleteItems(params.planId));
      // setArr(arr.filter(t => t.fc_product.id !== id));

      handleAddToCart();
    } catch (err) {
      console.log(err);
    }
  };

  const ModalContent = () => (
    <>
      {modalCategory === 1 ? (
        <div>
          <p className={styles.head}>Some slots are still empty</p>
          <p className={styles.desc}>Do you want to proceed?</p>
          <div className={styles.btn_wrapper_horizon}>
            <button onClick={closeModal} className={styles.white_btn}>
              Cancel
            </button>
            <button
              className={styles.yellow_btn}
              onClick={() => handleAddToCart()}>
              Yes, Proceed
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className={styles.head}>Remove existing order?</p>
          <p className={styles.desc}>
            Only one Citymax plan can be ordered at a time. Please remove rest
            of the products from the cart and place their order separately.
          </p>
          <div className={styles.btn_wrapper_vertical}>
            <button
              className={styles.yellow_btn}
              onClick={() => handleEmptyCart()}>
              Yes, remove it and add Citymax plan
            </button>
            <button
              className={styles.yellow_btn}
              onClick={() => router.push("./cart")}>
              Go to cart and place existing order
            </button>
            <button onClick={closeModal} className={styles.white_btn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isModalOpen}
          onClose={() => {
            closeModal();
          }}
          classes={{paper: styles.bottomDrawer}}
          transitionDuration={{enter: 400, exit: 200}}>
          <div className={styles.close_icon} onClick={closeModal}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <ModalContent />
        </Drawer>
      ) : (
        <Modal
          styles={{}}
          open={isModalOpen}
          onClose={() => {
            closeModal();
          }}
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

export default ProceedModal;
