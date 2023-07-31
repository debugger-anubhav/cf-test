import React, { useEffect } from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/hooks/useQuery";
import { endPoints } from "@/network/endPoints";
import { addCategory } from "@/store/Slices";
import { categoryImageBaseUrl } from "@/constants/constant";

const RentFurnitureAndAppliances = () => {

  const { category: getCategory } = useSelector(state => state.homePagedata);
  const dispatch = useDispatch();

  const { refetch: getAllCategory } = useQuery("category", endPoints.category);

  useEffect(() => {
    getAllCategory()
      .then(res => {
        dispatch(addCategory(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
      <div className={styles.card_div}>
        {getCategory?.map((item, index) => (
          <div key={index}>
            <div className="relative">
              <Image
                src={categoryImageBaseUrl + item.category_image}
                width={371}
                height={367}
                alt=""
                className={styles.img}
              />
              <div className={styles.pricetag}>
                <p className={styles.price}>Starting from</p>
                <p className={styles.price}>
                  <span className={styles.span}>{item.pricetag}</span>
                  month
                </p>
              </div>
            </div>
            <div className="xl:pl-3 macbook:pl-0">
              <h3 className={styles.label}>{item.cat_name}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentFurnitureAndAppliances;
