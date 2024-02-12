import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import Cards, {MonthlyCard} from "./Cards";
import {useParams} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

function TenureExtension() {
  const params = useParams();
  const [apiData, setapiData] = useState(null);
  const [cardIndex, setcardIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [singleCardData, setsingleCardData] = useState(null);
  const [monthlyCardIsChecked, setmonthlyCardIsChecked] = useState(true);

  const CardData = [
    {
      title: "Long-term pack ",
      lightTitle: "(9 months+)",
      percent_off: 15,
      monthOptions: [
        {label: "9 Months", value: 9},
        {label: "10 Months", value: 10},
        {label: "11 Months", value: 11},
        {label: "12 Months", value: 12},
        {label: "13 Months", value: 13},
        {label: "14 Months", value: 14},
        {label: "15 Months", value: 15},
        {label: "16 Months", value: 16},
        {label: "17 Months", value: 17},
      ],
    },
    {
      title: "Mid-term pack ",
      lightTitle: "(6-8 months)",
      percent_off: 10,
      monthOptions: [
        {label: "6 Months", value: 6},
        {label: "7 Months", value: 7},
        {label: "8 Months", value: 8},
      ],
    },
    {
      title: "Short-term pack ",
      lightTitle: "(3-5 months)",
      percent_off: 5,
      monthOptions: [
        {label: "5 Months", value: 5},
        {label: "4 Months", value: 4},
        {label: "3 Months", value: 3},
      ],
    },
  ];
  const getApiData = () => {
    axios
      .get(baseURL + endPoints.tenureExtension, {
        params: {
          cfCareValue: isChecked ? 1 : 0,
          dealCodeNumber: params?.orderId,
        },
      })
      .then(res => {
        if (!isChecked) {
          setsingleCardData(res?.data?.data);
        } else setapiData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getApiData();
  }, [isChecked]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_heading}>Tenure Extension</div>
      <div className={styles.order_row}>
        Your Order ID{" "}
        <span className="ml-14 font-medium">: #{params?.orderId}</span>
      </div>
      <div className="my-8 flex flex-wrap gap-8 md:justify-start justify-center">
        {CardData?.map((item, index) => {
          const temp =
            index === cardIndex && !isChecked ? singleCardData : apiData;
          return (
            <div key={index.toString()}>
              <Cards
                data={temp}
                items={item}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                cardIndex={cardIndex}
                setcardIndex={setcardIndex}
                index={index}
                orderId={params?.orderId}
              />
            </div>
          );
        })}

        <MonthlyCard
          data={apiData}
          monthlyCardIsChecked={monthlyCardIsChecked}
          setmonthlyCardIsChecked={setmonthlyCardIsChecked}
          orderId={params?.orderId}
        />
      </div>
    </div>
  );
}

export default TenureExtension;
