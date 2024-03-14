import React, {useState} from "react";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import AllOrders from "./partOne";
import OrderDetails from "./partTwo";

const OrderPage = ({tab, setTab}) => {
  const [part, setPart] = useState(1);
  const [orderData, setOrderData] = useState();

  const getSingleOrderDetails = async orderNumber => {
    try {
      const response = await baseInstance.get(
        endPoints.myOrdersPage.getOrderStage(orderNumber),
      );
      setOrderData(response?.data?.data);
    } catch (err) {
      console.log(err?.message || "some error");
    }
    setPart(2);
  };
  return (
    <div>
      {part === 1 ? (
        <AllOrders
          getSingleOrderDetails={getSingleOrderDetails}
          tab={tab}
          setTab={setTab}
        />
      ) : (
        <OrderDetails setPart={setPart} data={orderData} />
      )}
    </div>
  );
};

export default OrderPage;
