import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";
import {setLocalStorage} from "@/constants/constant";

const SubCategorySection = () => {
  const [windowSize, setWindowSize] = React.useState([
    window?.innerWidth,
    window?.innerHeight,
  ]);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const data = homePageReduxData?.allAndSubCategory;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window?.innerWidth, window?.innerHeight]);
    };

    window?.addEventListener("resize", handleWindowResize);

    return () => {
      window?.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {data?.map((item, index) => {
        return (
          <div key={index.toString()}>
            <div
              className={
                item?.cat_name === "Home Furniture"
                  ? styles.heading_container_home_furniture
                  : styles.heading_container
              }>
              <h2 className={styles.heading}>{item?.cat_name}</h2>
              <div className={styles.viewButton}>
                <a
                  href={`/${homePageReduxData?.cityName
                    .replace(/\//g, "-")
                    .toLowerCase()}/${item?.seourl}`}
                  onClick={() => {
                    setLocalStorage("categoryId", item?.id);
                    setLocalStorage("category", item?.cat_name);
                    setLocalStorage("subCategory", "All");
                    setLocalStorage("subCategoryId", item?.id);
                  }}
                  className={styles.viewAllText}>
                  {windowSize[0] > 450
                    ? `View all ${item?.cat_name}`
                    : "View all"}
                </a>
                <ForwardArrow
                  size={windowSize[0] > 768 ? 20 : 16}
                  color={"#597492"}
                />
              </div>
            </div>

            <Cards subCategory={item?.sub_categories} />
          </div>
        );
      })}
    </div>
  );
};

const Cards = ({subCategory}) => {
  const refElement = useRef(null);
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [isDumy, setIsDumy] = React.useState(false);
  const handleScrolling = () => {
    const slider = refElement.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsDragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsDragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsDragging);
    };
  };

  return (
    <div
      className={styles.category_section_container}
      ref={refElement}
      onMouseOver={() => {
        handleScrolling();
      }}>
      {subCategory?.map((subItem, index) => {
        return (
          <div
            className={`${styles.card_container}  ${
              isDumy && "pointer-events-none"
            }`}
            key={(index + 1).toString()}
            onClick={() => {
              setLocalStorage("subCategory", subItem?.cat_name);
              setLocalStorage("subCategoryId", subItem?.id);
              setLocalStorage("categoryId", subItem?.rootID);
            }}>
            <a
              href={`/${homePageReduxData?.cityName
                .replace(/\//g, "-")
                .toLowerCase()}/${subItem?.seourl}`}>
              <div
                className={`${styles.card_div}  w-[79.2px] ms:w-[245px]`}
                key={index.toString()}>
                <img
                  src={
                    "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                    subItem?.category_web_image
                  }
                  className={`${styles.images} !w-full rounded-[6.4px] ms:rounded-none select-none`}
                  loading="lazy"
                  alt={subItem?.cat_name}
                />
              </div>
              <h3
                className={`${styles.card_text} ${
                  isDumy && "pointer-events-none"
                }`}>
                {subItem?.cat_name}
              </h3>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SubCategorySection;
