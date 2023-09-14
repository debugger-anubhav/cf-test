import React, {useState} from "react";
import styles from "./styles.module.css";
import Modal from "react-responsive-modal";
import {Close} from "@/assets/icon";
import {Drawer} from "@mui/material";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useMutation} from "@/hooks/useMutation";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {getLocalStorage} from "@/constants/constant";

const DeleteModal = ({
  isModalOpen,
  closeModal,
  productId,
  userId,
  updateArr,
  id,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const [inWishList, setInWishList] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleDeleteItem = async () => {
    updateArr(productId);
    try {
      await axios.get(baseURL + endPoints.addToCart.deleteItem(id, userId));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );
  const data = {
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",

    // userId: JSON.parse(localStorage.getItem("user_id")),
    // userId: JSON.parse(localStorage.getItem("user_id")),
    productId,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!getLocalStorage("user_id")) {
      router.push("https://test.rentofurniture.com/user_sign_up");
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
            })
            .catch(err => console.log(err));
          setInWishList(prev => !prev);
        })
        .catch(err => console.log(err));

    handleDeleteItem();
  };

  // const handleAddToWishlist = async () => {
  //   updateArr(productId);
  //   try {
  //     const headers = {
  //       userId,
  //       productId,
  //     };
  //     await axios.post(baseURL + endPoints.addWishListProduct, headers);
  //     handleDeleteItem();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              onClick={e => {
                try {
                  handleWhislistCard(e);
                  // handleDeleteItem();
                } catch (error) {
                  console.error(error);
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
          // center={true}
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
                  console.error(error);
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
