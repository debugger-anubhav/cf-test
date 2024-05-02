"use client";
import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {
  categoryIconsUrl,
  getLocalStorage,
  productImageBaseUrl,
  setLocalStorage,
} from "@/constants/constant";
import {
  ArrowForw,
  CheckedBox,
  DeleteIcon,
  DropDownArrow,
  DropUpArrow,
  IconLink,
  RightIcon,
  ToggleOff,
  ToggleOn,
  UncheckedBox,
  VerifyIcon,
} from "@/assets/icon";
import CityShieldDrawerForCart from "../Drawer/CityShieldDrawer";
import CouponDrawer from "../Drawer/CouponDrawer";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import DeleteModal from "../Modal/DeleteModal";
import "react-responsive-modal/styles.css";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteItems,
  getBillDetails,
  getCartItems,
  getCouponCodeUsed,
  reduxSetModalState,
  setCityShield,
  setCoinsApplied,
  setIsOfflineCustomer,
  setShoppingCartTab,
  setShowCartItem,
} from "@/store/Slices";

import EmptyCartPage from "../EmptyCartPage";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {useRouter} from "next/navigation";
import LoginModal from "@/components/LoginPopups/index";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import Image from "next/image";
import {RiSparklingFill} from "react-icons/ri";

const ShoppingCartSection = () => {
  const {checkAuthentication} = useAuthentication();

  const dispatch = useDispatch();
  const router = useRouter();
  const data = useSelector(state => state.cartPageData);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  const cartItems = data.cartItems;
  const showData = data.showCartItems;
  const modeOfPayment = getLocalStorage("isMonthly");

  const [billBreakup, setBillBreakup] = useState(data.billBreakout);
  const [arr, setArr] = useState(cartItems);
  const [userDetails, setUserDetails] = useState();
  const [isChecked, setIsChecked] = useState(data.isCityShield);
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(
    data.couponCodeUsed !== "",
  );
  const [isCoinApplied, setIsCoinApplied] = useState(data.isCoinApplied);
  const [availCoin, setAvailCoin] = useState(0);
  const [isMonthly, setIsMonthly] = useState(
    modeOfPayment === null ? true : modeOfPayment,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [code, setCode] = useState(data.couponCodeUsed);
  const [productId, setProductId] = useState();
  const [itemId, setItemId] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [isSetupProfile, setIsSetupProfile] = useState(false);
  const [showMonthlyToggle, setShowMonthlyToggle] = useState(false);
  const [isDeletedProduct, setIsDeletedProduct] = useState(false);
  const [quantityButton, setQuantityButton] = useState("enable");
  const [minamountf, setMinamountf] = useState(0);

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  useEffect(() => {
    setIsLogin(homePageReduxData.isLogin);
  }, [homePageReduxData.isLogin]);
  useEffect(() => {
    setArr(cartItems);
    if (cartItems[0]?.is_frp === 1) {
      setLocalStorage("isMonthly", false);
    }
  }, [cartItems]);

  useEffect(() => {
    if (modeOfPayment) {
      setIsMonthly(true);
    } else {
      setIsMonthly(false);
    }
  }, [modeOfPayment]);

  const fetchCartItems = isValid => {
    const id = isValid ? userId : tempUserId;
    baseInstance
      .get(endPoints.addToCart.fetchCartItems(cityId, id))
      .then(res => {
        dispatch(getCartItems(res?.data?.data));
        dispatch(setShowCartItem(true));
        const eventItems = [];
        res?.data?.data?.forEach((product, index) => {
          const item = {
            id: product.id,
            name: product.fc_product?.product_name,
            brand: "Cityfurnish",
            list_position: index + 1,
            quantity: product.quantity,
            price: product.price,
          };
          eventItems.push(item);
        });
        window?.gtag("event", "begin_checkout", {
          items: eventItems,
        });
        window?.fbq("track", "InitiateCheckout");
      })
      .catch(err => {
        console.log(err?.message || "some error");
        dispatch(setShowCartItem(true));
      });
  };

  const count = cartItems.length;
  const cityId = getLocalStorage("cityId");

  const totalAmount = arr.reduce((accumulator, item) => {
    return (
      accumulator +
      parseInt(item?.price) * item?.quantity +
      (parseInt(item.additional_rent) || 0) * item?.quantity
    );
  }, 0);

  const cityShieldOriginalAmount = (totalAmount * 10) / 100;
  const cityShieldDiscountAmount = (totalAmount * 6) / 100;

  const cityShieldDiscountPercentage =
    cityShieldOriginalAmount > 0
      ? Math.round(
          ((cityShieldOriginalAmount - cityShieldDiscountAmount) * 100) /
            cityShieldOriginalAmount,
        ).toFixed(0)
      : 0;

  const monthlyModeFeatures = [
    "Get additional discount upto 10%",
    "Pay as you go",
    "Mandatory Security Deposit",
  ];
  const upfrontModeFeatures = [
    "Get additional discount upto 15%",
    "Faster KYC",
    "No Security Deposit",
  ];

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
  };

  const fetchMonthlyCities = () => {
    baseInstance
      .get(endPoints.addToCart.fetchMonthlyCities)
      .then(res => {
        const isMonthlyCity = res?.data?.data.includes(cityId.toString());

        setShowMonthlyToggle(isMonthlyCity);
        if (isMonthlyCity === false) setLocalStorage("isMonthly", false);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const fetchAvailCoins = () => {
    const isAuthenticated = checkAuthentication();
    setIsLogin(isAuthenticated);
    const id = isAuthenticated ? userId : tempUserId;
    baseInstance
      .get(endPoints.addToCart.fetchCoins(id))
      .then(res => {
        if (res?.data?.data?.length > 0)
          setAvailCoin(parseInt(res?.data?.data?.[0]?.topup_amount));
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    fetchMonthlyCities();
    fetchAvailCoins();
  }, []);

  const toggleDrawerCityShield = () => {
    setCityShieldDrawerOpen(!cityShieldDrawerOpen);
  };

  const toggleDrawerCoupon = () => {
    setCouponDrawerOpen(!couponDrawerOpen);
  };

  const toggleDrawerBreakup = () => {
    setBreakupDrawer(!breakupDrawer);
  };

  const openModal = () => {
    setIsModalOpen(true);
    dispatch(reduxSetModalState(true));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(reduxSetModalState(false));
  };

  const applyCouponCode = value => {
    setIsCouponApplied(true);
    setCode(value);
    dispatch(getCouponCodeUsed(value));
  };

  const handleUpdateQuantity = async (
    itemid,
    productid,
    newQuantity,
    itemIndex,
    maxQuantity,
  ) => {
    setQuantityButton("disable");
    let updatedItems;
    if (newQuantity < 1) {
      setProductId(productid);
      setItemId(itemid);
      openModal();
    } else if (newQuantity > maxQuantity) {
      showToastNotification(
        "Sorry, We have limited quantity available for this product.",
        3,
      );
    } else {
      updatedItems = arr.map(item => {
        if (item.id === itemid) {
          return {...item, quantity: newQuantity};
        }
        return item;
      });

      setArr(updatedItems);
    }

    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      const headers = {
        userId: parseInt(userIdToUse),
        quantity: updatedItems[itemIndex].quantity,
        productId: productid,
        cityId,
      };
      await baseInstance.post(endPoints.addToCart.updateQuantity, headers);
    }
    await fetchBill();
  };

  const deleteItem = id => {
    dispatch(deleteItems(id));
    // setArr(arr.filter(t => t.fc_product.id !== id));
  };

  const fetchBill = async showMsg => {
    try {
      const headers = {
        // userId: parseInt(userIdToUse),
        userId: userId || parseInt(tempUserId),
        cityshield: isChecked,
        cityId,
        coins: isCoinApplied ? availCoin : 0,
        couponsCode: code,
        paymentMode: isMonthly ? 0 : 1,
      };

      const res = await baseInstance.post(
        endPoints.addToCart.fetchBill,
        headers,
      );
      setMinamountf(res?.data?.data?.coupon_minamountf);
      dispatch(getBillDetails(res?.data?.data));
      // setCode(res?.data?.data?.couponsCode);
      dispatch(getCouponCodeUsed(res?.data?.data?.couponsCode));
      dispatch(setCoinsApplied(res?.data?.data?.coinApplied));
      dispatch(setCityShield(res?.data?.data?.cityshield));
      if (showMsg) {
        if (res?.data?.data?.msg?.length > 0) {
          showToastNotification(res?.data?.data?.msg, 2);
        }
      }
      setQuantityButton("enable");
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  useEffect(() => {
    fetchBill();
  }, [isChecked, isMonthly, isCouponApplied, isLogin]);

  useEffect(() => {
    fetchBill(true);
  }, [isCoinApplied]);

  const toggleLoginModal = () => {
    dispatch(reduxSetModalState(!modalStateFromRedux));
    setLoginModal(!loginModal);
  };

  const handleCheckLogin = () => {
    if (isLogin) {
      if (userDetails?.full_name && userDetails?.email) {
        dispatch(setShoppingCartTab(1));
        window?.scrollTo(0, 0);
      } else {
        setIsSetupProfile(true);
        toggleLoginModal();
      }
    } else toggleLoginModal();
  };

  const fetchUserDetails = async () => {
    try {
      const response = await baseInstance.get(
        endPoints.profileSettingPage.getUserDetails(userId),
      );

      setUserDetails(response?.data?.data);

      dispatch(
        setIsOfflineCustomer(parseInt(response?.data?.data?.is_offline_user)),
      );
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  const validateAuth = async () => {
    const isValid = await checkAuthentication();
    if (isValid === true) {
      setIsLogin(true);
      fetchUserDetails();
    } else setIsLogin(false);
    fetchCartItems(isValid);
  };

  useEffect(() => {
    validateAuth();
  }, [isLogin]);

  const handleChangeRoute = () => {
    dispatch(setShoppingCartTab(1));
  };

  const isOfflineCustomer = useSelector(
    state => state.cartPageData.isOfflineCustomer,
  );

  const CheckProductQuantity = () => {
    baseInstance
      .post(endPoints.addToCart.checkProductQuantity, {
        userId: userId || tempUserId,
        cityId,
      })
      .then(res => {
        setIsDeletedProduct(res?.data?.data?.isDeleted);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    CheckProductQuantity();
  }, []);
  useEffect(() => {
    if (isDeletedProduct) {
      showToastNotification(
        "Item(s) in your cart are currently out of stock",
        3,
      );
    }
  }, [isDeletedProduct]);

  useEffect(() => {
    setBillBreakup(data.billBreakout);
  }, [data.billBreakout]);

  return (
    showData &&
    (count > 0 ? (
      <>
        <DeleteModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          productId={productId}
          id={itemId}
          userId={parseInt(userIdToUse)}
          updateArr={id => deleteItem(id)}
          setIsLogin={bool => {
            setIsLogin(bool);
          }}
          isLogin={isLogin}
        />

        <LoginModal
          closeModal={toggleLoginModal}
          isModalOpen={loginModal}
          setIsLogin={bool => {
            setIsLogin(bool);
          }}
          isCheckoutPage
          handleChangeRoute={handleChangeRoute}
          isSetupProfile={isSetupProfile}
        />

        <CouponDrawer
          toggleDrawer={toggleDrawerCoupon}
          open={couponDrawerOpen}
          applyCouponCode={val => {
            applyCouponCode(val);
            fetchBill();
          }}
          isMonthly={isMonthly}
          cityId={cityId}
          totalAmount={totalAmount}
          isCouponApplied={isCouponApplied}
        />

        <CityShieldDrawerForCart
          cityShieldCurrentPrice={cityShieldDiscountAmount}
          cityShieldOriginalPrice={cityShieldOriginalAmount}
          cityShieldDiscount={cityShieldDiscountPercentage}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpen}
          toggleCheckbox={bool => setIsChecked(bool)}
        />

        <TotalBreakup
          toggleDrawer={toggleDrawerBreakup}
          open={breakupDrawer}
          code={code}
          isCouponApplied={isCouponApplied}
        />

        <div className={styles.main_container}>
          <div className={styles.left_div} id="leftDiv">
            <div className={styles.card_top_row}>
              <h1 className={styles.head}>Cart ({count})</h1>
              <div className={styles.show_tenure_chip}>
                <span className="mr-1">
                  <img
                    src="https://d3juy0zp6vqec8.cloudfront.net/images/timer.svg"
                    alt="timer-icon"
                    width={20}
                    height={20}
                  />
                </span>
                Selected Tenure : {data?.cartItems?.[0]?.subproduct?.attr_name}
              </div>
            </div>

            <div className={styles.card_wrapper}>
              {arr?.map((item, index) => {
                return (
                  <>
                    <div key={index} className={styles.single_product_wrapper}>
                      <a
                        href={
                          item?.is_frp === 1
                            ? `/choose-products/${
                                arr[0]?.subproduct?.product_id
                              }/${arr[0]?.subproduct?.attr_name?.split(" ")[0]}`
                            : `/things/${item?.fc_product?.id}/${item?.fc_product?.seourl}`
                        }
                        aria-label={
                          item?.is_frp !== 1 &&
                          `${
                            productImageBaseUrl +
                            "thumb/" +
                            item.fc_product?.image?.split(",")?.[0]
                          }`
                        }>
                        <div className={styles.img_div}>
                          <img
                            src={`${
                              productImageBaseUrl +
                              "thumb/" +
                              item.fc_product?.image?.split(",")?.[0]
                            }`}
                            alt="product_img"
                            className={styles.img}
                            loading="lazy"
                          />
                        </div>
                      </a>

                      <div>
                        <div className={styles.name_div}>
                          <a
                            aria-label={
                              item?.is_frp !== 1 &&
                              item?.fc_product?.product_name?.replace(/-/g, " ")
                            }
                            href={
                              item?.is_frp === 1
                                ? `/choose-products/${
                                    arr[0]?.subproduct?.product_id
                                  }/${
                                    arr[0]?.subproduct?.attr_name?.split(" ")[0]
                                  }`
                                : `/things/${item?.fc_product?.id}/${item?.fc_product?.seourl}`
                            }>
                            <p className={styles.product_name}>
                              {item?.fc_product?.product_name?.replace(
                                /-/g,
                                " ",
                              )}
                            </p>
                          </a>
                          <div
                            onClick={() => {
                              setProductId(item?.fc_product?.id);
                              setItemId(item?.id);
                              openModal();
                            }}>
                            {" "}
                            <DeleteIcon className={styles.delete_icon} />
                          </div>
                        </div>
                        <div
                          className={`${
                            item?.is_frp === 1 ? "gap-2" : "gap-6"
                          } ${styles.price_div}`}>
                          {item?.is_frp !== 1 && (
                            <div className={styles.incre_decre_div}>
                              <span
                                className={`${styles.span_item} ${
                                  quantityButton === "enable"
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed"
                                }`}
                                onClick={() => {
                                  if (quantityButton === "enable") {
                                    if (minamountf > 0) {
                                      if (isCouponApplied) {
                                        setIsCouponApplied(false);
                                        setCode("");
                                        dispatch(getCouponCodeUsed(""));
                                        showToastNotification(
                                          `Oops! Coupon Removed. Ensure your cart meets the minimum rental value of INR ${
                                            minamountf && minamountf
                                          }`,
                                          3,
                                        );
                                      }
                                    }
                                    handleUpdateQuantity(
                                      item.id,
                                      item?.fc_product?.id,
                                      item.quantity - 1,
                                      index,
                                      item?.fc_product?.fc_city_product_quantity
                                        ?.quantity,
                                    );
                                  }
                                }}>
                                -
                              </span>
                              {item?.quantity}
                              <span
                                className={`${styles.span_item} ${
                                  quantityButton === "enable"
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed"
                                }`}
                                onClick={() => {
                                  if (quantityButton === "enable") {
                                    handleUpdateQuantity(
                                      item.id,
                                      item?.fc_product?.id,
                                      item.quantity + 1,
                                      index,
                                      item?.fc_product?.fc_city_product_quantity
                                        ?.quantity,
                                    );
                                  }
                                }}>
                                +
                              </span>
                            </div>
                          )}

                          <div>
                            <p className={styles.deposit_txt}>Monthly Rent</p>
                            <div className="flex items-center gap-2">
                              <p className={styles.currentPrice}>
                                <span className={styles.rupeeIcon}>₹</span>
                                {parseInt(item?.price).toFixed(0)}
                              </p>

                              {parseInt(item?.attr_price) >
                                parseInt(item?.price) && (
                                <p className={styles.originalPrice}>
                                  <span className={styles.rupeeIcon}>₹</span>
                                  {item?.attr_price}
                                </p>
                              )}
                            </div>
                          </div>

                          {arr[0]?.is_frp === 1 && (
                            <>
                              <span className={styles.plus}>+</span>

                              <div>
                                <p className={styles.deposit_txt}>
                                  Upgrades Rental Amount
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className={styles.currentPrice}>
                                    <span className={styles.rupeeIcon}>₹</span>
                                    {item?.additional_rent}/mo
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {index !== arr.length - 1 && (
                      <div className={styles.line_break}></div>
                    )}
                  </>
                );
              })}
            </div>

            {/* for citymax */}
            {arr[0]?.is_frp === 1 && (
              <>
                <div className="flex flex-col items-center">
                  <div className={styles.included_items_dropdown_input}>
                    <div className={styles.dropdown_input_left}>
                      <img
                        src={IconLink + "citymax-box.svg"}
                        className={styles.dropdown_included_box_icon}
                        alt="icon"
                        loading="lazy"
                      />
                      <p className={styles.dropdown_input_label}>
                        Contains: {arr[0]?.includedProducts.length} items
                      </p>
                      <button
                        onClick={() =>
                          router.push(
                            `/choose-products/${
                              arr[0]?.subproduct?.product_id
                            }/${arr[0]?.subproduct?.attr_name?.split(" ")[0]}`,
                          )
                        }
                        className={styles.change_btn}>
                        Change
                      </button>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => setOpenDropdown(!openDropdown)}>
                      {openDropdown ? (
                        <DropUpArrow size={24} />
                      ) : (
                        <DropDownArrow size={24} />
                      )}
                    </div>
                  </div>
                  {!openDropdown && (
                    <div className={styles.dropdown_shadow_effect}></div>
                  )}
                </div>
                {openDropdown && (
                  <div className={styles.dropdown_wrapper}>
                    {arr[0]?.includedProducts?.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className={styles.included_products_wrapper}>
                          <img
                            className={styles.included_prod_img}
                            src={
                              productImageBaseUrl +
                              "thumb/" +
                              item.fc_product?.image?.split(",")?.[0]
                            }
                            alt="product-image"
                            loading="lazy"
                          />
                          <p className={styles.included_prod_name}>
                            {item?.fc_product?.product_name?.replace(/-/g, " ")}
                          </p>
                        </div>
                        {index !== arr[0]?.includedProducts.length - 1 && (
                          <div className={styles.line_break}></div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className={styles.right_div} id="rightDiv">
            <div>
              <div className={styles.city_shield_div}>
                <div className={styles.city_shield_head_div}>
                  <div className={styles.verify_icon_div}>
                    <VerifyIcon size={24} color={"#2D9469"} />
                    <p className={styles.city_shield_head}>City Shield </p>
                  </div>
                  <div>
                    {isChecked ? (
                      <div onClick={openDrawer}>
                        <CheckedBox
                          size={20}
                          color={"#5774AC"}
                          className={"cursor-pointer"}
                        />
                      </div>
                    ) : (
                      <div onClick={() => setIsChecked(true)}>
                        <UncheckedBox
                          size={20}
                          color={"#5774AC"}
                          className={"cursor-pointer"}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* <p className={styles.insuranceText}>Insurance value</p>s */}
                <div className="flex items-end gap-2">
                  <p className={styles.currentPrice}>
                    <span className={styles.rupeeIcon}>₹</span>
                    {cityShieldDiscountAmount}/mo
                  </p>
                  <p className={styles.originalPrice}>
                    <span className={styles.rupeeIcon}>₹</span>
                    {cityShieldOriginalAmount}/mo
                  </p>
                  <div className={styles.discount}>
                    -{cityShieldDiscountPercentage}% OFF
                  </div>
                </div>
                <p className={styles.protect_text}>
                  Protect your appliances and furniture worth{" "}
                  <span className={styles.rupeeIcon}>₹</span>70,000.{" "}
                  <span className={styles.learn_more} onClick={openDrawer}>
                    Learn more
                  </span>
                </p>
              </div>

              {arr[0]?.is_frp !== 1 && isLogin && isOfflineCustomer === 0 && (
                <div className={styles.coins_div}>
                  <div className={styles.coins_left_div}>
                    <div>
                      <img
                        src={`${categoryIconsUrl + "cf_coin.svg"}`}
                        className={`${styles.coin} pointer-events-none`}
                        loading="lazy"
                        alt="icon"
                      />
                    </div>
                    <div>
                      <p className={styles.coin_txt}>Use Cityfurnish coins</p>
                      <p className={styles.avail_bal}>
                        Available balance:{" "}
                        {isCoinApplied
                          ? availCoin - billBreakup?.coinsUsed
                          : availCoin}
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    {isCoinApplied ? (
                      <ToggleOn
                        size={29}
                        color={"#5774AC"}
                        onClick={() => setIsCoinApplied(false)}
                      />
                    ) : (
                      <ToggleOff
                        color={"#E3E1DC"}
                        size={29}
                        onClick={() => {
                          setIsCoinApplied(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              {arr[0]?.is_frp !== 1 && (
                <div
                  className={`${styles.coupons_wrapper} border-[4px] border-green-700`}
                  onClick={() => {
                    if (isCouponApplied) {
                      setIsCouponApplied(false);
                      setCode("");
                      dispatch(getCouponCodeUsed(""));
                    } else {
                      setCouponDrawerOpen(true);
                    }
                  }}>
                  <p className={styles.offer_text}>
                    {isCouponApplied ? `${code} applied` : "Apply Coupon"}
                    <span>
                      <Image
                        src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                        alt="paty_icon"
                        className="w-[24px] h-[24px] inline-block ml-2"
                        loading="lazy"
                        width={24}
                        height={24}
                      />
                    </span>
                  </p>
                  {isCouponApplied ? (
                    <p className={styles.remove_txt}>Remove</p>
                  ) : (
                    <div onClick={() => setCouponDrawerOpen(true)}>
                      <ArrowForw color={"#3E688E"} className={styles.arrow} />
                    </div>
                  )}
                </div>
              )}

              {arr[0]?.is_frp !== 1 && showMonthlyToggle && (
                <div className={styles.payment_mode}>
                  <h2 className={styles.pref_mode_head}>
                    Preferred payment mode:
                  </h2>
                  <div className={styles.monthly_toggler}>
                    <p
                      onClick={() => {
                        const prevVal = isMonthly;
                        const isMonthlyVal = true;
                        setIsMonthly(true);
                        setLocalStorage("isMonthly", true);
                        if (prevVal !== isMonthlyVal) {
                          setIsCouponApplied(false);
                          setCode("");
                        }
                      }}
                      className={`${
                        isMonthly
                          ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                          : "bg-transparent"
                      } ${styles.pref_mode_text}`}>
                      Monthly
                    </p>
                    <p
                      onClick={() => {
                        const prevVal = isMonthly;
                        const isMonthlyVal = false;
                        setIsMonthly(false);
                        setLocalStorage("isMonthly", false);
                        if (prevVal !== isMonthlyVal) {
                          setIsCouponApplied(false);
                          setCode("");
                        }
                      }}
                      className={`${
                        isMonthly
                          ? "bg-transparent"
                          : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                      } ${styles.pref_mode_text}`}>
                      Upfront
                    </p>
                  </div>
                  <div className={styles.pref_mode_features_wrappper}>
                    {isMonthly
                      ? monthlyModeFeatures.map((item, index) => (
                          <ul key={index} className={styles.payment_mode_list}>
                            <RightIcon color={"#2D9469"} size={13} />
                            <li className={styles.payment_mode_feature}>
                              {item}
                            </li>
                          </ul>
                        ))
                      : upfrontModeFeatures.map((item, index) => (
                          <ul key={index} className={styles.payment_mode_list}>
                            <RightIcon color={"#2D9469"} size={13} />
                            <li className={styles.payment_mode_feature}>
                              {item}
                            </li>
                          </ul>
                        ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className={styles.cart_breakup}
                onClick={() => {
                  fetchBill();
                  setBreakupDrawer(true);
                }}>
                <div className="flex justify-between">
                  <p className={styles.total_text}>
                    {isMonthly ? (
                      <p>
                        Now payable
                        <span className="!text-14 !font-normal ml-1">
                          (Excl GST) :
                        </span>{" "}
                      </p>
                    ) : (
                      <p>
                        {" "}
                        Total rent
                        <span className="!text-14 !font-normal ml-1">
                          (Excl GST) :{" "}
                        </span>{" "}
                      </p>
                    )}
                  </p>

                  <p className={styles.total_amount}>
                    <span className={styles.rupeeIcon}>₹</span>

                    {billBreakup?.totalPayableAmount?.toFixed(2)}
                    {/* {isMonthly ? (
                      <>{billBreakup?.totalPayableAmount?.toFixed(2)}</>
                    ) : (
                      <>{parseInt(billBreakup?.totalPayableAmount)?.toFixed(2)}</>
                    )} */}
                  </p>
                </div>
                {isMonthly && (
                  <div>
                    <p className={styles.refundable_chip_text}>
                      Refundable Security Deposit:
                      <span className="font-Inter pl-1">₹</span>
                      <span className={styles.refundable_chip_span}>
                        {billBreakup?.refundableDeposite}
                      </span>
                    </p>
                  </div>
                )}
                <div className={styles.breakup_wrapper}>
                  <p className={styles.view_cart_text}>View cart breakup</p>
                  <ArrowForw color={"#5774AC"} className={styles.for_arrow} />
                </div>
              </div>

              {!isMonthly && billBreakup?.tenure === "12" && (
                <div className={styles.no_emi_wrapper}>
                  <div className="flex">
                    <RiSparklingFill
                      size={26}
                      color={"#E3E1DC"}
                      className="mr-1 hidden lg:flex"
                    />
                    <p className={styles.no_emi_cost_text}>
                      No Cost EMI of{" "}
                      <span
                        className={`${styles.no_emi_special_text} font-Inter`}>
                        ₹
                      </span>
                      <span className={styles.no_emi_special_text}>
                        {/* {(billBreakup?.finalTotalPrice / 12).toFixed(1)}/mo */}
                        {billBreakup?.finalTotalPrice &&
                          ((billBreakup.finalTotalPrice / 12) % 1 === 0
                            ? (billBreakup.finalTotalPrice / 12).toFixed(0)
                            : (billBreakup.finalTotalPrice / 12).toFixed(1)) +
                            "/mo"}
                      </span>{" "}
                      for 12 months available.
                    </p>
                  </div>
                </div>
              )}

              <div className="fixed lg:static bottom-0 left-0 w-full p-4 lg:p-0 shadow-sticky_btn lg:shadow-none bg-white ">
                <button
                  className={styles.proceed_button}
                  onClick={() => {
                    handleCheckLogin();
                    // dispatch(setShoppingCartTab(1));
                    // CheckProductQuantity();
                  }}>
                  {isLogin
                    ? userDetails?.full_name && userDetails?.email
                      ? "Proceed"
                      : "Set up your account to proceed"
                    : "Login to proceed"}
                  <ArrowForw size={19} color={"#222"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <EmptyCartPage />
    ))
  );
};

export default ShoppingCartSection;
