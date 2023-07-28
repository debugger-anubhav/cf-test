import React, { useEffect } from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Card from "@/components/Common/HomePageCards";
import { useDispatch, useSelector } from "react-redux";
import { endPoints } from "@/network/endPoints";
import { addComboProducts } from "@/store/Slices";
import { useQuery } from "@/hooks/useQuery";
import { productImageBaseUrl } from "@/constants/constant";

const PreDesignCombos = () => {
  const str = string.landing_page.Common_card;


  const cityId = localStorage.getItem("city-Seleted");


  const { refetch: getPreDesignCombos } = useQuery(
    "design-combos",
    endPoints.productCombos,
    `?cityId=${cityId}&userId=${85757}`,
  );


  const { designComboProduct: getPreDesignCombosData } = useSelector(state => state.homePagedata);
  const dispatch = useDispatch();

  useEffect(() => {
    getPreDesignCombos()
      .then(res => {
        dispatch(addComboProducts(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  console.log(getPreDesignCombosData, "getPreDesignCombosData")

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Predesigned combos for you</h2>
      <div className={styles.card_box}>
        {getPreDesignCombosData?.map((item, index) => (
          <div key={index}>
            <Card
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              desc={item.product_name}
              originalPrice={item.price}
              currentPrice={item.sale_price}
              discount={item.discount}
              showincludedItem={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreDesignCombos;
