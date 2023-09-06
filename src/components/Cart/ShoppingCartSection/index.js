import React, {useState} from "react";
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
  Rupee,
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
  //  getCartItems
} from "@/store/Slices";

const ShoppingCartSection = ({setTab}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartPageData.cartItems);
  console.log(cartItems, "cart itemsss");
  const [arr, setArr] = useState(cartItems);
  // console.log(arr, "arrrrr");
  const count = cartItems.length;

  const userId = getLocalStorage("userID");
  const tempUserId = getLocalStorage("tempUserID");
  const userIdToUse = userId || tempUserId;

  console.log(userIdToUse, "user id to use");

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
  const [isMonthly, setIsMonthly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [productId, setProductId] = useState();
  const [itemId, setItemId] = useState();

  // const [itemQuantity, setItemQuantity] = useState(1);

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
  };
  const availCoin = 300;

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
  };

  const handleUpdateQuantity = (productid, index, operator) => {
    console.log("inside", operator, index);
    const updatedArr = [...arr];
    if (operator === "minus" && arr[index].quantity > 0)
      updatedArr[index].quantity--;
    else if (operator === "plus") updatedArr[index].quantity++;
    else openModal();
    setArr(updatedArr);

    const headers = {
      userId: 113999132,
      quantity: arr[index].quantity,
      productId: productid,
    };
    axios
      .post(baseURL + endPoints.addToCart.updateQuantity, headers)
      .then(res => console.log(res))
      .catch(err => console.log(err, "error in update qunatity"));
  };

  const deleteItem = id => {
    console.log(id, "in delet ");
    dispatch(deleteItems(id));
    // setArr(arr.filter(t => t.fc_product.id !== id));
  };

  return cartItems.length > 0 ? (
    <>
      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        productId={productId}
        id={itemId}
        userId={userIdToUse}
        updateArr={id => deleteItem(id)}
      />
      <div className={styles.main_container}>
        <div className={styles.left_div} id="leftDiv">
          <h1 className={styles.head}>Shopping cart ({count})</h1>
          <div className={styles.card_wrapper}>
            {cartItems?.map((item, index) => (
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
                      {item?.fc_product?.product_name}
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
                          handleUpdateQuantity(item.id, index, "minus")
                        }>
                        -
                      </span>
                      {item?.quantity}
                      <span
                        className={styles.span_item}
                        onClick={() =>
                          handleUpdateQuantity(item.id, index, "plus")
                        }>
                        +
                      </span>
                    </div>

                    <div>
                      <p className={styles.deposit_txt}>Monthly Rent</p>
                      <div className="flex items-end gap-2">
                        <p className={styles.currentPrice}>
                          <Rupee />
                          {item?.fc_product?.fc_product_sale_price?.sale_price}
                        </p>
                        <p className={styles.originalPrice}>
                          {item?.fc_product?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right_div} id="rightDiv">
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
                <Rupee />
                250/mo
              </p>
              <p className={styles.originalPrice}>400/mo</p>
              <div className={styles.discount}>-40% OFF</div>
            </div>
            <p className={styles.protect_text}>
              Protect your appliances and furniture worth ₹70,000.{" "}
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
                  Available balance: {isCoinApplied ? 0 : availCoin}
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
            }}>
            <p className={styles.offer_text}>
              {isCouponApplied
                ? `${code} applied🎉`
                : "Apply Offers & Coupon🎉"}
            </p>
            {isCouponApplied ? (
              <p
                className={styles.remove_txt}
                onClick={() => setIsCouponApplied(false)}>
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
              applyCoupon={setIsCouponApplied}
              applyCouponCode={applyCouponCode}
            />
          )}

          <div className={styles.payment_mode}>
            <h2 className={styles.pref_mode_head}>Preferred payment mode:</h2>
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
                      <li className={styles.payment_mode_feature}>{item}</li>
                    </ul>
                  ))
                : upfrontModeFeatures.map((item, index) => (
                    <ul key={index} className={styles.payment_mode_list}>
                      <RightIcon color={"#2D9469"} size={13} />
                      <li className={styles.payment_mode_feature}>{item}</li>
                    </ul>
                  ))}
            </div>
          </div>

          <div
            className={styles.cart_breakup}
            onClick={() => setBreakupDrawer(true)}>
            <div>
              <p className={styles.total_text}>Total:</p>
              <div className={styles.breakup_wrapper}>
                <p className={styles.view_cart_text}>View cart breakup</p>
                <ArrowForw color={"#5774AC"} className={styles.for_arrow} />
              </div>
            </div>
            <p className={styles.total_amount}>
              <Rupee className={styles.rupeeIcon} />
              11,709
            </p>
          </div>

          {breakupDrawer && (
            <TotalBreakup
              toggleDrawer={toggleDrawerBreakup}
              open={breakupDrawer}
              arr={arr}
            />
          )}

          <button className={styles.proceed_button} onClick={setTab}>
            Proceed <ArrowForw size={19} color={"#222"} />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-32">Your cart is empty</p>
    </div>
  );
};

export default ShoppingCartSection;
