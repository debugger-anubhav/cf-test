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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllSavedAddresses();
  }, []);

  return (
    <div>
      {isModalOpen && (
        <DeleteAddressModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <h1 className={styles.header}>Your Addresses</h1>
      <div className={styles.line}></div>
      <div className={styles.box_wrapper}>
        {addressArray?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${index === 0 && styles.box1} ${styles.box}`}>
              {index === 0 ? (
                <div
                  className="flex gap-2 items-center"
                  onClick={() => setTab(1)}>
                  <AddIcon className={styles.add_icon} color={"#5774AC"} />
                  <p className={styles.add_new_text}>Add new address</p>
                </div>
              ) : (
                <div>
                  <div className={styles.name_row}>
                    <p className={styles.name}>
                      {item.full_name}, {item.phone}
                    </p>
                    <div className={styles.icon_wrapper}>
                      <div
                        onClick={async () => {
                          await editAddress(item.id);
                          setTab(2);
                        }}>
                        <EditIcon1
                          // color={"#71717A"}
                          className={styles.editIcon}
                        />
                      </div>
                      <div onClick={() => setIsModalOpen(true)}>
                        <DeleteIcon
                          className={styles.deleteIcon}
                          // color={"#71717A"}
                        />
                      </div>
                    </div>
                  </div>
                  <p
                    className={`truncate mt-[13px] md:mt-[14.5px] ${styles.address}`}>
                    {item.address1}
                  </p>
                  <p className={styles.address}>
                    {item.city}, {item.state}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedAddress;
