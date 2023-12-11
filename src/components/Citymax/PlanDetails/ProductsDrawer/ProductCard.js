import React, {useState, useEffect, useRef} from "react";
import {Heart, Sparkles} from "@/assets/icon";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {Carousel} from "react-responsive-carousel";
import styles from "./styles.module.css";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {useQuery} from "@/hooks/useQuery";
import {decrypt} from "@/hooks/cryptoUtils";

const ProductCard = ({
  handleThumbnailClick,
  selectedIndexes,
  mainIndex,
  item,
  isSavedComp,
  productID = 4323,
  handleAddItem,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inWishList, setInWishList] = useState(isSavedComp || false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const updateCount = useRef(0);
  const userId = decrypt(getLocalStorage("_ga"));

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const wishlistApiBody = {
    userId: decrypt(getLocalStorage("_ga")),
    productId: productID,
  };

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    wishlistApiBody,
  );

  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    wishlistApiBody,
  );
  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${userId}`,
  );

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                showToastNotification("Item added to the wishlist", 1);
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));

            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                showToastNotification("Item removed from the wishlist", 2);
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));
            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err));
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
    updateCount.current += 1;
  }, []);
  return (
    <div>
      <div className={styles.product_details_wrapper} key={mainIndex}>
        <div>
          <div className={styles.carousel_wrapper}>
            <Carousel
              selectedItem={selectedIndexes[mainIndex]}
              showThumbs={false}
              showArrows={false}
              showStatus={false}
              onChange={handleThumbnailClick}
              renderIndicator={(onClickHandler, isSelected, index) => {
                return (
                  <li
                    className={styles.indicatorStyle}
                    style={{background: isSelected ? "#597492" : "#ffffff"}}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                  />
                );
              }}>
              {item?.image?.split(",")?.map((crouselImg, index) => (
                <>
                  {crouselImg && (
                    <div key={index} className={styles.product_image}>
                      <img
                        src={productImageBaseUrl + "thumb/" + crouselImg}
                        alt={item?.product_name}
                        className="w-full h-full"
                        loading="lazy"
                      />
                      {item.isAlt && (
                        <div className={styles.label_tag}>
                          <Sparkles className={styles.sparkel_icon} />
                          {/* <img /> */}
                          <p>Recommended</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ))}
            </Carousel>
          </div>

          <div className={styles.thumbnail_container}>
            {item?.image?.split(",")?.map((image, index) => (
              <>
                {image && (
                  <div
                    className={`${styles.thumbnail_img} ${
                      index === selectedIndexes[mainIndex]
                        ? "border-5774AC"
                        : "border-fff"
                    }`}
                    key={index}
                    onClick={() => handleThumbnailClick(mainIndex, index)}>
                    <img
                      src={`${productImageBaseUrl + "thumb/" + image}`}
                      alt={""}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

        <div className={styles.right_div}>
          <div className={styles.product_name_wrapper}>
            <p className={styles.product_name}>{item.product_name}</p>
            <div
              id={productID}
              onClick={e => {
                handleWhislistCard(e);
              }}>
              <Heart
                size={20}
                color={inWishList ? "#D96060" : "#C0C0C6"}
                className={"cursor-pointer"}
              />
            </div>
          </div>
          <div className={styles.prod_info_wrapper}>
            {[
              {label: "Brand", value: item.brand},
              {
                label: "Size",
                value: item.dimension,
              },
              {
                label: "Material",
                value: item.material,
              },
              {label: "Color", value: item.colour},
            ].map((info, infoIndex) => (
              <div className={styles.info_row} key={infoIndex}>
                <p className={styles.info_label}>{info.label}</p>
                <p className={styles.colon}>:</p>
                <p className={styles.info_details}>{info.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              handleAddItem(item.image?.split(",")[0], item.product_name)
            }
            className={styles.add_btn}>
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
