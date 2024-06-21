import React, {useEffect, useState} from "react";
import {BackIcon} from "@/assets/icon";
import styles from "../../ServiceRequests/style.module.css";
import {productPageImagesBaseUrl} from "@/constants/constant";
import {Skeleton} from "@mui/material";
import {Close} from "../../../assets/icon";

function SelectOptDrawer({
  optionsData,
  setOpenDrawer,
  loadingSkeleton,
  setSelectedOption,
  selectedOption,
}) {
  const [data, setData] = useState(optionsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(loadingSkeleton);
  }, [loadingSkeleton]);

  useEffect(() => {
    setData(optionsData);
  }, [optionsData]);

  return (
    <div className={`${styles.content_wrapper} overflow-auto`}>
      <div className="flex w-full justify-between ">
        <div className={styles.main_heading}>
          <BackIcon
            onClick={() => setOpenDrawer(false)}
            className={"cursor-pointer"}
          />
          Select order
        </div>
        <div onClick={() => setOpenDrawer(false)} className="h-[24px]">
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
      </div>
      {loading ? (
        <div className={styles.create_new_request_skeleton_wrapper}>
          <Skeleton variant="text" width={"90%"} height={30} />
          <Skeleton variant="text" width={"90%"} height={30} />
          <Skeleton variant="text" width={"90%"} height={30} />
          <Skeleton variant="text" width={"90%"} height={30} />
        </div>
      ) : (
        <div className={`${styles.info_wrapper} mt-8`}>
          {data?.map((item, index) => {
            const parsedData = JSON.parse(item?.fc_paymentData);
            const arr =
              parsedData.length > 4 ? parsedData.slice(0, 3) : parsedData;
            return (
              <div
                key={index.toString()}
                className={styles.order_row}
                onClick={() => {
                  setSelectedOption(index);
                  setOpenDrawer(false);
                }}>
                <input
                  type="radio"
                  className={styles.radio_button}
                  name="radioGroup"
                  onChange={() => setSelectedOption(index)}
                  checked={selectedOption === index}
                />
                <div className={styles.images_wraper}>
                  {arr?.map((ele, i) => {
                    return (
                      <div key={i.toString()}>
                        {" "}
                        <img
                          src={`${
                            productPageImagesBaseUrl +
                            "thumb/" +
                            ele.product_image?.split(",")[0]
                          }`}
                          alt={ele?.product_name}
                          className={`${
                            parsedData.length === 1
                              ? "w-full h-full"
                              : parsedData.length === 2
                              ? `w-[48px] h-[48px] absolute ${
                                  i === 0 ? "top-0 left-0" : "bottom-0 right-0"
                                }`
                              : "w-[37px] h-[37px]"
                          } rounded-lg object-cover`}
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                  {parsedData?.length > 4 && (
                    <div className={styles.counter_box}>
                      +{parsedData?.length - 3}
                    </div>
                  )}
                </div>
                <label className="cursor-pointer text-71717A">
                  Order no: #
                  <span className="text-71717A">{item?.dealCodeNumber}</span>
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
    //   {/* <div
    //     className={styles.bottom_row}
    //    >
    //     <button
    //       className={`${styles.proceed_btn} ${
    //         selectedOption === null
    //           ? "!bg-[#FFDF85] !cursor-not-allowed"
    //           : ``
    //       }`}
    //       disabled={selectedOption === null}>
    //       Proceed <ForwardArrowWithLine />
    //     </button>
    //   </div> */}
  );
}

export default SelectOptDrawer;
