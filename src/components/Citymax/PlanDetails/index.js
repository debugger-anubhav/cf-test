import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import {useParams, useRouter} from "next/navigation";
import {
  BackIcon,
  // CheckedBox,
  Close,
  ForwardArrowWithLine,
  IconLink,
  Lock,
  Rupee,
  Sparkles,
  // UncheckedBox,
} from "../../../assets/icon";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import CitymaxDetailPageDrawer from "./CitymaxDetailPageDrawer/index";
import {endPoints} from "@/network/endPoints";
import "react-responsive-modal/styles.css";
import ProceedModal from "./Modals/ProceedModal";
import {useDispatch, useSelector} from "react-redux";
import {
  addItemsToCart,
  reduxSetModalState,
  setIsHalfYearlyState,
} from "@/store/Slices";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import LoginModal from "@/components/LoginPopups";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {baseInstance} from "@/network/axios";

const CitymaxPlanDetail = () => {
  const {checkAuthentication} = useAuthentication();
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartPageData.cartItems);
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  const [isHalfYearly, setHalfYearly] = useState(params.tenure === "6");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [roomId, setRoomId] = useState();
  const [slotId, setSlotId] = useState();
  const [drawerType, setDrawerType] = useState();
  const [data, setData] = useState();
  const [planDetailsArray, setPlanDetailsArray] = useState();
  const [headType, setHeadType] = useState(1);
  const [swapProductDetails, setSwapProductDetails] = useState({
    img: "",
    name: "",
  });
  const [
    isCheckedMap,
    //  setIsCheckedMap
  ] = useState({});

  const [totalSlots, setTotalSlots] = useState(0);
  // const [totalFilledSlots, setTotalFilledSlots] = useState(0);
  const [modalCategory, setModalCategory] = useState(1);
  const [selectedItemsArr, setSelectedItemsArr] = useState();
  const [additionalChargeItems, setAdditionalChargeItems] = useState();
  const [totalAdditionalAmount, setTotalAdditionalAmount] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hoveredItem, setHoveredItem] = useState({rowIndex: -1, itemIndex: -1});
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = isLogin ? userId : tempUserId;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseMove = e => {
    if (!isDragging) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 3;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const validateAuth = async () => {
    const isValid = await checkAuthentication();
    if (isValid === true) {
      setIsLogin(true);
    } else setIsLogin(false);
  };

  useEffect(() => {
    validateAuth();
  }, []);

  const toggleDrawer = type => {
    setDrawerType(type);
    setOpenDrawer(!openDrawer);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
    dispatch(reduxSetModalState(!modalStateFromRedux));
  };

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const isItemInCart = cartItems?.some(item => {
    return item?.fc_product?.id === parseInt(params.planId);
  });

  const getRoomData = () => {
    baseInstance
      .get(
        endPoints.cityMaxPage.getRoomData(
          params.planId,
          params.tenure,
          userId || userIdToUse,
        ),
      )
      .then(res => {
        setData(res?.data?.data);
        setPlanDetailsArray(
          res?.data?.data?.associatedProductsData?.[0]
            ?.fc_frp_room_associations,
        );
        let slots = 0;
        res?.data?.data?.associatedProductsData?.[0]?.fc_frp_room_associations?.forEach(
          item => {
            const slotsLength =
              item?.fc_frp_room?.fc_frp_slot_associations.length;
            slots = slots + slotsLength;
          },
        );
        setTotalSlots(slots);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const handleSelectItem = (item, slot, headType) => {
    setRoomId(item?.fc_frp_room?.id);
    setSlotId(slot.slot_id);
    setHeadType(headType);
    setSwapProductDetails({
      img: slot.selectedProduct || "",
      name: slot.selectedProdName || "",
    });
    toggleDrawer(1);
  };

  const handleAddItem = (imgurl, productName, productId, additionalAmount) => {
    const index = planDetailsArray.findIndex(t => t.fc_frp_room.id === roomId);
    const indexOfCategory = planDetailsArray[
      index
    ].fc_frp_room?.fc_frp_slot_associations?.findIndex(
      c => c.slot_id === slotId,
    );

    const newArr = [...planDetailsArray];
    if (newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory]) {
      newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory] = {
        ...newArr[index].fc_frp_room.fc_frp_slot_associations[indexOfCategory],
        selectedProduct: imgurl,
        selectedProdName: productName,
        seletedProductId: productId,
        additionalAmount,
      };
    }

    setPlanDetailsArray(newArr);
    toggleDrawer();
  };

  const handleDeleteSelectedItem = (e, index, innerIndex) => {
    e.stopPropagation();
    const tempArray = {...planDetailsArray[index]};
    const updatedAssociations = {
      ...tempArray.fc_frp_room.fc_frp_slot_associations[innerIndex],
    };
    delete updatedAssociations.selectedProdName;
    delete updatedAssociations.selectedProduct;
    delete updatedAssociations.seletedProductId;
    delete updatedAssociations.additionalAmount;
    tempArray.fc_frp_room.fc_frp_slot_associations[innerIndex] =
      updatedAssociations;
    planDetailsArray[index] = {...tempArray};
    setPlanDetailsArray([...planDetailsArray]);
  };

  // CITYMAX SAME AS ABOV LOGIC (USEFUL FOR FUTURE)

  // const handleCheckRepeat = (item, index) => {
  //   setIsCheckedMap(prevIsCheckedMap => {
  //     const updatedIsCheckedMap = {...prevIsCheckedMap};
  //     updatedIsCheckedMap[item.fc_frp_room.id] =
  //       !prevIsCheckedMap[item.fc_frp_room.id];
  //     return updatedIsCheckedMap;
  //   });

  //   if (!isCheckedMap[item.room_id]) {
  //     const newArr = [...planDetailsArray];
  //     newArr[index].fc_frp_room.fc_frp_slot_associations = newArr[
  //       index - 1
  //     ].fc_frp_room.fc_frp_slot_associations?.map(item => item);
  //     setPlanDetailsArray(prev => [...newArr]);
  //   }
  // };

  // useEffect(() => {
  //   planDetailsArray?.forEach(item => {
  //     const selectedSlotsArray =
  //       item?.fc_frp_room?.fc_frp_slot_associations.filter(
  //         slot => "selectedProduct" in slot,
  //       );

  //     const countOfSelectedSlots = selectedSlotsArray?.length;

  //     setTotalFilledSlots(
  //       prevTotalFilledSlots => prevTotalFilledSlots + countOfSelectedSlots,
  //     );
  //   });
  // }, [planDetailsArray]);

  const generatePayload = (selectedItems, useAdditionalAmount) => {
    const payload = {};
    selectedItems.forEach(item => {
      const {planId, roomId, slotId, productId, additionalAmount} = item;

      if (!payload[planId]) {
        payload[planId] = {};
      }

      if (!payload[planId][roomId]) {
        payload[planId][roomId] = {};
      }

      if (!payload[planId][roomId][slotId]) {
        payload[planId][roomId][slotId] = useAdditionalAmount ? {} : [];
      }

      if (useAdditionalAmount) {
        payload[planId][roomId][slotId][productId] = [additionalAmount];
      } else {
        payload[planId][roomId][slotId][0] = productId;
      }
    });

    return payload;
  };

  const handleAddAssociatedProducts = async cartId => {
    const body = {
      selected_sub_products: generatePayload(selectedItemsArr),
      selected_sub_products_additonal_rent: generatePayload(
        additionalChargeItems,
        true,
      ),
      frp_product_cart_id: cartId,
      product_id: data?.productDetails[0]?.id,
      cateory_id: data?.productDetails[0]?.category_id.split(","),
      sell_id: data?.productDetails[0]?.sellerid,
      price: data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.price,
      product_shipping_cost: parseInt(data?.productDetails[0]?.shipping_cost),
      product_tax_cost: "",
      quant: {
        2: 1,
      },
      attr_name_id: 38585,
      attribute_values: data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.pid,
      user_id: userIdToUse,
    };
    baseInstance
      .post(endPoints.cityMaxPage.sentProductsToCart, body)
      .then(res => {
        openModal && toggleModal();
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const handleAddToCart = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      mqty: 1,
      userId: parseInt(userIdToUse),
      sellId: data?.productDetails[0]?.sellerid,
      price: data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.price,
      categoryId: data?.productDetails[0]?.category_id,
      productId: data?.productDetails[0]?.id,
      quantity: 1,
      attributeValue: data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.pid,
      selectedTenure: isHalfYearly ? 6 : 12,
      product_shipping_cost: parseInt(data?.productDetails[0]?.shipping_cost),
      product_tax_cost: 0,
    };
    baseInstance
      .post(endPoints.productPage.addToCart, body, headers)
      .then(res => {
        const apiData = res?.data?.data;
        if (
          res?.data?.data?.status === false &&
          res?.data?.data?.is_item_added === true
        ) {
          if (openModal) setModalCategory(2);
          else toggleModal();
        } else if (res?.data?.data?.status === true) {
          if (!isItemInCart) dispatch(addItemsToCart(apiData));
          handleAddAssociatedProducts(res?.data?.data?.fc_shopping_carts_id);
          showToastNotification("Added to cart", 1);
          router.push("/cart");
        } else showToastNotification("Something went wrong", 3);
      })
      .catch(() => {
        // console.log(err?.message || "some error");
      });
  };

  useEffect(() => {
    const newArr = [];
    const upgradeItemsArr = [];
    planDetailsArray?.forEach((item, i) => {
      item?.fc_frp_room?.fc_frp_slot_associations?.forEach((a, b) => {
        if (a.selectedProduct) {
          const payloadItem = {
            planId: params.planId,
            roomId: item.fc_frp_room.id,
            slotId: a.slot_id,
            productId: a.seletedProductId,
          };
          newArr.push(payloadItem);
        }
        if (a.additionalAmount) {
          const payloadItem = {
            planId: params.planId,
            roomId: item.fc_frp_room.id,
            slotId: a.slot_id,
            productId: a.seletedProductId,
            additionalAmount: parseInt(a.additionalAmount),
          };
          upgradeItemsArr.push(payloadItem);
        }
      });
    });
    setSelectedItemsArr(newArr);
    setAdditionalChargeItems(upgradeItemsArr);
    setTotalAdditionalAmount(
      upgradeItemsArr?.reduce(
        (accumulator, currentItem) =>
          accumulator + (currentItem.additionalAmount || 0),
        0,
      ),
    );
  }, [planDetailsArray]);

  const handleHover = (rowIndex, itemIndex, isHovered) => {
    setHoveredItem(
      isHovered ? {rowIndex, itemIndex} : {rowIndex: -1, itemIndex: -1},
    );
  };

  const ProceedButton = () => (
    <button
      className={styles.proceed_btn}
      onClick={() => {
        if (selectedItemsArr?.length < 1)
          showToastNotification("You haven`t selected any product", 2);
        else if (selectedItemsArr?.length === totalSlots) {
          handleAddToCart();
          setModalCategory(2);
        } else {
          setModalCategory(1);
          toggleModal();
        }
      }}>
      Proceed
      <ForwardArrowWithLine />
    </button>
  );

  return (
    <div className={styles.main}>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
      />
      <ProceedModal
        closeModal={toggleModal}
        isModalOpen={openModal}
        modalCategory={modalCategory}
        handleAddToCart={handleAddToCart}
        userIdToUse={userIdToUse}
      />
      <CitymaxDetailPageDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        handleAddItem={handleAddItem}
        type={drawerType}
        isHalfYearly={isHalfYearly}
        slotId={slotId}
        roomId={roomId}
        headType={headType}
        swapProductDetails={swapProductDetails}
        toggleLoginModal={toggleLoginModal}
      />

      <div
        className={styles.header_wrapper}
        onClick={() => router.push(`/citymax`)}>
        <BackIcon className={styles.back_icon} />
        <h1 className={styles.head}>
          {data?.associatedProductsData?.[0]?.product_name}
        </h1>
      </div>
      <p className={styles.tag_line}>
        {data?.productDetails?.[0]?.description}
      </p>

      <div className={styles.container}>
        <div className={styles.left_div}>
          <p className={`!text-71717A !mt-8 ${styles.tag_line}`}>
            Click on the placeholders below and choose your desired products.
          </p>

          <div className={styles.plans_wrapper}>
            {planDetailsArray?.map((item, index) => {
              const slotsLength =
                item?.fc_frp_room?.fc_frp_slot_associations.length;
              const selectedSlotsArray =
                item?.fc_frp_room?.fc_frp_slot_associations.filter(
                  slot => "selectedProduct" in slot,
                );
              const countOfSelectedSlots = selectedSlotsArray.length;

              return (
                <>
                  <div key={index}>
                    <div className={styles.type_wrapper}>
                      <p className={styles.type_txt}>
                        {item?.fc_frp_room?.room_name}
                      </p>
                      <p className={styles.selected_text}>
                        <span className="hidden xl:block">
                          {countOfSelectedSlots} out of {slotsLength} products
                          selected
                        </span>
                        <span className="xl:hidden">
                          {countOfSelectedSlots}/{slotsLength}
                        </span>
                      </p>
                    </div>

                    {/* CITYMAX SAME AS ABOV LOGIC (USEFUL FOR FUTURE) */}

                    {/* {(item?.fc_frp_room?.room_name === "Bedroom 1" ||
                      item?.fc_frp_room?.room_name === "Bedroom 2") && (
                      <div className="flex gap-1 mt-8 -mb-4 items-center">
                        {isCheckedMap[item.room_id] ? (
                          <div onClick={() => handleCheckRepeat(item)}>
                            <CheckedBox
                              color={"#5774AC"}
                              className={styles.checkbox}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              // setIsChecked(true);
                              handleCheckRepeat(item, index);
                            }}>
                            <UncheckedBox
                              color={"#5774AC"}
                              className={styles.checkbox}
                            />
                          </div>
                        )}
                        <p className={styles.same_above_txt}>
                          Same as above bedroom
                        </p>
                      </div>
                    )} */}

                    <div
                      className={`${styles.amen_wrapper}`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}>
                      {item?.fc_frp_room?.fc_frp_slot_associations?.map(
                        (t, i) => {
                          return (
                            <div key={i} className={`${styles.slot}`}>
                              {t.selectedProduct ? (
                                <div
                                  className={`w-full h-full ${
                                    !isCheckedMap[item.room_id]
                                      ? "cursor-pointer"
                                      : ""
                                  }`}
                                  onClick={e => {
                                    !isCheckedMap[item.room_id] &&
                                      handleSelectItem(item, t, 2);
                                  }}>
                                  <div
                                    className={`relative ${
                                      isCheckedMap[item.room_id]
                                        ? "opacity-80"
                                        : ""
                                    }`.trim()}>
                                    <img
                                      src={
                                        productImageBaseUrl + t.selectedProduct
                                      }
                                      className={styles.selected_slot_img}
                                      alt="product-image"
                                      loading="lazy"
                                    />
                                    <div
                                      onClick={e =>
                                        !isCheckedMap[item.room_id] &&
                                        handleDeleteSelectedItem(e, index, i)
                                      }>
                                      <Close className={styles.cross} />
                                    </div>
                                  </div>
                                  <div
                                    className={`${
                                      !isCheckedMap[item.room_id]
                                        ? "bg-[#E3E1DC]"
                                        : ""
                                    } ${styles.selected_box_lowerdiv}`.trim()}>
                                    <p
                                      className={`${
                                        isCheckedMap[item.room_id]
                                          ? "!text-71717A"
                                          : ""
                                      } ${styles.selected_slot_name}`.trim()}>
                                      {t.selectedProdName}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onMouseEnter={() => {
                                    !isSmallScreen &&
                                      handleHover(index, i, true);
                                  }}
                                  onMouseLeave={() => {
                                    !isSmallScreen &&
                                      handleHover(index, i, false);
                                  }}
                                  className={`
                                  ${
                                    !isCheckedMap[item.room_id]
                                      ? "hover:border-5774AC hover:bg-[#E0F0FF] cursor-pointer"
                                      : ""
                                  } 
                                  ${styles.amenity_box}`.trim()}
                                  onClick={() => {
                                    !isCheckedMap[item.room_id] &&
                                      handleSelectItem(item, t, 1);
                                  }}>
                                  <img
                                    src={
                                      hoveredItem.rowIndex === index &&
                                      hoveredItem.itemIndex === i
                                        ? IconLink +
                                          t.fc_frp_slot.slot_active_image
                                        : IconLink + t.fc_frp_slot.slot_image
                                    }
                                    className={styles.product_icon}
                                    alt={"product-image"}
                                    loading="lazy"
                                  />
                                  <p className={styles.product_name}>
                                    {" "}
                                    {t.fc_frp_slot.slot_name}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className={styles.right_div}>
          <div className={styles.monthly_toggler}>
            <p
              onClick={() => {
                setHalfYearly(true);
                dispatch(setIsHalfYearlyState(true));
              }}
              className={`${
                isHalfYearly
                  ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                  : "bg-transparent"
              } ${styles.pref_mode_text}`}>
              6 months
            </p>
            <p
              onClick={() => {
                setHalfYearly(false);
                dispatch(setIsHalfYearlyState(false));
              }}
              className={`${
                isHalfYearly
                  ? "bg-transparent"
                  : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
              } ${styles.pref_mode_text}`}>
              12 months
            </p>
          </div>
          <div
            onClick={() => toggleDrawer(2)}
            className={`hover:border-[2px] hover:p-[15px] hover:border-5774AC ${styles.plan_div} ${styles.right_div_content_wrapper}`}>
            <p className={styles.bold_text}>
              Current plan: {data?.associatedProductsData?.[0]?.product_name}
            </p>
            <p className={styles.change_txt}>change</p>
          </div>
          <div
            className={`!flex-col ${styles.price_div} ${styles.right_div_content_wrapper}`}>
            <div className={styles.price_div}>
              <Rupee className={styles.icon} />
              <div>
                <p className={styles.price_type}>Monthly Rent</p>
                <p className={styles.bold_text}>
                  <span className={styles.rupee}>₹</span>
                  {data?.PrdAttrArr?.[isHalfYearly ? "6" : "12"]?.price} /mo
                </p>
              </div>
            </div>
            <div className={styles.price_div}>
              <Sparkles className={styles.icon} />
              <div>
                <p className={styles.price_type}>Upgrades Rental Amount</p>
                <p className={styles.bold_text}>
                  <span className={styles.rupee}>₹</span>
                  {totalAdditionalAmount}/mo
                </p>
              </div>
            </div>
            <div className={styles.price_div}>
              <Lock className={styles.icon} />
              <div>
                <p className={styles.price_type}>Refundable Security Deposit</p>
                <p className={styles.bold_text}>
                  <span className={styles.rupee}>₹</span>0
                </p>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex">
            <ProceedButton />
          </div>
        </div>
      </div>

      <div className="flex mt-8 xl:hidden ">
        <ProceedButton />
      </div>
    </div>
  );
};

export default CitymaxPlanDetail;
