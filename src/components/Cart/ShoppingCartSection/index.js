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
  RightIcon,
  UncheckedBox,
  VerifyIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";
import CityShieldDrawerForCart from "../Drawer/CityShieldDrawer";
import CouponDrawer from "../Drawer/CouponDrawer";
import TotalBreakup from "../Drawer/TotalBreakupDrawer";
import DeleteModal from "../Modal/DeleteModal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteItems,
  getBillDetails,
  getCouponCodeUsed,
  setCityShield,
  setCoinsApplied,
  // setCoinsUsed,
  // setCityShield,
  //  getCartItems
} from "@/store/Slices";
import EmptyCartPage from "../EmptyCartPage";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";

const ShoppingCartSection = ({setTab}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.cartPageData);
  const cartItems = data.cartItems;
  const billBreakup = data.billBreakout;
  const showData = data.showCartItems;

  const [arr, setArr] = useState(cartItems);
  useEffect(() => {
    setArr(cartItems);
  }, [cartItems]);

  const count = cartItems.length;
  // const router = useRouter();

  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;

  const cityId = getLocalStorage("cityId");

  const totalAmount = arr.reduce((accumulator, item) => {
    return accumulator + parseInt(item?.price) * item?.quantity;
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

  // const fetchCartItems = () => {
  //   axios
  //     .get(baseURL + endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
  //     .then(res => {
  //       console.log(res, "res in fetch itemms");
  //       setArr(res?.data?.data);
  //       dispatch(getCartItems(res?.data?.data));
  //     })
  //     .catch(err => console.log(err));
  // };

  const monthlyModeFeatures = [
    "Get additional coupon upto 8%",
    "Pay as you use",
    "Mandatory Security Deposit",
  ];
  const upfrontModeFeatures = [
    "Get additional coupons upto 20%",
    "Faster KYC",
    "No Security Deposit",
  ];
  const modeOfPayment = getLocalStorage("isMonthly");

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
  const [code, setCode] = useState(data.couponCodeUsed);
  const [productId, setProductId] = useState();
  const [itemId, setItemId] = useState();

  // const [itemQuantity, setItemQuantity] = useState(1);

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
  };

  const fetchAvailCoins = () => {
    axios
      .get(baseURL + endPoints.addToCart.fetchCoins(userIdToUse))
      .then(res => {
        if (res?.data?.data?.length > 0)
          setAvailCoin(parseInt(res?.data?.data?.[0]?.topup_amount));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAvailCoins();
  }, []);

  // const closeDrawer = () => {
  //   setCityShieldDrawerOpen(false);
  // };

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  ) => {
    let updatedItems;
    if (newQuantity < 1) {
      setProductId(productid);
      setItemId(itemid);
      openModal();
    } else {
      updatedItems = arr.map(item => {
        if (item.id === itemid) {
          return {...item, quantity: newQuantity};
        }
        return item;
      });

      setArr(updatedItems);
    }

    if (newQuantity > 0) {
      const headers = {
        userId: parseInt(userIdToUse),
        quantity: updatedItems[itemIndex].quantity,
        productId: productid,
      };

      await axios
        .post(baseURL + endPoints.addToCart.updateQuantity, headers)
        .then(res => console.log(res, "res in updated qunatity"))
        .catch(err => console.log(err, "error in update qunatity"));
    }
    fetchBill();
  };

  const deleteItem = id => {
    dispatch(deleteItems(id));
    // setArr(arr.filter(t => t.fc_product.id !== id));
  };

  const fetchBill = async () => {
    try {
      const headers = {
        userId: parseInt(userIdToUse),
        cityshield: isChecked,
        cityId,
        coins: isCoinApplied ? availCoin : 0,
        couponsCode: code,
        paymentMode: isMonthly ? 0 : 1,
      };

      const res = await axios.post(
        baseURL + endPoints.addToCart.fetchBill,
        headers,
      );
      dispatch(getBillDetails(res?.data?.data));
      // setCode(res?.data?.data?.couponsCode);
      dispatch(getCouponCodeUsed(res?.data?.data?.couponsCode));
      dispatch(setCoinsApplied(res?.data?.data?.coinApplied));
      dispatch(setCityShield(res?.data?.data?.cityshield));
      // dispatch(setCoinsUsed(res?.data?.data?.coins));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBill();
  }, [isCoinApplied, isChecked, isMonthly, isCouponApplied]);

  // useEffect(() => {
  //   data.couponCodeUsed;
  // }, [third]);

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
        />
        <div className={styles.main_container}>
          <div className={styles.left_div} id="leftDiv">
            <h1 className={styles.head}>Shopping cart ({count})</h1>
            <div className={styles.card_wrapper}>
              {arr?.map((item, index) => {
                return (
                  <>
                    <div key={index} className={styles.single_product_wrapper}>
                      <a
                        href={`/things/${item?.fc_product?.id}/${item?.fc_product?.seourl}`}
                        aria-label={`${
                          productImageBaseUrl +
                          "thumb/" +
                          item.fc_product?.image?.split(",")?.[0]
                        }`}>
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
                            aria-label={item?.fc_product?.product_name?.replace(
                              /-/g,
                              " ",
                            )}
                            href={`/things/${item?.fc_product?.id}/${item?.fc_product?.seourl}`}>
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

                        <div className={styles.price_div}>
                          <div className={styles.incre_decre_div}>
                            <span
                              className={styles.span_item}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item?.fc_product?.id,
                                  item.quantity - 1,
                                  index,
                                )
                              }>
                              -
                            </span>
                            {item?.quantity}
                            <span
                              className={styles.span_item}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item?.fc_product?.id,
                                  item.quantity + 1,
                                  index,
                                )
                              }>
                              +
                            </span>
                          </div>

                          <div>
                            <p className={styles.deposit_txt}>Monthly Rent</p>
                            <div className="flex items-center gap-2">
                              <p className={styles.currentPrice}>
                                <span className={styles.rupeeIcon}>₹</span>
                                {item?.price}
                              </p>

                              {item?.attr_price > item?.price && (
                                <p className={styles.originalPrice}>
                                  <span className={styles.rupeeIcon}>₹</span>
                                  {item?.attr_price}
                                </p>
                              )}
                            </div>
                          </div>
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
          </div>

          <div className={styles.right_div} id="rightDiv">
            <div>
              <div className={styles.city_shield_div}>
                <div className={styles.city_shield_head_div}>
                  <div className={styles.verify_icon_div}>
                    <VerifyIcon size={24} color={"#2D9469"} />
                    <p className={styles.city_shield_head}>Cityshield </p>
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
                    {cityShieldDrawerOpen && (
                      <CityShieldDrawerForCart
                        cityShieldCurrentPrice={cityShieldDiscountAmount}
                        cityShieldOriginalPrice={cityShieldOriginalAmount}
                        cityShieldDiscount={cityShieldDiscountPercentage}
                        toggleDrawer={toggleDrawerCityShield}
                        open={cityShieldDrawerOpen}
                        toggleCheckbox={bool => setIsChecked(bool)}
                      />
                    )}
                  </div>
                </div>

                <p>Insurance value</p>
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

              <div className={styles.coins_div}>
                <div className={styles.coins_left_div}>
                  <div>
                    <img
                      src={`${categoryIconsUrl + "cf_coin.svg"}`}
                      className={`${styles.coin} pointer-events-none`}
                      loading="lazy"
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
                    <FaToggleOn
                      size={29}
                      color={"#5774AC"}
                      onClick={() => setIsCoinApplied(false)}
                    />
                  ) : (
                    <FaToggleOff
                      color={"#E3E1DC"}
                      size={29}
                      onClick={() => setIsCoinApplied(true)}
                    />
                  )}
                </div>
              </div>

              <div
                className={styles.coupons_wrapper}
                onClick={() => {
                  !isCouponApplied && setCouponDrawerOpen(true);
                  // checkCoupon();
                }}>
                <p className={styles.offer_text}>
                  {isCouponApplied
                    ? `${code} applied🎉`
                    : "Apply Offers & Coupon🎉"}
                </p>
                {isCouponApplied ? (
                  <p
                    className={styles.remove_txt}
                    // onClick={handleRemoveCode}
                    onClick={() => {
                      setIsCouponApplied(false);
                      setCode("");
                      dispatch(getCouponCodeUsed(""));
                    }}>
                    Remove
                  </p>
                ) : (
                  <div onClick={() => setCouponDrawerOpen(true)}>
                    <ArrowForw color={"#3E688E"} className={styles.arrow} />
                  </div>
                )}
              </div>

              {couponDrawerOpen && (
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
                />
              )}

              {/* hit and try */}

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
            </div>

            <div>
              <div
                className={styles.cart_breakup}
                onClick={() => {
                  fetchBill();
                  setBreakupDrawer(true);
                }}>
                <div>
                  <p className={styles.total_text}>Total:</p>
                  <div className={styles.breakup_wrapper}>
                    <p className={styles.view_cart_text}>View cart breakup</p>
                    <ArrowForw color={"#5774AC"} className={styles.for_arrow} />
                  </div>
                </div>
                <p className={styles.total_amount}>
                  <span className={styles.rupeeIcon}>₹</span>
                  {billBreakup?.finalTotalPrice?.toFixed(2)}
                  {isMonthly ? "/mo" : ""}
                </p>
              </div>

              {breakupDrawer && (
                <TotalBreakup
                  toggleDrawer={toggleDrawerBreakup}
                  open={breakupDrawer}
                  code={code}
                  isCouponApplied={isCouponApplied}
                />
              )}

              <button className={styles.proceed_button} onClick={setTab}>
                Proceed <ArrowForw size={19} color={"#222"} />
              </button>
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
