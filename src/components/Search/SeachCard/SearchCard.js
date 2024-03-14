import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {RiSparklingFill} from "react-icons/ri";
import {useQuery} from "@/hooks/useQuery";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {reduxSetModalState, setLoginPopupState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import "react-responsive-modal/styles.css";

const SearchCard = ({
  cardImage,
  desc,
  currentPrice,
  originalPrice,
  discount,
  productID,
  soldOut,
  isLogin,
}) => {
  const {checkAuthentication} = useAuthentication();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const dispatch = useDispatch();
  const [inWishList, setInWishList] = React.useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    dispatch(setLoginPopupState(bool));
    setLoginModal(bool);
  };

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    // userId: getLocalStorage("user_id") ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId: productID,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      isLogin
        ? decrypt(getLocalStorage("_ga"))
        : decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );
  // const userId = getLocalStorage("user_id");

  const addToWishlist = () => {
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
                showToastNotification("Item added to the wishlist", 1);
              })
              .catch(err => console.log(err?.message || "some error"));
            setInWishList(prev => !prev);
          })
          .catch(err => console.log(err?.message || "some error"))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
                showToastNotification("Item removed from the wishlist", 2);
              })
              .catch(err => console.log(err?.message || "some error"));
            setInWishList(prev => !prev);
          })
          .catch(err => console.log(err?.message || "some error"));
  };

  const handleWhislistCard = async e => {
    e.stopPropagation();
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated === false) {
      toggleLoginModal(true);
    } else addToWishlist();
    // dispatch(addRemoveWhishListitems(!inWishList));
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
  }, []);

  return (
    <div className={`${styles.wrapper} `}>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        handleChangeRoute={() => {
          console.log("in handlechangerouteee");
          // call this if you want to show the red heart exactly after login
          // addToWishlist();
        }}
      />
      <div className="relative">
        <img
          src={cardImage}
          alt={desc.replace(/-/g, " ")}
          className={styles.img}
          loading="lazy"
        />
        {soldOut && (
          <div className={styles.soldout_tag}>
            <RiSparklingFill size={16} color={"#ffffff"} />
            <p className={styles.tag_text}>SOLD OUT</p>
          </div>
        )}
      </div>

      <div className={styles.desc_div}>
        <h3 className={styles.desc} style={{lineHeight: "normal"}}>
          {/* {desc} */}
          {desc.replace(/-/g, " ")}
        </h3>
        <Heart
          size={25}
          color={inWishList ? "#D96060" : "#C0C0C6"}
          onClick={e => {
            e.preventDefault();
            handleWhislistCard(e);
          }}
          className={"cursor-pointer"}
        />
      </div>
      <div className={styles.price_div}>
        <div className={styles.card_price_wrap}>
          <h3 className={`${styles.currentPrice} flex`}>
            <span className={styles.rupeeIcon}>₹</span>
            {`${currentPrice}/mo`}
          </h3>

          {currentPrice < originalPrice && (
            <h3 className={`${styles.originalPrice} flex`}>
              <span className={styles.rupeeIcon}>₹</span>
              {`${originalPrice}/mo`}
            </h3>
          )}
        </div>
        {currentPrice < originalPrice && parseInt(discount) > 0 && (
          <div className={styles.discount}>{`-${discount} OFF`}</div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
