import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import {useParams} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {productImageBaseUrl} from "@/constants/constant";
import {SwapIcon} from "@/assets/icon";

const ProductsDrawer = ({
  handleAddItem,
  slotId,
  roomId,
  headType,
  swapProductDetails,
  toggleLoginModal,
  toggleDrawer,
}) => {
  const [selectedIndexes, setSelectedIndexes] = useState(Array(4).fill(0));
  const [productsArr, setProductsArr] = useState();
  const [upgradedProductsArr, setUpgradedProductsArr] = useState();
  const params = useParams();
  const fetchAssociatedSlotData = () => {
    const body = {
      product_id: params.planId,
      room_id: roomId,
      slot_id: slotId,
      cityId: 46,
    };
    axios
      .post(baseURL + endPoints.cityMaxPage.getAssociateSlotData, body)
      .then(res => {
        setProductsArr(res?.data?.data?.associated_products);
        setUpgradedProductsArr(res?.data?.data?.associated_premium_products);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAssociatedSlotData();
  }, []);

  const handleThumbnailClick = (setIndex, index) => {
    const newSelectedIndexes = [...selectedIndexes];
    newSelectedIndexes[setIndex] = index;
    setSelectedIndexes(newSelectedIndexes);
  };

  // const productsArr = [{isAlt: true}, {}, {}, {}];

  return (
    <div>
      <h2 className={styles.header}>
        {headType === 1 ? "Add a product" : "Swap product"}
      </h2>
      {headType === 2 && (
        <div className={styles.swap_div}>
          <div className={styles.swap_prod_wrapper}>
            <div>
              <p className={styles.selec_prod_label}>Selected product:</p>
              <p className={styles.swap_prod_name}>{swapProductDetails.name}</p>
            </div>
            <div className={styles.swap_icon_wrapper}>
              <img
                src={productImageBaseUrl + swapProductDetails.img}
                className={styles.swap_prod_img}
              />
              <SwapIcon className={styles.swap_icon} />
            </div>
          </div>
          <p className={`font-medium ${styles.selec_prod_label}`}>
            Select product to swap to
          </p>
        </div>
      )}
      <div className={styles.main_wrapper}>
        {productsArr?.map((item, mainIndex) => (
          <>
            <div key={mainIndex}>
              <ProductCard
                handleThumbnailClick={handleThumbnailClick}
                length={productsArr.length}
                mainIndex={mainIndex}
                item={item.productDetails[0]}
                quantity={item.city_quantity}
                selectedIndexes={selectedIndexes}
                handleAddItem={handleAddItem}
                toggleLoginModal={toggleLoginModal}
                toggleDrawer={toggleDrawer}
              />
            </div>
            {mainIndex < length - 1 && (
              <div className={styles.line_break}></div>
            )}
          </>
        ))}
      </div>

      <div>
        {upgradedProductsArr?.length > 0 && (
          <>
            <div>
              <p className={styles.optional_text}>Optional Upgrades</p>
              <p className={styles.info_details}>
                Pay little bit extra and upgrade to any of the following
                products...
              </p>
            </div>

            <div className={styles.main_wrapper}>
              {upgradedProductsArr?.map((item, mainIndex) => (
                <>
                  <div key={mainIndex}>
                    <ProductCard
                      handleThumbnailClick={handleThumbnailClick}
                      length={productsArr.length}
                      mainIndex={mainIndex}
                      item={item.productDetails[0]}
                      quantity={item.city_quantity}
                      selectedIndexes={selectedIndexes}
                      handleAddItem={handleAddItem}
                      toggleDrawer={toggleDrawer}
                      toggleLoginModal={toggleLoginModal}
                    />
                  </div>
                  {mainIndex < length - 1 && (
                    <div className={styles.line_break}></div>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsDrawer;
