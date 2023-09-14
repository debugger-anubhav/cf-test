import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {
  getLocalStorage,
  getLocalStorageString,
  productImageBaseUrl,
} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {RiSparklingFill} from "react-icons/ri";
import {useQuery} from "@/hooks/useQuery";
import {useRouter} from "next/navigation";
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
}) => {
  const [hoverCard, setHoverCard] = React.useState(false);
  const [inWishList, setInWishList] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const [isDumy, setIsDumy] = React.useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
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
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );
  const userId = getLocalStorageString("user_id");

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    // dispatch(addRemoveWhishListitems(!inWishList));
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
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
            console.log(res?.data?.dat);
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
              })
              .catch(err => console.log(err));
            setInWishList(prev => !prev);
            console.log(res);
          })
          .catch(err => console.log(err));
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
      router.push(`/things/${productID}/${seourl}`);
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
    <a
      href={`/things/${productID}/${seourl}`}
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
            alt="thumbnail image"
            className={styles.img}
          />
          {soldOut && (
            <div className={styles.soldout_tag}>
              <RiSparklingFill size={16} color={"#ffffff"} />
              <p className={styles.tag_text}>SOLD OUT</p>
            </div>
          )}
        </div>

        {/* {soldOut && (
        <div className={styles.soldout_tag}>
          <p className={styles.tag_text}>SOLD OUT</p>
        </div>
      )} */}

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
        {categoryPageReduxData.isCombos && (
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
                      alt="image"
                      className={`${styles.included_image} ${
                        isDumy && "pointer-events-none"
                      } `}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </a>
  );
};

export default CategoryCard;
