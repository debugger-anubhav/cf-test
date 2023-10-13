import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {AddIcon, DeleteIcon, EditIcon1} from "@/assets/icon";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getSavedAddress} from "@/store/Slices";
import {getLocalStorage} from "@/constants/constant";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import DeleteAddressModal from "../Modal/DeleteAddressModal";
import "react-responsive-modal/styles.css";

const SavedAddress = ({setTab, editAddress}) => {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
  const userIdToUse = userId || tempUserId;
  const addressArray = useSelector(state => state.cartPageData.savedAddresses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();

  const getAllSavedAddresses = async () => {
    await axios
      .get(baseURL + endPoints.addToCart.fetchSavedAddress(userIdToUse))
      .then(res => {
        dispatch(getSavedAddress(res?.data?.data));

        // const newPrimaryAddress = res?.data?.data.find(
        //   item => item.city === cityName,
        // );
        // console.log(newPrimaryAddress, "primaryy addresss");
        // setPrimaryAddress(newPrimaryAddress);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAllSavedAddresses();
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div>
      {isModalOpen && (
        <DeleteAddressModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          id={id}
          getAllSavedAddresses={getAllSavedAddresses}
        />
      )}

      <h1 className={styles.header}>Your Addresses</h1>
      <div className={styles.line}></div>
      <div className={styles.box_wrapper}>
        <div className={`${styles.box} ${styles.box1}`}>
          <div className="flex gap-2 items-center" onClick={() => setTab(1)}>
            <AddIcon className={styles.add_icon} color={"#5774AC"} />
            <p className={styles.add_new_text}>Add new address</p>
          </div>
        </div>

        {addressArray?.map((item, index) => {
          return (
            <div key={index} className={styles.box}>
              <div className={styles.name_row}>
                <div className="flex">
                  <p className={`${styles.truncated_text} ${styles.name}`}>
                    {item.full_name}
                  </p>
                  ,<p className={`ml-1 ${styles.name}`}>{item.phone}</p>
                </div>

                <div className={styles.icon_wrapper}>
                  <div
                    onClick={async () => {
                      await editAddress(item.id);
                      setTab(2);
                    }}>
                    <EditIcon1 className={styles.editIcon} />
                  </div>
                  <div
                    onClick={() => {
                      setId(item.id);
                      setIsModalOpen(true);
                    }}>
                    <DeleteIcon className={styles.deleteIcon} />
                  </div>
                </div>
              </div>
              <p
                className={`truncate mt-[13px] cxl:mt-[14.5px] ${styles.address}`}>
                {item.address1}
              </p>
              <p className={styles.address}>
                {item.city}, {item.state}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedAddress;
