import React from "react";
import AddressSection from "./AddressSection";
import ShoppingCartSection from "./ShoppingCartSection";
import styles from "./ShoppingCartSection/style.module.css";
import {Skeleton} from "@mui/material";
import {useSelector} from "react-redux";

const CartSection = () => {
  const tab = useSelector(state => state.cartPageData.shoppingCartTab);
  return (
    <div>
      {tab === 0 ? (
        <>
          <ShoppingCartSection />
        </>
      ) : (
        <AddressSection />
      )}
    </div>
  );
};

export default CartSection;

export const CartPageSkeleton = () => {
  return (
    <div className={`${styles.main_container_skeleton} `}>
      <div className="lg:w-1/2 w-full" id="leftDiv">
        <div className={styles.skeleton_right_heading}>
          <Skeleton
            variant="text"
            className={styles.skeleton_full_width_height}
          />
        </div>
        {[1, 2, 3]?.map(item => {
          return (
            <div key={item.toString()}>
              <div className={styles.right_product_wrapper}>
                <div className={styles.skeleton_product_img}>
                  <Skeleton
                    variant="rectangular"
                    className={styles.skeleton_full_width_height}
                  />
                </div>
                <div className={styles.skeleton_details}>
                  <div className="flex">
                    <div className={styles.skeleton_product_detail_1}>
                      <Skeleton
                        variant="text"
                        className={styles.skeleton_full_width_height}
                      />
                    </div>
                    <div className={styles.skeleton_product_detail_2}>
                      <Skeleton
                        variant="rectangular"
                        className={styles.skeleton_full_width_height}
                      />
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className={styles.skeleton_product_detail_3}>
                      <Skeleton
                        variant="text"
                        className={styles.skeleton_full_width_height}
                      />
                    </div>
                    <div className={styles.skeleton_product_detail_4}>
                      <Skeleton
                        variant="text"
                        className={`${styles.skeleton_full_width_height} my-2`}
                      />
                      <Skeleton
                        variant="text"
                        className={styles.skeleton_full_width_height}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {item !== 3 && <div className={styles.line_break_skeleton}></div>}
            </div>
          );
        })}
      </div>

      <div className={styles.skeleton_right_div} id="rightDiv">
        {[1, 2].map(item => {
          return (
            <div key={item.toString()}>
              <div className={styles.first_box_skelton}>
                <Skeleton
                  variant="rectangular"
                  className={styles.skeleton_full_width_height_curve}
                />
              </div>
              <div className={styles.second_box_skeleton}>
                <Skeleton
                  variant="rectangular"
                  className={styles.skeleton_full_width_height_curve}
                />
              </div>
              <div className={styles.third_box_skeleton}>
                <Skeleton
                  variant="rectangular"
                  className={styles.skeleton_full_width_height_curve}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.extra_lagre_skeleton}>
        <div className={`${styles.second_box_skeleton_large}`}>
          <Skeleton
            variant="rectangular"
            className={styles.skeleton_full_width_height_curve}
          />
        </div>
        <div className={styles.third_box_skeleton}>
          <Skeleton
            variant="rectangular"
            className={styles.skeleton_full_width_height_curve}
          />
        </div>
      </div>
    </div>
  );
};
