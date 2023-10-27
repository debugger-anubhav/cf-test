import React, {useState, useEffect} from "react";
// import commonStyles from "../DocMain/DocMain.module.css";
import styles from "./styles.module.css";
// import DocSidebar from "../Sidebar/DocSidebar";
// import KycHeader from "../KycHeader/KycHeader";
// import {MenuList} from "@mui/material";
import DropDown from "../DropDown/DropDown";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
// import {getOrderId} from "@/store/Slices";
// import {useDispatch, useSelector} from "react-redux";

const DocumentaionInitialScreen = ({handleKycState}) => {
  const [isDDOpen, setIsDDOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);

  const userid = decrypt(getLocalStorage("_ga"));

  const getAllOrderIds = () => {
    axios
      .get(baseURL + endPoints.kycPage.getOrderIds(userid))
      .then(res => {
        setOptions(res?.data?.data);
      })
      .catch(err => console.log(err));
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
          isOpen={isDDOpen}
          setIsDDOpen={setIsDDOpen}
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
