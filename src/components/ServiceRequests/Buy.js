import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import Checkbox from "@mui/material/Checkbox";
import {productPageImagesBaseUrl} from "@/constants/constant";

function Buy({heading, prevScreen, data}) {
  const label = {inputProps: {"aria-label": "Checkbox demo"}};
  const [selected, setSelected] = useState(false);

  const handleChangeCheckbox = () => {
    setSelected(event.target.checked);
  };
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon onClick={() => prevScreen(true)} />
        {heading}
      </div>

      <div className={styles.buy_info}>
        {heading === "Buy" && (
          <p className={styles.desc}>
            We are glad that you liked our products and considering to buy them.
          </p>
        )}
        <p className={`${styles.desc} ${heading === "Buy" && "mt-8"}`}>
          Select products to <span className="lowercase">{heading}</span>
        </p>
        <div className="product_to_buy_wrapper">
          {data?.map((item, index) => (
            <div key={index.toString()} className={"buy_checkbox_info"}>
              <Checkbox {...label} onChange={handleChangeCheckbox} />
              <img
                className={styles.product_imge_thambnil}
                src={`${
                  productPageImagesBaseUrl +
                  "thumb/" +
                  item?.product_image?.split(",")[0]
                }`}
                alt={item?.product_name}
              />
              <p className={styles.desc}>{item?.product_name}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className={styles.desc}>Your comment (optional)</p>
          <input
            type="text"
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
          />
        </div>

        <div className={styles.bottom_row}>
          <button
            className={`${styles.proceed_btn} ${
              !selected ? "!bg-[#FFDF85] !cursor-not-allowed" : ``
            }`}>
            Create request <ForwardArrowWithLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
