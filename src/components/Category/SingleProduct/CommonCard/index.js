import React, {useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {RiSparklingFill} from "react-icons/ri";
import {useQuery} from "@/hooks/useQuery";
import {useRouter} from "next/navigation";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {reduxSetModalState, setLoginPopupState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
const CategoryCard = ({
  hoverCardImage,
  cardImage,
  desc,
  currentPrice,
  originalPrice,
  discount,
  productID,
  soldOut,
  seourl,
  subProduct,
  label,
}) => {
  const {checkAuthentication} = useAuthentication();
  const [hoverCard, setHoverCard] = React.useState(false);
  const [inWishList, setInWishList] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const [isDumy, setIsDumy] = React.useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  useEffect(() => {
    dispatch(reduxSetModalState(loginModal));
    dispatch(setLoginPopupState(loginModal));
  }, [loginModal]);

  const toggleLoginModal = bool => {
    setLoginModal(bool);
  };

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
      // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      decrypt(getLocalStorage("_ga")) ??
      decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );

  // const userId = decrypt(getLocalStorage("_ga"));

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
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
          })
          .catch(err => console.log(err))
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
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
          })
          .catch(err => console.log(err));
  };

  const handleWhislistCard = async e => {
    e.stopPropagation();
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated === false) {
      toggleLoginModal(true);
    } else addToWishlist();
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
  }, []);
  const handleProductClick = (e, productID, seourl) => {
    if (!e.target.classList.contains(styles.child)) {
      !reduxStateOfLoginPopup && router.push(`/things/${productID}/${seourl}`);
    }
  };
  const sliderRef = useRef(null);
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  return (
    <>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        handleChangeRoute={() => {
          // call this if you want to show the red heart exactly after login
          // addToWishlist();
        }}
      />
      <a
        href={!reduxStateOfLoginPopup && `/things/${productID}/${seourl}`}
        onClick={e => {
          e.preventDefault();
        }}>
        <div
          className={`${styles.card_wrapper} `}
          onMouseOver={() => {
            setHoverCard(true);
          }}
          onMouseOut={() => setHoverCard(false)}
          onClick={e => handleProductClick(e, productID, seourl)}>
          <div className="relative">
            <img
              src={hoverCard ? hoverCardImage : cardImage}
              alt={desc.replace(/-/g, " ")}
              className={styles.img}
              loading="lazy"
            />
            {soldOut ? (
              <div className={`${styles.soldout_div} ${styles.label_tag}`}>
                <RiSparklingFill size={16} color={"#ffffff"} />
                <p className={styles.tag_text}>SOLD OUT</p>
              </div>
            ) : label === "Trending" ? (
              <div className={`${styles.trending_div} ${styles.label_tag}`}>
                <RiSparklingFill size={16} color={"#ffffff"} />
                <p className={styles.tag_text}>POPULAR</p>
              </div>
            ) : label === "New Launch" ? (
              <div className={`${styles.newlylaunch_div} ${styles.label_tag}`}>
                <RiSparklingFill size={16} color={"#ffffff"} />
                <p className={styles.tag_text}>NEW LAUNCH</p>
              </div>
            ) : (
              <div className="hidden"></div>
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
              // onClick={e => {
              //   e.preventDefault();
              //   setInWishList(!inWishList);
              // }}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleWhislistCard(e);
              }}
              className={"cursor-pointer"}
            />
          </div>
          <div className={styles.price_div}>
            <div className={styles.card_price_wrap}>
              <h3 className={`${styles.currentPrice} flex`}>
                <span className={styles.rupeeIcon}>₹</span>
                {`${currentPrice} /mo`}
              </h3>

              {currentPrice < originalPrice && (
                <h3 className={`${styles.originalPrice} flex`}>
                  <span className={styles.rupeeIcon}>₹</span>
                  {`${originalPrice} /mo`}
                </h3>
              )}
            </div>
            {/* {originalPrice !== currentPrice && ( */}
            {currentPrice < originalPrice && parseInt(discount) > 0 && (
              <div className={styles.discount}>{`-${discount} OFF`}</div>
            )}
          </div>
          {categoryPageReduxData?.isCombos && (
            <>
              <div className={styles.combos_wrapper}>
                <p
                  className={`${styles.items_included} ${
                    subProduct?.length === 0 && styles.no_included
                  }`}>
                  {subProduct?.length} items included
                </p>
                <div className={styles.combos_images} ref={sliderRef}>
                  {subProduct?.length === 0 && (
                    <p className={styles.no_included_image}></p>
                  )}
                  {subProduct?.map((item, index) => {
                    return (
                      <img
                        key={index.toString()}
                        src={`${productImageBaseUrl}${
                          item?.image?.split(",")[0]
                        }`}
                        alt="Product Image"
                        className={`${styles.included_image} ${
                          isDumy && "pointer-events-none"
                        } `}
                        loading="lazy"
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </a>
    </>
  );
};

export default CategoryCard;
