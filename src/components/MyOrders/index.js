import React, {useState} from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import AllOrders from "./partOne/index";
import OrderDetails from "./partTwo/index";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const index = () => {
  const [part, setPart] = useState(1);
  const [orderData, setOrderData] = useState();
  // const [orderNumber, setOrderNumber] = useState();

  const getSingleOrderDetails = async orderNumber => {
    try {
      const response = await axios.get(
        baseURL + endPoints.myOrdersPage.getOrderStage(orderNumber),
      );
      console.log(response);
      setOrderData(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
    setPart(2);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className="w-full">
        {part === 1 ? (
          <AllOrders getSingleOrderDetails={getSingleOrderDetails} />
        ) : (
          <OrderDetails setPart={setPart} data={orderData} />
        )}
      </div>
    </div>
  );
};

export default index;
