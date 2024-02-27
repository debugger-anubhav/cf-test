import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useParams} from "next/navigation";
import {endPoints} from "@/network/endPoints";
import LoaderComponent from "../Common/Loader/LoaderComponent";
import LongTermCard from "./Cards/LongTermCard";
import MidTermCard from "./Cards/MidTermCard";
import ShortTermCard from "./Cards/ShortTermCard";
import {MonthlyCard} from "./Cards";
import {Skeleton} from "@mui/material";
import {baseInstance} from "@/network/axios";

function TenureExtension() {
  const params = useParams();
  const [isChecked, setIsChecked] = useState(true);
  const [monthlyCardIsChecked, setmonthlyCardIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCityShieldApplied, setIsCityShieldApplied] = useState(null);
  const [calledParantApi, setCalledParantApi] = useState(false);

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
  const [isCheckedArray, setIsCheckedArray] = useState(
    Array(CardData.length).fill(true),
  );
  console.log(isChecked, "checking");
  const parantApi = () => {
    baseInstance
      .get(endPoints.tenureExtension, {
        params: {
          dealCodeNumber: params?.orderId,
        },
      })
      .then(res => {
        setIsCityShieldApplied(res?.data?.data?.isCityShieldApplied);
        setCalledParantApi(true);
      })
      .catch(err => {
        console.log(err);
        setCalledParantApi(true);
      });
  };

  useEffect(() => {
    parantApi();
  }, []);

  const handleSetIsChecked = (index, isChecked) => {
    const newArray = [...isCheckedArray];
    newArray[index] = isChecked;
    setIsCheckedArray(newArray);
    setIsChecked(isChecked);
  };

  return (
    <div className={styles.wrapper}>
      {loading && <LoaderComponent loading={loading} />}
      <div className={styles.main_heading}>Tenure Extension</div>
      <div className={styles.order_row}>
        Your Order ID:
        <span className="font-medium ml-2">#{params?.orderId}</span>
      </div>
      {calledParantApi ? (
        <div className="my-8 flex flex-wrap gap-8 md:justify-start justify-center">
          <LongTermCard
            items={CardData[0]}
            isChecked={isCheckedArray[0]}
            setIsChecked={isChecked => handleSetIsChecked(0, isChecked)}
            orderId={params?.orderId}
            setLoading={setLoading}
            dealCodeNumber={params?.orderId}
            isCityShieldApplied={isCityShieldApplied}
          />

          <MidTermCard
            items={CardData[1]}
            isChecked={isCheckedArray[1]}
            setIsChecked={isChecked => handleSetIsChecked(1, isChecked)}
            orderId={params?.orderId}
            setLoading={setLoading}
            dealCodeNumber={params?.orderId}
            isCityShieldApplied={isCityShieldApplied}
          />
          <ShortTermCard
            items={CardData[2]}
            isChecked={isCheckedArray[2]}
            setIsChecked={isChecked => handleSetIsChecked(2, isChecked)}
            orderId={params?.orderId}
            setLoading={setLoading}
            dealCodeNumber={params?.orderId}
            isCityShieldApplied={isCityShieldApplied}
          />
          <MonthlyCard
            dealCodeNumber={params?.orderId}
            monthlyCardIsChecked={monthlyCardIsChecked}
            setmonthlyCardIsChecked={value => setmonthlyCardIsChecked(value)}
            orderId={params?.orderId}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <div className="flex gap-8 mt-4 flex-wrap">
          {[1, 2, 3, 4].map(item => {
            return (
              <Skeleton
                key={item.toString()}
                variant="rectangular"
                width={300}
                height={400}
                className="w-full h-full"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TenureExtension;
