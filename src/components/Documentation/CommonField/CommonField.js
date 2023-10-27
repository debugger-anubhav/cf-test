import React, {useState, useEffect} from "react";

import DropDown from "../DropDown/DropDown";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {useSelector} from "react-redux";

const CommonField = ({handleKycState}) => {
  const selectedOrderId = useSelector(state => state.kycPage.orderId);

  const [isDDOpen, setIsDDOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    dealCodeNumber: selectedOrderId,
  });
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
    <div className="sm:w-[505px] mb-8">
      <p className="text-71717A text-16 tracking-0.3 font-Poppins">
        Selected order
      </p>
      <div>
        <DropDown
          isOpen={isDDOpen}
          setIsDDOpen={setIsDDOpen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={options}
          isInitialScreen={true}
          handleKycState={option => handleKycState(option?.dealCodeNumber)}
        />
      </div>
    </div>
  );
};
export default CommonField;
