import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import {useParams} from "next/navigation";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const ProductsDrawer = ({handleAddItem, slotId, roomId}) => {
  const [selectedIndexes, setSelectedIndexes] = useState(Array(4).fill(0));
  const [productsArr, setProductsArr] = useState();
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
      <h2 className={styles.header}>Add a product</h2>
      <div className={styles.main_wrapper}>
        {productsArr?.map((item, mainIndex) => (
          <>
            <div key={mainIndex}>
              <ProductCard
                handleThumbnailClick={handleThumbnailClick}
                length={productsArr.length}
                mainIndex={mainIndex}
                item={item.productDetails[0]}
                selectedIndexes={selectedIndexes}
                handleAddItem={handleAddItem}
              />
            </div>
            {mainIndex < length - 1 && (
              <div className={styles.line_break}></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductsDrawer;
