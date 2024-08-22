import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useParams, useRouter, useSearchParams} from "next/navigation";
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
  const router = useRouter();

  const source = useSearchParams().get("data");

  let currentUrl;
  if (typeof window !== "undefined") {
    currentUrl = window?.location?.href;
  }
  const [isChecked, setIsChecked] = useState(true);
  const [monthlyCardIsChecked, setmonthlyCardIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCityShieldApplied, setIsCityShieldApplied] = useState(null);
  const [calledparentApi, setCalledparentApi] = useState(false);
  const [dealCodeNumber, setDealCodeNumber] = useState();

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
        {label: "3 Months", value: 3},
        {label: "4 Months", value: 4},
        {label: "5 Months", value: 5},
      ],
    },
  ];
  const [isCheckedArray, setIsCheckedArray] = useState(
    Array(CardData.length).fill(true),
  );
  const parentApi = async orderId => {
    baseInstance
      .get(endPoints.tenureExtension, {
        params: {
          dealCodeNumber: orderId,
          recurringId: params?.recurringId,
        },
      })
      .then(res => {
        if (res?.data?.data?.totalPrice === 0) router.push("/");
        else {
          setIsCityShieldApplied(res?.data?.data?.isCityShieldApplied);
          setCalledparentApi(true);
        }
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setCalledparentApi(true);
      });
  };

  const getDealCodeNumber = async () => {
    try {
      const response = await baseInstance.get(
        endPoints.getDealCodeNumberFromRecId(params?.recurringId),
      );
      console.log(response, "responses");
      setDealCodeNumber(response?.data?.data?.dealcodenumber);
      parentApi(response?.data?.data?.dealcodenumber);
    } catch (error) {
      console.log(error?.message || "some error");
    }
  };

  useEffect(() => {
    getDealCodeNumber();
    console.log(isChecked);
    // parentApi();
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
      <h1 className={styles.main_heading}>Tenure Extension</h1>
      <div className={styles.order_row}>
        Your Order ID:
        <span className="font-medium ml-2">#{dealCodeNumber}</span>
      </div>
      {calledparentApi ? (
        <div className="my-8 flex flex-wrap gap-8 md:justify-start justify-center">
          <LongTermCard
            items={CardData[0]}
            isChecked={isCheckedArray[0]}
            setIsChecked={isChecked => handleSetIsChecked(0, isChecked)}
            recurringId={params?.recurringId}
            setLoading={setLoading}
            dealCodeNumber={dealCodeNumber}
            isCityShieldApplied={isCityShieldApplied}
            source={source}
          />

          <MidTermCard
            items={CardData[1]}
            isChecked={isCheckedArray[1]}
            setIsChecked={isChecked => handleSetIsChecked(1, isChecked)}
            recurringId={params?.recurringId}
            setLoading={setLoading}
            dealCodeNumber={dealCodeNumber}
            isCityShieldApplied={isCityShieldApplied}
            source={source}
          />
          <ShortTermCard
            items={CardData[2]}
            isChecked={isCheckedArray[2]}
            setIsChecked={isChecked => handleSetIsChecked(2, isChecked)}
            recurringId={params?.recurringId}
            setLoading={setLoading}
            dealCodeNumber={dealCodeNumber}
            isCityShieldApplied={isCityShieldApplied}
            source={source}
          />
          {!currentUrl?.includes("?data=1") && (
            <MonthlyCard
              dealCodeNumber={dealCodeNumber}
              monthlyCardIsChecked={monthlyCardIsChecked}
              setmonthlyCardIsChecked={value => setmonthlyCardIsChecked(value)}
              isCityShieldApplied={isCityShieldApplied}
              recurringId={params?.recurringId}
              setLoading={setLoading}
              source={source}
            />
          )}
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
