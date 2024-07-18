import React, {memo, useEffect, useState} from "react";
import styles from "./style.module.css";
import strings from "@/constants/Constant.json";
import {useDispatch, useSelector} from "react-redux";
import {addNewlaunchedProducts} from "@/store/Slices";
import {Skeleton} from "@mui/material";
import {productImageBaseUrl} from "@/constants/constant";
import Link from "next/link";
import Worker from "worker-loader!../RentNowBanner/rentNowBannerWorker.js";
import Image from "@/components/Image";

const heading = strings.landing_page.Newlylaunced.heading;
const subHeading = strings.landing_page.Newlylaunced.productRent;

const NewlyLaunched = () => {
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const dispatch = useDispatch();
  const {newProduct: newProductFetched} = useSelector(
    state => state.homePagedata,
  );

  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = function ({data: {data}}) {
      setNewProduct(data);
    };

    worker.postMessage({type: "newlyLaunched", cityId});

    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    newLaunchedProductData();
  }, [newProduct]);

  const newLaunchedProductData = () => {
    dispatch(addNewlaunchedProducts(newProduct));
  };

  return (
    <div className={styles.main_container}>
      <div className={`${styles.brown_box} hidden lg:flex`}>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <h3 className={styles.subHeading}>{subHeading}</h3>
        </div>
      </div>
      <div className={styles.images_wrapper}>
        <div className={`${styles.brown_box} lg:hidden flex`}>
          <div>
            <h2 className={styles.heading}>{heading}</h2>
            <h3 className={styles.subHeading}>{subHeading}</h3>
          </div>
        </div>

        {newProductFetched &&
          newProductFetched.length > 0 &&
          newProductFetched.map((ele, index) => (
            <Link
              href={`/things/${ele.id}/${ele.seourl}`}
              aria-label={ele?.product_name}
              target="_blank"
              rel="noopener"
              key={index.toString()}>
              <div
                className={`${styles.width_container} ${
                  index === newProductFetched?.length - 1 ? "mr-[16px]" : ""
                } relative`}
                key={index.toString()}>
                <div className="w-full h-auto cursor-pointer ">
                  <Image
                    src={
                      ele?.image?.split(",").filter(item => item).length > 1
                        ? productImageBaseUrl + ele?.image?.split(",")[1]
                        : productImageBaseUrl + ele?.image?.split(",")[0]
                    }
                    className={styles.img}
                    alt={ele?.product_name}
                    width={180}
                    height={130}
                  />
                </div>
                <div className={styles.price_tag}>
                  <p>{`₹${ele?.sale_price} / month`}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default memo(NewlyLaunched);

export const NewlyLauncedSkeleton = memo(() => {
  return (
    <div className={styles.main_container}>
      <div className={`${styles.skeleton_brown_box}`}>
        <Skeleton
          className={styles.skeleton_box}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={styles.skeleton_images_wrapper}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            className={styles.Newlylaunced_skeleton_wrapper}
            key={index.toString()}>
            <Skeleton
              className={styles.skeleton_box}
              variant="rectangular"
              width={"100%"}
              height={"100%"}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
