import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import AllSubcriptions from "./partOne/AllSubcriptions";
import SubscriptionDetails from "./partTwo/SubscriptionDetails";
import {useDispatch} from "react-redux";
import {setSubscriptionNumber} from "@/store/Slices";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";

const SubscriptionPage = ({tab, setTab}) => {
  const dispatch = useDispatch();
  const [part, setPart] = useState(1);
  const [subscriptionData, setsubscriptionData] = useState();

  const userId = decrypt(getLocalStorage("_ga"));
  console.log(userId);

  const getAllSubscriptionDetails = async filter => {
    const body = {
      userId: "85757",
      filter,
    };
    try {
      const response = await axios.post(
        baseURL + endPoints.myOrdersPage.getSubscriptionData,
        body,
      );
      console.log(response);
      setsubscriptionData(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
    // setPart(2);
  };

  useEffect(() => {
    getAllSubscriptionDetails();
  }, []);

  return (
    <div>
      {part === 1 ? (
        <AllSubcriptions
          tab={tab}
          setTab={setTab}
          data={subscriptionData}
          getSingleOrderDetails={val => {
            dispatch(setSubscriptionNumber(val));
            setPart(2);
          }}
          getAllSubscriptionDetails={getAllSubscriptionDetails}
        />
      ) : (
        <SubscriptionDetails
          setPart={setPart}
          subscriptionData={subscriptionData}
          // singleSubscriptionData={singleSubscriptionData}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
