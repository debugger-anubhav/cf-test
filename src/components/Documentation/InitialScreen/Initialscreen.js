import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import DropDown from "../DropDown/DropDown";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const DocumentaionInitialScreen = ({handleKycState}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [orderIdsModal, setOrderIdsModal] = useState(false);

  const userid = decrypt(getLocalStorage("_ga"));

  const getAllOrderIds = () => {
    baseInstance
      .get(endPoints.kycPage.getOrderIds(userid))
      .then(res => {
        setOptions(res?.data?.data);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    getAllOrderIds();
  }, []);

  return (
    <div>
      <p className={styles.label}>
        Select an order to view its documentation status
      </p>
      <div className="mt-1 xl:w-[537px]">
        <DropDown
          isOpen={false}
          orderIdsModal={orderIdsModal}
          setOrderIdsModal={val => setOrderIdsModal(val)}
          // setIsDDOpen={setIsDDOpen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={options}
          isInitialScreen={true}
          handleKycState={option => handleKycState(option)}
        />
      </div>
    </div>
  );
};
export default DocumentaionInitialScreen;
