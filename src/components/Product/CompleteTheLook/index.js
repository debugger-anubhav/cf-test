import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
// import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
// import {HomePageImages} from "@/assets/images";
import {useDispatch, useSelector} from "react-redux";
import {addCompleteTheLook} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";
import {baseInstance} from "@/network/axios";

const CompleteTheLook = ({params}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const [isDumy, setIsDumy] = React.useState(false);

  const cityId = getLocalStorage("cityId");

  useEffect(() => {
    baseInstance
      .get(endPoints.productPage.completeTheLook(params.productId, cityId))
      .then(res => {
        dispatch(addCompleteTheLook(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(addCompleteTheLook([]));
      });
  }, []);

  const scrollerRef2 = useRef(null);

  const handleScrolling = () => {
    const slider = scrollerRef2.current;
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

  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };

  if (pageData?.completeTheLook.length > 0) {
    return (
      <div className={styles.main_container}>
        <h2 className={styles.heading}>Complete The Look</h2>

        <div
          className={styles.card_wrapper}
          ref={scrollerRef2}
          onMouseOver={() => {
            handleScrolling();
          }}>
          {pageData?.completeTheLook?.map((item, index) => (
            <div
              key={index}
              onClick={e => {
                !reduxStateOfLoginPopup && handleCardClick(e, item);
              }}
              className={`${styles.child ?? ""} ${
                isDumy && "pointer-events-none"
              }`}>
              <Card
                cardImage={`${
                  productPageImagesBaseUrl + item?.image?.split(",")[0]
                }`}
                discount={`${Math.round(
                  ((item?.price - item?.sale_price) * 100) / item?.price,
                ).toFixed(0)}%`}
                originalPrice={item?.price}
                currentPrice={item?.sale_price}
                desc={item?.product_name}
                isHover={false}
                productID={item?.id}
                seourl={item?.seourl}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default CompleteTheLook;
