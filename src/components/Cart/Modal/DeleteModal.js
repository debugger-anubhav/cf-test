import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {useDispatch, useSelector} from "react-redux";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useMutation} from "@/hooks/useMutation";

import {useQuery} from "@/hooks/useQuery";
import {getLocalStorage} from "@/constants/constant";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

import {reduxSetModalState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import {useAuthentication} from "@/hooks/checkAuthentication";

const DeleteModal = ({
  isModalOpen,
  closeModal,
  productId,
  userId,
  updateArr,
  id,
  setIsLogin,
  isLogin,
}) => {
  const {checkAuthentication} = useAuthentication();
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [inWishList, setInWishList] = React.useState(false);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  React.useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productId),
    );
  }, []);

  const cityId = parseInt(getLocalStorage("cityId"));

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const handleDeleteItem = async (showToast = true) => {
    updateArr(productId);
    try {
      await baseInstance.get(endPoints.addToCart.deleteItem(id, userId));
      closeModal();
      showToast && showToastNotification("Item deleted from the cart", 3);
    } catch (error) {
      console.log(error?.message || "some error");
    }
  };
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      isLogin
        ? decrypt(getLocalStorage("_ga"))
        : decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );
  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const handleWhislistCard = async e => {
    e.stopPropagation();
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
      closeModal();
      toggleLoginModal(true);
      return;
    }
    !inWishList &&
      addwhislistProduct()
        .then(res => {
          getSavedItems()
            .then(res => {
              dispatch(addSaveditems(res?.data?.data));
              const ids = res?.data?.data.map(item => {
                return item?.id;
              });
              dispatch(addSaveditemID(ids));
              showToastNotification("Item added to the wishlist", 1);
              window?.fbq("track", "AddToWishlist");
            })
            .catch(err => console.log(err?.message || "some error"));
          setInWishList(prev => !prev);
        })
        .catch(err => console.log(err?.message || "some error"));

    handleDeleteItem(false);
  };

  return (
    <div>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        setIsLogin={setIsLogin}
        isCheckoutPage
      />
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
              onClick={e => {
                try {
                  handleWhislistCard(e);
                  // handleDeleteItem();
                } catch (error) {
                  console.log(error?.message);
                }
              }}>
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
          classNames={{
            modal: styles.customModal,
            overlay: styles.customOverlay,
            closeButton: styles.customCloseButton,
          }}>
          <h1 className={styles.head}>Delete item? </h1>
          <div className={styles.btn_wrapper}>
            <button
              onClick={e => {
                try {
                  handleWhislistCard(e);
                  // handleDeleteItem();
                } catch (error) {
                  console.log(error?.message);
                }
              }}
              className={`${styles.white_btn} ${styles.btn}`}>
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
