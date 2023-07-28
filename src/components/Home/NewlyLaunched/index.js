import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import strings from "@/constants/Constant.json";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {addNewlaunchedProducts} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";

const NewlyLaunched = () => {
  const heading = strings.landing_page.Newlylaunced.heading;
  const subHeading = strings.landing_page.Newlylaunced.productRent;

  const cityId = localStorage.getItem("city-Seleted");

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

  const initialdata = {
    id: 0,
    product_sale_price: 0,
    created: "",
    product_name: "",
    seller_product_id: 0,
    seourl: "",
    excerpt: "<p></p>",
    category_id: "0",
    price: "0",
    sale_price: "0",
    image: "",
    description: "",
    quantity: 0,
    max_quantity: 0,
    shipping_cost: "0",
    subproducts: "",
    is_package: "0",
    is_sub_product: 0,
    product_label: "0",
    rental_frequency_type: "0",
    shipping: 0,
  };
  const updateddata = [initialdata, ...newProductFetched];

  return (
    <div className={styles.main_container}>
      {/* <div className={styles.brown_box}>
                <h2 className={styles.heading}>{heading}</h2>
                <h3 className={styles.subHeading}>{subHeading}</h3>
            </div> */}
      <div className={`${styles.brown_box} hidden lg:flex`}>
        <h2 className={styles.heading}>{heading}</h2>
        <h3 className={styles.subHeading}>{subHeading}</h3>
      </div>
      <div className="flex overflow-x-scroll lg:flex-wrap lg:overflow-x-visible">
        {updateddata.map((ele, index) => (
          <div key={index}>
            <div
              className={`flex mr-4 lg:mr-0  ${index !== 0 && "lg:ml-4"} ${
                index < 2 && "lg:mb-4"
              }`}>
              {index === 0 ? (
                <div className={`${styles.brown_box} lg:hidden flex`}>
                  <h2 className={styles.heading}>{heading}</h2>
                  <h3 className={styles.subHeading}>{subHeading}</h3>
                </div>
              ) : (
                <div className="!relative">
                  <div className="">
                    <Image
                      // src={""https://d3juy0zp6vqec8.cloudfront.net/images/google_review/saurabh_parmar.webp""}
                      src={
                        "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/" +
                        ele.image.split(",")[0]
                      }
                      width={241}
                      height={181}
                      className="max-w-[241px] max-h-[181px] lg:max-w-[165px] xl:max-w-[226px] "
                    />
                  </div>
                  <div className={styles.price_tag}>
                    <p>{ele.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewlyLaunched;
