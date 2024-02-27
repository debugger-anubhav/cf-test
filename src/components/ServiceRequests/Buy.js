import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
// import Checkbox from "@mui/material/Checkbox";
import {
  productPageImagesBaseUrl,
  CreateRequestPayload,
} from "@/constants/constant";
import PickupReasonOptions from "./PickupReasonOptions";
import {useSelector} from "react-redux";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";

function Buy({heading, prevScreen, data}) {
  const {trailCreateSR} = CommonCreateRequestApi();
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const label = {inputProps: {"aria-label": "Checkbox demo"}};
  const [showPickupReason, setShowPickupReason] = useState(false);
  const [Screen, setScreen] = useState(1);
  const [description, setDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pickupRequestType, setPickupRequestType] = useState("");

  const handleChangeCheckbox = (index, e) => {
    const productName = e.target.value;
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(productName)) {
        return prevSelected.filter(name => name !== productName);
      } else {
        return [...prevSelected, productName];
      }
    });
  };

  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (data) {
      const s = new Set();
      for (let i = 0; i <= data.length - 1; i++) {
        s.add(data[i]?.product_name);
      }
      setArr([...s]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedProducts.slice(",").length === arr.length) {
      setPickupRequestType("Full");
    } else {
      setPickupRequestType("Partial");
    }
  }, [selectedProducts, arr]);

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      selected_product_name: selectedProducts.join(", "),
      description,
    };
    trailCreateSR(payload);
  };

  return (
    <>
      {showPickupReason && Screen === 2 ? (
        <PickupReasonOptions
          setScreen={setScreen}
          selectedProducts={selectedProducts}
          data={data}
          pickupRequestType={pickupRequestType}
        />
      ) : (
        <div className={styles.content_wrapper}>
          <div className={styles.main_heading}>
            <BackIcon
              onClick={() => {
                prevScreen(true);
              }}
              className={"cursor-pointer"}
            />
            {heading}
          </div>

          <div className={styles.buy_info}>
            {heading === "Buy" && (
              <p className={styles.desc}>
                We are glad that you liked our products and considering to buy
                them.
              </p>
            )}
            {heading === "Request order pickup" ? (
              <p className={`${styles.desc}`}>Select products for pickup</p>
            ) : (
              <p className={`${styles.desc} ${heading === "Buy" && "mt-8"}`}>
                Select products to <span className="lowercase">{heading}</span>
              </p>
            )}
            <div className="product_to_buy_wrapper">
              {data?.map((item, index) => (
                <div key={index.toString()} className={"buy_checkbox_info"}>
                  <input
                    {...label}
                    type="checkbox"
                    id={index}
                    name={item?.product_name}
                    value={item?.product_name}
                    className="w-6 h-6 rounded cursor-pointer"
                    checked={selectedProducts.includes(item.product_name)}
                    onChange={e => handleChangeCheckbox(index, e)}
                  />
                  {/* <Checkbox
                    {...label}
                    onChange={e => handleChangeCheckbox(index, e)}
                    checked={selectedProducts.includes(item.product_name)}
                    value={item.product_name}
                  /> */}
                  <img
                    className={styles.product_imge_thambnil}
                    src={`${
                      productPageImagesBaseUrl +
                      "thumb/" +
                      item?.product_image?.split(",")[0]
                    }`}
                    alt={item?.product_name}
                    loading="lazy"
                  />
                  <p className={styles.desc}>{item?.product_name}</p>
                </div>
              ))}
            </div>
            {heading !== "Request order pickup" ? (
              <>
                <div className="mt-8">
                  <p className={styles.desc}>Your comment (optional)</p>
                  <textarea
                    placeholder="Please share any specific instructions or provide feedback."
                    className={styles.form_input_textarea}
                    onChange={e => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className={styles.bottom_row}>
                  <div className={styles.bottom_line}></div>
                  <button
                    className={`${styles.proceed_btn} ${
                      selectedProducts.length === 0
                        ? "!bg-[#FFDF85] !cursor-not-allowed"
                        : ``
                    }`}
                    onClick={() => handleCreateRequest()}>
                    Create request <ForwardArrowWithLine />
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.bottom_row}>
                <div className={styles.bottom_line}></div>
                <button
                  className={`${styles.proceed_btn} ${
                    selectedProducts.length === 0
                      ? "!bg-[#FFDF85] !cursor-not-allowed"
                      : ``
                  }`}
                  onClick={() => {
                    setShowPickupReason(true);
                    setScreen(2);
                  }}>
                  Proceed <ForwardArrowWithLine />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Buy;
