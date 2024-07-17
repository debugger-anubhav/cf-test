import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close} from "../../../assets/icon";
import {setKycScreenName, setStageId} from "@/store/Slices";

export default function FinancialQueDrawer({changeState, docsDetailsData}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const [isOpen, setIsOpen] = React.useState(true);
  const [isBottomShareDrawer, setIsBottomShareDrawer] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [qusScreenData, setQusScreenData] = useState(docsDetailsData);

  const userId = decrypt(getLocalStorage("_ga"));

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  const toggleDrawer = open => event => {
    setIsOpen(open);
  };

  React.useEffect(() => {
    changeState(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  useState(() => {
    setQusScreenData(docsDetailsData);
  }, [docsDetailsData]);

  const handleVerfyAns = () => {
    baseInstance
      .post(endPoints.kycPage.verifyCrifAnswer, {
        orderId: docsDetailsData?.data?.orderId,
        reportId: docsDetailsData?.data?.reportId,
        encode: docsDetailsData?.encode,
        answer: selectedOption,
        placedOrderId: data?.dealCodeNumber,
        userId,
      })
      .then(res => {
        setQusScreenData(res?.data?.data);
        if (res?.data?.data?.status === false) {
          toggleDrawer(false);
        }
        if (res?.data?.data?.message === "Error while verifying the details") {
          dispatch(setKycScreenName("financialInfo"));
          dispatch(setStageId(2));
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (qusScreenData?.data?.cibilScore > 650) {
      dispatch(setKycScreenName("professionalDetails"));
      dispatch(setStageId(3));
    }
    if (qusScreenData?.data?.cibilScore < 650) {
      dispatch(setKycScreenName("financialInfo"));
      dispatch(setStageId(2));
    }
  }, [qusScreenData]);

  return (
    <div>
      <Drawer
        anchor={isBottomShareDrawer ? "bottom" : "right"}
        open={isOpen}
        onClose={toggleDrawer(false)}>
        <div className={styles.drawer_content_wrapper}>
          <div className={`${styles.heading}`}>
            Questions :
            <span
              onClick={event => {
                event.stopPropagation();
                toggleDrawer(false)();
              }}>
              <Close size={25} className={"cursor-pointer relative z-20"} />
            </span>
          </div>
          <div>
            <div className="font-Poppins text-71717A text-base font-medium lg:py-8 py-6 ">
              {qusScreenData?.data?.question}
            </div>
            <div className="flex flex-col w-[90%] gap-2">
              {qusScreenData?.data?.optionsList?.map((item, index) => {
                return (
                  <label
                    className="flex gap-3 items-center cursor-pointer"
                    key={index.toString()}>
                    <input
                      type="radio"
                      className={styles.radio_button}
                      name="radioGroup"
                      onChange={() => setSelectedOption(item)}
                      checked={selectedOption === item}
                    />
                    <p className="border w-full border-DDDDDF p-4 rounded-xl text-16 font-Poppins tracking-0.3 leading-6">
                      {item}
                    </p>
                  </label>
                );
              })}
            </div>

            <button
              className={`${styles.cancle_btn} !w-[80%]`}
              onClick={() => {
                handleVerfyAns();
              }}>
              Proceed
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
