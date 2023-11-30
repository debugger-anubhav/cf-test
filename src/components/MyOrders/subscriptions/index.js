import React, {useState} from "react";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import AllSubcriptions from "./partOne/AllSubcriptions";
import SubscriptionDetails from "./partTwo/SubscriptionDetails";

const SubscriptionPage = ({tab, setTab}) => {
  const [part, setPart] = useState(1);
  const [subscriptionData, setsubscriptionData] = useState();

  const getSingleSubscriptionDetails = async orderNumber => {
    try {
      const response = await axios.get(
        baseURL + endPoints.myOrdersPage.getOrderStage(orderNumber),
      );
      console.log(response);
      setsubscriptionData(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
    setPart(2);
  };
  return (
    <div>
      {part === 1 ? (
        <AllSubcriptions
          tab={tab}
          setTab={setTab}
          getSingleOrderDetails={getSingleSubscriptionDetails}
        />
      ) : (
        <SubscriptionDetails setPart={setPart} data={subscriptionData} />
      )}
    </div>
  );
};

export default SubscriptionPage;
