import React, {useState} from "react";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {productPageImagesBaseUrl} from "@/constants/constant";

const ItemsIncluded = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const pageDetails = useSelector(
    state => state.productPageData.singleProductDetails[0],
  );
  console.log(pageDetails, "pagejkl");
  if (pageDetails?.subProduct?.length > 0) {
    return (
      <div className={styles.main_container}>
        <h2 className={styles.header}>
          {pageDetails?.subProduct?.length} product included
        </h2>
        <div className={styles.images_wrappper}>
          {pageDetails?.subProduct?.map((item, index) => (
            <div
              onClick={() => setSelectedItem(index)}
              className={`border-[4px] p-1 ${
                selectedItem === index ? "border-[#5F789D]" : "border-fff"
              }`}
              key={index}>
              <img
                src={`${productPageImagesBaseUrl + item.image.split(",")[0]}`}
                className={styles.img}
              />
            </div>
          ))}
        </div>
        <div>
          {pageDetails?.subProduct?.map((item, index) => (
            <div
              key={index}
              className={`${
                selectedItem === index ? "flex flex-col lg:flex-row" : "hidden"
              } ${styles.info_wrapper}`}>
              <div className={styles.left_div}>
                <p className={styles.info_subhead}>Product Information</p>
                <div className={styles.info_list}>
                  <div className={styles.info_row}>
                    <p className={styles.label}>Name</p>
                    <p className={styles.colon}>:</p>
                    <p className={styles.info_details}>{item.product_name}</p>
                  </div>

                  <div className={styles.info_row}>
                    <p className={styles.label}>Brand</p>
                    <p className={styles.colon}>:</p>
                    <p className={styles.info_details}>{item.brand}</p>
                  </div>

                  <div className={styles.info_row}>
                    <p className={styles.label}>Size</p>
                    <p className={styles.colon}>:</p>
                    <p className={styles.info_details}>{item.dimension}</p>
                  </div>

                  <div className={styles.info_row}>
                    <p className={styles.label}>Material</p>
                    <p className={styles.colon}>:</p>
                    <p className={styles.info_details}>{item.material}</p>
                  </div>

                  <div className={styles.info_row}>
                    <p className={styles.label}>Color</p>
                    <p className={styles.colon}>:</p>
                    <p className={styles.info_details}>{item.colour}</p>
                  </div>
                </div>
              </div>
              {item.features && (
                <div className={styles.right_div}>
                  <p className={styles.info_subhead}>Features</p>
                  <div className={styles.features_wrappers}>
                    {item.features?.map((feature, index) => (
                      <li key={index} className={styles.feature}>
                        <div className={styles.dot}></div>
                        {feature}
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ItemsIncluded;
