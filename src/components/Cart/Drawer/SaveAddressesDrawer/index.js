import React, {useEffect, useState} from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./style.module.css";
import {AddIcon, Close, ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";
import NewAddressForm from "../../AddressSection/NewAddressForm";

const AddressDrawer = ({
  toggleDrawer,
  open,
  makeDefaultAddress,
  primaryAddress,
  cartPage,
  checkPostalCode,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [id, setId] = useState(primaryAddress?.id);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={() => {
        toggleDrawer();
        setShowAddForm(false);
      }}
      classes={{paper: styles.customDrawer}}
      transitionDuration={{enter: 400, exit: 200}}>
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
            setShowAddForm(false);
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        {showAddForm ? (
          <p className={styles.head}>Add new address</p>
        ) : (
          <p className={styles.head}>Saved addresses</p>
        )}
        <AddressDrawerContent
          makeDefaultAddress={makeDefaultAddress}
          primaryAddress={primaryAddress}
          setId={setId}
          cartPage={cartPage}
          setShowAddForm={setShowAddForm}
          showAddForm={showAddForm}
          checkPostalCode={checkPostalCode}
          toggleDrawer={toggleDrawer}
        />
        {!showAddForm && (
          <div className={styles.btn_wrapper}>
            <button
              className={styles.btn}
              onClick={async () => {
                try {
                  await makeDefaultAddress(id);
                  // await makeAddressPrimary(id);
                  // getAllSavedAddresses();
                  toggleDrawer();
                } catch (error) {
                  console.error(error);
                }
              }}>
              Proceed
              <ForwardArrow color={"#71717A"} />
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default AddressDrawer;

export const AddressDrawerContent = ({
  primaryAddress,
  setId,
  cartPage,
  setShowAddForm,
  showAddForm,
  checkPostalCode,
  toggleDrawer,
}) => {
  const addressArray = useSelector(state => state.cartPageData.savedAddresses);
  const primaryIndex = addressArray.findIndex(
    item => item?.id === primaryAddress?.id,
  );
  const [selectedIndex, setSelectedIndex] = useState(primaryIndex);
  const cityName = useSelector(state => state.homePagedata.cityName);
  const drawerSaveAdd = () => {
    toggleDrawer();
    setShowAddForm(false);
  };
  return (
    <div className={styles.container}>
      {cartPage && !showAddForm && (
        <div
          className={styles.add_new_add_row}
          onClick={() => {
            setShowAddForm(true);
          }}>
          <div className="flex gap-2 items-center">
            <AddIcon size={20} color={"#5774AC"} />
            <p className={styles.add_text}>Add new address</p>
          </div>
          <div>
            <ForwardArrow color={"#71717A"} className={"text-20"} size={20} />
          </div>
        </div>
      )}
      {showAddForm ? (
        <div className={`${styles.item_wrapper} w-full`}>
          <NewAddressForm
            saveAddDrawer={true}
            checkPostalCode={checkPostalCode}
            toggleDrawer={drawerSaveAdd}
          />
        </div>
      ) : (
        <div className={styles.item_wrapper}>
          {addressArray?.map((item, index) => (
            <div
              key={index}
              className={`${
                cityName !== item.city ? "cursor-not-allowed" : "cursor-pointer"
              } ${styles.card_wrapper} ${
                index === 0 ? "mt-0" : "mt-4 md:mt-8"
              }`}
              onClick={() => {
                if (cityName === item.city) {
                  setSelectedIndex(index);
                  setId(item.id);
                }
              }}>
              {cityName !== item.city && (
                <div className={styles.not_belong_wrapper}>
                  <p className={styles.not_belong_text}>
                    Address does not belong to selected city
                  </p>
                </div>
              )}
              <div className={styles.first_row}>
                <div
                  className={`${
                    cityName === item.city
                      ? "border-[#5774AC]"
                      : "border-[#9A9AA2]"
                  } ${styles.circle}`}>
                  <div
                    className={` ${
                      selectedIndex === index ? styles.selected_circle : ""
                    }`}></div>
                </div>
                <h2 className={styles.name}>
                  {item?.full_name}, {item?.phone}
                </h2>
              </div>
              <p className={`truncate ${styles.address}`}>{item.address1}</p>
              <p className={styles.address}>
                {item?.city}, {item?.state} - {item?.postal_code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
