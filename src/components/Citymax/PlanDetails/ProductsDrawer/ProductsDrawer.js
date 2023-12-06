import React, {useState} from "react";
import styles from "./styles.module.css";
// import {Drawer} from "@mui/material";
// import {Close} from "@/assets/icon";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";

const ProductsDrawer = ({handleAddItem}) => {
  // const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState(Array(4).fill(0));

  // const handleresize = e => {
  //   if (window.innerWidth < 768) {
  //     setIsBottomDrawer(true);
  //   } else {
  //     setIsBottomDrawer(false);
  //   }
  // };

  const handleThumbnailClick = (setIndex, index) => {
    const newSelectedIndexes = [...selectedIndexes];
    newSelectedIndexes[setIndex] = index;
    setSelectedIndexes(newSelectedIndexes);
  };

  // React.useEffect(() => {
  //   handleresize();
  //   window.addEventListener("resize", handleresize);
  //   return () => {
  //     window.removeEventListener("resize", handleresize);
  //   };
  // }, []);

  const productsArr = [{isAlt: true}, {}, {}, {}];

  return (
    <div>
      {/* <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        classes={{paper: styles.customDrawer}}>
        {" "}
        <div className={styles.main_container}>
          <div className={styles.close_icon} onClick={toggleDrawer}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div> */}

      <h2 className={styles.header}>Add a product</h2>
      <div className={styles.main_wrapper}>
        {productsArr.map((item, mainIndex) => (
          <>
            <div key={mainIndex}>
              <ProductCard
                handleThumbnailClick={handleThumbnailClick}
                length={productsArr.length}
                mainIndex={mainIndex}
                item={item}
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
    // </Drawer>
    // </div>
  );
};

export default ProductsDrawer;
