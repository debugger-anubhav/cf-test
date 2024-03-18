import React, {useEffect, useState} from "react";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import styles from "./style.module.css";
import {productPageImagesBaseUrl} from "@/constants/constant";
import ServiceRequestType from "./ServiceRequestType";
import {Skeleton} from "@mui/material";

function CreateNewRequest({createRequestData, setOpenDrawer, loadingSkeleton}) {
  const [data, setData] = useState(createRequestData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextComponent, setShowNextComponent] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleProceed = () => {
    setShowNextComponent(true);
  };

  useEffect(() => {
    setLoading(loadingSkeleton);
  }, [loadingSkeleton]);

  useEffect(() => {
    setData(createRequestData);
  }, [createRequestData]);

  return (
    <>
      {showNextComponent ? (
        <ServiceRequestType
          orderId={data[selectedOption]?.dealCodeNumber}
          title={"Service request type"}
          setShowNextComponent={setShowNextComponent}
        />
      ) : (
        <>
          <div className={styles.content_wrapper}>
            <div className={styles.main_heading}>
              <BackIcon
                onClick={() => setOpenDrawer(false)}
                className={"cursor-pointer"}
              />
              Create a new request
            </div>

            <div className={styles.sub_heading}>
              Select the order for which you would like to raise a request
            </div>
            {loading ? (
              <div className="flex gap-4 flex-col">
                <Skeleton variant="text" width={"100%"} height={30} />
                <Skeleton variant="text" width={"100%"} height={30} />
                <Skeleton variant="text" width={"100%"} height={30} />
                <Skeleton variant="text" width={"100%"} height={30} />
              </div>
            ) : (
              <div className={styles.info_wrapper}>
                {data?.map((item, index) => {
                  const parsedData = JSON.parse(item?.fc_paymentData);
                  const arr =
                    parsedData.length > 4 ? parsedData.slice(0, 3) : parsedData;
                  return (
                    <div
                      key={index.toString()}
                      className={styles.order_row}
                      onClick={() => setSelectedOption(index)}>
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
                                        i === 0
                                          ? "top-0 left-0"
                                          : "bottom-0 right-0"
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
                        <span className="text-71717A">
                          {item?.dealCodeNumber}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className={styles.bottom_row}
            onClick={() => selectedOption && handleProceed()}>
            <button
              className={`${styles.proceed_btn} ${
                selectedOption === null
                  ? "!bg-[#FFDF85] !cursor-not-allowed"
                  : ``
              }`}
              onClick={() => handleProceed()}
              disabled={selectedOption === null}>
              Proceed <ForwardArrowWithLine />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CreateNewRequest;
