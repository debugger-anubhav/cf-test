import React, {useState} from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./style.module.css";
import {Close, ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";

const AddressDrawer = ({
  toggleDrawer,
  open,
  makeDefaultAddress,
  primaryAddress,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [id, setId] = useState(primaryAddress?.id);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
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
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>

        <p className={styles.head}>Saved addresses</p>
        <AddressDrawerContent
          makeDefaultAddress={makeDefaultAddress}
          primaryAddress={primaryAddress}
          setId={setId}
        />
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
      </div>
    </Drawer>
  );
};

export default AddressDrawer;

export const AddressDrawerContent = ({primaryAddress, setId}) => {
  const addressArray = useSelector(state => state.cartPageData.savedAddresses);
  console.log(primaryAddress, "addresss");
  const primaryIndex = addressArray.findIndex(
    item => item?.id === primaryAddress?.id,
  );
  const [selectedIndex, setSelectedIndex] = useState(primaryIndex);
  const cityName = useSelector(state => state.homePagedata.cityName);

  return (
    <div className={styles.container}>
      <div className={styles.item_wrapper}>
        {addressArray?.map((item, index) => (
          <div
            key={index}
            className={`${
              cityName !== item.city ? "cursor-not-allowed" : "cursor-pointer"
            } ${styles.card_wrapper}`}
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
                {item.full_name}, {item.phone}
              </h2>
            </div>
            <p className={`truncate ${styles.address}`}>{item.address1}</p>
            <p className={styles.address}>
              {item.city}, {item.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
