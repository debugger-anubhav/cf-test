import React, {useState, useEffect} from "react";

import DropDown from "../DropDown/DropDown";
import {baseInstance} from "@/network/axios";
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

  const handleChangeOption = newOption => {
    // Update the selected option state
    setSelectedOption({
      dealCodeNumber: newOption.dealCodeNumber,
    });
  };

  return (
    <div className="sm:w-[505px] mb-8">
      <p className="text-71717A text-16 tracking-0.3 font-Poppins">
        Selected order
      </p>
      <div>
        <DropDown
          isOpen={isDDOpen}
          orderIdsModal={orderIdsModal}
          setOrderIdsModal={val => setOrderIdsModal(val)}
          setIsDDOpen={setIsDDOpen}
          selectedOption={selectedOption}
          // setSelectedOption={setSelectedOption}
          setSelectedOption={option => handleChangeOption(option)}
          options={options}
          isInitialScreen={true}
          handleKycState={option => handleKycState(option?.dealCodeNumber)}
          isCommonField={true}
        />
      </div>
    </div>
  );
};
export default CommonField;
