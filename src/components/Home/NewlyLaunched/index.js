import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import strings from "@/constants/Constant.json";
import {useDispatch, useSelector} from "react-redux";
import {addNewlaunchedProducts} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";

const NewlyLaunched = () => {
  const heading = strings.landing_page.Newlylaunced.heading;
  const subHeading = strings.landing_page.Newlylaunced.productRent;

  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const {refetch: getNewlaunchedProduct} = useQuery(
    "new-product",
    endPoints.newlylaunchedProduct,
    `?cityId=${cityId}`,
  );

  const dispatch = useDispatch();
  const {newProduct: newProductFetched} = useSelector(
    state => state.homePagedata,
  );

  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    getNewlaunchedProduct()
      .then(res => {
        setNewProduct(res?.data?.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    newLaunchedProductData();
  }, [newProduct]);

  const newLaunchedProductData = () => {
    dispatch(addNewlaunchedProducts(newProduct));
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.brown_box}>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <h3 className={styles.subHeading}>{subHeading}</h3>
        </div>
      </div>
      <div className={styles.images_wrapper}>
        {newProductFetched?.map((ele, index) => (
          <div className="relative" key={index}>
            <div className="">
              <img
                src={
                  "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/" +
                  ele?.image?.split(",")[0]
                }
                className={styles.img}
              />
            </div>
            <div className={styles.price_tag}>
              <p>{`₹${ele?.price} / month`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewlyLaunched;
