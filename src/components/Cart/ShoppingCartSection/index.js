import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {
  categoryIconsUrl,
  getLocalStorage,
  productImageBaseUrl,
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
  //  getCartItems
} from "@/store/Slices";
import EmptyCartPage from "../EmptyCartPage";

const ShoppingCartSection = ({setTab}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.cartPageData);
  const cartItems = data.cartItems;
  const billBreakup = data.billBreakout;
  const showData = data.showCartItems;

  console.log(showData, "loader");

  const [arr, setArr] = useState(cartItems);
  useEffect(() => {
    setArr(cartItems);
  }, [cartItems]);

  const count = cartItems.length;

  const userId = getLocalStorage("user_id");
  const tempUserId = getLocalStorage("tempUserID");
  const userIdToUse = userId || tempUserId;

  const cityId = getLocalStorage("cityId");

  // console.log(userIdToUse, "user id to use");

  const totalAmount = cartItems.reduce((accumulator, item) => {
    return accumulator + item?.fc_product?.fc_product_sale_price?.sale_price;
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

  const [isChecked, setIsChecked] = useState(true);
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const [breakupDrawer, setBreakupDrawer] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCoinApplied, setIsCoinApplied] = useState(false);
  const [availCoin, setAvailCoin] = useState(0);
  const [isMonthly, setIsMonthly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
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

  const handleUpdateQuantity = (itemid, productid, newQuantity, itemIndex) => {
    if (newQuantity < 1) {
      setProductId(productid);
      setItemId(itemid);
      openModal();
    } else {
      const updatedItems = arr.map(item => {
        if (item.id === itemid) {
          return {...item, quantity: newQuantity};
        }
        return item;
      });

      setArr(updatedItems);
    }

    const headers = {
      userId: parseInt(userIdToUse),
      quantity: arr[itemIndex].quantity,
      productId: productid,
    };
    axios
      .post(baseURL + endPoints.addToCart.updateQuantity, headers)
      .then(res => console.log(res))
      .catch(err => console.log(err, "error in update qunatity"));
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBill();
  }, [isCoinApplied, isChecked, isMonthly, isCouponApplied]);

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
                  <div key={index} className={styles.single_product_wrapper}>
                    <div className={styles.img_div}>
                      <img
                        src={`${
                          productImageBaseUrl +
                          "thumb/" +
                          item.fc_product?.image?.split(",")?.[0]
                        }`}
                        alt="product_img"
                        className={styles.img}
                      />
                    </div>

                    <div>
                      <div className={styles.name_div}>
                        <p className={styles.product_name}>
                          {item?.fc_product?.product_name?.replace(/-/g, " ")}
                        </p>
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
                          <div className="flex items-end gap-2">
                            <p className={styles.currentPrice}>
                              <span className={styles.rupeeIcon}>₹</span>
                              {item?.price}
                            </p>

                            <p className={styles.originalPrice}>
                              <span className={styles.rupeeIcon}>₹</span>
                              {item?.attr_price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        toggleCheckbox={() => setIsChecked(false)}
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
                      className={styles.coin}
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
                />
              )}

              {/* hit and try */}

              <div className={styles.payment_mode}>
                <h2 className={styles.pref_mode_head}>
                  Preferred payment mode:
                </h2>
                <div className={styles.monthly_toggler}>
                  <p
                    onClick={() => setIsMonthly(true)}
                    className={`${
                      isMonthly
                        ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                        : "bg-transparent"
                    } ${styles.pref_mode_text}`}>
                    Monthly
                  </p>
                  <p
                    onClick={() => setIsMonthly(false)}
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
