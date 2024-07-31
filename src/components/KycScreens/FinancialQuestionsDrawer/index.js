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
import docStyle from "../../DocumentsPage/style.module.css";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";

export default function FinancialQueDrawer({
  changeState,
  docsDetailsData,
  getDashboardDetailsApi,
}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const pendingDashboardDetail = useSelector(
    state => state.kycPage.pendingDashboardDetail,
  );

  const [isOpen, setIsOpen] = React.useState(true);
  const [isBottomShareDrawer, setIsBottomShareDrawer] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [qusScreenData, setQusScreenData] = useState(docsDetailsData);
  const [showSimpleLoader, setShowSimpleLoader] = useState(false);

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

  useEffect(() => {
    changeState(isOpen);
  }, [isOpen]);

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const handleGetDashbord = () => {
    getDashboardDetailsApi().then(res => {
      console.log(res, "resssssssss");
      const pendingStage = pendingDashboardDetail?.filter(
        i => i.stage_status === 0 || i.stage_status === 3,
      );
      console.log(pendingStage, "pendingStage");
      if (pendingStage.length > 0) {
        const ID = pendingStage?.[0]?.id;
        changeState(false);

        if (ID === 2) {
          dispatch(setKycScreenName("financialInfo"));
        }
        if (ID === 3) {
          dispatch(setKycScreenName("professionalDetails"));
        }
        if (ID === 6) {
          dispatch(setKycScreenName("autoPay"));
        }
        if (ID === 7) {
          dispatch(setKycScreenName("educationalDetails"));
        }
      } else {
        dispatch(setKycScreenName("congratulation"));
      }
    });
  };
  useState(() => {
    setQusScreenData(docsDetailsData);
  }, [docsDetailsData]);

  const handleVerfyAns = () => {
    setShowSimpleLoader(true);
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
          changeState(false);
        } else {
          handleGetDashbord();
        }
        if (res?.data?.data?.message === "Error while verifying the details") {
          dispatch(setKycScreenName("financialInfo"));
          dispatch(setStageId(2));
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }
        setShowSimpleLoader(false);
      })
      .catch(err => {
        console.log(err);
        setShowSimpleLoader(false);
      });
  };

  useEffect(() => {
    if (qusScreenData?.data?.cibilScore > 650) {
      changeState(false);
      handleGetDashbord();
      // dispatch(setKycScreenName("professionalDetails"));
      dispatch(setStageId(3));
    }
    if (qusScreenData?.data?.cibilScore < 650) {
      changeState(false);
      dispatch(setKycScreenName("financialInfo"));
      dispatch(setStageId(2));
    }
  }, [qusScreenData]);

  return (
    <div>
      <Drawer
        anchor={isBottomShareDrawer ? "bottom" : "right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{paper: styles.rightDrawer}}
        transitionDuration={{enter: 400, exit: 200}}>
        <div className={styles.common_drawer_wrapper}>
          <div className="w-full">
            <div className={styles.mobile_close_icon}>
              <div
                onClick={event => {
                  event.stopPropagation();
                  toggleDrawer(false)();
                }}
                className="h-[24px]">
                <Close color={"#45454A"} size={24} className="cursor-pointer" />
              </div>
            </div>
            <div className={styles.content_wrapper}>
              <div className={`${styles.heading} items-baseline`}>
                Questions :
              </div>
              <div>
                <div className="font-Poppins text-71717A text-base font-medium lg:py-8 py-6 ">
                  {qusScreenData?.data?.question}
                </div>
                <div className="flex flex-col md:w-[90%] w-full gap-2">
                  {qusScreenData?.data?.optionsList?.map((item, index) => {
                    return (
                      <div
                        className={`${docStyle.value_box} mb-2`}
                        key={index.toString()}
                        onClick={() => setSelectedOption(item)}>
                        <label className={docStyle.radio_container}>
                          <input
                            type="radio"
                            name="value"
                            value={item}
                            checked={selectedOption === item}
                            onChange={() => setSelectedOption(item)}
                            className={docStyle.radio_input}
                          />
                          <span className={docStyle.radio_checkmark}></span>
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <button
                  className={`${styles.cancle_btn} !w-[90%] !hidden md:!flex`}
                  onClick={() => {
                    handleVerfyAns();
                  }}>
                  Proceed
                </button>

                <div className={styles.sticky_btn_wrapper}>
                  <button
                    onClick={() => {
                      handleVerfyAns();
                    }}
                    className={`${styles.proceed}`}>
                    proceed
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className={`md:flex hidden `}>
            <div
              onClick={event => {
                event.stopPropagation();
                toggleDrawer(false)();
              }}
              className={styles.web_close_icon_wrapper}>
              <Close
                color={"#45454A"}
                size={24}
                className="cursor-pointer "
                onClick={event => {
                  event.stopPropagation();
                  toggleDrawer(false)();
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
      {showSimpleLoader && <LoaderComponent loading={showSimpleLoader} />}
    </div>
  );
}
