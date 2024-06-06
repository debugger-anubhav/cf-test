import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {productPageImagesBaseUrl} from "@/constants/constant";
import {Skeleton} from "@mui/material";

const ItemsIncluded = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [loader, setLoader] = useState(true);
  const pageDetails = useSelector(
    state => state.productPageData.singleProductDetails[0],
  );
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);
  console.log(pageDetails?.subProduct);
  return (
    <>
      {loader ? (
        <ItemsIncludedSkeleton />
      ) : (
        <div>
          {pageDetails?.subProduct?.length > 0 ? (
            <div className={styles.main_container}>
              <h2 className={styles.header}>
                {pageDetails?.subProduct?.length} product included
              </h2>
              <div className={styles.images_wrappper}>
                {pageDetails?.subProduct?.map((item, index) => (
                  <div
                    onClick={() => setSelectedItem(index)}
                    className={`border-[4px] p-1 relative ${
                      selectedItem === index ? "border-[#5F789D]" : "border-fff"
                    }`}
                    key={index}>
                    <img
                      src={`${
                        productPageImagesBaseUrl + item.image.split(",")[0]
                      }`}
                      className={styles.img}
                      loading="lazy"
                      alt={item.product_name}
                    />

                    {pageDetails?.subproduct_quantity !== "" ? (
                      <div className={styles.quantity_label}>
                        {pageDetails.subproductquantity[item.id]}x
                      </div>
                    ) : (
                      <div className={styles.quantity_label}>1x</div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {pageDetails?.subProduct?.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedItem === index
                        ? "flex flex-col lg:flex-row"
                        : "hidden"
                    } ${styles.info_wrapper}`}>
                    <div className={styles.left_div}>
                      <p className={styles.info_subhead}>Product Information</p>
                      <div className={styles.info_list}>
                        <div className={styles.info_row}>
                          <p className={styles.label}>Name</p>
                          <p className={styles.colon}>:</p>
                          <a
                            href={`/things/${item.id}/${item.seourl}`}
                            target="_blank"
                            rel="noreferrer">
                            <p className={styles.info_details}>
                              {item.product_name.replace(/-/g, " ")}
                            </p>
                          </a>
                        </div>

                        <div className={styles.info_row}>
                          <p className={styles.label}>Brand</p>
                          <p className={styles.colon}>:</p>
                          <p className={styles.info_details}>{item.brand}</p>
                        </div>

                        <div className={styles.info_row}>
                          <p className={styles.label}>Size</p>
                          <p className={styles.colon}>:</p>
                          <p className={styles.info_details}>
                            {item.dimension}
                          </p>
                        </div>
                        {item?.dimension_in_cm && (
                          <div className={styles.info_row}>
                            <p className={styles.label}>Size (in cm) </p>
                            <p className={styles.colon}> :</p>
                            <p className={styles.info_details}>
                              {item.dimension_in_cm}
                            </p>
                          </div>
                        )}

                        <div className={styles.info_row}>
                          <p className={styles.label}>Material</p>
                          <p className={styles.colon}>:</p>
                          <p className={styles.info_details}>{item.material}</p>
                        </div>

                        <div className={styles.info_row}>
                          <p className={styles.label}>Color</p>
                          <p className={styles.colon}>:</p>
                          <p className={styles.info_details}>{item.colour}</p>
                        </div>
                      </div>
                    </div>
                    {item?.description !== "" && (
                      <div className={styles.right_div}>
                        <p className={styles.info_subhead}>Features</p>
                        <div className={styles.features_wrappers}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                            className={styles.feature}></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.main_container}>
              <div className={styles.images_wrappper}>
                <div className={`border-[4px] p-1 relative border-[#5F789D]`}>
                  <img
                    src={`${
                      productPageImagesBaseUrl +
                      pageDetails?.image.split(",")[0]
                    }`}
                    className={styles.img}
                    alt={pageDetails?.product_name.replace(/-/g, " ")}
                    loading="lazy"
                  />
                  <div className={styles.quantity_label}>1x</div>
                </div>
              </div>
              <div
                className={`${styles.info_wrapper} flex flex-col lg:flex-row`}>
                <div className={styles.left_div}>
                  <p className={styles.info_subhead}>Product Information</p>
                  <div className={styles.info_list}>
                    <div className={styles.info_row}>
                      <p className={styles.label}>Name</p>
                      <p className={styles.colon}>:</p>
                      <p className={styles.info_details}>
                        {pageDetails?.product_name.replace(/-/g, " ")}
                      </p>
                    </div>

                    {pageDetails?.brand && (
                      <div className={styles.info_row}>
                        <p className={styles.label}>Brand</p>
                        <p className={styles.colon}>:</p>
                        <p className={styles.info_details}>
                          {pageDetails?.brand}
                        </p>
                      </div>
                    )}
                    {pageDetails?.dimension && (
                      <div className={styles.info_row}>
                        <p className={styles.label}>Size</p>
                        <p className={styles.colon}>:</p>
                        <p className={styles.info_details}>
                          {pageDetails?.dimension}
                        </p>
                      </div>
                    )}
                    {pageDetails?.dimension_in_cm && (
                      <div className={styles.info_row}>
                        <p className={styles.label}>Size (in cm) </p>
                        <p className={styles.colon}> :</p>
                        <p className={styles.info_details}>
                          {pageDetails?.dimension_in_cm}
                        </p>
                      </div>
                    )}
                    {pageDetails?.material && (
                      <div className={styles.info_row}>
                        <p className={styles.label}>Material</p>
                        <p className={styles.colon}>:</p>
                        <p className={styles.info_details}>
                          {pageDetails?.material}
                        </p>
                      </div>
                    )}

                    {pageDetails?.colour && (
                      <div className={styles.info_row}>
                        <p className={styles.label}>Color</p>
                        <p className={styles.colon}>:</p>
                        <p className={styles.info_details}>
                          {pageDetails?.colour}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {pageDetails?.description !== "" && (
                  <div className={styles.right_div}>
                    <p className={styles.info_subhead}>Features</p>
                    <div className={styles.features_wrappers}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: pageDetails?.description,
                        }}
                        className={styles.feature}></div>

                      {/* {pageDetails.features?.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <div className={styles.dot}></div>
                    {feature}
                  </li>
                ))} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ItemsIncluded;

export const ItemsIncludedSkeleton = () => {
  return (
    <div className={`${styles.main_container} w-full flex flex-col`}>
      <div className="w-full h-20 flex">
        <Skeleton
          variant="rectangular"
          className="mr-2"
          height={80}
          width={80}
        />
        <Skeleton variant="rectangular" height={80} width={80} />
      </div>
      <div className="w-full my-4">
        <div className="h-5 flex w-60 my-4">
          <Skeleton variant="text" className="w-full h-full" />
        </div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <div className="h-5 flex my-2" key={index.toString()}>
              <Skeleton variant="text" className="w-40 h-full" />
              <p className="mx-4">:</p>
              <Skeleton variant="text" className="w-60 h-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
