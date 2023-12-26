import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import Card from "@/components/Common/HomePageCards";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {getLocalStorage, productImageBaseUrl} from "@/constants/constant";
import {useRouter} from "next/navigation";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";

const SavedItem = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const [isDumy, setIsDumy] = React.useState(false);
  const sliderRef = useRef(null);

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${
      // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      decrypt(getLocalStorage("_ga")) ??
      decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );

  useEffect(() => {
    getSavedItems()
      .then(res => {
        dispatch(addSaveditems(res?.data?.data));
        // addSaveditemID
        const ids = res?.data?.data.map(item => {
          return item?.id;
        });
        dispatch(addSaveditemID(ids));
      })
      .catch(err => console.log(err));
  }, []);
  // useEffect(() => {}, [categoryPageReduxData?.savedItems?.length]);

  const handleCardClick = (e, item) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${item.id}/${item.seourl}`);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
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

    const toggleIsdragging = () => {
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
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  const data = categoryPageReduxData?.savedProducts;

  return data.length > 0 ? (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Your saved items</h2>
      <div className={styles.main_sub_container} ref={sliderRef}>
        {data?.map((item, index) => {
          return (
            <div
              className={`flex flex-wrap mr-4 mb-4 ${styles.child}`}
              key={index.toString()}
              onClick={e => {
                !reduxStateOfLoginPopup && handleCardClick(e, item);
              }}>
              <Card
                cardImage={productImageBaseUrl + item?.image?.split(",")[0]}
                desc={item?.product_name}
                originalPrice={item?.price}
                currentPrice={item?.fc_product_sale_price}
                hoverCardImage={
                  item?.image?.split(",").filter(item => item).length > 1
                    ? productImageBaseUrl + item?.image?.split(",")[1]
                    : productImageBaseUrl + item?.image?.split(",")[0]
                }
                discount={`${Math.round(
                  ((item?.price - item?.fc_product_sale_price) * 100) /
                    item?.price,
                ).toFixed(0)}%`}
                productID={item?.id}
                seourl={item?.seourl}
                isSavedComp={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default SavedItem;
