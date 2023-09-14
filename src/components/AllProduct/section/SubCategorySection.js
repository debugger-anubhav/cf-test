import React, {useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";
import {
  // categoryIconsUrl,
  // getLocalStorage,
  setLocalStorage,
  // sortByText,
} from "@/constants/constant";
// import {productImageBaseUrl} from "@/constants/constant";

const SubCategorySection = () => {
  // const [isDumy, setIsDumy] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const homePageReduxData = useSelector(state => state.homePagedata);
  const data = homePageReduxData?.allAndSubCategory;

  // const sliderRef = useRef(null);

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   let mouseDown = false;
  //   let startX, scrollLeft;

  //   const startDragging = e => {
  //     mouseDown = true;
  //     startX = e.pageX - slider.offsetLeft;
  //     scrollLeft = slider.scrollLeft;
  //   };
  //   const stopDragging = () => {
  //     setIsDumy(false);
  //     mouseDown = false;
  //   };

  //   const toggleIsdragging = () => {
  //     if (mouseDown && !isDumy) setIsDumy(true);
  //   };

  //   slider.addEventListener("mousemove", e => {
  //     e.preventDefault();
  //     if (!mouseDown) return;
  //     const x = e.pageX - slider.offsetLeft;
  //     const scroll = x - startX;
  //     slider.scrollLeft = scrollLeft - scroll;
  //   });
  //   slider.addEventListener("mousedown", startDragging, false);
  //   slider.addEventListener("mouseup", stopDragging, false);
  //   slider.addEventListener("mouseleave", stopDragging, false);
  //   slider.addEventListener("mousemove", toggleIsdragging);

  //   return () => {
  //     slider.removeEventListener("mousedown", startDragging);
  //     slider.removeEventListener("mouseup", stopDragging);
  //     slider.removeEventListener("mouseleave", stopDragging);
  //     slider.removeEventListener("mousemove", toggleIsdragging);
  //   };
  //  }, []);

  // const handleMouseDown = (e) => {
  //   if (sliderRef.current) {
  //     // Get the initial mouse position
  //     const initialMouseX = e.clientX;
  //     let isDragging = true;

  //     // Calculate the initial scroll position
  //     const initialScrollLeft = sliderRef.current.scrollLeft;

  //     const handleMouseMove = (e) => {
  //       if (isDragging) {
  //         // Calculate the new scroll position based on the mouse movement
  //         const delta = e.clientX - initialMouseX;
  //         sliderRef.current.scrollLeft = initialScrollLeft - delta;
  //       }
  //     };

  //     const handleMouseUp = () => {
  //       // Stop dragging when the mouse button is released
  //       isDragging = false;
  //       document.removeEventListener('mousemove', handleMouseMove);
  //       document.removeEventListener('mouseup', handleMouseUp);
  //     };

  //     // Add event listeners for mousemove and mouseup to handle dragging
  //     document.addEventListener('mousemove', handleMouseMove);
  //     document.addEventListener('mouseup', handleMouseUp);
  //   }
  // };

  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(null);
  const scrollContainerRef = useRef(null);
  console.log(scrollContainerRef, "scrollContainerRef");

  const handleMouseDown = e => {
    setIsScrolling(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = e => {
    if (!isScrolling) return;

    const deltaX = e.clientX - startX;

    // Calculate the new scrollLeft position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= deltaX;
    }

    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {data?.map((item, index) => {
        return (
          <div
            key={index.toString()}
            // onClick={(e)=>{
            //   scrollContainerRef.current=e.target.current.children
            //   // console.log(e)
            //     }}
          >
            <div
              className={
                item?.cat_name === "Home Furniture"
                  ? styles.heading_container_home_furniture
                  : styles.heading_container
              }>
              {/* <div className='flex w-full justify-between'> */}
              <h2 className={styles.heading}>{item?.cat_name}</h2>
              <div className={styles.viewButton}>
                <a
                  href={`/${homePageReduxData?.cityName.toLowerCase()}/${
                    item?.seourl
                  }`}
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
            {/* ref={sliderRef} onMouseDown={handleMouseDown} */}
            <div
              className={styles.category_section_container}
              onClick={e => {
                scrollContainerRef.current = e.target;
                // console.log(e)
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              id={index}
              key={index.toString()}>
              {item?.sub_categories.map((subItem, index) => {
                return (
                  <div
                    className={`${styles.card_container}`}
                    key={index.toString()}
                    onClick={() => {
                      setLocalStorage("subCategory", subItem?.cat_name);
                      setLocalStorage("subCategoryId", subItem?.id);
                      setLocalStorage("categoryId", subItem?.rootID);
                    }}>
                    <div
                      className="w-[79.2px] ms:w-[245px]"
                      key={index.toString()}>
                      <a
                        href={`/${homePageReduxData?.cityName.toLowerCase()}/${
                          item?.seourl
                        }`}>
                        <img
                          src={
                            "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                            subItem?.category_web_image
                          }
                          className={`${styles.images}!w-full rounded-[6.4px] ms:rounded-none select-none`}
                        />
                      </a>
                    </div>
                    <h3 className={styles.card_text}>{subItem?.cat_name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// export async function getServerSideProps() {
//   // Fetch your data here, you can use any data fetching library or API call
//   const response = await fetch("https://api.example.com/subcategorydata");
//   const data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default SubCategorySection;
