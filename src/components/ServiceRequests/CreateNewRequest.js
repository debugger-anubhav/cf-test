import React, {useEffect, useState} from "react";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import styles from "./style.module.css";
import {productPageImagesBaseUrl} from "@/constants/constant";

function CreateNewRequest({createRequestData}) {
  const [data, setData] = useState(createRequestData);

  useEffect(() => {
    setData(createRequestData);
  }, []);

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Create a new request
      </div>

      <div className={styles.sub_heading}>
        Select the order for which you would like to raise a request
      </div>

      <div className={styles.info_wrapper}>
        {data?.map((item, index) => {
          const parsedData = JSON.parse(item?.fc_paymentData);
          const arr =
            parsedData.length > 4 ? parsedData.slice(0, 3) : parsedData;
          return (
            <div key={index.toString()} className={styles.order_row}>
              <input
                type="radio"
                className={styles.radio_button}
                name="radioGroup"
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
              <label>Order no:#{item?.dealCodeNumber}</label>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom_row}>
        <button className={styles.proceed_btn}>
          Proceed <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default CreateNewRequest;
