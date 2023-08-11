import React from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
import {HomePageImages} from "@/assets/images";

const CompleteTheLook = ({heading, isbg}) => {
  // const tabBox = document.querySelector("#gallery");

  // let isDragging = false;

  // const dragging = e => {
  //   if (!isDragging) return;
  //   tabBox.scrollLeft -= e.movementX;
  // };
  // const dragStop = () => {
  //   isDragging = false;
  // };

  // tabBox?.addEventListener("mousedown", () => (isDragging = true));
  // tabBox?.addEventListener("mousemove", dragging);
  // document.addEventListener("mouseup", dragStop);

  // const scrollRef = useHorizontalScroll();

  const arr = [
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
    {
      image: HomePageImages.bedroom,
      price: "709",
      product_sale_price: "899",
      product_name: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
  ];
  return (
    <div
      className={styles.main_container}
      style={{
        background: isbg
          ? "linear-gradient(136deg, rgba(250, 247, 172, 0.00) 0%, rgba(219, 240, 229, 0.70) 100%)"
          : "none",
      }}>
      <h2 className={styles.heading}>{heading}</h2>

      <div className={styles.recentlyViewed_main} id="gallery">
        {arr?.map((item, index) => (
          <div key={index}>
            <Card
              cardImage={item.image}
              discount={"60%"}
              originalPrice={item?.price}
              currentPrice={item?.product_sale_price}
              desc={item?.product_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompleteTheLook;
